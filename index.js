const core = require('@actions/core');
const wait = require('./wait');
const exec = require('@actions/exec');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
	try {
		const context = github.context;
		await exec.exec(`echo ${JSON.stringify(context.repo.repo)}`);
		await exec.exec(`npm i -g sbxcloud-cli`);
		await exec.exec(
			`sbxcloud-cli deploy ${core.getInput('path')} ${core.getInput('folder')} ${core.getInput(
				'domain'
			)} --username=${core.getInput('username')} --password=${core.getInput(
				'password'
			)} --confirmation`
		);
		process.exit(0);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
