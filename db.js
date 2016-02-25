'use strict';
var mysql = require('mysql');

// 1 Connect to DB
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'secret',
  database: 'people'
});

// 2 Create table and insert one record and read it back
connection.connect(function (err) {
  if (err) throw err;
  console.log('You are now connected to DB mysql...');

  connection.query(
    'CREATE TABLE IF NOT EXISTS `people`.`friends` ( ' +
    '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
    '`name` VARCHAR(100) NOT NULL, ' +
    '`occupation` VARCHAR(100) NOT NULL, ' +
    '`description` TEXT NULL, ' +
    'PRIMARY KEY (`id`));', function (err) {
      if (err) throw err;
      console.log('Successfully created schema');
      connection.end();
    });

});

// 'CREATE TABLE people(id int(1) primary key NOT NULL AUTO_INCREMENT, name varchar(50), age int, address text)', function (err,  result) {
//
// connection.query('INSERT INTO people(name, age, address) VALUES (?, ?, ?)', ['Orwell', 40, 'California, USA'], function (err,  result) {
//
//   connection.query('SELECT * FROM people', function (err, result) {
//     if (err) throw err;
//       console.log(result[0].id);
//       console.log(result[0].name);
//       console.log(result[0].age);
//       console.log(result[0].address);
//   });
// });






module.exports = connection;
