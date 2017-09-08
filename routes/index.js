const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const config = require('../config/config');
const jssdk = require('../libs/jssdk');

/* GET home page. */
router.get('/wechat/hello', function(req, res, next) {
    console.log(req.body);
    res.render('index', { title: 'Hello, wechat!' });
});

const token = config.token;


/**
 * Wechat verify
 */

router.get('/wechat/verify', function(req, res, next) {

    const { signature, timestamp, nonce, echostr } = req.query;

    if (!signature || !timestamp || !nonce || !echostr) {
        res.send("Invalid request!");
    }

    // 将token、timestamp、nonce三个参数进行字典序排序
    const params = [token,timestamp, nonce];
    params.sort();

    // 将三个参数字符串拼接成一个字符串进行sha1加密
    const str = params.join('');
    const hash = crypto.createHash("sha1");
    const sign = hash.update(str).digest("Hex");
    if(sign === signature){
      res.send(echostr);
    }else{
      res.send("Invalid signature!");
    }

});

router.get('pages/index.html',function(req,res,next){

});

router.get('/wechat/signature', function(req, res, next) {

    console.log('req query',req.query);

    let url = req.query.url? req.query.url: 'http://mp.beibjia.com' + req.url;
    url = url.split('#')[0];

    console.log(url)
    jssdk.getSignPackage(url, function(err, signature) {
        if (err) {
            return next(err);
        }
        console.log(signature)
        res.jsonp({ code: 200, data: signature });
    })
})

module.exports = router;