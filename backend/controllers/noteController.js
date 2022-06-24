const asyncHandler = require('express-async-handler')

const User = require('../models/userModels')
const Note = require('../models/noteModel')
const Device = require('../models/DeviceModel')
// const { default: Device } = require('../../frontend/src/pages/Device')

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found')
  }

  const device = await Device.findById(req.params.deviceId)

  if (device.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ device: req.params.deviceId })

  res.status(200).json(notes)
})

// @desc   Create Device Note
// @route   POST /api/devices/:deviceId/notes
// @access  Private
const addNotes = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const device = await Device.findById(req.params.deviceId)
  
    if (device.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error('User not authorized')
    }
  
    const note = await Note.create({ 
        text: req.body.text,
        isStaff: false,
        device: req.params.deviceId,
        user: req.user.id,
     })
  
    res.status(200).json(note)
  })
  

module.exports = {
    getNotes,
    addNotes,
   
  }
  