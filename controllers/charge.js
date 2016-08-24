'use strict';

const db = require('./db');
const model = {
	getAll: function (TID, onSearch) {
		db.open(function (db) {
			db.all("select t.ID ID,OID,o.NAME ORIGINATOR,c.PID BCID,CID,c.NAME CATEGORY,b.PID MOID,MID,AMOUNT,DISCOUNT,COUPON,t.REMARK REMARK from CHARGE t left join CATEGORY c on t.CID=c.ID left join ORIGINATOR o on t.OID=o.ID left join ACCOUNT m on t.MID=m.ID left join BASE_ACCOUNT b on m.PID=b.ID where t.TID=?", TID, onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.TID) {
			if (!model.AMOUNT)
				model.AMOUNT = 0;
			if (!model.COUPON)
				model.COUPON = 0;
			if (!model.DISCOUNT)
				model.DISCOUNT = 0;
			db.open(function (db) {
				db.run("insert into CHARGE(TID,OID,CID,MID,AMOUNT,DISCOUNT,COUPON,REMARK)values(?,?,?,?,?,?,?,?)", model.TID, model.OID, model.CID, model.MID, model.AMOUNT, model.DISCOUNT, model.COUPON, model.REMARK, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.ID) {
			if (!model.AMOUNT)
				model.AMOUNT = 0;
			if (!model.COUPON)
				model.COUPON = 0;
			if (!model.DISCOUNT)
				model.DISCOUNT = 0;
			db.open(function (db) {
				db.run("update CHARGE set OID=?,CID=?,MID=?,AMOUNT=?,DISCOUNT=?,COUPON=?,REMARK=? where ID=?", model.OID, model.CID, model.MID, model.AMOUNT, model.DISCOUNT, model.COUPON, model.REMARK, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from CHARGE where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;