'use strict';

const express = require('express');
const controller = require('../controllers/trade');
const router = express.Router();

router.get('/', function (req, res, next) {
	const param = req.query;
	if (!controller.getAll(param.startDate, param.endDate, function (err, rows) {
		res.setHeader('Cache-Control', 'no-cache');
		res.send(rows);
	}))
		res.send('1000');
});
router.get('/charge', function (req, res, next) {
	const param = req.query;
	if (!controller.getCharge(param.ID, function (err, rows) {
		res.setHeader('Cache-Control', 'no-cache');
		res.send(rows);
	}))
		res.send('1000');
});
router.post('/', function (req, res, next) {
	const model = req.body;
	if (!controller.create(model, function (err) {
		if (err !== null) {
			if (!!err.errorCode)
				res.send(err.errorCode);
			else
				res.send('100');
		}
		else {
			res.send({ ID: this.lastID });
			model.ID = this.lastID;
			controller.createTrade1(model, false);
		}
	}))
		res.send('1000');
});
router.put('/:id', function (req, res, next) {
	const model = req.body;
	model.ID = req.params.id;
	if (!controller.update(model, function (err) {
		if (err !== null) {
			if (!!err.errorCode)
				res.send(err.errorCode);
			else
				res.send('100');
		}
		else {
			res.send({});
			controller.createTrade1(model, true);
		}
	}))
		res.send('1000');
});
router.delete('/:id', function (req, res, next) {
	if (!controller.del(req.params.id, function () {
		res.send({});
	}))
		res.send('1000');
});

module.exports = router;