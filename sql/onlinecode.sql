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

 Date: 15/10/2021 14:17:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `class_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `room_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `teacher_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `subject_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `students` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of class
-- ----------------------------
BEGIN;
INSERT INTO `class` VALUES ('0zy8r-ez8gj5', '2011', NULL, NULL, 'ygzr6b-bejuwp', '2021-09-29 14:31:15', NULL);
INSERT INTO `class` VALUES ('juyrk-n68yv', '2110', NULL, NULL, '9445dp-9qb3lq', '2021-09-29 14:31:51', NULL);
INSERT INTO `class` VALUES ('zag5qs-i86n', '2011', NULL, NULL, '9445dp-9qb3lq', '2021-09-29 14:42:38', NULL);
COMMIT;

-- ----------------------------
-- Table structure for identity
-- ----------------------------
DROP TABLE IF EXISTS `identity`;
CREATE TABLE `identity` (
  `identity_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `identity_text` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`identity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of identity
-- ----------------------------
BEGIN;
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
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of paper
-- ----------------------------
BEGIN;
INSERT INTO `paper` VALUES ('lrkqck-9noa7k', '2021年9月项目实战周考一', '[{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"qp1r5-lctq0s\",\"score\":2}]', 'f3eqqp-hbf66', '2021-09-25 10:00:00', '2021-09-25 12:24:57', '[\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\"]', NULL);
INSERT INTO `paper` VALUES ('tdy5rj-bcma6v', '2021年9月项目实战周考二', '[{\"id\":\"qp1r5-lctq0s\",\"score\":2},{\"id\":\"w56oam-92lco5\",\"score\":2}]', 'f3eqqp-hbf66', '2021-09-25 10:00:00', '2021-09-25 12:00:00', '[\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\",\"f3eqqp-hbf66\"]', NULL);
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
  `subject_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `unit` varbinary(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of question
-- ----------------------------
BEGIN;
INSERT INTO `question` VALUES ('5ifme-l9ztx', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, '5ifme-l9ztx.json', '下面标签中默认属于行内元素的是', NULL, NULL);
INSERT INTO `question` VALUES ('741jw-hx7a2e', 'w06o1o-g8hy1x', NULL, '[\"naa6sj-t36jwg\"]', '', '2021-09-28', NULL, NULL, 1, '741jw-hx7a2e.json', '下列哪个样式定义后,内联(非块状)元素可以定义宽度和高度', NULL, NULL);
INSERT INTO `question` VALUES ('7kdbck-f4tduj', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 2, '7kdbck-f4tduj.json', '为同一个文件添加多种文件格式的原因是什么 ？\n```\n<source src=\"html_5.mp4\" type=\"video/mp4\">\n<source src=\"html_5.ogv\" type=\"video/ogg\">\n```', NULL, NULL);
INSERT INTO `question` VALUES ('8mh3yi-8qmmx', 'w06o1o-g8hy1x', NULL, '[\"uac9wq-asdc78\"]', '', '2021-09-28', NULL, NULL, 1, '8mh3yi-8qmmx.json', '下列哪个操作是W3C标准定义的阻止事件向父容器传递：', NULL, NULL);
INSERT INTO `question` VALUES ('fiedzi-d31r5', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'fiedzi-d31r5.json', '哪个属性将循环播放嵌入到 audio 元素中的音频？', NULL, NULL);
INSERT INTO `question` VALUES ('hag5g-20c15', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'hag5g-20c15.json', '以下哪个是正确的 HTML5 DOCTYPE声明：', NULL, NULL);
INSERT INTO `question` VALUES ('hez3i8-4i0cc', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'hez3i8-4i0cc.json', '以下不属于空元素（void elements）的是：', NULL, NULL);
INSERT INTO `question` VALUES ('juiyg7-cyeei', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'juiyg7-cyeei.json', '下列哪个不属于HTML input元素种类：', NULL, NULL);
INSERT INTO `question` VALUES ('rkvhll-15r5h', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'rkvhll-15r5h.json', '下述可正确注释html代码的有？', NULL, NULL);
INSERT INTO `question` VALUES ('ujvqxd-nddmhy', 'w06o1o-g8hy1x', NULL, '[\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 1, 'ujvqxd-nddmhy.json', 'img标签中的alt属性的作用是', NULL, NULL);
INSERT INTO `question` VALUES ('yuur0h-1ad29j', '7iuhwq-tq4fwb', NULL, '[\"uac9wq-asdc78\",\"123ass-x0jys1h\"]', '', '2021-09-28', NULL, NULL, 2, 'yuur0h-1ad29j.json', 'Html5重新提供了在客户端保存数据的功能Web Storage,分别是？（ ）', NULL, NULL);
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
INSERT INTO `question_tag` VALUES ('bveqpa-5tn3zy', 'React', '#ff0000');
INSERT INTO `question_tag` VALUES ('en72u-4s3ad', 'Vue', '#ff0000');
INSERT INTO `question_tag` VALUES ('ikp48v-3uwhlt', '小程序', '#1ca512');
INSERT INTO `question_tag` VALUES ('naa6sj-t36jwg', 'Css', '#ff0000');
INSERT INTO `question_tag` VALUES ('uac9wq-asdc78', 'JavaScript', '#ff0000');
INSERT INTO `question_tag` VALUES ('wspv6u-b7qnyx', '你好', '#c72929');
INSERT INTO `question_tag` VALUES ('zsc9f-81aikh', 'dd', '#00ffff');
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

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `identity_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('lmv88-v2j7f', 'liuyu', '681af23b63218db272bf957ac11eba4c8398eed122b3df5d61114d2758336024', NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
