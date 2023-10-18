'use strict'
const { CREATED, SuccessResponse } = require("../core/success.response")
const AccessService = require("../services/access.service")

class AccessController {
    signIn = async (req, res, next) => {
        new SuccessResponse({
            metadata: await AccessService.signIn(req.body)
        }).send(res)
    }
    signUp = async (req, res) => {
        new CREATED({
            message: 'Registered OK',
            metadata: await AccessService.signUp(req.body),
            options: {
                limit: 10
            }
        }).send(res)
    }
    logout = async (req, res) => {
        new SuccessResponse({
            message: 'Logout OK',
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }
}

module.exports = new AccessController()