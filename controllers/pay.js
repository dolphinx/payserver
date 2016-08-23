'use strict';

var db = require('./db');
var model = {
	getAll: function (TID, onSearch) {
		db.open(function (db) {
			db.all("select t.ID ID,b.PID AOID,AID,PAYAMOUNT from PAY t left join ACCOUNT a on t.AID=a.ID left join BASE_ACCOUNT b on a.PID=b.ID where t.TID=?", TID, onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.TID) {
			db.open(function (db) {
				db.run("insert into PAY(TID,AID,PAYAMOUNT)values(?,?,?)", model.TID, model.AID, model.PAYAMOUNT, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.ID) {
			db.open(function (db) {
				db.run("update PAY set OID=?,CID=?,MID=?,PAYAMOUNT=?,DISCOUNT=?,COUPON=?,REMARK=? where ID=?", model.AID, model.PAYAMOUNT, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from PAY where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;