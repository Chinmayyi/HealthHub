import express from "express";
import bodyParser from "body-parser";
import db from "./models/index.js";
import {create} from "./controllers/users.js";
import {login} from "./controllers/login.js";
import {newPatient} from "./controllers/newPatient.js";
import {regPatient} from "./controllers/regPatient.js";
import {patientDetails} from "./controllers/patient-details.js";
import {appointmentDetails} from "./controllers/todaysAppointment.js";
import {updatedDetails} from "./controllers/updatePatient.js";
import { addDoctor, listDoctors, deleteDoctor } from "./controllers/doctorsController.js";
import {prescription} from "./controllers/prescription.js";

const app = express();
const port = 3000;

// Use body-parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// // Set view engine to EJS
// app.set('view engine', 'ejs');

(async() => {
  await db.sequelize.sync({alter:true});
}) ();

// Define routes
app.get('/', (req, res) => {
  res.render('Landing.ejs', { hideDiv: true });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { hideDiv: true });
});

app.get("/register", (req, res) => {
  res.render("register.ejs", { hideDiv: true });
});

app.get('/home', (req, res) => {
  res.render('home.ejs', { hideDiv: false });
});

app.get('/appointment', (req, res) => {
  res.render('appointment.ejs', { hideDiv: false });
});

app.get('/newAppointment', async (req, res) => {
  res.render('newPatient.ejs', { hideDiv: false });
});

app.get('/regAppointment', async (req, res) => {
  try {
    res.render('regPatient.ejs', { hideDiv: false });
  } catch (err) {
      console.error(err);
      res.redirect('/regAppointment');
    }
  
});

app.post('/fetchDoctors', async (req, res) => {
  const department = req.body.department;
  try {
    const doctors = await db.models.Doctor.findAll({ where: { specialization: department } });
    res.json(doctors);
  } catch (error) {
    console.error('Error fetching doctors:', error);
  }
});

app.get('/patient-details', (req, res) => {
  res.render('patient-details.ejs', { 
    hideDiv: false,
    allAppointments: patientDetails.allAppointments,
    patientInformation: patientDetails.patientInformation
  });
});

// app.get('/todaysAppointment', (req, res) => {
//   res.render('todaysAppointment.ejs', { 
//     hideDiv: false,
//     appointments: appointmentDetails.appointments,
//   });
// });

app.get('/todaysAppointment', async (req, res) => {
  try {
    const appointments = await appointmentDetails(); // Call the function to get appointments
    res.render('todaysAppointment.ejs', { 
      hideDiv: false,
      appointments: appointments,
    });
  } catch (err) {
    console.error('Error fetching appointments:', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/doctors', (req, res) => {
  res.render('doctors.ejs', { hideDiv: false });
});
app.get('/add-doctor', (req, res) => {
  res.render('add-doctor.ejs', { hideDiv: false });
});

app.get('/list-doctors', listDoctors);


app.post("/register", create);

app.post("/login", login);

app.post("/newAppointment", newPatient);

app.post("/regAppointment", regPatient);

app.post("/allAppointment", patientDetails);

app.post('/updatePatient', updatedDetails);

app.post('/add-doctor', addDoctor);

app.post('/delete-doctor', deleteDoctor);

app.post("/prescription", prescription);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });