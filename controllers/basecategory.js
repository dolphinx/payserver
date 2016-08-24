'use strict';

const db = require('./db');
const model = {
	getAll: function (filter, onSearch) {
		db.open(function (db) {
			if (!!filter)
				db.all("select ID,NAME,REMARK from BASE_CATEGORY where NAME like ?", '%' + filter + '%', onSearch);
			else
				db.all("select ID,NAME,REMARK from BASE_CATEGORY", onSearch);
		});
		return true;
	},
	create: function (model, onCreate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("insert into BASE_CATEGORY(NAME,REMARK)values(?,?)", model.NAME, model.REMARK, onCreate);
			});
			return true;
		}
	},
	update: function (model, onUpdate) {
		if (!!model.NAME) {
			db.open(function (db) {
				db.run("update BASE_CATEGORY set NAME=?,REMARK=? where ID=?", model.NAME, model.REMARK, model.ID, onUpdate);
			});
			return true;
		}
	},
	del: function (ID, onDelete) {
		if (!!ID) {
			db.open(function (db) {
				db.run("delete from BASE_CATEGORY where ID=?", ID, onDelete);
			});
			return true;
		}
	}
};
module.exports = model;