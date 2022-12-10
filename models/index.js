let { Sequelize, DataTypes } = require("sequelize");

let env = process.env.NODE_ENV || "development";
// environment variables are variable a computer stores

console.log("Using environment: " + env);

let configFile = require(__dirname + "/../config.json");
let config = configFile[env];

let password = process.env.DB_PASSWORD; // undefined locally, not needed with sqlite
// The DB_PASSWORD env variable will be set in Azure
config.password = password;

let db = {};

let sequelize = new Sequelize(config);

let studentModelCreate = require("./student"); // Function Definition
let studentModel = studentModelCreate(sequelize, DataTypes);

db[studentModel.name] = studentModel;

db.sequelize = sequelize; // sequelize config
db_Sequelize = Sequelize; // Sequelize library

module.exports = db;
