'use strict'
const keytokenModel = require("../models/keytoken.model")
const { Types } = require('mongoose')

class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            //lever 0
            // const publicKeyString = publicKey.toString()
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey: publicKeyString
            // })

            const filter = { user: userId }
            const update = { publicKey, privateKey, refreshTokenUsed: [], refreshToken }
            const option = { upsert: true, new: true }

            const tokens = await keytokenModel.findOneAndUpdate(filter, update, option)

            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        console.log(new Types.ObjectId(userId))
        const res = await keytokenModel.findOne({ user: userId }).lean()
        return res
    }

    static removeKeyById = async (userId) => {
        return await keytokenModel.deleteOne({ user: userId })
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({ refreshTokensUsed: refreshToken })
    }
}

module.exports = KeyTokenService