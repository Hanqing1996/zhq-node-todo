const homedir = require('os').homedir();
const home = process.env.HOME || homedir;// 读取环境变量。如果用户没有特别设置过环境变量，则读取系统默认home目录路径
const p = require('path');
const fs = require('fs');
const dbPath = p.join(home, '.todo');

module.exports.db = {
    read: () => {
        let list;
        return new Promise((resolve, reject) => {
            fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
                if (err) {
                    return reject(err);
                }
                try {
                    list = JSON.parse(data.toString());
                } catch (error2) {
                    list = [] // list 的默认值
                }
                resolve(list)
            })
        })
    },
    write: (list) => {
        const result = JSON.stringify(list)
        return new Promise((resolve, reject) => {
            fs.writeFile(dbPath, result, (err) => {
                if (err) {
                    return reject(err);
                }
                resolve()
            });

        })
    }
}