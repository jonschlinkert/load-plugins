'use strict';

module.exports = function camelize(str) {
  return str.replace(/[_.-](\w|$)/g, function (_, first) {
    return first.toUpperCase();
  });
};