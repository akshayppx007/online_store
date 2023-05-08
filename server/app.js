const express = require("express");
const bodyParser = require("body-parser");
const errorMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const path = require("path");

const fileUpload = require("express-fileupload");



const app = express();

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());

// serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));


// routes
const product = require("./routes/productRoutes");
const category = require("./routes/categoryRoutes");
const user = require("./routes/userRoutes");
const order = require("./routes/orderRoutes");

app.use("/api", product);
app.use("/api", category);
app.use("/api", user);
app.use("/api", order);

// Catch-all route to serve the React app
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });


app.use(errorMiddleware);


module.exports = app;