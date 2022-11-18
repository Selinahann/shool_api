'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // had enabled by egg
  static: {
    enable: true,
  },
  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
