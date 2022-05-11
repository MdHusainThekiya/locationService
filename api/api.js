const express = require("express");
const {connectMySql} = require('./db');
const locationApi = require('./routes/locationApi');
const app = express();
const cors = require("cors");
// server configuration
require("dotenv").config();

// required-initializers
app.use(cors());
app.use(express.json());

// connecting MYSQL
connectMySql()


app.use('/locationapi', locationApi)


// Listning Server
app.listen(process.env.PORT, () => {
  if (process.env.NODE_ENV !== "development") {
    console.error(
      `NODE_ENV is set to "${process.env.NODE_ENV}" environment, but only "development" environment is VALID`
    );
    process.exit(1);
  }
  console.log(
    `Auth server for "${process.env.NODE_ENV}" environment is listning on "${process.env.PORT}"`
  );
});
