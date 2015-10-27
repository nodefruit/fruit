var assert      = require('assert')
  , Fruit       = require('..')
  , testAdapter = require('../lib/testAdapter')


describe('successful connection' , function () {
  
  var success = false
    , error   = false;

  beforeEach(function(done) {  
    var fruit   = new Fruit(testAdapter)
    , options = {
        host      : 'testhost'
      , database  : 'testdb'
      , user      : 'testuser'
      , password  : '********'
    };
    
    fruit.connect(options)
      .success(function () {
        success = true;
        done();
      }).error(function (err) {
        error = true;
        done();
      })
  });
  
  it('should get connected', function () {
    assert.equal(success, true);
    assert.equal(error, false);
  });

});

describe('failed connection' , function () {
  var success = false
    , error   = false;

  beforeEach(function(done) {  
    var fruit   = new Fruit(testAdapter)
    , options = {
        ghost     : 'testhost'
      , fakedb    : 'testdb'
      , anonymous : 'testuser'
      , phishing  : '********'
    };
    
    fruit.connect(options)
      .success(function () {
        success = true;
        done();
      }).error(function (err) {
        error = true;
        done();
      })
  });
  
  it('should not get connected', function () {
    assert.equal(success, false);
    assert.equal(error, true);
  });
})