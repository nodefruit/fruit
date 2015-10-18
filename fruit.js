/* بسم الله الرحمن الرحيم */

module.exports = (function () {
  
  function Fruit (adapter) {
    this.insert   = adapter.insert
    this.find     = adapter.find
    this.update   = adapter.update
    this.remove   = adapter.remove
  }
  
  return Fruit;
  
}());