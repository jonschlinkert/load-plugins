'use strict';

var braces = require('braces');

module.exports = function expand(arr) {
  arr = Array.isArray(arr) ? arr : [arr];

  return arr.reduce(function (acc, fp) {
    return acc.concat(braces(fp));
  }, []);
};