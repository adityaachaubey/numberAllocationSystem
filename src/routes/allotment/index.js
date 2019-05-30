const express = require('express');
const router = new express.Router();
const auth = require('../auth/authHelper');
const allotNumbers = require('./allotNumber');
const allotSpecialNumber = require('./allottSpecialNumber');

router.get('/allotNumber', auth.isAuthenticated(), allotNumbers);
router.post('/requestNumber', auth.isAuthenticated(), allotSpecialNumber);

module.exports = router;
