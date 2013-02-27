'use strict';

var Generator = module.exports = function () {
	var cb = this.async();
	var url = 'https://github.com/h5bp/html5-boilerplate/archive/v4.1.0.tar.gz';
	var ignores = [
		'.git',
		'CHANGELOG.md',
		'CONTRIBUTING.md',
		'LICENSE.md',
		'README.md'
	];

	this.prompt([{
		name: 'docs',
		message: 'Would you like docs included?',
		default: 'y/N'
	}], function (err, props) {
		if (err) {
			return this.emit('error', err);
		}

		this.tarball(url, this.sourceRoot(), function () {
			if (!/n/i.test(props.docs)) {
				this.directory('doc');
			}

			this.directory('css');
			this.directory('img');
			this.directory('js');
			this.expandFiles('*', {
				cwd: this.sourceRoot(),
				dot: true
			}).forEach(function (el) {
				if (/n/i.test(props.docs)) {
					if (ignores.indexOf(el) === -1) {
						this.copy(el, el);
					}
				} else {
					if (el !== '.git') {
						this.copy(el, el);
					}
				}
			}, this);

			cb();
		}.bind(this));
	}.bind(this));
};

Generator.name = 'HTML5 Boilerplate';
