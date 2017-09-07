var express = require('express');
var router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/wechat/hello', function(req, res, next) {
    console.log(req.body);
    res.render('index', { title: 'Hello, wechat!' });
});

const token = 'yN6GA75XaxSFgIlDL7D5';

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

module.exports = router;