'use strict'
const jwt = require('jsonwebtoken')
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

        jwt.verify(accessToken, publicKey, (err, decode) => {
            if (err) {
                console.log('error verify: ', err)
            } else {
                console.log('decode: ', decode)
            }
        })
        return { accessToken, refreshToken }
    } catch (error) {
        console.log('error: ', error)
    }
}

module.exports = {
    createTokenPair
}