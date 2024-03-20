import db from '../models/index.js';
import Op from 'sequelize';



export const appointmentDetails = async (req, res) => {
    try{
        const today = new Date();
        let startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        // console.log(startOfToday.toISOString().slice(0, 10));

        const istOffset = 5.5 * 60 * 60 * 1000; // Offset for IST in milliseconds
        startOfToday = new Date(startOfToday.getTime() + istOffset);
        // console.log(startOfToday.toISOString().slice(0, 10));

        const appointments = await db.models.Appointment.findAll({
            where: db.sequelize.where(db.sequelize.fn('DATE', db.sequelize.col('Appointment.createdAt')), '=', startOfToday.toISOString().slice(0, 10)),
            include: [{
              model: db.models.Patient,
              attributes: ['name']
            }, {
              model: db.models.Prescription,
              attributes: ['appointmentId']
            }]
          });

        return appointments;  
    } catch (err) {
        console.error('Error fetching appointments:', err);
    }
    
};






  

  


