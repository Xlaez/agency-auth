const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require('./app/config/db.config')
const authJwt = require("./app/middlewares/authJwt");
const mongoose = require("mongoose");

const db = mongoose

const app = express();

const user = require('./app/routes/user.route')
const auth = require('./app/routes/auth.route')
const resource = require('./app/routes/resource.route')
const category = require('./app/routes/category.route')

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to futurelabs backend consolidator" });
});

app.use('/auth', auth)
app.use('/', [authJwt.verifyToken] , user)
app.use('/resource', resource)
app.use('/category', category)



const connectionString = process.env.MONGO_URL || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

db.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Successfully connected to MongoDB.");
    })
    .catch((err) => {
        console.error("Connection error", err);
        process.exit();
    });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));