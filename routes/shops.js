var express = require('express');
var router = express.Router();
var model = require('../model')

//定义一个get请求 path为根目录
/* GET home page. */
router.get('/getAllShops', function(req, res, next) {
    var data = model.getAllShops
    debugger
	var response = {status:1,data:data};
	  res.send(JSON.stringify(response));
});
module.exports = router;