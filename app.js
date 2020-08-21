var express = require("express");
var cors = require('cors');
var fs = require('fs');
const { check, validationResult } = require('express-validator');

var app = express();

const port = normalizePort(process.env.PORT || '3000');

// setup mail
const nodemailer = require('nodemailer');
let transport = nodemailer.createTransport({
  host: '',
  port: 465,
  auth: {
    user: '',
    pass: ''
  }
});


// enable CORS
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
    const message = {
      from: 'david@pfahler.at',
      to: 'david@pfahler.at',
      subject: '\"' + mail + '\" registered to Pirates of the Kanal!',
      text: '\"' + mail + '\" registered to Pirates of the Kanal!'
    };
    transport.sendMail(message, function (err, info) {
      if (err) {
        throw err;
      }
    });
  });
  res.sendStatus(200);
});

// start listening on the server
app.listen(port, () => {
  console.log("Server running on port " + port);
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
