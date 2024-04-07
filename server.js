require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

//import routes
const useRouter = require('./routes/user.routes');
const customerRouter = require('./routes/cutomer.routes');
//const suspendRouter= require('./routes/suspend_sale.routes');


const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json()) // for parsing application/json
app.use(cors({origin:"*"})) // configure CORS
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

//Importing the route
 app.use("/user",useRouter);
 app.use("/customer", customerRouter);
// app.use("/suspend_sale",suspendRouter);
 

module.exports = app;