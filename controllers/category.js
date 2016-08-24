'use strict';

const db = require('./db');
const model = {
	getAll: function (PID, filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select ID,NAME,REMARK from CATEGORY where PID=? and NAME like ?", PID, '%' + filter + '%', onSearch);
			else
				db.all("select ID,NAME,REMARK from CATEGORY where PID=?", PID, onSearch);
		});
		return true;
	},
	getAllDropDown: function (onSearch) {
		db.open(function (db) {
			db.all("select c.ID ID,b.NAME B,c.NAME C,b.ID PID from BASE_CATEGORY b inner join CATEGORY c on b.ID=c.PID left join (select CID,count(1) C from TRADE) t on c.ID=t.CID order by t.C desc", onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into CATEGORY(NAME,PID,REMARK)values(?,?,?)", model.NAME, model.PID, model.REMARK, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update CATEGORY set NAME=?,PID=?,REMARK=? where ID=?", model.NAME, model.PID, model.REMARK, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from CATEGORY where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;