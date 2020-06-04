var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//기본 페이지
var startRouter = require('./routes/start');
//admin page Router
var a_admin_pageRouter = require('./routes/adminPage/admin_page');
var a_consumer_modRouter = require('./routes/adminPage/consumer_mod');
var a_seller_modRouter = require('./routes/adminPage/seller_mod');
//customer page Router
var c_auc_buyRouter = require('./routes/customerPage/auc_buy');
var c_auc_productRouter = require('./routes/customerPage/auc_product');
var c_auctionSearchRouter = require('./routes/customerPage/auctionSearch');
var c_consumer_pageRouter = require('./routes/customerPage/consumer_page');
var c_mainPageRouter = require('./routes/customerPage/mainPage');
var c_noauc_buyRouter = require('./routes/customerPage/noauc_buy');
var c_noauc_productRouter = require('./routes/customerPage/noauc_product');
//login page router
var l_login_adminRouter = require('./routes/loginPage/login_admin');
var l_login_consumerRouter = require('./routes/loginPage/login_consumer');
var l_login_sellerRouter = require('./routes/loginPage/login_seller');
var l_register_consumerRouter = require('./routes/loginPage/register_consumer');
var l_register_sellerRouter = require('./routes/loginPage/register_seller');
//seller page Router
var s_product_managementRouter = require('./routes/sellerPage/product_management');
var s_register_product_aucRouter = require('./routes/sellerPage/register_product_auc');
var s_register_product_noaucRouter = require('./routes/sellerPage/register_product_noauc');
var s_seller_pageRouter = require('./routes/sellerPage/seller_page');
var s_update_product_aucRouter = require('./routes/sellerPage/update_product_auc');
var s_update_product_noaucRouter = require('./routes/sellerPage/update_product_noauc');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//기본 페이지
app.use('/', startRouter);
//admin page router 주소 지정
app.use('/admin/admin_page', a_admin_pageRouter);
app.use('/admin/consumer_mod', a_consumer_modRouter);
app.use('/admin/seller_mod', a_seller_modRouter);
// customer page router 주소 지정
app.use('/customer/auc_buy', c_auc_buyRouter);
app.use('/customer/auc_product', c_auc_productRouter);
app.use('/customer/auctionSearch', c_auctionSearchRouter);
app.use('/customer/consumer_page', c_consumer_pageRouter);
app.use('/customer/mainPage', c_mainPageRouter);
app.use('/customer/noauc_buy', c_noauc_buyRouter);
app.use('/customer/noauc_product', c_noauc_productRouter);
// login page router 주소 지정
app.use('/login/login_admin', l_login_adminRouter);
app.use('/login/login_consumer', l_login_consumerRouter);
app.use('/login/login_seller', l_login_sellerRouter);
app.use('/login/register_consumer', l_register_consumerRouter);
app.use('/login/register_seller', l_register_sellerRouter);
// seller page router 주소 지정
app.use('/seller/product_management', s_product_managementRouter);
app.use('/seller/register_product_auc', s_register_product_aucRouter);
app.use('/seller/register_product_noauc', s_register_product_noaucRouter);
app.use('/seller/seller_page', s_seller_pageRouter);
app.use('/seller/update_product_auc', s_update_product_aucRouter);
app.use('/seller/update_product_noauc', s_update_product_noaucRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
