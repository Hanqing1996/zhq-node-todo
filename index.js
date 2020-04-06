const fs = require('fs');
const homedir=require('os').homedir();
const home=process.env.HOME||homedir;// 读取环境变量。如果用户没有特别设置过环境变量，则
const p=require('path');
const dbPath=p.join(home,'.todo');

module.exports = {
    add: (...args) => {
        // 读取已有任务
        // 添加新任务
        // 存储任务到文件
        const title=args[1].join(" ");
        fs.readFile(dbPath,{flag:'a+'}, (err, data) => {
            if (err) throw err;
            let list;
            try {
                list=JSON.parse(data.toString());
            }catch (error2) {
                list=[] // list 的默认值
            }
            const task={
                title,
                done:false
            }
            list.push(task)
            const result=JSON.stringify(list)
            fs.writeFile(dbPath, result, (err) => {
                if (err) throw err;
                console.log('The file has been saved!');
            });
        })
    }
}