var express = require("express");
var https = require('https');
var cors = require('cors');
var fs = require('fs');
const { check, validationResult } = require('express-validator');

const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

var app = express();

const port = normalizePort(process.env.PORT || '3000');

// enable CORS
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var httpsServer = https.createServer(credentials, app);
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
  const port = parseInt(val, 10);

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
