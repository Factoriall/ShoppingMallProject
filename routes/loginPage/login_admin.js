var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);

/* 시작 화면 */
router.get('/', function(req, res, next) {
res.render('loginPageHTML/login_admin', {pass:0});
});

//판매자 로그인 시도
router.post('/adminlogin', function(req,res){
  let body = req.body;
  let id = body.admin_id;
  let pw = body.pass;

  connection.query("SELECT * FROM Admin", function(err,results){
    if(err) { console.log(err); }
    if(results[0].AID != id || results[0].AID != pw)
    {
      console.log("비번/아이디중 하나 틀림");
      return res.render('loginPageHTML/login_admin', {pass: '1'});
    }else{
      //관리자 페이지로
      return res.render('adminPageHTML/admin_page');
    }
  })
});

module.exports = router;
