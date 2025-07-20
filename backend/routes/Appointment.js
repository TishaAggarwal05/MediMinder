const express= require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');



router.post("/:userId", async (req, res) => {
  try {
    const { doctorName, address, time, date } = req.body;
    const {userId} = req.params;//no auth done yet
    // const userId = req.user._id; // assuming you use auth middleware

    const newAppt = new Appointment({ userId, doctorName, address, time, date });
    await newAppt.save();

    res.status(201).json({ message: "Appointment saved", data: newAppt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:userId", async(req,res)=>{
    try{
        const {userId}= req.params;
        const getAppts = await Appointment.find({userId});
        console.log("all appointment lists is here:",getAppts);
        res.status(201).json(getAppts);
    }catch (err) {
    res.status(500).json({ error: err.message });
  }
})

module.exports = router;