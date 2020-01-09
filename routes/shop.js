const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../helper');

router.get("/", (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, "welcome.html"));
})


module.exports = router;