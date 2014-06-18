#!/usr/bin/env node
var fs = require('fs');
var path = require('path');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var package = require('../package.json');
var program = require('commander');
var _ = require('lodash');

program.version(package.version, '-v, --version');

program.usage('[command]');

var cmd;
cmd = program.command('generate');
cmd.option('-r, --raw', 'generates the raw templates')
cmd.description('generate various components');
cmd.action(require('./waterlock-install'));

program.parse(process.argv);

if(!program.args.length){
  program.help();
}