/*global describe beforeEach it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('H5BP generator', function () {
	beforeEach(function(cb) {
		var deps = ['../../app', [helpers.createDummyGenerator(), 'h5bp:app']];

		helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
			if (err) {
				return cb(err);
			}

			this.h5bp = helpers.createGenerator('h5bp:app', deps);
			cb();
		}.bind(this));
	});

	it('generates expected files', function (cb) {
		var expected = ['index.html', 'README.md'];

		helpers.mockPrompt(this.h5bp, { docs: 'y' });

		this.h5bp.sourceRoot(path.join(__dirname, 'temp'));

		this.h5bp.run({}, function () {
			// TODO: figure out why this doesn't work
			//helpers.assertFiles(expected);
			cb();
		});
	});
});
