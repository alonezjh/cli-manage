const chalk = require('chalk');
const inquirer = require('inquirer');
const ora = require('ora');
const exec = require('child_process').exec;
const templates = require('../config/templates');

const spinner = ora('正在生成模版...');

console.log(chalk.green('\n=======================================================\n'));
console.log(chalk.green('               *** 脚手架管理工具 ***        '));
console.log(chalk.green('\n=======================================================\n'));

const keys = Object.keys(templates);

const temps = Object.keys(templates).map(key => templates[key]);

for (const key of temps) {
  console.log(chalk.white.bgCyan.bold(`  模版名称： `),`${chalk.bold.magenta(key['name'])} \n${chalk.white.bgCyan.bold(`\n  模版描述： \n\n`)} ${key['description']}`);
  console.log(chalk.white.bgCyan.bold(`\n  项目地址： `),`${chalk.yellow(key['url'])}`);
  console.log(chalk.blue('\n======================================================\n'));

}

const questions = [
  {
    type: 'list',
    name: 'template',
    message: '请选择项目模版:',
    choices: keys,
  },
  {
    type: 'input',
    message: '请设置项目名称:',
    name: 'name',
    default: "demo" 
  }
];

inquirer.prompt(questions).then(function (answers) {

  const url = templates[answers.template].url;
  const name = answers.name;
 
  const cmd = `git clone ${url} ${name} && cd ${name}`;
 
  spinner.start();

  exec(cmd, (err) => {
    download(err, name);
  });
});

const download = (err, name) => {
  if (err) {
    console.log(err);
    process.exit();
  }

  const cmd = `cd ${name} && rm -rf .git`;
  exec(cmd, (err, out) => {
    spinner.stop();
    if (err) {
      console.log(err);
      process.exit();
    }
    console.log(chalk.white.bgMagenta.bold(`\n  >>>successful  `), `  项目初始化完成`);
    console.log(chalk.white.bgMagenta.bold(`\n  >>>successful  `), `  cd ${chalk.blue(`${name}`)} && yarn\n`);
  });
}