const { program } = require('commander');


const {add}=require("./index")

program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza');

program
    .command('add')
    .description('add a new task')
    .action(add);
program.parse(process.argv);