// Import Express
const express = require('express')

// Modules used in the app
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Import routes
const routes = require('./api/routes/routes')

const app = express()

// Server port
const PORT = process.env.PORT || 5001;

// Database address, you can change change this depending on your database name
const dbAddress = 'mongodb://localhost:27017/servicemanual'

// Make app use body parser and routes
app.use(bodyParser.json())
app.use('/api', routes)

// Connect to database
mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('Connected to database'))

// Start the server
app.listen(PORT, () => {
    console.log(`server running from port ${PORT}`)
})