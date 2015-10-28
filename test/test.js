var assert      = require('assert')
  , Fruit       = require('..')
  , testAdapter = require('./testAdapter')


describe('successful connection' , function () {
  var success = false
    , error   = false;

  beforeEach(function(done) {  
    var fruit = new Fruit(testAdapter)
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
      });
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
    var fruit = new Fruit(testAdapter)
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
      });
  });
  
  it('should not get connected', function () {
    assert.equal(success, false);
    assert.equal(error, true);
  });
});

describe('insert into table/collection successfully', function () {
  var results = {}
    , error   = null
    , tocName = 'users'
    , data    = {
        name  : 'khalid'
      , age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.insert(data)
      .into(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should insert successfully', function () {
    assert.equal(results.tocName, tocName);
    assert.equal(results.data, data);
    assert.equal(error, null);
  })
});

describe('insert many records/documents into table/collection successfully', function () {
  var results = {}
    , error   = null
    , tocName = 'users'
    , data    = [
      {
          name  : 'khalid'
        , age   : 26
      },
      {
          name  : 'Abdullah'
        , age   : 26
      }
    ];
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.insert(data)
      .into(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should insert successfully', function () {
    assert.equal(results.tocName, tocName);
    assert.equal(results.data, data);
    assert.equal(error, null);
  })
});