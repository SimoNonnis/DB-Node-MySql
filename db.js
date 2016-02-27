'use strict';
var mysql = require('mysql');

// 1 Connect to DB creating mysql connection pool object.
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'your_secret_password',
  database: 'people'
});


// 2 Create table (if not exists) and build schema
var schema =  'CREATE TABLE IF NOT EXISTS `people`.`friends` ( ' +
                '`id` INT UNSIGNED NOT NULL AUTO_INCREMENT, ' +
                '`name` VARCHAR(100) NOT NULL, ' +
                '`occupation` VARCHAR(100) NOT NULL, ' +
                '`description` TEXT NOT NULL, ' +
                'PRIMARY KEY (`id`) ' +
              ');';
var insertRecord = 'INSERT INTO friends(name,occupation, description) VALUE(?,?,?)';
var readTable = 'SELECT * FROM friends';
var updateRecord = 'UPDATE friends SET description = ? WHERE name= ?';
var deleteRecord = 'DELETE FROM friends WHERE name= ?';
var dropTable = 'DROP TABLE friends';




// 3 Establishing explicit DB connection
pool.getConnection(function (err, connection) {
  if (err) return console.log('error connecting: ' + err.stack);
  console.log('Connection to DB mysql established with threadID: ' + connection.threadId);

  // 1.Creating schema
  connection.query(schema, function (err) {
    if (err) throw err;
    console.log('Successfully created schema');
  });

  // 2.Inserting data in table
  connection.query(insertRecord, ['Jack London', 'writer', 'I believe that when I am dead, I am dead. I believe that with my death I am just as much obliterated as the last mosquito you and I squashed.'], function (err, res) {
    if (err) throw err;
    console.log('Successfully Inserted data \n' + res);
  });

  // 3.Select All data in the table
  connection.query(readTable, function (err, res) {
    if (err) throw err;
    console.log(res);
  });

  // 4.Update to some table record
  connection.query(updateRecord, ['I believe that when I am dead, I am dead.', 'Jack_London'], function (err) {
    if (err) throw err;
    console.log('Successfully updated description');
  });

  // 5.Delete a record
  connection.query(deleteRecord, ['Jack London'], function (err) {
    if (err) throw err;
    console.log('Successfully deleted one record');
  })

  // Drop all table
  connection.query(dropTable, function (err) {
    if (err) throw err;
    console.log('Successfully deleted Table');
  });

  // Release the connection
  // connection.release(function (err) {
  //   if (err) throw err;
  //   console.log('Connection released');
  // });

});

// Closing DB connection
// pool.end(function (err) {
//   if (err) throw err;
//   console.log('Connection to DB mysql closed');
// });











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






module.exports = pool;
