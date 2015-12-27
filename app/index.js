'use strict';
var path = require('path');
var yeoman = require('yeoman-generator');
var globby = require('globby');

module.exports = yeoman.Base.extend({
	init: function () {
		var cb = this.async();

		this.sourceRoot(path.join(__dirname, 'templates', 'dist'));

		this.prompt([{
			type: 'confirm',
			name: 'docs',
			message: 'Would you like docs included?',
			default: false
		}], function (props) {
			if (props.docs) {
				this.directory('doc');
			}

			this.directory('css');
			this.directory('img');
			this.directory('js');

			globby.sync('*', {
				cwd: this.sourceRoot(),
				dot: true,
				nodir: true
			}).forEach(function (x) {
				this.copy(x);
			}, this);

			cb();
		}.bind(this));
	}
});
