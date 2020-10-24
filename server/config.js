const path = require("path");
const rootDir = __dirname;
module.exports = {
    rootDir,
    port: 8000,
    imageFolder: path.join(rootDir, "/public/images"),
    db: {
        host: "localhost",
        user: "root",
        password: "root@root",
        database: "news"
    },
    resources: ["comments", "news_posts"]
};