#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const inputLoop  = require('./lib/input');
const {coolGradient} = require('./lib/colors');

clear();

console.log("\n");
console.log(
  coolGradient(
    figlet.textSync('DLang', { horizontalLayout: 'full' })
  )
);

console.log(chalk.hex('#FF24AB')(chalk.underline("dlang> h") + chalk.white(" for help\n")));
console.log(chalk.hex('#FF24AB')(chalk.underline("dlang> v") + chalk.white(" for roll history\n")));

inputLoop.mainLoop();