"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./routes/route"));
const admin_1 = __importDefault(require("./routes/admin"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = 3003;
const DATABASE_URL = "mongodb://localhost:27017/dummy";
app.use((0, express_session_1.default)({
    secret: "imkey",
    resave: false,
    saveUninitialized: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
// body parts middleware //
app.use(body_parser_1.default.urlencoded({ extended: false }));
// set Template Enging //
app.use(express_1.default.static("views"));
app.use(express_1.default.static(path_1.default.join(__dirname, "assets")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
// console.log(__dirname);
app.use('/admin', route_1.default);
app.use('/admin', admin_1.default);
// Database connection //
mongoose_1.default.connect(`mongodb://localhost:27017/dummy`).then(() => {
    console.log("connected Database");
});
app.listen(port, () => {
    console.log(`Server is runing... ${port}`);
});
