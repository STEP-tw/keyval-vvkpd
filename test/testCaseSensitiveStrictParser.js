const src=function(filePath){return "../src/"+filePath};

const assert=require('chai').assert;
const Parsed=require(src('parsed.js'));
const StrictParser=require(src('index.js')).StrictParser;

describe("strict parser that is case insensitive",function(){
  it("should parse when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAME"]="jayanth";
    let parsed=kvParser.parse("NAME=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in upper case and actual is not",function(){
    let kvParser=new StrictParser(["NAME"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["name"]="jayanth";
    let parsed=kvParser.parse("name=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in lower case and actual is combination of lower and upper",function(){
    let kvParser=new StrictParser(["name"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NaMe"]="jayanth";
    let parsed=kvParser.parse("NaMe=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are in alphanumeric",function(){
    let kvParser=new StrictParser(["name123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["naMe123"]="jayanth";
    let parsed=kvParser.parse("naMe123=jayanth");
    assert.deepEqual(parsed,expected);
  });

  it("should parse when specified keys are snake case",function(){
    let kvParser=new StrictParser(["name_123"],false);
    // false indicates that case sensitive is false. By default it is true
    let expected=new Parsed();
    expected["NAme_123"]="jayanth";
    let parsed=kvParser.parse("NAme_123=jayanth");
    assert.deepEqual(parsed,expected);
  });
});

describe("strict parser that is case sensitive",function(){
  it("should throw error when specified keys are in lower case and actual is not",function(){
    let kvParser=new StrictParser(["name"],true);
    // true indicates that parser is case sensitive
    assert.throws(()=>{
      kvParser.parse("NAME=jayanth");
    })
  });
});
