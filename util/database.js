const mysql = require('mysql2');

const dbConnectionInfo = {
    host : "database-1.cz4cenopsorr.us-west-2.rds.amazonaws.com",
    port : "3306",
    user : "admin",
    password: "4711bcit",
    database: "KnowledgeBase4711"
};

const dbconnection = mysql.createPool(
    dbConnectionInfo
);

module.exports = dbconnection.promise();

// testing
dbconnection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
});




