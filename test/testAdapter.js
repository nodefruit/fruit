/* بسم الله الرحمن الرحيم */

/* 
    This is just a fake adapter, it doesn't insert/find/update/delete
    Its role is just testing arguments passed from the fruit instance
*/

module.exports = (function () {
  
  var config = {};
  
  function dataManager () {
    
    this.type = 'test';
    
    this.connect = function (conf, callBack) {
      config = conf
      callBack((config.host && config.database && config.user && config.password) ? null : new TypeError('Incorrect infos'))
      return this;
    }
    
    this.insert = function (tocName, data, callBack) {
      if(tocName === 'unknown') {
        callBack(new TypeError('table not found'))
      } else {
        if(typeof data !== 'object') {
          callBack(new TypeError('incorrect data'))
        } else {
          callBack(null, {
              tocName : tocName
            , data    : data
          });
        }
      }
    }
    
    this.find = function (tocName, condition, callBack, limit, offset) {
      var data = [
        {
            id   : 1
          , name : 'khalid'
          , age  : 26
        },
        {
            id   : 2
          , name : 'Abdullah'
          , age  : 26
        }
      ]
      if(tocName === 'unknown') {
        callBack(new TypeError('table not found'))
      } else {
        if(typeof condition !== 'object') {
          callBack(new TypeError('incorrect data'))
        } else {
          if(limit !== undefined && isNaN(Number(limit))) {
            return callBack(new TypeError ("Incorrect limit argument"))
          }
          if(offset !== undefined && isNaN(Number(offset))) {
            return callBack(new TypeError ("Incorrect offset argument"))
          }
          var results = data.filter(function (item) {
            return condition.name && condition.age && item.name == condition.name && item.age == condition.age
              || condition.name && !condition.age && item.name == condition.name
              || !condition.name && condition.age && item.age == condition.age
              || JSON.stringify(condition) == '{}'
          })
          callBack(null, results.slice(offset, limit && ((offset || 0) + limit)));
        }
      }
    }
    
    this.findOne = function (tocName, condition, callBack) {
      this.find(tocName, condition, function (err, results) {
        if(results) results = results.shift();
        callBack(err, results);
      }, 1, 0);
    }
    
    this.findAll = function (tocName, callBack) {
      this.find(tocName, {}, callBack);
    }
    
  }
  
  return new dataManager;
  
}());