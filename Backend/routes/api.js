// THE API
// FILE IMPORTS
const express = require('express');
const router = express.Router();
const cors = require('cors');

const whitelist = ['127.0.0.1:3000', '127.0.0.1:5000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
}

const verifyAuthToken = (req, res, next) => {
  var admin = require("firebase-admin");

  var serviceAccount = require("../adminsdk-svc-acct.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  const tokenString = req.headers['authorization'] ? req.headers[authorization].split(" ") : null;
  if(!tokenString){
    console.log("no header")
  }
  else{
    console.log(tokenString);
  }
}

// GET ROUTES
router.get('/', verifyAuthToken, (req, res) =>{
    router.use(cors(corsOptions));
    res.json({message: "a test json response"});
})

// POST ROUTES


module.exports = router;