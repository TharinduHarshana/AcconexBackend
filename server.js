require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json()) // for parsing application/json
app.use(cors()) // configure CORS
app.use(bodyParser.json());

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
}) 

// connect to MongoDB
mongoose.connect(MONGO_URI, {});
const connection = mongoose.connection; 

connection.once("open", () => {
    console.log("Database Connection Successful");
})

module.exports = app
