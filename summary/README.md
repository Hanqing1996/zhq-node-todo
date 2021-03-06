#### commander.js
> node.js 的命令行接口

* [Options](https://github.com/tj/commander.js#options)
* [Commands](https://github.com/tj/commander.js#commands)

#### Path 
不同的系统，需要对应不同的路径
```
// windows
dbPath=home+'\\.todo'

// linux/mac
dbPath=home+'.todo'
```
对此，Node.js 提供了 Path 模块，用于实现路径拼凑。
```
const p=require('path');
const dbPath=p.join(home,'.todo');
```

#### windows 命令
* 打开 home 目录
```
start ~
```

#### 用 promise 封装 readFile
```
read: () => {
    let list;
    return new Promise((resolve, reject) => {
        fs.readFile(dbPath, {flag: 'a+'}, (err, data) => {
            if (err) {
                reject(err);
            }else{
                resolve(list)
            }
        })
    })
}

let list=await read();
console.log(list);
```