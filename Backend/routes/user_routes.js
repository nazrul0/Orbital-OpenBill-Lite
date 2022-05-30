const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/users_controllers');

router.get("/apitest", usersControllers.apitest);

router.post("/signup", usersControllers.signup);

module.exports = router;