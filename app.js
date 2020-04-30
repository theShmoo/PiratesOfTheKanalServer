var express = require("express");
var cors = require('cors');
var fs = require('fs');
const { check, validationResult } = require('express-validator');

var app = express();

var port = normalizePort(process.env.PORT || '3000');

// enable CORS
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
 console.log("Server running on port " + port);
});

app.post("/subscribe", [
    check('mail').isEmail().normalizeEmail()
  ], (req, res) => {

  // Finds the validation errors in this request
  // and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const mail = req.body.mail;
  fs.appendFile('mails.txt', mail + "\n", (err) => {
    if (err) throw err;
    console.log('The mail ' + mail + ' was appended to file!');
  });
  res.sendStatus(200);
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
