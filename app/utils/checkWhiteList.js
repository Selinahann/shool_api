'use strict';

function checkWhiteList(url, method, whiteList = []) {
  const result = whiteList.reduce((prev, item) => {
    if (prev) return prev;
    if (typeof item.url === 'string') {
      return item.url === url && (item.method === 'any' || item.method === method);
    }
    if (item.url instanceof RegExp) {
      return item.url.test(url) && (item.method === 'any' || item.method === method);
    }
  }, false);
  return result;
}
module.exports = checkWhiteList;
