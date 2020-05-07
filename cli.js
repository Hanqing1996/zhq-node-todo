const {program} = require('commander');


const {add, clear,showAll,inquireCommand} = require("./index")

// program
//     .option('-d, --debug', 'output extra debugging')
//     .option('-s, --small', 'small pizza size')
//     .option('-p, --pizza-type <type>', 'flavour of pizza');

program
    .command('add')
    .description('add a new task')
    .action((...args) => {
        add(args[1].join(" ")).then(()=>{console.log('add successfully');},()=>{console.log('add failed')});
    });

program
    .command('clear')
    .description('clear tasks')
    .action(()=>{
        clear().then(()=>{console.log('clear successfully');},()=>{console.log('clear failed');});
    });

program
    .command('showAll')
    .description('show all tasks')
    .action(()=>{
        showAll();
    });

program
    .command('inquire')
    .description('inquire tasks')
    .action(()=>{
        inquireCommand();
    });
program.parse(process.argv);
