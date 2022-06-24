const asyncHandler = require("express-async-handler");

const User = require('../models/userModels')
const Device = require('../models/DeviceModel')

// Get user Products
// @desc Gst current User new USer
//@route/api/devices
// @access Public
const getDevices = asyncHandler(async (req, res) => {
   //Get user using the id in the JWT
   const user = await User.findById(req.user.id)
   if(!user) {
       res.status(401)
       throw new Error('User not found')
   }
  const devices = await Device.find({user: req.user.id})

 res.status(200).json(devices)
})

// Get user Products
// @desc Gst current User new USer
//@route/api/devices/:id
// @access Public
const getDevice = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
   const device = await Device.findById(req.params.id)

   if(!device) {
       res.status(404)
       throw new Error('Device not found')
   }
   if(device.user.toString() !== req.user.id) {
       res.status(401)
       throw new Error('Not Authorized')
   }
 
  res.status(200).json(device)
 })


// Delete device
// @desc Gst current User new USer
//@route DELETE /api/devices/:id
// @access Public
const deleteDevice = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
   const device = await Device.findById(req.params.id)

   if(!device) {
       res.status(404)
       throw new Error('Device not found')
   }
   if(device.user.toString() !== req.user.id) {
       res.status(401)
       throw new Error('Not Authorized')
   }
   await device.remove()
 
  res.status(200).json({success: true})
 })


// Update device
// @desc Update current User new USer
//@route PUT /api/devices/:id
// @access Public
const updateDevice = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401)
        throw new Error('User not found')
    }
   const device = await Device.findById(req.params.id)

   if(!device) {
       res.status(404)
       throw new Error('Device not found')
   }
   if(device.user.toString() !== req.user.id) {
       res.status(401)
       throw new Error('Not Authorized')
   }
   const updateDevice =await Device.findByIdAndUpdate(req.params.id, req.body, {new: true})
 
  res.status(200).json(updateDevice)
 })
// Creat new  Products
// @desc Gst current User new USer
//@route/api/products
// @access Public
const createDevices = asyncHandler(async (req, res) => {
   const {product,description} = req.body
   if(!product || !description) {
       res.status(400)
       throw new Error('Please add a product and description')
   } 

   const user = await User.findById(req.user.id)
   if(!user) {
       res.status(401)
       throw new Error('User not found')
   }

   const device = await Device.create({
       product,
       description,
       user: req.user.id,
       status: 'new',
    //    rating,
   })
    res.status(201).json(device)
   })


module.exports = { getDevices, createDevices, getDevice, deleteDevice, updateDevice}
