const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users_controllers');
const mongoosefile = require('../mongoose');

router.get("/apitest", usersControllers.apitest);

router.post("/signup", usersControllers.signup);
router.post("/mongooseTest", mongoosefile.createUser);

module.exports = router;