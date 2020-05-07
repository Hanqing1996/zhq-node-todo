const db = require('./db').db
const inquirer = require('inquirer')


const chooseOperations = (list) => {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'task',
                message: 'Choose the task you want to edit',
                choices: list.map((item, index) => {
                    return {name: item.title, value: index.toString()}
                })
            },
            {
                type: 'list',
                name: 'operation',
                message: 'Choose the operation you want to execute',
                choices: [
                    {name: 'quit', value: '-1'},
                    {name: 'edit title', value: '-2'},
                    {name: 'update state', value: '-3'},
                    {name: 'delete the task', value: '-4'}]
            }
        ])
        .then(async answers => {
            let {task: taskIndex, operation} = answers;
            taskIndex = parseInt(taskIndex);
            operation = parseInt(operation);
            switch (operation) {
                case -2:
                    editTitle(list,taskIndex);
                    break;
                case -3:
                    selectState(list,taskIndex);
                    break;
                case -4:
                    await deleteTask(list,taskIndex);
                    break;
                default:
                    console.log('quit successfully');
            }
        });
}

const editTitle=(list,taskIndex)=>{
    inquirer
        .prompt({
            type: 'input',
            name: 'newTitle',
            message: "input new title"
        }).then(async answers => {
        const {newTitle} = answers;
        list[taskIndex] = {...list[taskIndex], title: newTitle};
        let information = await db.write(list);
        if (information === 'write successfully') {
            console.log('edit title successfully');
        }
    })
}

const selectState=(list,taskIndex)=>{
    inquirer
        .prompt({
            type: 'checkbox',
            message: 'Select state',
            name: 'status',
            choices: [
                {
                    name: '未完成',
                    checked: true
                },
                {
                    name: '已完成',
                    checked: false
                }
            ],
            validate: function (answer) {
                if (answer.length == 2) {
                    return 'You can not choose the two status at the same time';
                }

                return true;
            }
        }).then(async answers => {
        const {status} = answers;
        list[taskIndex] = {...list[taskIndex], done: status[0] === '已完成'};

        let information = await db.write(list);
        if (information === 'write successfully') {
            console.log('update state successfully');
        }

    })
}

const deleteTask=async (list,taskIndex)=>{
    list.splice(taskIndex, 1);
    let information = await db.write(list);
    if (information === 'write successfully') {
        console.log('delete task successfully');
    }
}

module.exports = {
    add: async (title) => {
        // 读取已有任务
        let list = await db.read();
        // 添加新任务
        list.push({title, done: false})
        // 存储任务到文件
        await db.write(list)
    },
    clear: async () => {
        await db.write([])
    },
    showAll: async () => {
        const list = await db.read();
        list.map((item, index) => {
            console.log(`${item.done ? '[x]' : '[_]'} ${index + 1} - ${item.title}`);
        })
    },
    inquireCommand: async () => {
        const list = await db.read();
        chooseOperations(list)
    }
}


