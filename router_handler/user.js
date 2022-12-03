// 导入数据库操作模块
const db = require("../db/index");
// 导入密码加密包
const bcrypt = require("bcryptjs");
// 导入jsonwebtoken包生成token
const jwt = require("jsonwebtoken");
// 导入token配置文件
const config = require("../config");

// 注册用户的处理函数
exports.regUser = (req, res) => {
  const userinfo = req.body;
  // 对表单的数据进行合法校验
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({ status: 1, message: '账号或密码不合法' })
  // }

  // 定义sql语句，查询用户名是否被占用
  const sqlStr = "select * from users where username=?";
  db.query(sqlStr, userinfo.username, (err, result) => {
    if (err) {
      // return res.send({ status: 1, message: err.message })
      return res.cc(err);
    }
    // 判断用户名是否被占用
    if (result.length > 0) {
      // return res.send({ status: 1, message: '用户名已被占用' })
      return res.cc("用户名已被占用");
    }
    // 调用bcrypt.hashSync() 对密码加密
    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
    // 向数据库插入用户名和密码
    const sql = "insert into users set ?";
    db.query(
      sql,
      { username: userinfo.username, password: userinfo.password },
      (err, result) => {
        // 判断sql语句是否执行成功
        if (err) {
          // return res.send({ status: 1, message: err.message })
          return res.cc(err);
        }
        // 判断影响函数是否为1
        if (result.affectedRows !== 1) {
          // return res.send({ status: 1, message: '注册失败，请稍后再试' })
          return res.cc("注册失败，请稍后再试");
        }
        // 注册用户成功
        res.send({ status: 0, message: "注册成功", userinfo });
      }
    );
  });
};

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userinfo = req.body;
  console.log(userinfo);
  // 定义SQL语句
  const sql = "select * from users where username = ?";
  // 执行SQL语句，查询用户数据，判断提交的用户名是否与数据库中的一致
  db.query(sql, userinfo.username, (err, result) => {
    if (err) return res.cc(err);
    if (result.length !== 1) return res.cc("登录失败");

    // 判断密码是否一致
    // 调用 bcrypt.compareSync(用户提交的密码, 数据库中的密码) 方法比较密码是否一致
    const compareResult = bcrypt.compareSync(
      userinfo.password,
      result[0].password
    );
    // 如果比较的结果为false，则证明密码错误
    if (!compareResult) return res.cc("登录失败");

    // 生成token
    // 剔除密码和头像的值
    const user = { ...result[0], password: "", user_pic: "" };
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn,
    });
    res.send({
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};

// 获取商品信息的处理函数
exports.getGoods = (req, res) => {
  const sql = `select * from goods`;
  // 调用db.query()执行SQL语句
  db.query(sql, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取商品信息成功！",
      data: results,
    });
  });
};

// 获取商品信息的处理函数
exports.getGoodsList = (req, res) => {
  id = req.body.id
  console.log(id);
  const sql = `select * from goods where goods_id = ?`;
  // 调用db.query()执行SQL语句
  db.query(sql,id, (err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取商品信息成功！",
      data: results,
    });
  });
};

// 加入购物车的处理函数
exports.getCart = (req, res) => {
  // 得到前端传过来的商品ID
  let goodsId = req.body.goodsId;
  console.log(goodsId);
  // 解析前端传过来的token
  let token = req.headers.authorization.split(" ");
  // console.log('token'+token[1]);
  let tokenObj = jwt.decode(token[1]);
  // 查询用户
  const sql = "select * from users where id = ?";
  db.query(sql, tokenObj.id, (error, result) => {
    // 用户id
    let Uid = result[0].id;

    db.query(
      `select * from goods where goods_id = ${goodsId}`,
      (error, result) => {
        let goodsName = result[0].goods_name;
        let goodsPrice = result[0].goods_price;
        let goodsImgUrl = result[0].goods_pic;

        const addSQL = `INSERT INTO goods_cars(Uid,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) VALUES ("${Uid}","${goodsId}","${goodsName}","${goodsPrice}","1","${goodsImgUrl}")`;
        db.query(addSQL, (error, result) => {
          // 判断影响函数是否为1
          if (result.affectedRows !== 1) {
            // return res.send({ status: 1, message: '注册失败，请稍后再试' })
            return res.cc("添加失败");
          }
          res.send({ status: 0, message: '添加成功'})
        });
      }
    );
  });
};


// 获取购物车信息的处理函数
exports.getGoodsCart = (req, res) => {
   // 解析前端传过来的token
   let token = req.headers.authorization.split(" ");
   // console.log('token'+token[1]);
   let tokenObj = jwt.decode(token[1]);
  const sql = `select * from goods_cars where Uid = ?`;
  // 调用db.query()执行SQL语句
  db.query(sql,tokenObj.id,(err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "获取购物车信息成功！",
      data: results,
    });
  });
};


// 删除购物车信息的处理函数
exports.removeGoodsCart = (req, res) => {
  let removeId = req.body.removeId
  console.log(removeId);
//   -- DELETE FROM 表名称 WHERE 列名称 = 值
// -- delete from goods where goods_id = 1
  const sql = `delete from goods_cars where id = ?`;
  // 调用db.query()执行SQL语句
  db.query(sql,removeId,(err, results) => {
    // 1. 执行 SQL 语句失败
    if (err) return res.cc(err);
    // 2. 将用户信息响应给客户端
    res.send({
      status: 0,
      message: "删除成功",
    });
  });
};