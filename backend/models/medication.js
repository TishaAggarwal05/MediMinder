// models/Medication.js
const mongoose = require('mongoose');

const medicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  drugName: {
    type: String,            
    required: true
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'multiple'], // user-chosen frequency
    required: true
  },
  times: [String], // e.g. ["08:00", "20:00"] — multiple times in a day
  weeklyDays: [String], // ["Monday", "Thursday"] — only if frequency is weekly
  startDate: {
    type: Date,
  },
  endDate: Date, // nullable, null = never-ending
  direction: String, // optional text e.g., "Take after food"
  dose: String,      // optional e.g., "500mg"
  status: [
    {
      date: String, // YYYY-MM-DD
      timeStatus: {
        type: Map,  // key = time string, value = boolean (taken or not)
        of: Boolean
      }
    }
  ]
});

module.exports = mongoose.model('Medication', medicationSchema);
