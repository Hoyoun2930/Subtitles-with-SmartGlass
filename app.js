var express = require('express');
var app = express();
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');
var mysql      = require('mysql');
var client = mysql.createConnection({
    user: 'root',
    password: '0505',
    host: 'localhost',
    port: 3306,
    database: 'test_node'
});

client.connect();
 
// 데이터베이스 쿼리를 사용합니다.
// function 을 이용하여 반환된 결과를 확인 및 에러 발생시 처리
client.query("select * from movie_title;", function (error, result, fields) {
    if (error) 
    {
        console.log(error);
        console.log('Error.');
    } else {
        console.log(result);
        console.log('---------------');
        console.log(fields);
    }
});
 
// 명시적으로 연결 해제
client.end();
app.use(express.static(path.join(__dirname, 'public')));
app.use("/assets", express.static(__dirname + '/assets'));
app.use("/uploads", express.static(__dirname + '/uploads'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/register', function(req, res){
  res.sendFile(path.join(__dirname, 'views/page_register.html'));
});

app.post('/upload', function(req, res){

  // create an incoming form object
  var form = new formidable.IncomingForm();

  // specify that we want to allow the user to upload multiple files in a single request
  form.multiples = true;

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded successfully,
  // rename it to it's orignal name
  form.on('file', function(field, file) {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  // log any errors that occur
  form.on('error', function(err) {
    console.log('An error has occured: \n' + err);
  });

  // once all the files have been uploaded, send a response to the client
  form.on('end', function() {
    res.end('success');
  });

  // parse the incoming request containing the form data
  form.parse(req);

});

var server = app.listen(3000, function(){
  console.log('Server listening on port 3000');
});