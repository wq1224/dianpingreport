var express = require('express');
var router = express.Router();
var model = require('../model')
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var shopsql = require('../db/shopsql');
var pool = mysql.createPool( dbConfig.mysql );


//定义一个get请求 path为根目录
/* GET home page. */
router.get('/getAllShops', function(req, res, next) {
    //var data = model.getShops()
     pool.getConnection(function(err,connection){
     	connection.query(shopsql.queryAll, function (err, result) {
	        if (err) {
	            console.log("getShop Error: " + err.message);
	            return;
	        }
	        debugger;
	        var response = {status:1,data:result};
		  	res.send(JSON.stringify(response));
	        connection.release();
	        console.log("invoked[getShops]");
    	});
        //callback(err,result);                     
    }); 
	
});
module.exports = router;