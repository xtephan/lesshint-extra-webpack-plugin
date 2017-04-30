const fs = require('fs');
const {Lesshint} = require('lesshint');
const LessHintReporterStylish = require('lesshint-reporter-stylish');
const GlobAll = require('glob-all');

class LessHintPlugin {

	constructor( options = {} ) {

		this.failOnError = !!options.failOnError;
		this.files = options.files || [];
		this.cf = options.configFile;
		this.lessOptions = this._getLessOptions( options.configFile );
		this.reporter = options.reporter || LessHintReporterStylish;

	}

	apply(compiler) {
		compiler.plugin('run', this._onCompilerRun.bind(this));
	}

	_getLessOptions( filePath ) {

		if(!filePath) {
			return {};
		}

		return JSON.parse(
			fs.readFileSync(filePath).toString()
		);
	}

	_onCompilerRun(compiler, callback) {

		const lesshint = new Lesshint();
		lesshint.configure(this.lessOptions);

		Promise.all(
			GlobAll.sync(this.files).map((thisFile) => lesshint.checkFile(thisFile))
		).then((results) => {

			const reportableResults = results.filter( thisResult => thisResult.length );

			if( reportableResults.length ) {
				reportableResults.forEach( thisResult => this.reporter.report(thisResult) );
			}

			callback(
				reportableResults.length && this.failOnError ? "LessHint Failed" : null
			);

		});

	}

}

module.exports = LessHintPlugin;