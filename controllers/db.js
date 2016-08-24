'use strict';

const sqlite3 = require('sqlite3').verbose();
const settings = require('../settings');
const path = require('path').join(__dirname, '../' + settings.db.path);
const db = {
	open: function (onOpen) {
		const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, function (err) {
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
		const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, function (err) {
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