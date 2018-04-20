var express = require('express');
var router = express.Router();
var model = require('../model')
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var shopsql = require('../db/shopsql');
var pool = mysql.createPool( dbConfig.mysql );
var model = require('../model')

var all_shop_data = undefined;
//model.getShops().then(function(data){
 	 //all_shop_data = data
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

//定义一个get请求 path为根目录
/* GET home page. */
router.get('/getAllShops2', function(req, res, next) {
	operation(req,res,null)
	//var response = {status:1,data:all_shop_data};
	//res.send(JSON.stringify(response));
	console.log("getAllShops2"+model)
});

function operation (req,res,callback){
	if (all_shop_data == undefined){
	    model.getShops().then(function(data){
	    	all_shop_data = data
	    	var response = {status:1,data:all_shop_data};
	    	res.send(JSON.stringify(response));
	    })
	}else{
		var response = {status:1,data:all_shop_data};
	    res.send(JSON.stringify(response));
	}
}

//});
module.exports = router;