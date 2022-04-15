import express from "express";
import path from "path";
import App from './routes/route';
import Admin from './routes/admin';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import session from "express-session";

const app = express();
const port = 3003;
const DATABASE_URL = "mongodb://localhost:27017/dummy";

app.use(
    session({
        secret: "imkey",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(bodyParser.json())
// body parts middleware //
app.use(bodyParser.urlencoded({ extended: false }));


// set Template Enging //
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// console.log(__dirname);

app.use('/admin', App)
app.use('/admin', Admin)

// Database connection //
mongoose.connect(`mongodb://localhost:27017/dummy`).then(() => {
    console.log("connected Database");
})
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});