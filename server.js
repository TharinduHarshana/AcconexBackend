require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

//import routes
const useRouter = require('./routes/user.routes');
const customerRouter = require('./routes/cutomer.routes');
const salesRouter = require('./routes/daily_sales.routes');


//const useRouter = require('./routes/user.routes')
const supplierRouter = require('./routes/supplier.routes')
const webitemRouter = require('./routes/web.inventory.routes')
const itemrouter = require('./routes/inventory.routes')
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

 app.use("/user",useRouter);
 app.use("/customer", customerRouter);
 app.use("/dailysales", salesRouter);
 

app.use("/supplier",supplierRouter)
app.use("/user",useRouter);
app.use("/webitem",webitemRouter);
app.use("/item",itemrouter);


module.exports = app;