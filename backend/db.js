const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

// 用JSON文件存储客户端信息（初始测试账号）
const adapter = new FileSync('mcp-db.json');
const db = low(adapter);

db.defaults({
  clients: [
    { clientId: 'test_client', clientSecret: 'test_secret123', isActive: true }
  ],
  callLogs: []
}).write();

module.exports = db;