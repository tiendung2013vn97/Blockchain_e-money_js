const express = require("express")
const router = new express.Router()
const handler = require('./handler')
const suc = require('../response/success')
const fail = require('../response/fail')

/**
 * Send money
 */
router.post("/", (req, res, next) => {
    let { userId, privateKey, money, to } = { ...req.body }
    return handler.sendMoney(userId, privateKey, money, to)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})

router.get("/:userId", (req, res, next) => {
    return res.json(suc(handler.calBalance(req.params.userId)))
})

router.get("/history/:userId", (req, res, next) => {
    return handler.getHistory(req.params.userId)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})


module.exports = router