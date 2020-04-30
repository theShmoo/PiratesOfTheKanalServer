var express = require("express");
var app = express();

app.listen(80, () => {
 console.log("Server running on port 80");
});

app.get("/", (req, res, next) => {
 res.json(["Tony","Lisa","Michael","Ginger","Food"]);
});
