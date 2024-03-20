import db from '../models/index.js';

export const patientDetails = async (req, res) => {
    try{
        let allAppointments = [];
        let patientInformation;

        if (req.body.contact) { 
            const contact = req.body.contact;

            patientInformation = await db.models.Patient.findOne({
                where : {
                    contact
                }
            });

            allAppointments = await db.models.Appointment.findAll({
                where : {
                    patientId: patientInformation.patientId
                },
                include: [{
                    model: db.models.Prescription,
                    attributes: ['prescription']
                  }]
            });

        }
        
        res.render('patient-details.ejs', { 
            hideDiv: false,
            allAppointments: allAppointments,
            patientInformation: patientInformation
          }); 
    } catch (err) {
        console.log(err);
        res.send(`
                    <script>
                        alert('Patient not found with the provided phone number.');
                        window.location.href = '/patient-details';
                    </script>
                `);
        // res.redirect('/patient-details');
    }
    
};
