var express = require('express');
var router = express.Router();
var mysql = require("mysql");
var dbconfig = require('../../config/database.js');
var connection = mysql.createConnection(dbconfig);



/* 시작 화면 */
router.get('/', function(req, res, next) {
  res.render('customerPageHTML/noauc_buy');
});

module.exports = router;
