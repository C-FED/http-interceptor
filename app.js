const express = require("express");
const app = express();
const path = require("path");

const PORT = 8965;
const ROOT_PATH = __dirname;

app.use("/static", express.static(path.join(ROOT_PATH, "/content")));

app.get("/", function (req, res) {
    res.sendFile(path.resolve(ROOT_PATH, "./index.html"));
});

app.get("/sso", function (req, res) {
    res.send({
        "Success": false,
        "Code": 401,
        "Message": "您已下线，请重新登录",
    });
});

app.listen(PORT, function () {
    console.log(`http://localhost:${PORT}`);
});