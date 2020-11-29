/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50731
 Source Host           : 192.168.2.112:3306
 Source Schema         : aa

 Target Server Type    : MySQL
 Target Server Version : 50731
 File Encoding         : 65001

 Date: 28/11/2020 21:06:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for trusts
-- ----------------------------
DROP TABLE IF EXISTS `trusts`;
CREATE TABLE `trusts`  (
  `code` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `upperLimit` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `downLimit` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `sendtime` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  PRIMARY KEY (`code`, `upperLimit`, `downLimit`, `mail`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of trusts
-- ----------------------------
INSERT INTO `trusts` VALUES ('005693', '12', '2', '314051672@qq.com', '15151', NULL);
INSERT INTO `trusts` VALUES ('006328', '1231', '231', '314051672@qq.com', '15151', NULL);
INSERT INTO `trusts` VALUES ('008293', '2312', '21', '314051672@qq.com', '15151', NULL);
INSERT INTO `trusts` VALUES ('161725', '21', '21', '314051672@qq.com', '15151', NULL);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `uid` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `account` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('15151', '18368849779', 'Aa9385971');

SET FOREIGN_KEY_CHECKS = 1;
