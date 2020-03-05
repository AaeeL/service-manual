const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = require('./api/routes/routes')

const app = express()

const PORT = process.env.PORT || 5001;

mongoose.connect('mongodb://localhost:27017/servicemanual', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => console.log('Connected to database'))


app.use(bodyParser.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`server running from port ${PORT}`)
})