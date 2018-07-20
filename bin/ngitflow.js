#!/usr/bin/env node
'use strict';

const program = require('commander');
const packageJson = require('../package.json');

const Logger = require('../lib/logger');
const Package = require('../lib/package');

program
    .version(packageJson.version, '-v, --version');

program
    .command('version')
    .option('-a, --all', 'All versions')
    .action(function (cmd) {
        Package.getCurrentVersion().then((version) => Logger.info(version));
        if (cmd.all) {
            Package.getNextPatchVersion().then((version) => Logger.info(`Next patch version: ${version}`));
            Package.getNextMinorVersion().then((version) => Logger.info(`Next minor version: ${version}`));
            Package.getNextMajorVersion().then((version) => Logger.info(`Next major version: ${version}`));
            Package.getNextSnapshotVersion().then((version) => Logger.info(`Next snapshot version: ${version}`));
        }
    });

program
    .command('release', 'Release')
    .alias('r');

program.parse(process.argv);