/* بسم الله الرحمن الرحيم */

module.exports = (function () {
  
  var config = {};
  
  function dataManager () {
    
    this.type = 'test';
    
    this.connect = function (conf, callBack) {
      config = conf
      callBack((config.host && config.database && config.user && config.password) ? null : new TypeError('Incorrect infos'))
      return this;
    }
    
  }
  
  return new dataManager;
  
}());