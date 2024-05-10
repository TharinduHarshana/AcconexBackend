require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI;


const useRouter = require('./routes/user.routes');
const webitemRouter = require('./routes/web.inventory.routes');
const webuserRouter = require('./routes/web.user.routes');
const customerRouter = require('./routes/cutomer.routes');
const supplierRouter = require('./routes/supplier.routes');
const itemRouter = require('./routes/inventory.routes');


app.use(bodyParser.json());
app.use(express.json()) // for parsing application/json
// configure CORS
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
})) 
app.use(cookieParser());

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
app.use("/webuser",webuserRouter);
app.use("/customer", customerRouter);
// app.use("/suspend_sale",suspendRouter);
app.use("/supplier",supplierRouter)
app.use("/webitem",webitemRouter);
app.use("/item",itemRouter);


module.exports = app;