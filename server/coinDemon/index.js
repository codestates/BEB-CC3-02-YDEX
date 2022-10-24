const express = require('express')
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const morgan = require('morgan')
dotenv.config();
const port = process.env.PORT

const app = express();



app.use(morgan('dev'))
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, ()=>{
    console.log('MongoDB is connected ... ')
})



app.listen(port, ()=>{
    console.log(`Coindemon is running on ${port}...`)
})