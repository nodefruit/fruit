var Model = require('fishbone')
  , jsome = require('jsome');

module.exports  = function () {
  
  var _initialData    = {}
    , _fruitInstance  = null
    , _tocName        = ''
    , _specificFormat = function (json) {
      switch(_fruitInstance.adapterType) {
        case 'mongodb' : json._id = json._id.toString(); break;
      }
      return json;
    }
  
  return Model({

    init : function (data, tocName, fruitInstance) {
      _initialData    = data;
      _tocName        = tocName;
      _fruitInstance  = fruitInstance;
      for(var key in data) {
        this[key] = data[key];
      }
    },

    save : function () {
      return _fruitInstance.update(_tocName)
        .set(this.toJSON())
        .where(_initialData)
    },

    delete : function () {
      return _fruitInstance.delete(_tocName)
        .where(_initialData);
    },

    print : function () {
      jsome(this.toJSON);
    },
    
    toJSON : function () {
      var json = {};
      for(var key in this) {
        if(typeof this[key] !== 'function') {
          json[key] = this[key];
        }
      }
      return _specificFormat(json);
    }

  });
  
}