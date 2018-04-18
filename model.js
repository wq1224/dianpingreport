var mysql = require('mysql');
var dbConfig = require('./db/DBConfig');
var shopsql = require('./db/shopsql');

// pool.on('connection', function(connection) {  
//     connection.query('SET SESSION auto_increment_increment=1'); 
// });
var pool = mysql.createPool( dbConfig.mysql );

var query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {
          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
}

var getShops = function(){
    return query(shopsql.queryAll)
}

var getData = function(result){
    //
}

module.exports.getShops = getShops
module.exports.getData = getData
// async function getData() {
//   var dataList = await query(shopsql.queryAll)
//   debugger;
//   return dataList
// }
// module.exports = getData()
// query(shopsql.queryAll).then(
//     function(data){ 
//         module.exports = data
//         debugger;
//     }
// )

//module.exports = getData()

// function Shop(shop){
//     this.shopid = shop.id
//     this.shopname = shop.shopname
//     this.shoplevel = shop.shoplevel
//     this.shopurl = shop.shopurl
//     this.commentnum = shop.commentnum
//     this.avgcost = shop.avgcost
//     this.taste = shop.taste
//     this.envi = shop.envi
//     this.service = shop.service
//     this.foodtype = shop.foodtype
//     this.loc = shop.loc
//     this.poi = shop.poi
//     this.addr = shop.addr
//     this.label = shop.label
// };
// module.exports = Shop;

// function select(sql) { 
//     var promise = new Promise(function(resolve,reject) { 
//         pool.getConnection(function(err, connection) {

//             Shop.getShops = function getShops(callback) {

//         //var sql = "select * from dianping ";

//         connection.query(shopsql.queryAll, function (err, result) {
//             if (err) {
//                 console.log("getUserNumByName Error: " + err.message);
//                 return;
//             }
//             connection.release();

//             console.log("invoked[getShops]");
//             callback(err,result);                     
//         });        
//     };
 
// });