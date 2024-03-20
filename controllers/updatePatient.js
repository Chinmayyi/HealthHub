import db from '../models/index.js';

export const updatedDetails = async (req, res) => {
    try{
        const { patientIdHidden, name, age, gender, bloodGroup, contact, medicalHistory } = req.body;
        const patientInformation = await db.models.Patient.findByPk(patientIdHidden);

        patientInformation.name = name;
        patientInformation.age = age;
        patientInformation.gender = gender;
        patientInformation.bloodGroup = bloodGroup;
        patientInformation.contact = contact;
        patientInformation.medicalHistory = medicalHistory;

        // Save the updated patient details
        await patientInformation.save();

        res.redirect('/patient-details');
        
        // res.render('patient-details.ejs', { 
        //     hideDiv: false,
        //     allAppointments: allAppointments,
        //     patientInformation: patientInformation
        //   }); 
    } catch (err) {
        console.log(err);
        res.redirect('/patient-details');
    }
    
};
