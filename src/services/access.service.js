'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const KeyTokenService = require("./keyToken.service")
const { createTokenPair, verifyJWT } = require("../auth/authUtils")
const { getInfoData } = require("../utils")
const { ConflictRequestError, BadRequestError, AuthFailureError } = require("../core/error.response")
const { findByEmail } = require("./shop.service")
const bryct = require('bcrypt')

const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN',
}

class AccessService {

    static handlerRefreshToken = async (refreshToken) => {
        // check refresh token used
        const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken)
        if (foundToken) {
            //decode xem may la ai
            const { userId, email } = await verifyJWT(refreshToken, foundToken.privatekey)
        }
    }

    static logout = async (keyStore) => {
        console.log("logunauthorized")
        const delKey = await KeyTokenService.removeKeyById(keyStore._id)

        console.log('xoa roi: ', delKey)
        return delKey
    }
    /*
        1-check email in db
        2-match password in db
        3-create PRT and PT and save
        4-generate tokens
        5-get data return login
    */
    static signIn = async ({ email, password, refreshToken = null }) => {
        //1
        const foundShop = await findByEmail({ email })
        if (!foundShop) throw new BadRequestError('Shop not registered')
        //2
        const match = await bryct.compare(password, foundShop.password)
        if (!match) throw new AuthFailureError('Authentication failed')
        //3. create private, public key
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //     modulusLength: 4096,
        //     publicKeyEncoding: {
        //         type: 'pkcs1',
        //         format: 'pem'
        //     },
        //     privateKeyEncoding: {
        //         type: 'pkcs1',
        //         format: 'pem'
        //     }
        // })
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')
        //4.generate tokens
        const { _id: userId } = foundShop
        const tokens = await createTokenPair({ userId, email }, publicKey, privateKey)
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey,
            publicKey,
            userId
        })
        return {
            shop: getInfoData({ fields: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }
    static signUp = async ({ name, email, password }) => {
        //step1: check email exists??
        const hodelShop = await shopModel.findOne({ email }).lean()
        if (hodelShop) {
            throw new ConflictRequestError('Errors: Shop already exists')
        }

        const passwordHash = await bcrypt.hash(password, 10)
        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })

        if (newShop) {
            // -- Cách triển khai này dành cho các dự án khủng như amazon...(nhưng cũng là 1 cách hay)
            // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
            //     modulusLength: 4096,
            //     publicKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     },
            //     privateKeyEncoding: {
            //         type: 'pkcs1',
            //         format: 'pem'
            //     }
            // })

            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')

            // const publicKeyString = await KeyTokenService.createKeyToken({
            //     userId: newShop._id,
            //     publicKey
            // })

            const keyPair = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })

            // if (!publicKeyString) {
            //     return {
            //         code: 'xxx',
            //         msg: ''
            //     }
            // }
            //convert publicKeyString to publicKey
            // const publicKeyObject = crypto.createPublicKey(publicKeyString) // convert này dành cho siêu dự án
            // create token pair
            // const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey)
            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fields: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
        }
        return {
            code: 200,
            metadata: null
        }
    }
}

module.exports = AccessService