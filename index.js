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
                    choices: list.map(item=>item.title)
                },
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
            ])
            .then(answers => {
                console.log(answers);
                console.log(JSON.stringify(answers, null, '  '));
            });
    }
}


