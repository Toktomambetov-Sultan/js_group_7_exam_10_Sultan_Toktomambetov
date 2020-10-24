const express = require("express");
const config = require("./config");
const mysql = require("mysql");
const app = express();
const resourcesRouter = require("./routers/resourcesRouter");

const connection = mysql.createConnection(config.db);

connection.connect((error) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log("Connected to mysql database.");

    app.use(express.json());

    Object.keys(config.resources).forEach(resource => {
        app.use("/", resourcesRouter(connection, resource, config.resources[resource]));
    });

    app.listen(config.port, () => {
        console.log(`Server started on ${config.port} port.`);
    });
});