'use strict'

const express = require('express')
const { apiKey, permission } = require('../auth/checkauth')
const router = express.Router()
//check apiKey
router.use(apiKey)
// check permissions
router.use(permission('0000'))
//redirect
router.use('/v1/api', require('./access'))

module.exports = router