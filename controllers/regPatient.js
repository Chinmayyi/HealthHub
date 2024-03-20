import db from '../models/index.js';

export const regPatient = async (req, res) => {
    try{
        if (req.body) {
            const { contact, symptoms, department, doctor} = req.body;

            const existingPatient = await db.models.Patient.findOne({ where: { contact } });
    
            if (existingPatient) {

                const patientId = existingPatient.patientId;

                await db.models.Appointment.create({
                    patientId,
                    symptoms, 
                    department, 
                    doctor
                });

                res.redirect('/home');
            } else {
                res.send(`
                    <script>
                        alert('Patient not found with the provided phone number.');
                        window.location.href = '/regAppointment';
                    </script>
                `);

                // res.redirect('/regAppointment');
            }
    
            
        } else {
            res.redirect('/regAppointment');
        }
    } catch (err) {
        console.log(err);
        // res.redirect('/regAppointment');       

        const errorMessage = err.original.sqlMessage || 'An error occurred.';

        res.send(`
                    <script>
                        alert('${errorMessage}');
                        window.location.href = '/regAppointment';
                    </script>
                `);
    }
    
};
