const db = require('./db').db

module.exports = {
    add: async (...args) => {
        // 读取已有任务
        let list=await db.read();
        console.log(list);
        // // 添加新任务
        // const title = args[1].join(" ");
        // const task = {
        //     title,
        //     done: false
        // }
        // list.push(task)
        // // 存储任务到文件
        // db.write(list)
    }
}