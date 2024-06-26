const express = require('express')
const morgan = require('morgan')
const app = express()
const { default: helmet } = require('helmet')
const compression = require('compression')
//init middlewares

app.use(morgan('dev')) // ghi lai log nhu id dia chi nguoi dung goi toi http
app.use(helmet())
app.use(compression()) // giúp cải thiện bảo mật của ứng dụng web bằng cách thêm các http headers bảo mật
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
//init db
require('./dbs/init.mongo.lever0')
const { countConnect, checkOverLoad } = require('./helpers/checkconnect')
countConnect()
// checkOverLoad()
// init routes
app.use('/', require('./routes'))

// handling errors
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: statusCode,
        code: statusCode,
        msg: error.message || 'Internal Server Error'
    })
})

module.exports = app