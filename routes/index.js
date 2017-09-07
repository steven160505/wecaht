var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/wechat/hello', function(req, res, next) {
  res.render('index', { title: 'Hello, wechat!' });
});

module.exports = router;
