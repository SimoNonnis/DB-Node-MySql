var express = require('express');
var app = express();
var mysql = require('mysql');


// 1 Connect to DB
var connection = mysql.createConnection({
host : 'localhost',
user : 'root',
password : 'some_secret',
database: 'apptest'
});

// 2 Create table and insert one record and read it back
connection.connect(function (err) {
  if (err) throw err;
  console.log('You are now connected...');

  connection.query('CREATE TABLE people(id int(1) primary key NOT NULL AUTO_INCREMENT, name varchar(50), age int, address text)', function (err,  result) {
    if (err) throw err;
    connection.query('INSERT INTO people(name, age, address) VALUES (?, ?, ?)', ['Orwell', 40, 'California, USA'], function (err,  result) {
      if (err) throw err;
      connection.query('SELECT * FROM people', function (err, result) {
        if (err) throw err;
          console.log(result[0].id);
          console.log(result[0].name);
          console.log(result[0].age);
          console.log(result[0].address);
      })
    })
  })
})


app.get('/', function (req, res) {
  res.send('hello world');
})

var server = app.listen(3000, function () {
  console.log('Up and running on port ' + server.address().port);
});
