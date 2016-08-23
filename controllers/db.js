'use strict';

var sqlite3 = require('sqlite3').verbose();
var settings = require('../settings');
var path = require('path').join(__dirname, '../' + settings.db.path);
var db = {
	open: function (onOpen) {
		var db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, function (err) {
			if (err !== null) {
				console.log('ERROR: ' + err.message);
				return;
			}
			db.loadExtension('sqlext.dll', (err) => {
				onOpen(db);
				db.close();
			});
		});
	},
	exec: function (sql, onExec) {
		var db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
			if (err !== null) {
				console.log('ERROR: ' + err.message);
				return;
			}
			db.exec(sql, onExec);
			db.close();
		});
	}
};
module.exports = db;