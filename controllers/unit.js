'use strict';

var db = require('./db');
var model = {
	getAll: function (filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select ID,NAME,RATE from UNIT where NAME like ?", '%' + filter + '%', onSearch);
			else
				db.all("select ID,NAME,RATE from UNIT", onSearch);
		});
		return true;
	},
	getAllDropDown: function (onSearch) {
		db.open(function (db) {
			db.all("select ID,NAME from UNIT", onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into UNIT(NAME,RATE)values(?,?)", model.NAME, model.RATE, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update UNIT set NAME=?,RATE=? where ID=?", model.NAME, model.RATE, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from UNIT where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;