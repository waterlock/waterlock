#!/usr/bin/env node

var package = require('../package.json');
var program = require('commander');

program.version(package.version, '-v, --version');

program.usage('[command]');

var cmd;
cmd = program.command('generate');
cmd.option('-r, --raw', 'generates the raw templates')
cmd.description('generate various components');
cmd.action(require('./waterlock-generate'));

program.parse(process.argv);

if(!program.args.length){
  program.help();
}
