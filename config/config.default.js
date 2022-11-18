/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1632378106033_5921';

  // add your middleware config here
  config.middleware = [ 'checkLogin' ];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  config.questionsRootPath = path.join(__dirname, '../questions_save'); // 存放试题的根目录
  config.answersRootPath = path.join(__dirname, '../answers_save'); // 存放考试答案的根目录
  config.examRootPath = path.join(__dirname, '../exam_save');

  config.security = {
    csrf: {
      enable: false,
    },
  };
  config.static = {
    prefix: '/',
    dir: path.join(appInfo.baseDir, 'app/public/dist'),
  };

  config.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'school',
    },
  };

  function route(url, method) {
    return { url, method };
  }

  config.whiteList = [
    route('/', 'GET'),
    route('/api/user/register', 'POST'),
    route('/api/user/login', 'POST'),
  ];

  config.cors = {
    origin: '*',
    allowMethods: 'GET, HEAD, PUT, POST, DELETE, PATCH',
    credentials: true,
  };

  return {
    ...config,
    ...userConfig,
  };
};

