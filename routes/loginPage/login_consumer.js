var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);
//보안 모듈
const crypto = require('crypto');

/* 시작 화면 */
router.get('/', function(req, res, next) {
  res.render('loginPageHTML/login_consumer', {pass:0});
});


//구매자 로그인 시도
router.post('/consumerlogin', function(req, res, next) {
  let body = req.body;
  let id = body.consumer_id;
  let pw = body.pass;

  //아이디 있는지 확인
    connection.query("SELECT * FROM Consumer WHERE CID=?", [id], function(err, results) {
      if (err) {
        console.log(err);
      }
      //아이디 존재 X
      if (!results[0]) {
        return res.render('loginPageHTML/login_consumer', {
          pass: '1'
        });
      }
      //비밀번호, salt 값 가져오기, hashing 하기
      let lockedpw = results[0].password;
      let salt = results[0].salt;
      let hashPassword = crypto.createHash("sha512").update(pw + salt).digest("hex");

      //비밀번호 확인
      if (lockedpw == hashPassword) {
        console.log("구매자 로그인 성공");
        // ID, 학교 정보 cookie로 전달
        res.cookie("CID", id, {
          expires: new Date(Date.now() + 9000000),
          httpOnly: true
        });
        //여기에 customer의 main page 들어가야됨
        return res.render('customerPageHTML/mainPage');
      } else {
        console.log("비밀번호 불일치");
        return res.render('loginPageHTML/login_consumer', {
          pass: '2'
        });
      }
    })
  });


module.exports = router;
