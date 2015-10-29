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


describe('failed insertion due to incorrect data', function () {
  var results = null
    , error   = null
    , tocName = 'users'
    , data    = ' ?? ';
  
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
  
  it('should not insert', function () {
    assert.equal(results, null);
    assert.equal(typeof error, 'object');
  })
});

describe('failed insertion into not exisiting table/collection', function () {
  var results = null
    , error   = null
    , tocName = 'unknown'
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
  
  it('should not insert', function () {
    assert.equal(results, null);
    assert.equal(typeof error, 'object');
  })
});

describe('successful find query with name and age as conditions', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = {
        name  : 'khalid'
      , age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    results.forEach(function (result) {
      assert.equal(result.name, condition.name);
      assert.equal(result.age, condition.age);
    })
    assert.equal(error, null);
  })
});

describe('successful find query with only age as condition', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = {
      age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    results.forEach(function (result) {
      assert.equal(result.age, condition.age);
    })
    assert.equal(error, null);
  })
});

describe('successful find query with limit', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = {
      age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .limit(1)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    assert.equal(results.length, 1);
    assert.equal(results[0].name, 'khalid');
    assert.equal(error, null);
  })
});

describe('successful find query with limit and offset', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = {
      age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .limit(1)
      .offset(1)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    assert.equal(results.length, 1);
    assert.equal(results[0].name, 'Abdullah');
    assert.equal(error, null);
  })
});

describe('successful findAll query', function () {
  var results   = null
    , error     = null
    , tocName   = 'user';
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.findAll(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    assert.equal(results.length, 2);
    assert.equal(error, null);
  })
});

describe('successful findOne query', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = {
        name  : 'khalid'
      , age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.findOne(condition)
      .from(tocName)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should find successfully', function () {
    assert.equal(results.name, condition.name);
    assert.equal(results.age, condition.age);
    assert.equal(error, null);
  })
});

describe('failed find query', function () {
  var success   = false
    , error     = false
    , tocName   = 'persons'
    , condition = {
      age   : 26
    };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .success(function (rst) {
        success = true;
        done();
      })
      .error(function (err) {
        error = true;
        done();
      });
  });
  
  it('should fail due to inexisting table/collection', function () {
    assert.equal(success, false);
    assert.equal(error, true);
  })
});

describe('failed find query', function () {
  var success   = false
    , error     = false
    , tocName   = 'persons'
    , condition = ' ?? ';
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.find(condition)
      .from(tocName)
      .success(function () {
        success = true;
        done();
      })
      .error(function (err) {
        error = true;
        done();
      });
  });
  
  it('should fail due to incorrect condition type', function () {
    assert.equal(success, false);
    assert.equal(error, true);
  })
});

describe('successful update query', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , condition = { name : 'khalid' }
    , data      = { name : 'Abdullah' };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.update(tocName)
      .set(data)
      .where(condition)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should update successfully', function () {
    assert.equal(results.tocName, tocName);
    assert.equal(results.data, data);
    assert.equal(results.condition, condition);
    assert.equal(error, null);
  })
  
})

describe('successful update query without condition', function () {
  var results   = null
    , error     = null
    , tocName   = 'user'
    , data      = { name : 'Abdullah' };
  
  beforeEach(function (done) {
    var fruit = new Fruit(testAdapter);
    fruit.update(tocName)
      .set(data)
      .success(function (rst) {
        results = rst;
        done();
      })
      .error(function (err) {
        error = err;
        done();
      });
  });
  
  it('should update successfully', function () {
    assert.equal(results.tocName, tocName);
    assert.equal(results.data, data);
    assert.equal(error, null);
  })
  
})