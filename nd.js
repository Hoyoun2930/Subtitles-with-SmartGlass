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