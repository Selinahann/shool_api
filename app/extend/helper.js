'use strict';
const crypto = require('crypto');
const baseRandomString = () =>
  Math.random()
    .toString(36)
    .substring(7)
    .split('')
    .join('');
const randomString = (num = 4) => {
  const arr = [];
  for (let i = 0; i < num; i++) {
    arr.push(baseRandomString());
  }
  return arr.join('-');
};

const createKeys = () => {
  return 'tao';
};
const sha256 = secret => {
  return crypto.createHmac('sha256', secret)
    .update(createKeys())
    .digest('hex');
};

const arrayToTree = (arr, parentIdKey, idKey) => {
  const tree = [];
  const arrJson = {};
  arr.forEach(item => {
    arrJson[item[idKey]] = item;
  });
  console.log(arrJson);
  arr.forEach(item => {
    const parentId = item[parentIdKey];
    console.log(parentId);
    if (parentId * 1 === 0) {
      tree.push(item);
    } else {
      const parent = arrJson[parentId];
      if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [ item ];
      }
    }
  });
  return tree;
};

module.exports = { randomString, sha256, createKeys, arrayToTree };
