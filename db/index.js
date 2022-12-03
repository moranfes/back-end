// 导入mysql
const mysql = require("mysql");

// 创建数据库连接对象
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "admin123",
  database: "my_db_01",
});

// 向外共享db数据库连接对象
module.exports = db;
