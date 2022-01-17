const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require('./app/config/db.config')
const { authJwt } = require("../middlewares");
const db = require("./app/models");

const app = express();

const user = require('./app/routes/user.route')
const auth = require('./app/routes/auth.route')

var corsOptions = {
    origin: "*",
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', auth)
app.use('/',[authJwt.verifyToken], user)



const connectionString = process.env.MONGO_URL || `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`

db.mongoose
    .connect(connectionString, {
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


app.get("/", (req, res) => {
    res.json({ message: "Welcome to futurelabs task manager application" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));