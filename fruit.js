/* بسم الله الرحمن الرحيم */

module.exports = (function () {
  var defer = require('./lib/defer');
  
  function Fruit (adapter) {
    
    var _adapter = adapter;
    
    function getResponseHandler (deferred) {
      return function (err, result) {
        if(err) deferred.reject(err);
        else deferred.resolve(result);
      }
    }
    
    this.insert = function (data) {
      return {
        into : function (tocName) {
          var deferred = defer();
          _adapter.insert(tocName, data, getResponseHandler(deferred));
          return deferred.getPromise();
        }
      }
    }
    
    this.find = function (condition) {
      return {
        from : function (tocName) {
          var deferred = defer();
          _adapter.find(tocName, condition, getResponseHandler(deferred));
          return deferred.getPromise();
        }
      }
    }
    
    this.findAll = function (tocName) {
      var deferred = defer();
      _adapter.findAll(tocName, getResponseHandler(deferred));
      return deferred.getPromise();
    }
    
    this.update = function (tocName) {
      return {
        set : function (data) {
          return {
            where : function (condition) {
              var deferred = defer();
              _adapter.update(tocName, data, condition, getResponseHandler(deferred));
              return deferred.getPromise();
            }
          }
        }
      }
      adapter.update
    }
    
    this.updateAll = function (tocName) {
      return {
        set : function (data) {
          return {
            where : function (condition) {
              var deferred = defer();
              _adapter.updateAll(tocName, data, condition, getResponseHandler(deferred));
              return deferred.getPromise();
            }
          }
        }
      }
      adapter.update
    }
    
    this.remove = adapter.remove
    
  }
  
  return Fruit;
  
}());