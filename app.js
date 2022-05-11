var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const resError = require('./service/resError');

var postsRouter = require('./routes/posts');
var usersRouter = require('./routes/users');

var app = express();

require('./connections');
require('./service/process');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(postsRouter);
app.use('/users', usersRouter);

app.use(function (req, res, next) {
  res.status(404).json({
    status: 'error',
    message: '無此路由資訊',
  });
});

app.use(function (err, req, res, next) {
  // dev
  err.statusCode = err.statusCode || 500;
  if (process.env.NODE_ENV === 'dev') {
    return resError.resErrorDev(err, res);
  }
  // production
  if (err.name === 'ValidationError') {
    err.message = '資料欄位未填寫正確，請重新輸入！';
    err.isOperational = true;
    return resError.resErrorProd(err, res);
  }
  resError.resErrorProd(err, res);
});

module.exports = app;
