const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const engine = require("ejs-mate");
const path = require('path');
require('dotenv').config(); //when use env file
var cors = require('cors')
var corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,

}
const app = express(); // Initialize Express app
const methodOverride = require('method-override')// used to fake delete and put patch request in browser form 
app.use(methodOverride('_method'));
app.use(cors(corsOptions))

main().catch(err => console.log(err));
// async function main() {
//     await mongoose.connect();//url /database name

//     // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
//     await mongoose.connect(process.env.MONGO_URI); //if in env file
// }
async function main() {
    await mongoose.connect(process.env.MONGO_URI);
}
main().catch(err => console.log(err));


app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views')); // Set the directory where the view templates are located:  telling Express: "Whenever I call res.render('something'), treat something as an .ejs file."
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data from form submissions
app.use(morgan('tiny'));

//require all models
const User = require('./models/User');



const medicineRoutes = require('./routes/medicine');
app.use('/medicine',medicineRoutes);//route defintion starting with /medicine is in ./routes/medicine
const AppointmentRoutes = require('./routes/Appointment');
app.use('/appointments',AppointmentRoutes);//route defintion starting with /medicine is in ./routes/medicine


app.post('/signup', async (req, res) => {
    const { username, password, email, age, gender, role, medicalConditions, doctor } = req.body;
    try {
        const newuser = new User({ username: username, email: email, age: age, gender: gender, role: role, medicalConditions: medicalConditions, doctor: doctor });
        const saved_user = await newuser.save();
        const userId = saved_user._id;
        console.log(`data saved! for ${userId}`)
        res.json({ msg: "data saved success!", userId: userId })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error while saving data" })
    }

})

app.post('/login', async (req, res) => {
    console.log("qwerty")
    const { username, email } = req.body;
    try {
        const getuser = await User.findOne({ email: email });
        if (getuser) {
            console.log("asdfgh")
            res.status(200).json({ msg: "user data fetched!!", userId: getuser._id.toString() })
        } else {
            console.log("qweegfgggggrty")
            res.status(500).json({ msg: "Invalid user!!" })
        }
    } catch {
        console.log("eegegegegeegeg")
        res.status(500).json({ msg: "we ran into a problem :(" })
    }
})

app.get('/user/:id', async (req, res) => {
    try {
        const userid = req.params.id;
        const getUser = await User.findOne({ _id: userid });
        console.log(getUser);
        res.status(202).json({ data: getUser });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ msg: "error while saving data" })
    }
})


app.listen(3000, () => {
    console.log("listening to port 3000");
})
