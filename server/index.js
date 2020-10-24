const express = require("express");
const config = require("./config");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const resourcesRouter = require("./routers/resourcesRouter");

const connection = mysql.createConnection(config.db);

connection.connect((error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Connected to mysql database.");

    app.use(cors());
    app.use(express.json());
    app.use("/static", express.static('public'));
    Object.keys(config.resources).forEach(resource => {
        app.use("/", resourcesRouter(connection, resource, config.resources[resource]));
    });

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port.`);
    });
});