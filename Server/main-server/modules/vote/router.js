const express = require("express")
const router = new express.Router()
const handler = require('./handler')
const suc = require('../response/success')
const fail = require('../response/fail')

/**
 * Get all votes
 */
router.get("/", (req, res, next) => {
    return handler.getVotes(req.query.userId)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})

router.get("/:voteId", (req, res, next) => {
    return res.json(suc(handler.getVote(req.params.voteId)))
})

router.get("/by/text-search", (req, res, next) => {
    return handler.getVotesByText(req.query.text)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})



/**
 * Create new vote
 */
router.post("/", (req, res, next) => {
    let { userId, privateKey, vote } = { ...req.body };
    return handler.createVote(userId, privateKey, vote)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})

/**
 * Vote
 */
router.post("/elect", (req, res, next) => {
    let { userId, privateKey, vote } = { ...req.body }
    return handler.vote(userId, privateKey, vote)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})


module.exports = router