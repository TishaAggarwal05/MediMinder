const express = require("express");
const router= express.Router();

const Medication = require('../models/medication');
// const Appointment = require('./models/Appointment')

router.post('/', async (req, res) => {
    try {
        const info = req.body;
        const newMed = new Medication(info);
        await newMed.save();
        res.status(201).json({ message: "medicinde added successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "error while doing task" });
    }

})
router.get('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        // const objectId = new mongoose.Types.ObjectId(userId);
        const getMed = await Medication.find({ userId: id });
        console.log("gettttt meddddddddd", getMed)
        if (getMed) {
            res.status(201).json({ msg: "got all listings of medicine", Medlist: getMed })
        } else {
            res.json({ msg: "User have no listed medicines", Medlist: [] })
        }
    }
    catch (err) {
        res.json({ msg: "some error", err })
    }
})
router.delete('/:medId', async (req, res) => {
    const { medId } = req.params;

    try {
        const deleted = await Medication.findByIdAndDelete(medId);

        if (!deleted) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        res.status(200).json({ message: 'Medication deleted successfully' });
    } catch (err) {
        console.error('Error deleting medication:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});
//edit medicine not used yet
router.patch('/:medId', async (req, res) => {
    const { medId } = req.params;
    const updateData = req.body;

    try {
        const updatedMed = await Medication.findByIdAndUpdate(medId, updateData, {
            new: true, // return the updated document
            runValidators: true, // enforce schema validation
        });

        if (!updatedMed) {
            return res.status(404).json({ message: 'Medication not found' });
        }

        res.status(200).json({ message: 'Medication updated', data: updatedMed });
    } catch (err) {
        console.error('Error updating medication:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.patch('/status/:medId', async (req, res) => {
    try{

            const { medId } = req.params;
            const { date, time, value } = req.body;
            const med = await Medication.findById(medId);
        
            const existing = med.status.find(s => s.date === date);
        
            if (existing) {
                existing.timeStatus.set(time, value); // update or add
            } else {
                med.status.push({
                    date,
                    timeStatus: new Map([[time, value]])
                });
            }
        
            await med.save();
            
            res.status(200).json({ message: 'Medication updated'});
    }catch(err){
        console.log(err);
    }



})
module.exports = router;