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
        add(args[1].join(" ")).then(()=>{console.log('添加成功');},()=>{console.log('添加失败')});
    });

program
    .command('clear')
    .description('clear tasks')
    .action(()=>{
        clear().then(()=>{console.log('清除完毕');},()=>{console.log('清除失败');});
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
