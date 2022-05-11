const mysql = require("mysql");
require("dotenv").config();

const sqlDB = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT,
});

const connectMySql = () => {
  try {
    sqlDB.connect((error) => {
      if (error) {
        console.error("mysql connection error");
        // setTimeout(()=>{
        //   connectMySql()
        // }, 2000);
      }
      console.log("mysql connected successfully");
    });
    sqlDB.on("error", (error) => {
      console.log(error.message, "Reconnecting with database...");
      if (error.code === "PROTOCOL_CONNECTION_LOST") {
        connectMySql();
      } else {
        console.log("Unknow error while connecting with MY SQL", error.message);
      }
    });
  } catch (error) {
    console.log("Unknow error while connecting with MY SQL", error.message);
  }
};

module.exports = { connectMySql, sqlDB };
