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
    
  }
  
  return new dataManager;
  
}());