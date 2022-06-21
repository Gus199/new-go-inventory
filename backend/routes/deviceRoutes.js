const express = require('express')
const router = express.Router()
const {getDevices, createDevices, getDevice, deleteDevice, updateDevice}= require('../controllers/deviceController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getDevices).post(protect, createDevices)
router.route('/:id').get(protect, getDevice).delete(protect, deleteDevice).put(protect, updateDevice)


module.exports =router