const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users_controllers');
const mongoConnection = require('../mongo')

router.get("/apitest", usersControllers.apitest);

router.post("/signup", usersControllers.signup);
router.post("/mongoTest", mongoConnection.createUser);

module.exports = router;