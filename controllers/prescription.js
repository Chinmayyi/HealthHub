import db from '../models/index.js';

export const prescription = async (req, res) => {
    try{
        if (req.body) {
            const { hiddenId, pres} = req.body;

                await db.models.Prescription.create({
                    appointmentId: hiddenId,
                    prescription: pres
                });

                res.redirect('/todaysAppointment');
            } else {
                res.send(`
                    <script>
                        alert('Couldn't add prescription.');
                        window.location.href = '/todaysAppointment';
                    </script>
                `);

            }
    
    } catch (err) {
        console.log(err);
        res.redirect('/todaysAppointment');
    }
    
};
