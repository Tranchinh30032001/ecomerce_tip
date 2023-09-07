'use strict'
const mongoose = require('mongoose')
const connectString = 'mongodb+srv://chinhlong30032001:y2VCnizYWaX7P1lS@cluster0.qxmkvlz.mongodb.net/?retryWrites=true&w=majority'

class Database {
    constructor() {
        this.connect()
    }
    connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set('debug', true)
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(() => console.log('Connect to mongdb successfully')).catch((err) => {
            console.log('Connect MongoDb Error')
        })
    }
    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}

const instanceMongoDb = Database.getInstance()
module.exports = instanceMongoDb

// sử dụng singleton pattern để tạo kết nối tới DB
