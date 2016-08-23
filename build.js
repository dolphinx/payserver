'use strict';

const fs = require('fs');
const path = require('path');

function trimHtml(result) {
	const lines = result.split(/[\r\n]+/);
	const processed = []
	for (let index = 0; index < lines.length; index++) {
		const line = lines[index].trim(' ', '\t');
		if (line !== '')
			processed.push(line);
	}
	return processed.join('');
};

module.exports = {
	buildTemplate: function (fileName, dir) {
		const tpl = {};
		const files = fs.readdirSync(dir);
		files.forEach(function (fileName) {
			const fullPath = path.join(dir, fileName);
			const content = fs.readFileSync(fullPath).toString();
			tpl[path.basename(fileName, '.htm')] = trimHtml(content);
		});
		fs.writeFile(fileName, 'var $rawTpl=' + JSON.stringify(tpl));
	}
};
