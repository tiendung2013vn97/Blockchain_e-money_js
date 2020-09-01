const blockChain = require("../blockchain")
const jwt = require('jsonwebtoken')
const userHandler = require('../user/handler')
const keypair = require('keypair');
const p2p = require("../p2p")

const getVotes = async (userId) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${userId} doesn't exist!`)
    }

    let blocks = blockChain.get()
    let result = {}
    blocks.forEach((block, index) => {
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.type != "CREATE_VOTE" && decodeData.type != "VOTE") return

        let voteId = decodeData.vote.voteId
        if (decodeData.vote && decodeData.vote.voteId == voteId) {
            if (decodeData.type == "CREATE_VOTE") {
                result[voteId] = { host: decodeData.user, vote: decodeData.vote }
                result[voteId].vote.options.forEach(option => option.voted = [])
            }

            if (decodeData.type == "VOTE") {
                let option = result[voteId].vote.options.find(option => option.id == decodeData.vote.optionId)
                if (option) { option.voted.push(decodeData.user); }
            }
        }
    })

    result = Object.values(result)
    result = result.filter(item => item.host.userId == userId || item.vote.voters.includes(userId) || item.vote.voter == "all")
    return Promise.resolve(result)
}

const getVote = (voteId) => {
    let blocks = blockChain.get()
    let result = null

    blocks.forEach((block, index) => {
        if (!index) return
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.vote && decodeData.vote.voteId == voteId) {
            if (decodeData.type == "CREATE_VOTE") {
                result = { host: decodeData.user, vote: decodeData.vote }
                result.vote.options.forEach(option => option.voted = [])
            }

            if (decodeData.type == "VOTE") {
                let option = result.vote.options.find(option => option.id == decodeData.vote.optionId)
                if (option) { option.voted.push(decodeData.user) }
            }
        }
    })

    return result
}

const getVotesByText = async (text) => {
    let blocks = blockChain.get()
    let result = {}
    blocks.forEach((block, index) => {
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.type != "CREATE_VOTE" && decodeData.type != "VOTE") return

        let voteId = decodeData.vote.voteId
        if (decodeData.vote && decodeData.vote.voteId == voteId) {
            if (decodeData.type == "CREATE_VOTE") {
                result[voteId] = { host: decodeData.user, vote: decodeData.vote }
                result[voteId].vote.options.forEach(option => option.voted = [])
            }

            if (decodeData.type == "VOTE") {
                let option = result[voteId].vote.options.find(option => option.id == decodeData.vote.optionId)
                if (option) { option.voted.push(decodeData.user); }
            }
        }
    })


    result = Object.values(result)

    result = result.filter(item => {
        return JSON.stringify(item).includes(text)
    })
    return Promise.resolve(result)
}

const createVote = async (userId, privateKey, vote) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${userId} doesn't exist!`)
    }

    if (!userHandler.isMatchPrivatePublicKey(privateKey, user.publicKey)) {
        return Promise.reject(`Private key is wrong. Please try again!`)
    }

    checkVoteValid(vote, "CREATE_VOTE")

    vote.voteId = `${userId}-${vote.topic}-${Date.now()}`

    let publicKey = user.publicKey
    delete user.publicKey
    let data = {
        encodeData: jwt.sign({ user, type: "CREATE_VOTE", vote }, privateKey, { algorithm: 'RS256' }),
        publicKey
    }

    p2p.broadcastMineBlock(data)
    return Promise.resolve({ voteId: vote.voteId })
}

const vote = async (userId, privateKey, vote) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${userId} doesn't exist!`)
    }

    if (!userHandler.isMatchPrivatePublicKey(privateKey, user.publicKey)) {
        return Promise.reject(`Private key is wrong. Please try again!`)
    }


    let publicKey = user.publicKey
    delete user.publicKey
    let data = {
        encodeData: jwt.sign({ user, type: "VOTE", vote }, privateKey, { algorithm: 'RS256' }),
        publicKey
    }

    checkVoteValid(vote, "VOTE")
    vote = getVote(vote.voteId)

    if (!vote) return Promise.reject(`Vote doesn't exist!`)
    vote = vote.vote

    if (!vote.voters.includes(userId)) {
        return Promise.reject(`You are not allowed to vote!`)
    }

    let isVoted = vote.options.find(option => option.voted.map(item => item.userId).includes(userId))
    if (isVoted) {
        return Promise.reject(`You already voted this!`)
    }

    p2p.broadcastMineBlock(data)
}

const checkVoteValid = (vote, type) => {
    if (type != "VOTE" && type != "CREATE_VOTE") {
        throw "INVALID VOTE TYPE"
    }

    if (type == "CREATE_VOTE") {
        if (!vote.options || !Array.isArray(vote.options)) throw "INVALID OPTIONS"
        if (!vote.topic) throw "MISSING TOPIC"
        if ([null, undefined].includes(vote.fromDate)) throw "MISSING FROM_DATE"
        if ([null, undefined].includes(vote.toDate)) throw "MISSING TO_DATE"
        if (vote.fromDate >= vote.toDate) throw "FromDate must less than ToDate"
        if (!vote.voters || (!Array.isArray(vote.voters) && vote.voters != "all")) throw "INVALID VOTERS"
    }

    if (type == "VOTE") {
        if (!vote.optionId) throw "MISSING OPTION_ID"
        if (!vote.voteId) throw "MISSING VOTEID"
        if ([null, undefined].includes(vote.voteTime)) throw "MISSING VOTE_TIME"

        let blocks = blockChain.get()
        for (index = 1; index < blocks.length; index++) {
            let decodeData = jwt.decode(blocks[index].data.encodeData)
            if (decodeData.type == "CREATE_VOTE" && decodeData.vote.voteId == vote.voteId && (vote.voteTime > decodeData.vote.toDate || vote.voteTime < decodeData.vote.fromDate)) {
                throw "Out of time to vote!"
            }
        }
    }
}

module.exports = {
    getVotesByText,
    getVotes,
    getVote,
    createVote,
    vote
}