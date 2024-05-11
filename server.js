require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const useRouter = require("./routes/user.routes");
const customerRouter = require('./routes/cutomer.routes');
const supplierRouter = require("./routes/supplier.routes");
const itemKitRouter = require("./routes/item.kit.routes");
const cookieParser = require("cookie-parser");
const itemrouter = require("./routes/inventory.routes");
const PORT = process.env.PORT || 8000;
const categoryRouter = require('./routes/category.routes')
const MONGO_URI = process.env.MONGO_URI;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
//app.use(cors({origin:"*"})) // configure CORS

// CORS configuration
const corsOptions = {
  // Allow requests from this origin
  origin: "http://localhost:3000",
  // This allows the server to receive and send cookies
  credentials: true,
};

// Enable CORS with options
app.use(cors(corsOptions));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// connect to MongoDB
mongoose.connect(MONGO_URI, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database Connection Successful");
});

//Importing the route


app.use("/user",useRouter);
app.use("/webuser",webuserRouter);
app.use("/customer", customerRouter);
// app.use("/suspend_sale",suspendRouter);
app.use("/supplier",supplierRouter)
app.use("/webitem",webitemRouter);
app.use("/dailysales", salesRouter);
app.use("/itemkit",itemKitRouter)
app.use("/item",itemrouter);
app.use('/category',categoryRouter);


// Export the Express application
module.exports = app;
