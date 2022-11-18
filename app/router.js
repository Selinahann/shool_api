'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
   * 题目标签管理
   */
  router.resources('/api/question/tags', controller.question.tags);
  /**
   * 题目类型管理
   */
  router.resources('/api/question/types', controller.question.type);
  /**
   * 题库管理
   */
  router.get('/api/question/random', controller.question.list.randomQuestion);
  router.resources('/api/question', controller.question.list);
  /**
   * 班级管理
   */
  router.resources('/api/educational/class', controller.educational.class);
  /**
   * 专业管理
   */
  router.resources('/api/educational/majors', controller.educational.majors);
  /**
   * 课程管理
   */
  router.resources('/api/educational/subject', controller.educational.subject);
  /**
   * 课程大纲
   */
  router.resources('/api/educational/ouline', controller.educational.outline);
  router.get('/api/educational/ouline', controller.educational.outline.show);
  /**
   * 教室管理大纲
   */
  router.resources('/api/educational/room', controller.educational.room);
  /**
   * 员工管理
   */
  router.resources('/api/enterprise/employee', controller.enterprise.employee);
  router.resources('/api/enterprise/market', controller.enterprise.market);

  /**
   * 组织架构
   */
  router.resources('/api/enterprise/architectures', controller.enterprise.architectures);
  router.resources('/api/educational/student', controller.educational.student);
  router.get('/api/educational/students', controller.educational.student.list);
  /**
   * 试卷管理
   */
  router.resources('/api/exam/paper', controller.exam.paper);
  // 登录
  router.post('/api/user/login', controller.user.index.login);
  // 注册
  router.post('/api/user/register', controller.user.index.create);
  // 获取用户信息
  router.get('/api/user/info', controller.user.index.info);
  router.post('/api/user/setIdentityView', controller.user.index.setIdentityView);
  router.get('/api/user/view', controller.user.index.getIdentityView);
  router.get('/api/user/:id', controller.user.index.show);
  router.get('/api/create/view', controller.user.index.addAuthorityView);
  // router.post('/image/upload', controller.user.index.upload);

  router.get('*', controller.home.render);
};
