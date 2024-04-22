const express = require('express');
const authController = require('../controller/auth');
const router = express.Router();

router.post('/create', authController.createUser)
    .post('/login', authController.login)
exports.router = router;