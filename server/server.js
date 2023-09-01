const express = require('express')
const {readdirSync}=require('fs')
const morgan = require('morgan')
const cors = require('cors')
const bodyParse = require('body-parser')
const connectDB = require('../server/Config/db')
const app = express();

connectDB()
app.use(morgan('dev'))
app.use(cors())
app.use(bodyParse.json({limit:'10mb'}))

readdirSync('./Routes').map((r)=>app.use('/api',require('./Routes/'+r)))

// Run server
const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
