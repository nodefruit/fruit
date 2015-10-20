var Q = require('q');

function transformPromise (promise) {
  promise.success = function () {
    promise.then.apply(promise, arguments);
    return transformPromise(prom);
  }
  promise.error = function () {
    promise.catch.apply(promise, arguments);
    return transformPromise(promise);
  }
  return promise;
}

module.exports = function () {
  deferred = Q.defer();
  deferred.getPromise = function () {
    return transformPromise(deferred.promise);
  }
  return deferred;
}