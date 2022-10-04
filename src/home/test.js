var chai = require('chai');
var assert = require('assert');
var expect = chai.expect;

function sum(arg1, arg2) {
  return arg1 * arg2
}

var arrDB = [
  {link: "satu"},
  {link: "dua"},
  {link: "tiga"},
]

var arrAPI = [
  {link: "empat"},
  {link: "satu"},
  {link: "lima"},
]

var arrAPIv2 = [
  {
    'title': "pertama",
    'data': [
      {link: "empat"},
      {link: "satu"},
      {link: "lima"}
    ]
  },
  {
    'title': "kedua",
    'data': [
      {link: "dua"},
      {link: "enam"},
      {link: "tiga"},
      {link: "empat"}
    ]
  }
]

function categoryCheckNews(arrAPI, arrDB) {
  let arrTemp = arrDB;
  let stat;
  for (var x in arrAPI) {
    for (var i in arrAPI[x].data) {
      stat = arrTemp.find(function (obj) { return obj.link == arrAPI[x].data[i].link })
      if (stat == undefined) {
        arrTemp.push(arrAPI[x].data[i])
      }
    }
  }
  arrDB = arrTemp
  return arrDB;
}

function checkNews(){
  let stat;
  for (var i in arrAPI) {
    stat = arrDB.find(function (obj) { return obj.link == arrAPI[i].link })
    if (stat == undefined) {
      arrDB.push(arrAPI[i])
    }
  }
  return arrDB;
}

describe('Insert if not in array', ()=> {
  it('should be return an array', ()=>{
    expect(checkNews(arrAPI, arrDB)).to.be.an('array');
  })
  it('should return different object v1', ()=>{
    expect(checkNews(arrAPI, arrDB)).to.deep.equal([
      {link: "satu"},
      {link: "dua"},
      {link: "tiga"},
      {link: "empat"},
      {link: "lima"}
    ]);
  })
  it('should return different object v2', ()=>{
    expect(categoryCheckNews(arrAPIv2, arrDB)).to.deep.equal([
      {link: "satu"},
      {link: "dua"},
      {link: "tiga"},
      {link: "empat"},
      {link: "lima"},
      {link: "enam"}
    ]);
  })
})
