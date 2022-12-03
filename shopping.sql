CREATE SCHEMA `my_db_01` ;

CREATE TABLE `my_db_01`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `user_pic` TEXT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `idusers_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `userscol_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

create table `my_db_01`.`goods`
(
    `goods_id`    int          not null auto_increment,
    `goods_name`  varchar(255) not null,
    `goods_price` int not null,
    `goods_count` int not null,
    `goods_pic`   varchar(255) not null,
    `goods_intro` text         not null,
    primary key (`goods_id`)
);

create table `my_db_01`.`goods_cars`
(
    `id`  int not null auto_increment,
    `Uid` int,
    `goods_id` int,
    `goods_name` varchar(255),
    `goods_price` int,
    `goods_num` int,
    `goods_imgUrl` varchar (255),
    primary key (`id`)
);

-- goods表
use `my_db_01`;
-- INSERT INTO table_name (列1,列2,....) VALUES (值1,值2,....)
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马5系 长轴距版 530Li xDrive',293800,1,'https://e-images-usedcar.bmw-emall.cn/e04362c3-b29e-4798-b382-4db1923cc7d0','百公里加速时间（秒）6.7,综合油耗量EU（升/100公里）7,气缸/排量（毫升）1998,输出功率（千瓦）185,扭矩（牛米）350');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马X1 sDrive 20Li',158000,1,'https://e-images-usedcar.bmw-emall.cn/74f847b8-6fdb-4738-877a-0a8347f55529','百公里加速时间（秒）8.1,综合油耗量EU（升/100公里）7.1,气缸/排量（毫升）1998,输出功率（千瓦）141,扭矩（牛米）280');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马3系 长轴距版 320Li',238000,1,'https://e-images-usedcar.bmw-emall.cn/631aa02b-8a3f-42db-8de2-7657a3410428','百公里加速时间（秒）9.1,综合油耗量EU（升/100公里）6.1,气缸/排量（毫升）1998,输出功率（千瓦）115,扭矩（牛米）250');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马3系 长轴距版 320Li',256000,1,'https://e-images-usedcar.bmw-emall.cn/cf3a47c8-3cc3-4546-9351-52dd4e9c9b7c','百公里加速时间（秒）9.1,综合油耗量EU（升/100公里）6.1,气缸/排量（毫升）1998,输出功率（千瓦）115,扭矩（牛米）250');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马1系 三厢运动轿车 120i',151800,1,'https://e-images-usedcar.bmw-emall.cn/8534d4bd-ff27-481f-a1a9-120ce3487897','百公里加速时间（秒）9.4,综合油耗量EU（升/100公里）5.4,气缸/排量（毫升）1499,输出功率（千瓦）103,扭矩（牛米）220');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马5系 长轴距版 525Li',325000,1,'https://e-images-usedcar.bmw-emall.cn/cdbbb5d0-d785-4771-9cb2-610b86515677','百公里加速时间（秒）-,综合油耗量EU（升/100公里）6.5,气缸/排量（毫升）1998,输出功率（千瓦）135,扭矩（牛米）290');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马2系 多功能旅行车 218i',100000,1,'https://e-images-usedcar.bmw-emall.cn/00dd5744-63a8-4751-a302-374ea06e8046','百公里加速时间（秒）9.8,综合油耗量EU（升/100公里）6.1,气缸/排量（毫升）1499,输出功率（千瓦）100,扭矩（牛米）220');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马X5 xDrive 30i',660000,1,'https://e-images-usedcar.bmw-emall.cn/96ee82c3-a778-4cf6-b632-2f4f94be65e7','百公里加速时间（秒）6.9,综合油耗量EU（升/100公里）7.9,气缸/排量（毫升）1998,输出功率（千瓦）195,扭矩（牛米）400');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马X4 xDrive 30i',505800,1,'https://e-images-usedcar.bmw-emall.cn/2fce0bee-5976-4a52-9a74-4844894c92f4','百公里加速时间（秒）6.8,综合油耗量EU（升/100公里）8,气缸/排量（毫升）1998,输出功率（千瓦）185,扭矩（牛米）350');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马X4 xDrive 25i',380000,1,'https://e-images-usedcar.bmw-emall.cn/0d1fa425-b705-4eea-8728-88f73b88d3e8','百公里加速时间（秒）8.9,综合油耗量EU（升/100公里）7.9,气缸/排量（毫升）1998,输出功率（千瓦）135,扭矩（牛米）290');
INSERT INTO goods(goods_name,goods_price,goods_count,goods_pic,goods_intro) values('宝马xDrive 25i',358000,1,'https://e-images-usedcar.bmw-emall.cn/cbec7ccb-3805-4726-92ff-417c0f08d7dc','百公里加速时间（秒）8.9,综合油耗量EU（升/100公里）7,气缸/排量（毫升）1998,输出功率（千瓦）135,扭矩（牛米）300');

-- DELETE FROM 表名称 WHERE 列名称 = 值
-- delete from goods where goods_id = 1
-- drop table goods;
select * from users where username = 'admin'