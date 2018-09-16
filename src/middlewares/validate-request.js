// THIS IS JUST A CUSTOM VALIDATION EXAMPLE YOU CAN ALSO USE PASSPORT.JS FOR THIS
// WHILE SAVING PASSWORDS TO DATABASE ENCRYPT IT USING BCRYPT.JS BEFORE SAVING
// THIS WAY EVEN IF SOMEONE GETS ACCESS TO YOUR DATABASE, ALL USERS PASSWORDS WILL BE SAFE.

var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;

module.exports = function(req, res, next) {

  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe.
  // This is sent by the browser the client is on. 
  // This can be seen in networks tab.

  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();



  // TOKENS HAVE ENTIRE USER OBJECT AND EACH SESSION HAS ITS OWN TOKEN.

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/database.js').secret);

      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      // Authorize the user 

      var dbUser = validateUser(key); // The key would be the logged in user's username
      if (dbUser) {


        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/') >= 0)) {
          next(); // To move to next middleware IN SERVER.JS
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized"
          });
          return;
        }
      } else {
        // No user with this name exists, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User"
        });
        return;
      }

    } catch (err) {
        // REMEMBER 500 IS SERVER'S FAULT , FRONTEND WILL SHOW MESSAGE ACCORDINGLY.
      res.status(500);
      res.json({
        "status": 500,
        "message": "Oops something went wrong",
        "error": err
      });
    }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
};