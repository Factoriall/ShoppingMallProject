var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);



/* 시작 화면 */

router.get('/', function(req, res) {
  res.render('sellerPageHTML/register_product_noauc', {pass:0});
});

router.post('/register', function(req, res) {
  var sellerID = req.cookies.SID;

  var body = req.body;
  var product_img = body.product_img;
  var product_name = body.product_name;
  var product_price = body.product_price;
  
  var product_place = body.place;
  connection.query("INSERT INTO Item_no (ISID, Price, Place, Date, Flag, Img_src, Itemname, cart_info) VALUES(?, ?, ?, NULL, 0, ?, ?, 0)",
  [sellerID, product_price,product_place,product_img,product_name,0], function(err, result){
    if(err) {
      return res.render('sellerPageHTML/register_product_noauc',{
        pass : 'err'
      });
    }
    else{
      console.log("test");
      return res.render('sellerPageHTML/register_product_noauc', {
        pass: 'ok'
      });
    }
  });
})



module.exports = router;
