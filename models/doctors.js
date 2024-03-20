export default (sequelize, DataTypes) => {
    const Doctor = sequelize.define('doctor', {
        doctorId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(30),
        specialization: DataTypes.STRING(50),
        contact: DataTypes.STRING(10),
        availability: DataTypes.STRING(50)
    },
    {});

    return Doctor;
};

