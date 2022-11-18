/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : onlinecode

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 26/09/2021 10:18:36
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `room_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `students` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of class
-- ----------------------------
BEGIN;
INSERT INTO `class` VALUES ('f3eqqp-hbf66', '测试班级', '12', '312312', '0lqmqq-48xb3l', '2021-09-25 23:23:14', NULL);
COMMIT;

-- ----------------------------
-- Table structure for paper
-- ----------------------------
DROP TABLE IF EXISTS `paper`;
CREATE TABLE `paper` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '试卷id',
  `title` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '试卷标题',
  `questions` text CHARACTER SET utf8 COLLATE utf8_unicode_ci COMMENT '试卷内容',
  `class_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '考试班级',
  `start_time` datetime DEFAULT NULL COMMENT '开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '结束时间',
  `students` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '考试学生',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of paper
-- ----------------------------
BEGIN;
INSERT INTO `paper` VALUES ('lrkqck-9noa7k', '2021年9月项目实战周考一', '[{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2}]', 'f3eqqp-hbf66', '2021-09-25 10:00:00', '2021-09-25 12:00:00', '[\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\"]');
INSERT INTO `paper` VALUES ('tdy5rj-bcma6v', '2021年9月项目实战周考二', '[{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"w56oam-92lco5\",\"score\":2}]', 'f3eqqp-hbf66', '2021-09-25 10:00:00', '2021-09-25 12:00:00', '[\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\"]');
COMMIT;

-- ----------------------------
-- Table structure for question
-- ----------------------------
DROP TABLE IF EXISTS `question`;
CREATE TABLE `question` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `typeId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `quiz` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `tagsId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `userId` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  `modifiedAt` date DEFAULT NULL,
  `numUsed` int(10) unsigned zerofill DEFAULT NULL,
  `difficulty` int DEFAULT NULL,
  `path` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` varchar(10000) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of question
-- ----------------------------
BEGIN;
INSERT INTO `question` VALUES ('qp1r5-lctq0s', '1l17vs-b9f3f', NULL, '[\"bveqpa-5tn3zy\",\"en72u-4s3ad\"]', '', '2021-09-24', NULL, NULL, 1, 'qp1r5-lctq0s.json', '抽奖箱里一共有200块钱，分别是一块，凉快和五块，一共有60张，现在知道一块比凉快多4张，问五块面额有几张');
INSERT INTO `question` VALUES ('w56oam-92lco5', '1l17vs-b9f3f', NULL, '[\"bveqpa-5tn3zy\",\"en72u-4s3ad\"]', '', '2021-09-23', NULL, NULL, 1, 'w56oam-92lco5.json', '抽奖箱里一共有200块钱，分别是一块，凉快和五块，一共有60张，现在知道一块比凉快多4张，问五块面额有几张');
COMMIT;

-- ----------------------------
-- Table structure for question_tag
-- ----------------------------
DROP TABLE IF EXISTS `question_tag`;
CREATE TABLE `question_tag` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of question_tag
-- ----------------------------
BEGIN;
INSERT INTO `question_tag` VALUES ('123ass-x0jys1h', 'Html', '#00ff00');
INSERT INTO `question_tag` VALUES ('9mjp49-2dm3b', NULL, NULL);
INSERT INTO `question_tag` VALUES ('bdqz37-eb253', 'ddd', '#00ffff');
INSERT INTO `question_tag` VALUES ('bveqpa-5tn3zy', 'React', '#ff0000');
INSERT INTO `question_tag` VALUES ('en72u-4s3ad', 'Vue', '#ff0000');
INSERT INTO `question_tag` VALUES ('naa6sj-t36jwg', 'Css', '#ff0000');
INSERT INTO `question_tag` VALUES ('soi2uq-pmluzd', 'cccc', '#000000');
INSERT INTO `question_tag` VALUES ('uac9wq-asdc78', 'JavaScript', '#ff0000');
COMMIT;

-- ----------------------------
-- Table structure for question_type
-- ----------------------------
DROP TABLE IF EXISTS `question_type`;
CREATE TABLE `question_type` (
  `question_type_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `question_type_text` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`question_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of question_type
-- ----------------------------
BEGIN;
INSERT INTO `question_type` VALUES ('1l17vs-b9f3f', '项目题');
INSERT INTO `question_type` VALUES ('7iuhwq-tq4fwb', '多选题');
INSERT INTO `question_type` VALUES ('87kgip-7ejy', '解答题');
INSERT INTO `question_type` VALUES ('kq3c3-k7ywzg', '填空题');
INSERT INTO `question_type` VALUES ('w06o1o-g8hy1x', '单选题');
COMMIT;

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room` (
  `room_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `room_text` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of room
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `id_card` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of student
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for subject
-- ----------------------------
DROP TABLE IF EXISTS `subject`;
CREATE TABLE `subject` (
  `subject_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `subject_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of subject
-- ----------------------------
BEGIN;
INSERT INTO `subject` VALUES ('0lqmqq-48xb3l', '项目实战开发');
INSERT INTO `subject` VALUES ('3cxn5m-3zzxp', '组件化框架');
INSERT INTO `subject` VALUES ('9445dp-9qb3lq', '网页设计');
INSERT INTO `subject` VALUES ('p8rgws-nt2cas', '项目实训');
INSERT INTO `subject` VALUES ('tbm0il-fkds2r', '渐进式框架');
INSERT INTO `subject` VALUES ('ulp4pg-fjp0ue', '移动端开发');
INSERT INTO `subject` VALUES ('ygzr6b-bejuwp', 'JavaScript基础');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
