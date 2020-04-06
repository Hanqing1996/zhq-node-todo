const fs = require('fs');
const homedir=require('os').homedir();
const home=process.env.HOME||homedir;// 读取环境变量。如果用户没有特别设置过环境变量，则
const p=require('path');
const dbPath=p.join(home,'.todo');

module.exports = {
    add: (...name) => {
        // 读取已有任务
        // 添加新任务
        // 存储任务到文件
        console.log(name[1].join(" "));
        fs.readFile(dbPath,{flag:'a+'}, (err, data) => {
            if (err) throw err;
            console.log(data);
        })
    }
}