const core = require('@actions/core');
const wait = require('./wait');
const exec = require('@actions/exec');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
	const context = github.context;
	await exec.exec(`echo ${JSON.stringify(context.repo.repo)}`);
	await exec.exec(`npm i -g sbxcloud-cli`);
	await runDeploy(0 )
}

async function runDeploy( attempts) {
	try {
		await exec.exec(
			`sbxcloud-cli deploy ${core.getInput('path')} ${core.getInput('folder')} ${core.getInput(
				'domain'
			)} --username=${core.getInput('username')} --password=${core.getInput(
				'password'
			)} --confirmation`
		);
		process.exit(0);
	}catch (error){
		if (core.getInput('attempts') &&  core.getInput('attempts') !== '' &&  parseInt(core.getInput('attempts')) > attempts){
			await runDeploy(attempts+1)
		}else{
			core.setFailed(error.message);
		}

	}

}

run();
