var express = require("express");
var app = express();
var port = normalizePort(process.env.PORT || '3000');

app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
 console.log("Server running on port " + port);
});

app.get("/subscribe", (req, res, next) => {
 var mail = req.body["my-email"];
 res.json({"mail": mail});
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
