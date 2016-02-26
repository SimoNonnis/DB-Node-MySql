'use strict';
var mysql = require('mysql');

// 1 Connect to DB
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : 'your_secret',
  multipleStatements: true
});

// 2 Establishing explicit DB connection (at point 1 connection was already done)
connection.connect(function (err) {
  if (err)  {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Connection to DB mysql established with threadID: ' + connection.threadId);
});


// 3 Create table (if not exists) and build schema
var schema =  'CREATE DATABASE IF NOT EXISTS `people`; ' +
              'USE `people`; ' +
              'CREATE TABLE IF NOT EXISTS `people`.`friends` ( ' +
                '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
                '`name` VARCHAR(100) NOT NULL, ' +
                '`occupation` VARCHAR(100) NOT NULL, ' +
                '`description` TEXT NULL, ' +
                'PRIMARY KEY (`id`) ' +
              ');';

var createSchema = connection.query(
  schema
  , function (err) {
      if (err) throw err;
      console.log('Successfully created schema');
});


// 4 Closing DB connection
connection.end(function (err) {
  if (err) throw err;
  console.log('Connection to DB mysql closed');
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
