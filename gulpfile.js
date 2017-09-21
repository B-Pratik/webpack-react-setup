const gulp = require('gulp');
const argv = require('yargs').argv;
const opener = require('opener');
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack');

const URL = { host: argv.host || 'localhost', port: argv.port || process.env.PORT || 4000 };

gulp.task('build', function (cb) {
	const compiler = webpack(require('./compiler/webpack.config'));
	compiler.run(function (err) {
		if (err) {
			console.error(err.message);
		}
		cb();
	});
});

gulp.task('clean', function () {
	return del.sync(['./bin/**', '!./bin']);
});

gulp.task('complete', function (cb) {
	return runSequence(
		'clean',
		'build',
		cb
	);
});

gulp.task('default', ['complete'], function () {
	const app = require('./dev-server/server');
	app.listen(URL.port, function () {
		opener('http://' + URL.host + ':' + URL.port);
	});
});
