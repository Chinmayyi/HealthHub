// import Sequelize from "sequelize";
// import dbConfig from "../config/db-config.js";


// const sequelize = new Sequelize (dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
//     host: dbConfig.HOST,
//     dialect: dbConfig.DIALECT
// });

// const db = {};
// db.sequelize = sequelize;
// db.models = {};
// db.models.User = require("./users") (sequelize, Sequelize.DataTypes);

// module.exports = db;


import Sequelize from "sequelize";
import dbConfig from "../config/db-config.js";
import User from "./users.js";
import Patient from "./patients.js";
import Appointment from "./appointments.js";
import Prescription from "./prescription.js";
import Doctor from "./doctors.js";

const { DATABASE, USER, PASSWORD, HOST, DIALECT } = dbConfig;

const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    logging: false
});

const db = {
    sequelize,
    models: {
        User: User(sequelize, Sequelize.DataTypes),
        Patient: Patient(sequelize, Sequelize.DataTypes),
        Prescription: Prescription(sequelize, Sequelize.DataTypes),
        Appointment: Appointment(sequelize, Sequelize.DataTypes),
        Doctor: Doctor(sequelize, Sequelize.DataTypes),
    }
};

db.models.Appointment.belongsTo(db.models.Patient, { foreignKey: 'patientId' });
db.models.Appointment.belongsTo(db.models.Prescription, { foreignKey: 'id' });

export default db;

