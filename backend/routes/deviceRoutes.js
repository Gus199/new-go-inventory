const express = require('express')
const router = express.Router({mergeParams:true})
const {getDevices, createDevices, getDevice, deleteDevice, updateDevice}= require('../controllers/deviceController')

const {protect} = require('../middleware/authMiddleware')


// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:deviceId/notes', noteRouter)

router.route('/').get(protect, getDevices).post(protect, createDevices)
router.route('/:id').get(protect, getDevice).delete(protect, deleteDevice).put(protect, updateDevice)


module.exports =router