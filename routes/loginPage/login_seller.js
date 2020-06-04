var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);
//보안 모듈
const crypto = require('crypto');


/* 시작 화면 */
router.get('/', function(req, res, next) {
  res.render('loginPageHTML/login_seller', {pass: 0});
});

//판매자 로그인 시도
router.post('/sellerlogin', function(req,res){
  let body = req.body;
  let id = body.seller_id;
  let pw = body.pass;

  //아이디 있는지 확인
  connection.query("SELECT * FROM Seller WHERE SID=?", [id], function(err,results){
    if(err){ console.log(err); }
    //아이디 존재 X
    if(!results[0] || results[0] == "undefined"){
      return res.render('loginPageHTML/login_seller', {pass:'1'});
    }
    //비밀번호, salt 값 가져오기, hashing 하기
    let lockedpw=results[0].password;
    let salt = results[0].salt;
    let hashPassword = crypto.createHash("sha512").update(pw + salt).digest("hex");
    //비밀번호 확인
    if(lockedpw == hashPassword)
    {
      console.log("판매자 로그인 성공");
      res.cookie("SID", id , {
         expires: new Date(Date.now() + 9000000),
         httpOnly: true
       });
       console.log(id);
       connection.query("SELECT * FROM Item_no i, Seller s WHERE i.ISID = ? and s.SID = ?",[id, id], function(err,row){
         console.log(row);
         if(row.length > 0){
          var item_name = new Array();
          var date = new Array();
          var price = new Array();
          var place = new Array();
          var flag = new Array();
          var img_src = new Array();
          var cart_info = new Array();
          var sellerid = id;
          var sellerpn = row[0]['pnum'];
          var sellername = row[0]['s_name'];
          
          for(var i = 0; i < row.length; i++){
            item_name[i] = row[i]['Itemname'];
            price[i] = row[i]['Price'];
            date[i] = row[i]['Date'];
            place[i] = row[i]['Place'];
            flag[i] = row[i]['Flag'];
            img_src[i] = row[i]['img_src'];
            cart_info[i] = row[i]['cart_info'];
          }
          return res.render('sellerPageHTML/seller_page',{
           item_name: item_name,
           date: date,
           price: price,
           place: place,
           flag: flag,
           img_src: img_src,
           cart_info: cart_info,
           length: i,
           id: sellerid,
           pnum: sellerpn,
           s_name : sellername,
           cart_info: cart_info
        });
      }
      else{
        return res.render('sellerPageHTML/seller_page');
      }
    });
  }else{
    console.log("비밀번호 불일치");
    return res.render('loginPageHTML/login_seller', {pass:'2'});
  }
})
});

module.exports = router;
