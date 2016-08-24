'use strict';

const settings = {
	"server": {
		//"portForProxy": 80,
		"port": 8080
	},
	"db": {
		"path": "..\\db\\pay.sqlite"
	},
};
if (!!settings.server.portForProxy)
	settings.server.ssl = null;
module.exports = settings;