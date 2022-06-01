// FILE IMPORTS
const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const usersControllers = require('../controllers/users_controllers');
const mongoosefile = require('../mongoose');

// GET ROUTES
router.get("/apitest", usersControllers.apitest);

// POST ROUTES
router.post("/signup", usersControllers.signup);
router.post("/mongooseTest", mongoosefile.createUser);

module.exports = router;