/* بسم الله الرحمن الرحيم */

module.exports = (function () {
  var defer         = require('./lib/defer')
    , modelFactory  = require('./lib/model-factory')
  
  function Fruit (adapter) {
    
    var _adapter      = adapter;
    this.adapterType  = adapter.type
    
    function getResponseHandler (deferred, formatResults) {
      return function (err, result) {
        if(err) deferred.reject(err);
        else deferred.resolve(formatResults ? formatResults(result) : result);
      }
    }
    
    this.insert = function (data, multipleIds) {
      var fruitReference = this;
      return {
        into : function (tocName) {
          var deferred = defer();
          _adapter.insert(tocName, data, getResponseHandler(deferred), multipleIds);
          return deferred.getPromise();
        }
      }
    }
    
    this.find = function (condition) {
      var fruitReference = this;
      return {
        from : function (tocName) {
          function formatResults (results) {
            for(var index in results) {
              var Model = modelFactory();
              results[index] = new Model(results[index], tocName, fruitReference);
            }
            return results;
          }
          var deferred = defer();
          _adapter.find(tocName, condition, getResponseHandler(deferred, formatResults));
          return deferred.getPromise();
        }
      }
    }
    
    this.findOne = function (condition) {
      var fruitReference = this;
      return {
        from : function (tocName) {
          var Model = modelFactory();
          function formatResult (result) {
            return new Model(result, tocName, fruitReference)
          }
          var deferred = defer();
          _adapter.findOne(tocName, condition, getResponseHandler(deferred, formatResult));
          return deferred.getPromise();
        }
      }
    }
    
    this.findAll = function (tocName) {
      var fruitReference = this;
      function formatResults (results) {
        for(var index in results) {
          var Model = modelFactory();
          results[index] = new Model(results[index], tocName, fruitReference);
        }
        return results;
      }
      var deferred = defer();
      _adapter.findAll(tocName, getResponseHandler(deferred, formatResults));
      return deferred.getPromise();
    }
    
    this.update = function (tocName) {
      return {
        set : function (data) {
          function _update (condition) {
            var deferred = defer();
            _adapter.update(tocName, data, condition, getResponseHandler(deferred));
            return deferred.getPromise();
          }
          return {
            where : _update,
            any   : function () {
              return _update({})
            }
          }
        }
      }
    }
    
    this.updateAll = function (tocName) {
      return {
        set : function (data) { 
          function _update (condition) {
            var deferred = defer();
            _adapter.updateAll(tocName, data, condition, getResponseHandler(deferred));
            return deferred.getPromise();
          }
          return {
            where : _update,
            any   : function () {
              return _update({})
            }
          }
        }
      }
    }
    
    this.delete = function (tocName) {
      function _delete (condition) {
        var deferred = defer();
        _adapter.delete(tocName, condition, getResponseHandler(deferred));
        return deferred.getPromise();
      }
      return {
        where : _delete,
        any   : function () {
          return _delete({});
        }
      }
    }
    
    this.deleteAll = function (tocName) {
      function _delete (condition) {
        var deferred = defer();
        _adapter.deleteAll(tocName, condition, getResponseHandler(deferred));
        return deferred.getPromise();
      }
      return {
        where : _delete,
        any   : function () {
          return _delete({});
        }
      }
    }
    
    this.count = function (tocName) {
      function _count (condition) {
        var deferred = defer();
        _adapter.count(tocName, condition, getResponseHandler(deferred));
        return deferred.getPromise();
      }
      return {
        where : _count,
        success : function (callBack) {
          return _count({}).success(callBack);
        },
        error : function (callBack) {
          return _count({}).error(callBack);
        }
      }
    }
    
  }
  
  return Fruit;
  
}());