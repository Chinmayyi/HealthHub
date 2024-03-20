export default (sequelize, DataTypes) => {
    const Appointment = sequelize.define('appointment', {
        patientId: DataTypes.INTEGER,
        symptoms: DataTypes.STRING(50),
        department: DataTypes.STRING(15),
        doctor: DataTypes.STRING(30)
    },
    {});

    return Appointment;
};