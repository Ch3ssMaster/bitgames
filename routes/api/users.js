const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/users');

// @route GET api/users
// @desc GET All users
// @access Public
router.get('/');


module.exports = router;