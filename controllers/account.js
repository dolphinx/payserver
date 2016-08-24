'use strict';

const db = require('./db');
const model = {
	getAll: function (PID, filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select a.ID ID,a.NAME NAME,PID,WTL,IL,UID,u.NAME UNIT from ACCOUNT a left join UNIT u on a.UID=u.ID where PID=? and a.NAME like ?", PID, '%' + filter + '%', onSearch);
			else
				db.all("select a.ID ID,a.NAME NAME,PID,WTL,IL,UID,u.NAME UNIT from ACCOUNT a left join UNIT u on a.UID=u.ID where PID=?", PID, onSearch);
		});
		return true;
	},
	getAIDDropDown: function (onSearch) {
		db.open(function (db) {
			db.all("select a.ID ID,o.NAME O,b.NAME B,a.NAME A,o.ID PID from ORIGINATOR o inner join BASE_ACCOUNT b on o.ID=b.PID inner join ACCOUNT a on b.ID=a.PID left join (select AID,count(1) C from TRADE) t on a.ID=t.AID order by t.C desc", onSearch);
		});
		return true;
	},
	getMIDDropDown: function (onSearch) {
		db.open(function (db) {
			db.all("select a.ID ID,o.NAME O,b.NAME B,a.NAME A,o.ID PID from ORIGINATOR o inner join BASE_ACCOUNT b on o.ID=b.PID inner join ACCOUNT a on b.ID=a.PID left join (select MID,count(1) C from TRADE) t on a.ID=t.MID order by t.C desc", onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into ACCOUNT(NAME,PID,WTL,IL,UID)values(?,?,?,?,?)", model.NAME, model.PID, model.WTL, model.IL, model.UID, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update ACCOUNT set NAME=?,PID=?,WTL=?,IL=?,UID=? where ID=?", model.NAME, model.PID, model.WTL, model.IL, model.UID, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from ACCOUNT where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;