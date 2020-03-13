const core = require('@actions/core');
const wait = require('./wait');
const exec = require('@actions/exec');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
	try {
		const ms = core.getInput('milliseconds');
		const context = github.context;
		await exec.exec(`echo ${JSON.stringify(context)}`);

		core.debug(new Date().toTimeString());
		await wait(parseInt(ms));
		core.debug(new Date().toTimeString());

		core.setOutput('time', new Date().toTimeString());
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
