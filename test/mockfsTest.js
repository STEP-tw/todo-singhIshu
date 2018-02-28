let MockFs = require('../handlers/mockfs.js');
const chai = require('chai');
let assert = chai.assert;

describe('mockFs',()=>{
  beforeEach(function(){
    mockFs = new MockFs();
  })
  describe('writeFileSync()',()=>{
    it('should give the content file',done=>{
      mockFs.writeFileSync('hello.txt','hello world');
      let actual = mockFs.files;
      let expected = {"hello.txt":'hello world'};
      assert.deepEqual(actual,expected);
      done();
    })
  })
  describe('readFileSync()',()=>{
    it('should give the content file',done=>{
      mockFs.writeFileSync('hello.txt','hello world');
      let actual = mockFs.readFileSync('hello.txt','utf8');
      let expected = 'hello world';
      assert.deepEqual(actual,expected);
      done();
    })
    it('should return error message if file doesnt exist',done=>{
      mockFs.writeFileSync('hello.txt','hello world');
      let actual = mockFs.readFileSync('hii.txt','utf8');
      let expected = 'file not found'
      assert.equal(actual,expected);
      done();
    })
  })
  describe('existsSync()',()=>{
    it('should give the content file',done=>{
      mockFs.writeFileSync('hello.txt','hello world');
      let actual = mockFs.existsSync('hello.txt');
      assert.isOk(actual);
      done();
    })
  })
})
