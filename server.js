require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const useRouter = require('./routes/user.routes')
const supplierRouter = require('./routes/supplier.routes')
const itemRouter = require('./routes/web.inventory.routes')
const itemKitRouter = require('./routes/item.kit.routes')
const PORT = process.env.PORT || 8000
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(express.json()) // for parsing application/json
app.use(cors({origin:"*"})) // configure CORS



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
app.use("/supplier",supplierRouter)
app.use("/user",useRouter);
app.use("/item",itemRouter);
app.use("/itemkit",itemKitRouter);

module.exports = app;