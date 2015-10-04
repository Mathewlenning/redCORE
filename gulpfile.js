var gulp = require('gulp');

var extension = require('./package.json');

var requireDir = require('require-dir');
var zip        = require('gulp-zip');

var config    = require('./gulp-config.json');

var jgulp   = requireDir('./node_modules/joomla-gulp', {recurse: true});
var redcore = requireDir('./node_modules/gulp-redcore', {recurse: true});

// Override of the release script
gulp.task('release', function () {
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
