const express = require('express');
const router = express.Router();

router.get("/api", (req, res, next) => {
    console.log("test success");
    res.json({message: "a test json response"})
});

module.exports = router;