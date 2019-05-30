const express = require('express');
const router = new express.Router();
const register = require('./register');
const login = require('./login');

router.post('/register', register);
router.post('/login', login);
module.exports = router;
