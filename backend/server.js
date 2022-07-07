const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT =process.env.PORT || 8000
const {errorHandler} = require('./middleware/errorMidleware')
const connectDB = require('./config/db')
const path = require('path')


// Connect to Database
connectDB()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))



// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/devices', require('./routes/deviceRoutes'))

// Serve Frontend 
if(process.env.NODE_ENV === 'production') {
    // Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frondend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        res.status(201).json({message:'Welcome to the Inventory API'})
    })
}

app.use(errorHandler)


app.listen(PORT, () => console.log(`Server started on port ${PORT}..`))