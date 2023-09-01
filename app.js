const express = require("express");
const http = require("http");
const path = require("path");
const fileupload = require("express-fileupload")
const {routesInit} = require("./routes/configRoutes")
require("./db/mongoConnect");
const cors = require("cors")
console.log(__dirname);

const app = express();
app.use(cors())
app.use(fileupload({
    limits:{fileSize:"5mb"},
    useTempFiles:true
}))

// מאפשר לשלוח באדי דרך הצד לקוח
app.use(express.json({limit:"5mb"}));

// להגדיר תיקייה סטטית שתיהיה התיקייה בשם פאבליק
app.use(express.static(path.join(__dirname,"public")));

routesInit(app);


const server = http.createServer(app);
// בודק אם אנחנו על שרת אמיתי ואם כן דואג שנקבל את הפורט שהענן צריך
// אם לא הברירת מחדל תיהיה 3003
const port = process.env.PORT || 3004;
server.listen(port);