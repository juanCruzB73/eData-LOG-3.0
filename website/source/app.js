const express = require("express");
const app = express();
const {port, start} = require("./modules/server")
app.listen(port, start());
const methodOverride = require("method-override")
const session = require("express-session")
const cookie = require("cookie-parser")
const {join,} = require("path");
const cors = require('cors') 

app.set("views", join(__dirname, "/views"))

app.set("view engine", "ejs");

const static = require("./modules/static");
app.use(static(join(__dirname, "../public")));

app.use(express.urlencoded({extended:true}))

app.use(methodOverride("m"))
app.use (require ("./middlewares/style"))
app.use(session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true
}))
app.use(cookie()) 
app.use(require("./middlewares/users"))
app.use(cors())
app.use(require("./routes/routes.js"));
app.use('/users', require('./routes/users.routes'))
app.use("/api", require("./routes/api/users"))
app.use("/api", require("./routes/api/products"))
