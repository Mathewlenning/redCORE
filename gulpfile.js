var gulp = require('gulp');

var extension = require('./package.json');

var requireDir = require('require-dir');
var zip        = require('gulp-zip');

var rename     = require('gulp-rename');
var less       = require('gulp-less');
var minifyCSS  = require('gulp-minify-css');
var uglifyJS   = require('gulp-uglify');

var config    = require('./gulp-config.json');

var jgulp   = requireDir('./node_modules/joomla-gulp', {recurse: true});
var redcore = requireDir('./node_modules/gulp-redcore', {recurse: true});

// CSS compilation task
gulp.task('compile:css', function(cb) {
	gulp.src('./media/redcore/less/component.backbs3.less')
	.pipe(less())
	.pipe(minifyCSS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./media/redcore/css'));

	cb();
});

// JS compilation (minify) task
gulp.task('compile:js', function(cb) {
	gulp.src('./media/redcore/js/component.backbs3.js')
	.pipe(uglifyJS())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./media/redcore/js'));

	cb();
});

// Override of the copy script
gulp.task('copy', [
		'compile:css',
		'compile:js',
		'copy:components',
		'copy:libraries',
		'copy:media',
		'copy:modules',
		'copy:packages',
		'copy:plugins',
		'copy:templates'
	], function() {
		return true;
});

// Override of the less task (watch)
gulp.task('less:media.redcore',
	[
		'less:media.redcore:component.bs3',
		'less:media.redcore:component.backendbs3'
	],
	function() {
});

// LESS: Component Bootstrap3 - Backend
gulp.task('less:media.redcore:component.backendbs3', function () {
	var fs   = require('fs');
	var baseTask  = 'media.redcore';
	var subextensionPath = './redCORE/media/redcore';
	var directPath       = './media/redcore';
	var extPath   = fs.existsSync(subextensionPath) ? subextensionPath : directPath;

	return gulp.src(extPath + '/less/component.backendbs3.less')
		.pipe(less({paths: [extPath + '/less']}))
		.pipe(gulp.dest(extPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/redcore/css'))
		.pipe(minifyCSS())
		.pipe(rename(function (path) {
				path.basename += '.min';
		}))
		.pipe(gulp.dest(extPath + '/css'))
		.pipe(gulp.dest(config.wwwDir + '/media/redcore/css'));
});

// Override of the release script
gulp.task('release', [
		'compile:css',
		'compile:js',
	], function () {
	return gulp.src([
			'./**/*',
			'./**/.gitkeep',
			"!./**/bower.json",
			"!./**/scss/**",
			"!./**/less/**",
			"!./**/build.*",
			"!./**/build/**",
			"!./CONTRIBUTING.md",
			"!./README.md",
			"!./LICENSE",
			"!./**/docs/**",
			"!./**/joomla-gulp/**",
			"!./**/jgulp/**",
			"!./**/gulp**",
			"!./**/gulp**/**",
			"!./**/gulpfile.js",
			"!./**/node_modules",
			"!./**/node_modules/**",
			"!./**/node_modules/**/.*",
			"!./**/package.json",
			"!./**/releases",
			"!./**/releases/**",
			"!./**/releases/**/.*",
			"!./src/**",
			'!./**/sample/**',
			'!./**/sample/.*',
			"!./**/tests/",
			'!./**/tests/**',
			'!./**/tests/.*',
			"!./**/*.sublime-*",
			"!./**/*.sh",
			"!./**/composer.json",
			"!./**/phpunit*.xml",
			"!./**/codeception.yml",
			"!./**/composer.lock",
			"!./**/extension_packager.xml",
			"!./**/redcore_copy_mandatory.xml",
			"!./**/RoboFile.php",
			"!./**/*.gitkeep",
			"!./**/media/redcore/less",
			// Unused folders
			"!./**/modules/admin",
			"!./**/modules/admin/**",
			"!./**/modules/admin/.*",
			// Non-minified css files
			"!./**/component.css",
			"!./**/component.bs3.css",
			"!./**/component.backbs3.css",
			"!./**/chosen.css",
			"!./**/sortablelist.css",
			"!./**/bootstrap/css/bootstrap.css",
			"!./**/bootstrap/css/bootstrap-responsive.css",
			"!./**/bootstrap3/css/bootstrap.css",
			"!./**/bootstrap3/css/bootstrap-theme.css",
			"!./**/bootstrap-checkbox.css",
			"!./**/bootstrap-timepicker.css",
			"!./**/flexslider.css",
			"!./**/font-awesome.css",
			"!./**/font-awesome-ie7.css",
			"!./**/jquery-ui/jquery-ui.custom.css",
			"!./**/select2.css",
			"!./**/select2-bootstrap.css",
			// Non-minified js files
			"!./**/component.js",
			"!./**/component.backbs3.js",
			"!./**/jquery.searchtools.js",
			"!./**/redgrid.js",
			"!./**/jquery.childlist.js",
			"!./**/bootstrap.js",
			"!./**/bootstrap3/bootstrap.js",
			"!./**/bootstrap-checkbox.js",
			"!./**/bootstrap-timepicker.js",
			"!./**/chart/Chart.js",
			"!./**/chosen.jquery.js",
			"!./**/jquery.js",
			"!./**/jquery-migrate.js",
			"!./**/sortablelist.js",
			"!./**/jquery.flexslider.js",
			"!./**/jquery.lazyload.js",
			"!./**/jquery-ui.js",
			"!./**/select2.js",
			"!./**/i18n/jquery-ui-i18n.js"
		])
		.pipe(zip(extension.name + '-v' + extension.version + '.zip'))
		.pipe(gulp.dest('releases'));
});
