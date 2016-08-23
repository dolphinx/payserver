'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect('home.htm');
});
router.use('/api', require('./api'));

module.exports = router;
