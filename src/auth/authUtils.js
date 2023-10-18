'use strict'
const jwt = require('jsonwebtoken')
const { asyncHandler } = require('../helpers/asyncHandler')
const { AuthFailureError, NotFoundError, } = require('../core/error.response')
const keytokenModel = require('../models/keytoken.model')
const { findByUserId } = require('../services/keyToken.service')
const shopModel = require('../models/shop.model')
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization',
    CLIENT_ID: 'client-id',
}

const createTokenPair = async (payload, publicKey, privateKey) => {
    // create access token though private
    //privateKey không lưu trong db, nó chỉ xảy ra khi user login 1 lần và sẽ đẩy sang cho browser
    try {
        const accessToken = jwt.sign(payload, publicKey, {
            // algorithm: 'RS256',
            expiresIn: '2 days'
        })

        const refreshToken = jwt.sign(payload, privateKey, {
            // algorithm: 'RS256',
            expiresIn: '7 days'
        })

        return { accessToken, refreshToken }
    } catch (error) {
        console.log('error: ', error)
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    /*
    1- Check userId missing??
    2- get Access tokens
    3- verify Tokens
    4- check User in dbs
    5- check keyStore with this userId??
    6- Ok all => return next()
    */

    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) throw new AuthFailureError('Invalid user')


    const keyStore = await findByUserId(userId)
    if (!keyStore) throw new NotFoundError('Not found keyStore')

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new AuthFailureError('Invalid request token')

    try {
        const decodeUser = jwt.verify(accessToken.split(' ')[1], keyStore.publicKey)
        if (userId !== decodeUser.userId) throw new AuthFailureError('Invalid userId')
        req.keyStore = keyStore
        return next()
    } catch (error) {
        throw error
    }
})

const verifyJWT = async (token, keySecret) => {
    return await jwt.verify(token, keySecret)
}

module.exports = {
    createTokenPair,
    authentication,
    verifyJWT
}