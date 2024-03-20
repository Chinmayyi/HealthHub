export default (sequelize, DataTypes) => {
    const Patient = sequelize.define('patient', {
        patientId: {
            type: DataTypes.INTEGER,
            primaryKey: true, 
            autoIncrement: true 
        },
        name: DataTypes.STRING(30),
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING(7),
        bloodGroup: DataTypes.STRING(5),
        contact: {
            type: DataTypes.STRING(10),
            primaryKey: true 
        },
        medicalHistory: DataTypes.STRING,
    },
    {});

    return Patient;
};