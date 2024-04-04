const mysql2 = require("mysql2");

const dbConnection = mysql2.createPool({
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  connectionLimit: 10,
});

const userTable = `CREATE TABLE IF NOT EXISTS users (
    userid INT(20) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    firstname VARCHAR(20) NOT NULL,
    lastname VARCHAR(20) NOT NULL,
    email VARCHAR(40) NOT NULL,
    password VARCHAR(100) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    PRIMARY KEY (userid)
);`;

const questionTable = `CREATE TABLE IF NOT EXISTS questions (
    id INT(20) NOT NULL AUTO_INCREMENT,
    questionid VARCHAR(100) NOT NULL UNIQUE,
    userid INT(20) NOT NULL,
    title VARCHAR(50) NOT NULL,
    description VARCHAR(200) NOT NULL,
    tag VARCHAR(20),
    PRIMARY KEY (id, questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);`;

const answerTable = `CREATE TABLE IF NOT EXISTS answers (
    answerid VARCHAR(100) NOT NULL,
    userid INT(20) NOT NULL,
    questionid VARCHAR(100) NOT NULL,
    answer VARCHAR(200) NOT NULL,
    PRIMARY KEY (answerid),
    FOREIGN KEY (questionid) REFERENCES questions(questionid),
    FOREIGN KEY (userid) REFERENCES users(userid)
);`;

dbConnection.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }

  connection.query(userTable, (err) => {
    if (err) {
      console.error("Error creating users table:", err);
    } else {
      console.log("Users table created successfully");
    }
  });

  connection.query(questionTable, (err) => {
    if (err) {
      console.error("Error creating questions table:", err);
    } else {
      console.log("Questions table created successfully");
    }
  });

  connection.query(answerTable, (err) => {
    if (err) {
      console.error("Error creating answers table:", err);
    } else {
      console.log("Answers table created successfully");
    }
  });

  connection.release();
});

module.exports = dbConnection.promise();