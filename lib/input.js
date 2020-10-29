const {vDice, vMod} = require('./verify-rolls');
const {rollDice, rollStack} = require('./dice');
const {coolGradient} = require('./colors');
const clear = require('clear');
const figlet = require('figlet');
const chalk = require('chalk');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const evaluate = (stringParams) => {
    let roll = {};
    params = stringParams.split(" ");
   
    // single die
    if(params.length === 1) {
        return evaluate('1 ' + params);
    }

    // single die with modifier
    if(params[0].charAt(0).match(/[dD]/i)) {
        return evaluate('1 ' + stringParams);
    }

    [roll.n, roll.d = 'xxx', roll.m = 0] = params;

    roll.n = parseInt(roll.n);
    roll.m = parseInt(roll.m) || 0;

    if(Number.isInteger(roll.n) && vDice(roll.d) && vMod(roll.m)) {
        roll.total = 0;
        const sngRollStack = [];
        const sngRollObj = {};

        roll.total = Array(roll.n).fill().reduce((acc, _) => {
            let sngRoll = rollDice(roll.d);
            sngRollStack.push(sngRoll);
            return acc + sngRoll;
        },0);

        sngRollObj.dice = roll.d;
        sngRollObj.rolls = sngRollStack;
        sngRollObj.modifier = roll.m;
        sngRollObj.total = roll.total;

        rollStack.push(sngRollObj);
        console.log(chalk.hex('#2C9EBF')("Nat " + roll.total + ", Mod: " + (roll.total + roll.m)));
    } else {
        console.log(chalk.hex('#FF24AB')(chalk.underline("Invalid Input. Please specify using the following syntax: \n")));
        console.log("ex 1: 3 d4 -4")
        console.log("ex 2: d20 3")
        console.log("ex 3: d20")
        console.log("ex 4: 3 d6\n")
    }
    mainLoop();
}

const mainLoop = () => {
    readline.question("dlang> ", function(params) {

    switch(params) {
        case "exit":
            console.log(chalk.hex('FF24AB')("Goodbye!"));
            readline.close();
            break;
        case "h":
            clear()
            console.log("\n");
            console.log(
                coolGradient(
                  figlet.textSync('Help', { horizontalLayout: 'full' })
                )
              );

            console.log(chalk.hex('#FF24AB')(chalk.underline('dlang> exit') + chalk.white(' to quit')));
            console.log(chalk.hex('#FF24AB')(chalk.underline('dlang> clear') + chalk.white(' to clear the terminal')));
            console.log(chalk.hex('#FF24AB')(chalk.underline('dlang> v') + chalk.white(' to view roll history')));
            console.log(chalk.hex('#FF24AB')(chalk.underline('dlang> ex') + chalk.white(' to show valid input\n')));

            mainLoop();
            break;
        case "v":
            clear();
            console.log("\n");
            console.log(
                coolGradient(
                  figlet.textSync('Roll History\n', { horizontalLayout: 'full' })
                )
              );

            if(rollStack === undefined || rollStack.length === 0) {
                console.log(chalk.hex('FF24AB')("You haven't rolled yet! type 'ex' to see how to roll"));
            }

            rollStack.forEach((r, i) => {
                console.log(chalk.hex('#2C9EBF')((i + 1) + ". " + r.rolls.length + "x" + r.dice + ": " + "(" + r.rolls + ")  w/Mod " + r.modifier + " = " + chalk.underline("Nat " + r.total + " or " + "Mod " + (r.total + r.modifier)) ));
            });
            console.log("\n");
            mainLoop();
            break;
        case "ex":
            clear();
            console.log("\n");
            console.log(
                coolGradient(
                  figlet.textSync('Example Rolls\n', { horizontalLayout: 'full' })
                )
              );
            console.log(chalk.hex('#2C9EBF')("ex 1: 3 d4 -4"));
            console.log(chalk.hex('#2C9EBF')("ex 2: d20 3"));
            console.log(chalk.hex('#2C9EBF')("ex 3: d20"));
            console.log(chalk.hex('#2C9EBF')("ex 4: 3 d6\n"));
            mainLoop();
            break;
        case "clear":
            clear();
            mainLoop();
            break;
        default:
           evaluate(params)
    }
    })
}
exports.mainLoop = mainLoop;