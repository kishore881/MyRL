var PORT = process.env.PORT || 3000;
const express = require("express");
const connectDB = require("./config/connect");

const app = express();

connectDB();

app.use(express.static("./views"));
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/index"));
app.use("/api/myrl", require("./routes/myrl"));

app.listen(PORT);
