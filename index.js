var express = require('express');
var app = express();

var shops = require('./routes/shops')

app.use(express.static('public'));

// app.get('/shops', function (req, res) {
//   res.send('Hello World!');
// });
app.use('/shops', shops);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});