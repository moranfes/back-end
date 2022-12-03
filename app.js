// 导入express包
const express = require("express");
// 导入cors解决跨域
const cors = require("cors");
// 导入路由模块
const userRouter = require("./router/user");
const joi = require("joi");
// 解析 token 的中间件
const expressJWT = require("express-jwt");
// 导入配置文件
const config = require("./config");
// 导入并使用用户信息路由模块
const userinfoRouter = require("./router/userinfo");

// 创建服务器
const app = express();
// 创建cors中间件
app.use(cors());
// 解析表单数据
app.use(express.urlencoded({ extended: false }));

// 在路由之前封装res.cc()
app.use((req, res, next) => {
  // status默认值为1，表示失败的情况
  // err的值，可能是一个错误对象，也可能是一个错误的描述字符串
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
  };
  next();
});
// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(
  expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] })
);

// 创建路由中间件
app.use("/api", userRouter);

// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
app.use("/my", userinfoRouter);

// 定义错误级别中间件
app.use((err, req, res, next) => {
  // 数据验证失败
  if (err instanceof joi.ValidationError) {
    return res.cc(err);
  }
  // 捕获身份认证失败的错误
  if (err.name === "UnauthorizedError") return res.cc("身份认证失败！");
  // 未知错误
  res.cc(err);
});

// 监听3000端口
app.listen(3000);
console.log("服务器已启动,连接http://localhost:3000");
