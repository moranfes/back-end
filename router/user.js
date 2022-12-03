const express = require("express");

// 导入验证规则的中间件
const expressjoi = require("@escook/express-joi");
// 导入需要的验证规则对象
const { reg_login_schmea } = require("../schema/user");

// 创建路由对象
const router = express.Router();
const userHandler = require("../router_handler/user");

// 注册新用户
router.post("/reguser", expressjoi(reg_login_schmea), userHandler.regUser);

// 登录
router.post("/login", expressjoi(reg_login_schmea), userHandler.login);

// 获取商品信息
router.get("/goods", userHandler.getGoods);

router.post("/goodsList", userHandler.getGoodsList);

// 加入购物车
router.post('/addCart',userHandler.getCart)

// 获取购物车信息
router.post('/goodsCart',userHandler.getGoodsCart)

// 删除购物车信息
router.post('/removeCart',userHandler.removeGoodsCart)

// 将路由对象共享出去
module.exports = router;
