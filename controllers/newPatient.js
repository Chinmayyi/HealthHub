import db from '../models/index.js';

export const newPatient = async (req, res) => {
    try {
        if (req.body) {
            const { name, age, gender, bloodGroup, contact, medicalHistory, symptoms, department, doctor} = req.body;
            const patient = await db.models.Patient.create({ 
                name, 
                age, 
                gender, 
                bloodGroup, 
                contact, 
                medicalHistory
            });
    
            await db.models.Appointment.create({
                patientId: patient.patientId,
                symptoms, 
                department, 
                doctor
            });
    
            res.redirect('/home');
        } else {    
            res.redirect('/newAppointment');
        }
    } catch (err) {
        console.log(err);
        const errorMessage = err.original.sqlMessage || 'An error occurred.';

        res.send(`
                    <script>
                        alert('${errorMessage}');
                        window.location.href = '/regAppointment';
                    </script>
                `);
        // res.redirect('/newAppointment');
    }

};
