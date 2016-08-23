'use strict';

var express = require('express');
var router = express.Router();

router.use('/charges', require('./charge'));
router.use('/pays', require('./pay'));
router.use('/trades', require('./trade'));
router.use('/units', require('./unit'));
router.use('/originators', require('./originator'));
router.use('/baseaccounts', require('./baseaccount'));
router.use('/accounts', require('./account'));
router.use('/basecategories', require('./basecategory'));
router.use('/categories', require('./category'));

module.exports = router;
