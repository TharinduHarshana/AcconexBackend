require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const useRouter = require("./routes/user.routes");
const supplierRouter = require("./routes/supplier.routes");
const itemKitRouter = require("./routes/item.kit.routes");
const itemrouter = require("./routes/inventory.routes");
const customerRouter = require("./routes/cutomer.routes");
const salesRouter = require("./routes/daily_sales.routes");
const categoryRouter = require('./routes/category.routes');
const webCartRouter = require('./routes/web.Cart.routes');
const webPaymentRouter = require('./routes/web.Payment.rotes');
const SuspendRouter = require('./routes/suspend_sale.routes');
const webitemRouter = require('./routes/web.inventory.routes');
const webuserRouter = require('./routes/web.user.routes');

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());

// CORS configuration
const corsOptions = {
  origin: [
    "https://acconexfrontend-client.vercel.app", // Correct origin
    "https://acconexfrontend.vercel.app",
     // Additional origin that needs to be allowed
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

// Enable CORS with options
app.use(cors(corsOptions));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {});
const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database Connection Successful");
});

// Importing the routes
app.use("/customer", customerRouter);
app.use("/dailysales", salesRouter);
app.use("/suspendsale", SuspendRouter);
app.use("/supplier", supplierRouter);
app.use("/user", useRouter);
app.use("/webuser", webuserRouter);
app.use("/webitem", webitemRouter);
app.use("/itemkit", itemKitRouter);
app.use("/item", itemrouter);
app.use('/category', categoryRouter);
app.use('/cart', webCartRouter);
app.use('/payment', webPaymentRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Express server!");
});

// Export the Express application
module.exports = app;
