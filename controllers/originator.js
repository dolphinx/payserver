'use strict';

var db = require('./db');
var model = {
	getAll: function (filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select ID,NAME,GROUPNAME,TYPE from ORIGINATOR where NAME like ?", '%' + filter + '%', onSearch);
			else
				db.all("select ID,NAME,GROUPNAME,TYPE from ORIGINATOR", onSearch);
		});
		return true;
	},
	getAllDropDown: function (onSearch) {
		db.open(function (db) {
			db.all("select ID,NAME from ORIGINATOR where TYPE=0", onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into ORIGINATOR(NAME,GROUPNAME,TYPE)values(?,?,?)", model.NAME, model.GROUPNAME, model.TYPE, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update ORIGINATOR set NAME=?,GROUPNAME=?,TYPE=? where ID=?", model.NAME, model.GROUPNAME, model.TYPE, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from ORIGINATOR where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;