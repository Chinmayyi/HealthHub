export default (sequelize, DataTypes) => {
    const Prescription = sequelize.define('prescription', {
        appointmentId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        prescription: DataTypes.STRING(100)
    },
    {});

    return Prescription;
};