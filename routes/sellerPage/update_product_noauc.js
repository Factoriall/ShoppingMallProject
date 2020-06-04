var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);

/* 시작 화면 */
router.post('/', function(req, res, next) {
  var body = req.body;
  console.log(body);
  var item_id = body.check;
  
  connection.query("SELECT * FROM Item_no WHERE ItemID = ?",[item_id], function(err,row){
    var item_name = row[0]['Itemname'];
    var img_src = row[0]['Img_src'];
    var price = row[0]['Price'];
    var place = row[0]['Place'];

    res.render('sellerPageHTML/update_product_noauc',{
      item_name: item_name,
      img_src: img_src,
      price: price,
      place: place
    });
  });
});
module.exports = router;
