"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./routes/route"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3003;
const DATABASE_URL = "mongodb://localhost:27017/dummy";
app.use(body_parser_1.default.json());
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//set Template Enging
app.use(express_1.default.static("views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "assets")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use('/admin', route_1.default);
app.get('/', (req, res) => {
    res.send("Hello world");
});
// Database connection
mongoose_1.default.connect(`mongodb://localhost:27017/dummy`).then(() => {
    console.log("connected Database");
});
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});
