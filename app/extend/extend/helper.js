'use strict';

module.exports = {
  arrayToTree(arr, parentIdKey, idKey) {
    const tree = [];
    const arrJson = {};
    arr.forEach(item => {
      arrJson[item[idKey]] = item;
    });
    arr.forEach(item => {
      const parentId = item[parentIdKey];
      if (parentId === 0) {
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
  },
  random(min, max) {
    return min + Math.round(Math.random() * (max - min));
  },
};
