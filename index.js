const db = require('./db').db

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
    }
}