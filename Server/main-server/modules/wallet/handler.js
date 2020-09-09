const blockChain = require("../blockchain")
const jwt = require('jsonwebtoken')
const userHandler = require('../user/handler')
const keypair = require('keypair');
const p2p = require("../p2p")

const sendMoney = async (userId, privateKey, money, to) => {
    let user = await userHandler.getUser(userId)
    if (!user) {
        return Promise.reject(`UserId ${userId} doesn't exist!`)
    }

    let toUser = await userHandler.getUser(to)
    if (!toUser) {
        return Promise.reject(`UserId ${to} doesn't exist!`)
    }

    if (!userHandler.isMatchPrivatePublicKey(privateKey, user.publicKey)) {
        return Promise.reject(`Private key is wrong. Please try again!`)
    }

    if (isNaN(+money)) {
        return Promise.reject(`Money must is a positive number!`)
    }

    if (calBalance(userId) < money) {
        return Promise.reject(`You don't have enough money to transfer!`)
    }

    let publicKey = user.publicKey
    delete user.publicKey
    let data = {
        encodeData: jwt.sign({ user, type: "SEND_MONEY", money, to }, privateKey, { algorithm: 'RS256' }),
        publicKey
    }

    p2p.broadcastMineBlock(data)
    return Promise.resolve("success")
}

const calBalance = (userId) => {
    let blocks = blockChain.get()
    let balance = 100;
    blocks.forEach((block, index) => {
        if (!index) return
        let decodeData = jwt.decode(block.data.encodeData)
        if (decodeData.user.to == userId && decodeData.type == "SEND_MONEY") {
            balance += decodeData.money
        }
        if (decodeData.user.userId == userId && decodeData.type == "SEND_MONEY") {
            balance -= decodeData.money
        }
    })

    return balance
}

const getHistory = async (userId) => {
    let blocks = blockChain.get()
    let result = []
    blocks.forEach((block, index) => {
        if (!index) return
        let decodeData = jwt.decode(block.data.encodeData)
        if ((decodeData.to == userId || decodeData.user.userId == userId) && decodeData.type == "SEND_MONEY") {

            result.push({ ...decodeData, hash: block.hash, index: block.index, timestamp: block.timestamp })
        }
    })
    return result
}

module.exports = {
    getHistory,
    calBalance,
    sendMoney
}