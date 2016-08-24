'use strict';

const db = require('./db');
const model = {
	getAll: function (startDate, endDate, onSearch) {
		db.open(function (db) {
			const wheres = [];
			const params = [];
			if (!!startDate) {
				wheres.push('TIME>=?');
				params.push(startDate);
			}
			if (!!endDate) {
				wheres.push('TIME<?');
				params.push(endDate);
			}
			let source;
			if (wheres.length > 0)
				source = '(select * from TRADE0 where ' + wheres.join(' and ') + ')';
			else
				source = 'TRADE0';
			db.all("select t.ID ID,TIME,LOCATION,SPLIT,ba.PID AOID,AID,a.NAME ACCOUNT,PAYAMOUNT,o.NAME ORIGINATOR,OID,c.PID BCID,CID,c.NAME CATEGORY,ma.PID MOID,MID,m.NAME ACCOUNT2,AMOUNT,DISCOUNT,COUPON,t.REMARK REMARK from " + source + " t left join ACCOUNT a on t.AID=a.ID left join BASE_ACCOUNT ba on a.PID=ba.ID left join CATEGORY c on t.CID=c.ID left join ORIGINATOR o on t.OID=o.ID left join ACCOUNT m on t.MID=m.ID left join BASE_ACCOUNT ma on m.PID=ma.ID", params, onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.TIME) {
			if (!model.PAYAMOUNT)
				model.PAYAMOUNT = 0;
			if (!model.AMOUNT)
				model.AMOUNT = 0;
			if (!model.COUPON)
				model.COUPON = 0;
			if (!model.DISCOUNT)
				model.DISCOUNT = 0;
			db.open(function (db) {
				db.run("insert into TRADE0(TIME,LOCATION,SPLIT,AID,PAYAMOUNT,OID,CID,MID,AMOUNT,DISCOUNT,COUPON,REMARK)values(?,?,?,?,?,?,?,?,?,?,?,?)", model.TIME, model.LOCATION, model.SPLIT, model.AID, model.PAYAMOUNT, model.OID, model.CID, model.MID, model.AMOUNT, model.DISCOUNT, model.COUPON, model.REMARK, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.ID) {
			if (!model.PAYAMOUNT)
				model.PAYAMOUNT = 0;
			if (!model.AMOUNT)
				model.AMOUNT = 0;
			if (!model.COUPON)
				model.COUPON = 0;
			if (!model.DISCOUNT)
				model.DISCOUNT = 0;
			db.open(function (db) {
				db.run("update TRADE0 set TIME=?,LOCATION=?,SPLIT=?,AID=?,PAYAMOUNT=?,OID=?,CID=?,MID=?,AMOUNT=?,DISCOUNT=?,COUPON=?,REMARK=? where ID=?", model.TIME, model.LOCATION, model.SPLIT, model.AID, model.PAYAMOUNT, model.OID, model.CID, model.MID, model.AMOUNT, model.DISCOUNT, model.COUPON, model.REMARK, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from PAY where TID=?", ID);
				db.run("delete from CHARGE where TID=?", ID);
				db.run("delete from TRADE1 where TID=?", ID);
				db.run("delete from TRADE0 where ID=?", ID, onDelete);
			});
			return true;
		}
	},
	createTrade1: function (model, isUpdate) {
		if (!isUpdate && model.SPLIT === 0)
			return;
		db.open(function (db) {
			if (isUpdate)
				db.run("delete from TRADE1 where TID=?", model.ID);
			if (model.SPLIT === 0)
				return;
			if (model.SPLIT === 1)
				model.charges = [model];
			else if (model.SPLIT === 2)
				model.pays = [model];
			model.pays.forEach(function (p) {
				if (!p.PAYAMOUNT)
					p.PAYAMOUNT = 0;
			});
			model.charges.forEach(function (c) {
				if (!c.AMOUNT)
					c.AMOUNT = 0;
				if (!c.COUPON)
					c.COUPON = 0;
				if (!c.DISCOUNT)
					c.DISCOUNT = 0;
			});
			model.pays.forEach(function (p) {
				model.charges.forEach(function (c) {
					const chargeRatio = !!model.AMOUNT ? c.AMOUNT / model.AMOUNT : 1;
					const payRatio = !!model.PAYAMOUNT ? p.PAYAMOUNT / model.PAYAMOUNT : 1;
					db.run("insert into TRADE1(TID,TIME,LOCATION,AID,PAYAMOUNT,OID,CID,MID,AMOUNT,DISCOUNT,COUPON)values(?,?,?,?,?,?,?,?,?,?,?)", model.ID, model.TIME, model.LOCATION, p.AID, chargeRatio * p.PAYAMOUNT, c.OID, c.CID, c.MID, payRatio * c.AMOUNT, payRatio * c.DISCOUNT, payRatio * c.COUPON);
				});
			});
		});
	}
};
module.exports = model;