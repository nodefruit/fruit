var Q = require('q');

function transformPromise (prom) {
  prom.success = function () {
    prom.then.apply(prom, arguments);
    return transformPromise(prom);
  }
  prom.error = function () {
    prom.catch.apply(prom, arguments);
    return transformPromise(prom);
  }
  return prom;
}

module.exports = function () {
  deferred = Q.defer();
  deferred.promise.success = deferred.promise.then;
  deferred.promise.error = deferred.promise.catch;
  deferred.getPromise = function () {
    return transformPromise(deferred.promise);
  }
  return deferred;
}