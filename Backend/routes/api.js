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

const reuseAuthToken = (req, res, next) => {
  var admin = require("firebase-admin");

  var serviceAccount = require("../adminsdk-svc-acct.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}
// GET ROUTES
router.get('/', (req, res) =>{
    router.use(cors(corsOptions));
    res.json({message: "a test json response"});
})

// POST ROUTES


module.exports = router;