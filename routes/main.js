var express  = require('express');
var router   = express.Router();
const mysql = require('mysql');
 
const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3834",
    database: "pay_1"
});
client.connect();
router.get('/', function(req,res){
  if(req.user && req.user.email.includes('gangbuk.hs.kr')){
    client.query('SELECT * FROM pay WHERE id =?',req.user.id,(error,result,fields) => {
      if(error) {
        res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
      }
      if (result[0]==undefined) {
        client.query('INSERT INTO pay (id, pay, permission) VALUES ('+req.user.id+',0,0);',(error,r,f) => {
          if(error){
            res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
          }
        })
        res.render('main', {user: req.user,res:{id:req.user.id,pay:0}});
      } else {
        res.render('main', {user: req.user,res:result[0]});
      }
    })
  } else {
    res.render('main', {user: req.user});
  }
});
router.get('/setting', function(req,res){
  res.render('setting', {user: req.user});
});
router.get('/coupon', function(req,res){
  res.render('coupon', {user: req.user});
});
router.get('/quiz', function(req,res){
  res.render('quiz', {user: req.user});
});
router.get('/admin/quiz', function(req,res){
  if(req.user && req.user.email.includes('gangbuk.hs.kr')){
    client.query('SELECT * FROM pay WHERE id =?',req.user.id,(error,result,fields) => {
      if(error) {
        res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
      }
      if (result[0]==undefined) {
        client.query('INSERT INTO pay (id, pay, permission) VALUES ('+req.user.id+',0,0);',(error,r,f) => {
          if(error){
            res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
          }
        })
        res.render('main', {user: req.user,res:{id:req.user.id,pay:0}});
      } else {
        res.render('admin/quiz', {user: req.user,res:result[0]});
      }
    })
  } else {
    res.render('main', {user: req.user});
  }
});
router.post('/coupon/redeem', function(req,res){
  let nowpay=0;
  client.query('SELECT * FROM pay WHERE id =?',req.user.id,(error,result,fields) => {
    if(error) {
      res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
    }
    nowpay = Number(result[0].pay)
  })
  client.query('SELECT * FROM coupon WHERE code =?',req.body.code,(error,result,fields) => {
    if(error) console.log(error);
    if(result[0]==undefined) {
      res.write("<script>location=\"/coupon\"</script>");
    } else {
      client.query('UPDATE pay SET pay='+(nowpay+Number(result[0].pay))+' WHERE id='+req.user.id+';',(error,rest,field) => {
        if(error) {
          res.write('<script> alert("예기치 못한 오류가 발생하였습니다.\nkim3834000p@naver.com으로 문의해주십시오.") </script>')
        }
        res.write("<script>location=\"/coupon\"</script>");
      })
    }
  })
});
module.exports = router;