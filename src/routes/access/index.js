'use strict'

const express = require('express')
const accessController = require('../../controllers/access.controller')
const { asyncHandler } = require('../../auth/checkauth')
const router = express.Router()

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/signin', asyncHandler(accessController.signIn))

module.exports = router