const db = require('./db').db
const inquirer = require('inquirer')

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

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'task',
                    message: 'Choose the task you want to edit',
                    choices: list.map((item,index)=>{
                        return {name:item.title,value:index.toString()}
                    })
                },
                {
                    type: 'list',
                    name: 'operation',
                    message: 'Choose the operation you want to execute',
                    choices: [
                        {name:'quit',value:'-1'},
                        {name:'edit title',value:'-2'},
                        {name:'choose state',value:'-3'},
                        {name:'delete',value:'-4'}]
                },


                /*
                {
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
                    validate: function(answer) {
                        if (answer.length ==2) {
                            return 'You can not choose the two status at same time';
                        }

                        return true;
                    }
                }
                */
            ])
            .then(answers => {
                let {task:taskIndex,operation}=answers;
                taskIndex=parseInt(taskIndex);
                operation=parseInt(operation);

                switch (operation) {
                    case -2:
                        inquirer
                            .prompt(  {
                                type: 'input',
                                name: 'newTitle',
                                message: "input new title"
                            }).then(answers=>{
                                const {newTitle}=answers;
                                list[taskIndex]={...list[taskIndex],title:newTitle};
                                db.write(list);
                        })
                        break;
                    case -3:
                        console.log('你想修改状态');
                        break;
                    case -4:
                        console.log('你想删除任务');
                        break;
                    default:
                        console.log('quit successfully');
                }
            });
    }
}


