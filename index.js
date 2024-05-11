const bodyParser = require("body-parser");
const express = require("express");
const dbConnected = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const productCategoryRouter= require("./routes/productCategoryRoute");
const blogCategoryRouter= require("./routes/blogCatRoute");
const brandRouter = require("./routes/brandRoute");
const colorRouter = require("./routes/colorRoute");
const enqRouter = require("./routes/enqRoute");
const couponRouter = require("./routes/couponRoute");
const uploadRouter = require("./routes/uploadRoute");
const blogRouter = require("./routes/blogRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");

dbConnected();

app.use(morgan("dev")),
app.use (cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter);
app.use("/api/category",productCategoryRouter);
app.use("/api/blogCategory",blogCategoryRouter);
app.use("/api/brand",brandRouter);
app.use("/api/coupon", couponRouter);
app.use("/api/color", colorRouter);
app.use("/api/enquiry", enqRouter);
app.use("/api/upload", uploadRouter);
// app.use("/api/BrandCategory",blogCategoryRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on port, ${PORT}`);
});
