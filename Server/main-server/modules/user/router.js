const express = require("express")
const router = new express.Router()
const handler = require('./handler')
const suc = require('../response/success')
const fail = require('../response/fail')

/**
 * User Login
 */
router.post("/login", (req, res, next) => {
    return handler.login(req.body)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})

/**
 * Create new user
 */
router.post("/", (req, res, next) => {
    return handler.createUser(req.body)
        .then(val => res.json(suc(val)))
        .catch(err => res.json(fail(err)))
})


module.exports = router