/* global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('H5BP generator', function () {
	beforeEach(function (cb) {
		var deps = ['../../app'];

		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				cb(err);
				return;
			}

			this.h5bp = helpers.createGenerator('h5bp:app', deps);
			cb();
		}.bind(this));
	});

	it('generates expected files', function (cb) {
		var expected = ['index.html', 'doc'];

		helpers.mockPrompt(this.h5bp, {docs: true});

		this.h5bp.run({}, function () {
			helpers.assertFile(expected);
			cb();
		});
	});
});
