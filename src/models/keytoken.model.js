// lưu lại id user, publickey user, refreshtoken
'use strict'

const { model, Schema, Types } = require('mongoose'); // Erase if already required
const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'
// Declare the Schema of the Mongo model
var keyTokenSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Shop'
    },
    privatekey: {
        type: String,
        required: true
    },
    publicKey: {
        type: String,
        require: true,
    },
    refreshTokensUsed: {
        type: Array, default: []
    },
    refreshToken: {
        type: String,
        require: true,
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema)