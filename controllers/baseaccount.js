'use strict';

const db = require('./db');
const model = {
	getAll: function (PID, filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select ID,NAME,PID,TYPE from BASE_ACCOUNT where PID=? and NAME like ?", PID, '%' + filter + '%', onSearch);
			else
				db.all("select ID,NAME,PID,TYPE from BASE_ACCOUNT where PID=?", PID, onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into BASE_ACCOUNT(NAME,PID,TYPE)values(?,?,?)", model.NAME, model.PID, model.TYPE, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update BASE_ACCOUNT set NAME=?,PID=?,TYPE=? where ID=?", model.NAME, model.PID, model.TYPE, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from BASE_ACCOUNT where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;