'use strict'

const mongoose = require('mongoose')
const os = require('os')
const process = require('process')
const _SECONDS = 5000

const countConnect = () => {
    const numberConnections = mongoose.connections.length
}

const checkOverLoad = () => {
    setInterval(() => {
        const numberConnection = mongoose.connections.length
        const numCores = os.cpus.length
        const memoryUsage = process.memoryUsage().rss
        const maxConnections = numCores * 5
        if (numberConnection > maxConnections) {
            console.log('Connection overload dectected')
        }
    }, _SECONDS)
}
module.exports = {
    countConnect,
    checkOverLoad
}