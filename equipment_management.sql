/*
 Navicat Premium Data Transfer

 Source Server         : 123456
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3306
 Source Schema         : equipment_management

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001

 Date: 24/04/2025 17:01:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `createUser` bigint NULL DEFAULT NULL COMMENT '创建人',
  `updateUser` bigint NULL DEFAULT NULL COMMENT '修改人',
  `isDelete` tinyint NOT NULL DEFAULT 0 COMMENT '0--正常  1--删除',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `category_id_uindex`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '分类表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '生产', '11', 2, 1, 0, '2025-04-15 17:07:53', '2025-04-24 14:26:42');
INSERT INTO `category` VALUES (2, '测试', NULL, 3, 1, 1, '2025-04-15 17:11:11', '2025-04-15 17:11:11');
INSERT INTO `category` VALUES (3, '测试1', '水水', 4, 1, 0, '2025-04-15 17:18:53', '2025-04-15 17:18:53');
INSERT INTO `category` VALUES (4, '测试2', '0001', 4, 1, 0, '2025-04-15 17:20:41', '2025-04-15 21:07:33');
INSERT INTO `category` VALUES (5, '测试3', NULL, 4, 4, 0, '2025-04-15 17:27:22', '2025-04-15 17:27:22');
INSERT INTO `category` VALUES (6, '科室', NULL, 5, 5, 0, '2025-04-15 17:30:17', '2025-04-15 17:30:17');
INSERT INTO `category` VALUES (7, '测试4', '试试', 5, 5, 0, '2025-04-15 17:32:08', '2025-04-15 17:32:08');
INSERT INTO `category` VALUES (8, '212', NULL, 5, 2, 0, '2025-04-15 17:34:27', '2025-04-15 17:34:27');
INSERT INTO `category` VALUES (9, '测试5', NULL, 2, 1, 1, '2025-04-15 18:06:57', '2025-04-15 18:06:57');
INSERT INTO `category` VALUES (10, '1111222', '112345', 1, 1, 1, '2025-04-15 18:07:58', '2025-04-15 18:07:58');
INSERT INTO `category` VALUES (11, '1234', '111', 1, 1, 0, '2025-04-15 18:13:55', '2025-04-15 18:13:55');
INSERT INTO `category` VALUES (12, '4321', '111211', 2, 1, 0, '2025-04-15 18:15:35', '2025-04-15 18:15:35');
INSERT INTO `category` VALUES (13, '520', NULL, 1, 1, 1, '2025-04-15 19:10:20', '2025-04-15 19:10:20');
INSERT INTO `category` VALUES (14, '33', '333', 1, 2, 0, '2025-04-18 16:06:51', '2025-04-18 16:06:51');

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(122) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备名称',
  `imageUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备图片',
  `model` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '型号',
  `serialNumber` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备序列号',
  `warrantyPeriod` int NULL DEFAULT NULL COMMENT '保修期(月)',
  `categoryId` bigint NULL DEFAULT NULL COMMENT '分类ID',
  `status` int NOT NULL DEFAULT 1 COMMENT '0--在用  1--闲置  2--故障  3--维修中  4--报废',
  `maintainerId` bigint NULL DEFAULT NULL COMMENT '维修人员ID',
  `locationId` bigint NULL DEFAULT NULL COMMENT '当前位置ID',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '详细信息',
  `lastMaintenanceTime` datetime NULL DEFAULT NULL COMMENT '上次维护时间',
  `nextMaintenanceTime` datetime NULL DEFAULT NULL COMMENT '下次维护时间',
  `discardTime` datetime NULL DEFAULT NULL COMMENT '设备报废时间',
  `isDelete` tinyint NOT NULL DEFAULT 0 COMMENT '0--正常  1--删除',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `device_id_uindex`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '设备表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES (1, '测试', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/61f66c13-1fd7-44f6-99a5-118ad3ad5121.png', '', '', 6, 4, 4, 2, 1, 'aaa', NULL, NULL, '2025-03-28 17:02:31', 0, '2025-03-28 17:00:43', '2025-04-21 09:22:01');
INSERT INTO `device` VALUES (2, '测试2', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/1601d662-1a3c-4b9d-a950-01f0308bc1af.png', NULL, NULL, 7, 7, 0, 5, 1, NULL, '2025-04-20 19:42:01', NULL, NULL, 0, '2025-04-15 22:20:32', '2025-04-21 17:12:37');
INSERT INTO `device` VALUES (3, '测试3', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/b6b52639-8ec3-4539-be57-f2ff7a3dc686.png', NULL, NULL, 7, 1, 4, NULL, 1, NULL, NULL, NULL, '2025-04-16 20:31:46', 0, '2025-04-15 22:22:53', '2025-04-21 09:23:08');
INSERT INTO `device` VALUES (4, '测试4', NULL, NULL, NULL, 11, 4, 2, 2, 3, NULL, NULL, NULL, NULL, 0, '2025-04-15 22:30:18', '2025-04-18 17:14:46');
INSERT INTO `device` VALUES (5, '测试5', NULL, NULL, NULL, 3, 11, 0, NULL, NULL, NULL, NULL, NULL, NULL, 0, '2025-04-15 22:41:24', '2025-04-17 17:43:45');
INSERT INTO `device` VALUES (6, '测试6', NULL, NULL, NULL, 6, 6, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, '2025-04-15 22:50:48', '2025-04-15 22:50:48');
INSERT INTO `device` VALUES (7, 'AAA', NULL, NULL, NULL, 5, 12, 2, 5, 3, 'BBB', NULL, NULL, NULL, 0, '2025-04-17 21:11:16', '2025-04-20 18:57:02');

-- ----------------------------
-- Table structure for location
-- ----------------------------
DROP TABLE IF EXISTS `location`;
CREATE TABLE `location`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '位置名称',
  `type` int NULL DEFAULT NULL COMMENT '0--厂区，1--车间，2--仓库，3--办公室，4--其他',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `isDelete` tinyint NOT NULL DEFAULT 0 COMMENT '0--正常  1--删除',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `location_id_uindex`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '位置表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of location
-- ----------------------------
INSERT INTO `location` VALUES (1, '办公室', 3, 'AAA', 0, '2025-04-17 15:48:55', '2025-04-17 15:53:22');
INSERT INTO `location` VALUES (2, 'aaa', 1, NULL, 1, '2025-04-17 15:53:52', '2025-04-17 15:53:52');
INSERT INTO `location` VALUES (3, 'bbb', 0, '111', 0, '2025-04-17 16:13:02', '2025-04-18 17:45:52');
INSERT INTO `location` VALUES (4, NULL, NULL, NULL, 1, '2025-04-24 14:30:24', '2025-04-24 14:30:24');

-- ----------------------------
-- Table structure for maintenance_order
-- ----------------------------
DROP TABLE IF EXISTS `maintenance_order`;
CREATE TABLE `maintenance_order`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `deviceId` bigint NULL DEFAULT NULL COMMENT '设备id',
  `reporterId` bigint NULL DEFAULT NULL COMMENT '报修人Id',
  `reportTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '报修时间',
  `faultDescription` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '故障描述',
  `status` int NOT NULL DEFAULT 0 COMMENT '0--待处理，1--处理中，2--已完成，3--无法维修，4--已取消',
  `assigneeId` bigint NULL DEFAULT NULL COMMENT '维修人员Id',
  `assignTime` datetime NULL DEFAULT NULL COMMENT '维修任务分配时间',
  `repairStartTime` datetime NULL DEFAULT NULL COMMENT '维修开始时间',
  `repairEndTime` datetime NULL DEFAULT NULL COMMENT '维修结束时间',
  `repairCost` decimal(12, 2) NULL DEFAULT NULL COMMENT '维修费用',
  `repairResult` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '维修结果说明',
  `cancelReason` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '取消原因',
  `isDelete` tinyint NOT NULL DEFAULT 0 COMMENT '0--正常  1--删除',
  `createTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `maintenance_order_id_uindex`(`id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '维修工单表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of maintenance_order
-- ----------------------------
INSERT INTO `maintenance_order` VALUES (1, 2, 1, '2025-04-16 19:53:47', '电力故障', 2, 5, '2025-04-19 19:53:31', '2025-04-20 19:35:11', '2025-04-20 19:40:01', 43.00, 'xxx', NULL, 0, '2025-04-16 19:53:47', '2025-04-20 19:40:01');
INSERT INTO `maintenance_order` VALUES (2, 2, 1, '2025-04-16 20:12:16', 'xxxxx', 2, 5, '2025-04-19 20:12:16', NULL, NULL, NULL, NULL, NULL, 0, '2025-04-16 20:12:16', '2025-04-16 20:12:16');
INSERT INTO `maintenance_order` VALUES (3, 2, 1, '2025-04-16 20:20:11', 'ssssss', 2, 5, '2025-04-19 20:20:12', NULL, '2025-04-20 19:42:01', 52.00, NULL, NULL, 0, '2025-04-16 20:20:11', '2025-04-20 19:42:01');
INSERT INTO `maintenance_order` VALUES (4, 4, 5, '2025-04-18 17:14:45', 'abc', 0, 2, '2025-04-21 17:14:46', NULL, NULL, NULL, NULL, NULL, 0, '2025-04-18 17:14:45', '2025-04-18 17:14:45');
INSERT INTO `maintenance_order` VALUES (5, 7, 3, '2025-04-20 18:57:02', 'aaa', 4, 5, '2025-04-23 18:57:02', NULL, NULL, NULL, NULL, '工单超额', 0, '2025-04-20 18:57:02', '2025-04-20 18:58:13');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `userName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '昵称',
  `userAccount` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '账号',
  `userPassword` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '密码',
  `avatarUrl` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `gender` tinyint NULL DEFAULT NULL COMMENT '性别',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '电话号码',
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `userStatus` int NOT NULL DEFAULT 0 COMMENT '0--正常  1--封号/禁用',
  `userRole` int NULL DEFAULT NULL COMMENT '0--普通用户  1--管理员  2--维修人员',
  `isDelete` tinyint NOT NULL DEFAULT 0 COMMENT '0--正常  1--删除',
  `createTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updateTime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '用户' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '张三', 'zhangsan', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/198a690b-c793-417c-a1ff-15b7289e5a8a.png', 0, '13800138000', NULL, 0, 1, 0, '2025-03-21 20:11:10', '2025-04-22 18:11:10');
INSERT INTO `user` VALUES (2, '王五', 'wangwu', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/346203c1-7c28-452b-9db6-ca7775827e2d.png', 1, NULL, NULL, 0, 2, 0, '2025-04-11 16:24:29', '2025-04-20 23:40:54');
INSERT INTO `user` VALUES (3, '赵六', 'zhaoliu', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/10fd4ea4-2a2b-4e72-8afb-27c4276fed16.png', 1, '12263332876', NULL, 0, 0, 0, '2025-04-11 16:42:43', '2025-04-22 19:09:41');
INSERT INTO `user` VALUES (4, '吴工', 'aaabbb', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/2a997744-eb09-475c-aab6-f7e681421cf3.png', 1, NULL, NULL, 0, 0, 0, '2025-04-12 21:44:51', '2025-04-20 23:41:13');
INSERT INTO `user` VALUES (5, '王八', 'aaaccc', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/319ec2f0-073e-41d8-9cd7-258fab9ea786.png', 1, NULL, NULL, 0, 2, 0, '2025-04-13 16:16:55', '2025-04-20 23:41:22');
INSERT INTO `user` VALUES (6, '古月方源', 'bbbccc', '1b89ef6d9fc5dbfe5df497d6cb2e8e5d', 'https://sky-take-out-cjc.oss-cn-hangzhou.aliyuncs.com/2620c799-ddc3-42b6-ac23-57fee39f9a3c.png', 1, NULL, NULL, 0, 2, 0, '2025-04-22 19:14:55', '2025-04-22 19:15:33');

SET FOREIGN_KEY_CHECKS = 1;
