require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const useRouter = require('./routes/user.routes')
const itemRouter = require('./routes/inventory.routes')
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json()) // for parsing application/json
app.use(cors({origin:"*"})) // configure CORS
app.use(bodyParser.json());
app.use("inventory",useRouter);

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

//Importing the route
 app.use("/user",useRouter);
 app.use("/items",itemRouter);


module.exports = app
