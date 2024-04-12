'use strict'

const apikeyModel = require("../models/apikey.model")
const keytokenModel = require("../models/keytoken.model")
const { findById } = require("../services/apikey.service")
const crypto = require('crypto')

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            // const key = crypto.randomBytes(64).toString('hex')
            // apikeyModel.create({ key: key, permissions: ['0000'] })
            return res.status(403).json({
                msg: 'Forbidden'
            })
        }
        //check objKey with Db
        const objKey = await findById(key)
        if (!objKey) {
            return res.status(403).json({
                msg: 'Forbidden'
            })
        }
        req.objKey = objKey
        return next()
    } catch (err) {

    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions) {
            return res.status(403).json({
                msg: 'Permission denied'
            })
        }

        const validPermissions = req.objKey.permissions.includes(permission)
        if (!validPermissions) {
            return res.status(403).json({
                msg: 'Permission denied'
            })
        }

        return next()
    }
}

module.exports = {
    apiKey,
    permission,
}