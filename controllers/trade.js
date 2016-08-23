'use strict';

var db = require('./db');
var model = {
	getAll: function (startDate, endDate, onSearch) {
		db.open(function (db) {
			var wheres = [];
			var params = [];
			if (!!startDate) {
				wheres.push('TIME>=?');
				params.push(startDate);
			}
			if (!!endDate) {
				wheres.push('TIME<?');
				params.push(endDate);
			}
			var source;
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
			db.open(function (db) {
				db.run("insert into TRADE0(TIME,LOCATION,SPLIT,AID,PAYAMOUNT,OID,CID,MID,AMOUNT,DISCOUNT,COUPON,REMARK)values(?,?,?,?,?,?,?,?,?,?,?,?)", model.TIME, model.LOCATION, model.SPLIT, model.AID, model.PAYAMOUNT, model.OID, model.CID, model.MID, model.AMOUNT, model.DISCOUNT, model.COUPON, model.REMARK, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.ID) {
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
	mostAccount: function () {
		//select AID,count(1) C from TRADE0 order by C desc
	},
	mostOriginator: function () {
		//select b.PID ID,count(1) C from TRADE0 t inner join ACCOUNT a on t.AID=a.ID inner join BASE_ACCOUNT b on a.PID=b.ID order by C desc
	}
};
module.exports = model;