var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);
//보안 모듈


/* 시작 화면 */

router.post('/', function(req,res){
  var id = req.cookies.SID;

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
    var item_id = new Array();
    for(var i = 0; i < row.length; i++){
      item_name[i] = row[i]['Itemname'];
      price[i] = row[i]['Price'];
      date[i] = row[i]['Date'];
      place[i] = row[i]['Place'];
      flag[i] = row[i]['Flag'];
      img_src[i] = row[i]['Img_src'];
      cart_info[i] = row[i]['cart_info'];
      item_id[i] = row[i]['ItemID'];
    }
    return res.render('sellerPageHTML/product_management',{
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
      cart_info: cart_info,
      item_id: item_id
  });
}
  else{
    return res.render('sellerPageHTML/product_management');
  }
});
});

module.exports = router;
