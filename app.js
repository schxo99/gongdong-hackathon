const express = require("express");
var path = require("path");
const methodOverride = require('method-override');

const app = express();


const indexRouter = require("./src/routes/index");
const userRouter = require("./src/routes/user");
const roomRouter = require("./src/routes/room");
const promiseRouter = require("./src/routes/promise");
const donationRouter = require("./src/routes/donation")

app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "style")));

app.use(express.json());

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/room", roomRouter);
app.use("/promise", promiseRouter);
app.use("/donation", donationRouter);

app.get("/", function (req, res) {
    res.send("hello NodeJs");
});

app.listen(3000, () => console.log(""));
