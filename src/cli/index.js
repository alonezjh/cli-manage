#!/usr/bin/env node

const program = require('commander');
const packageInfo = require('../../package.json');

program.version(packageInfo.version);

program
  .command('init') 
  .description('初始化项目')
  .action(() => {
    require('../cmd');
});

program.parse(process.argv);

if(!program.args.length){
  program.help()
}