import express, { Request, Response } from "express";
import path from "path";
import App from './routes/route'
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";

const app = express();
const port = 3003;
const DATABASE_URL = "mongodb://localhost:27017/dummy";

app.use(bodyParser.json())
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

//set Template Enging
app.use(express.static("views"));
app.use(express.static(path.join(__dirname, "assets")));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use('/admin', App)

app.get('/', (req: Request, res: Response) => {
    res.send("Hello world")
})


// Database connection
mongoose.connect(`mongodb://localhost:27017/dummy`).then(() => {
    console.log("connected Database");
})
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);

})