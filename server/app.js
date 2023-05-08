const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");

const fileUpload = require("express-fileupload");



const app = express();




app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());




// routes
const product = require("./routes/productRoutes");
const category = require("./routes/categoryRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

app.use("/api", product);
app.use("/api", category);
app.use("/api", user);
app.use("/api", order);





app.use(errorMiddleware);


module.exports = app;