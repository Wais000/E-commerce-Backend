const bodyParser = require("body-parser");
const express = require("express");
const dbConnected = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const cookieParser = require("cookie-parser");

dbConnected();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`server listening on port, ${PORT}`);
});
