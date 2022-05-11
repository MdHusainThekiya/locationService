// const LocTable = require("../models");
const { sqlDB } = require("../db");

const create = (req, res) => {
  console.log("locTableController.create", req.body);
  let sqlQuery = `CREATE TABLE husain9 (
    PersonID int,
    LastName varchar(255),
    FirstName varchar(255),
    Address varchar(255),
    City varchar(255)
  );`;
  sqlDB.query(sqlQuery, (error, results, fields) => {
    if (error) {
      console.log(error.sqlMessage, "<==error");
      let result = { statusCode: 401, success: false, msg: error.sqlMessage };
      return res.status(result.statusCode).json(result);
    }
    if (results && fields) {
      console.log(results, "<==results & fields");
      let result = {
        statusCode: 200,
        success: true,
        msg: "Get Results and fields",
        status: [results, fields],
      };
      return res.status(result.statusCode).json(result);
    }
    if (results) {
      console.log(results, "<==results");
      let result = {
        statusCode: 200,
        success: true,
        msg: "Get results",
        status: results,
      };
      return res.status(result.statusCode).json(result);
    }
    if (fields) {
      console.log(fields, "<==fields");
      let result = {
        statusCode: 200,
        success: true,
        msg: "Get Fields",
        status: fields,
      };
      return res.status(result.statusCode).json(result);
    }
  });
};

const getLocation = (req, res) => {
  console.log("locTableController.getLocation", req.body);
  const { name } = req.body;
  try {
    let sqlQuery = `SELECT
        geonameid AS "ID",
        asciiname AS "Location Name",
        latitude AS "Latitude",
        longitude AS "Longitude",
        timezone AS "Zone",
        'country code' AS "Country Code",
        population AS "Population"
    FROM citiesData WHERE name="${name}" OR asciiname="${name}" OR name LIKE "%${name}%" OR asciiname LIKE "%${name}%"
    ORDER BY
        CASE
            WHEN asciiname LIKE "${name}" THEN 0
            WHEN asciiname LIKE "${name}%" THEN 1
            WHEN asciiname LIKE "%${name}%" THEN 2
            WHEN asciiname LIKE "%${name}" THEN 3
            ELSE 4
        END
    LIMIT 1`;
    sqlDB.query(sqlQuery, (error, results, fields) => {
      if (error) {
        console.log(error.sqlMessage, "<==error");
        let result = {
          statusCode: 401,
          success: false,
          msg: error.sqlMessage,
        };
        return res.status(result.statusCode).json(result);
      } else if (results && fields && Object.keys(results).length > 0) {
        console.log(results, "<==results & fields");
        let result = {
          statusCode: 200,
          success: true,
          msg: "Get Results and fields",
          status: results,
        };
        return res.status(result.statusCode).json(result);
      } else if (results && Object.keys(results).length > 0) {
        console.log(results, "<==results");
        let result = {
          statusCode: 200,
          success: true,
          msg: "Get results",
          status: results,
        };
        return res.status(result.statusCode).json(result);
      } else {
        console.log("Not Found");
        let result = {
          statusCode: 404,
          success: false,
          msg: "Not Found",
        };
        return res.status(result.statusCode).json(result);
      }
    });
  } catch (error) {
    console.log(error);
    let result = {
      statusCode: 401,
      success: false,
      msg: "We are not able to process your request",
    };
  }
};

module.exports = {
  create,
  getLocation,
};
