const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const helper = require("./helper");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json"); 
// routes
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");


const app = express();
dotenv.config();

// console.log('process:', process.env);
console.log('Connection url => ', process.env.MONGO_URL);

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(console.log("Connected to MongoDB"))
.catch((err) => console.log(err));

// The disk storage engine gives you full control on storing
// files to disk.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
});

// apply cors
app.use(cors());
// built-in middleware: only parses JSON and only looks
// at requests where the Content)type header matches the
// type option.
app.use(express.json());
// allow express to access static files such as: png, jpg...
app.use("/images", express.static(path.join(__dirname, "/images")))
// routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
// swagger ui
app.get("/", (_req, res) => res.redirect('/docs'));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(helper.portNumber, () => {
    console.log(`Backend is now listening on port ${helper.portNumber}`);
    console.log(`For API docs, navigate to http://localhost:${helper.portNumber}`);
});