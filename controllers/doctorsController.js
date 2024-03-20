import db from '../models/index.js';

export const addDoctor = async (req, res) => {
    try {
        if (req.body) {
            const { name, specialization, contact, availability } = req.body;
            await db.models.Doctor.create({ name, specialization, contact, availability });

            res.redirect('/home'); // Redirect to home page after successfully adding the doctor
        } else {
            res.send(`
                    <script>
                        alert('No request body received.');
                        window.location.href = '/add-doctor';
                    </script>
                `);
        }
    } catch (err) {
        console.error('Error adding new doctor:', err);
        res.send(`
                <script>
                    alert('Error adding new doctor.');
                    window.location.href = '/add-doctor';
                </script>
            `);
    }
};

export const listDoctors = async (req, res) => {
    try {
        const doctors = await db.models.Doctor.findAll();
        res.render('list-doctors.ejs', { doctors, hideDiv: false });
    } catch (err) {
        console.error('Error fetching doctors:', err);
        res.send(`
                <script>
                    alert('Error fetching doctors.');
                    window.location.href = '/doctors';
                </script>
            `);
    }
};
// In your routes file (e.g., doctors.js)
export const deleteDoctor = async (req, res) => {
    try {
        const hiddenId  = req.body.hiddenId;
        const deletedDoctor = await db.models.Doctor.destroy({ where: { doctorId: hiddenId } });
        if (deletedDoctor > 0) {
            res.send(`
                <script>
                    alert('Doctor deleted successfully.');
                    window.location.href = '/list-doctors';
                </script>
            `);
        } else {
            res.send(`
                <script>
                    alert('Doctor not found.');
                    window.location.href = '/list-doctors';
                </script>
            `);
            
        }
    } catch (err) {
        console.error('Error deleting doctor:', err);
        res.send(`
                <script>
                    alert('Error deleting doctor.');
                    window.location.href = '/list-doctors';
                </script>
            `);
    }
};
