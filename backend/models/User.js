const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String }, // For future auth integration

  role: { type: String, enum: ['patient', 'caregiver'], default: 'patient' },

  // Medical profile details
  medicalConditions: [
    {
      name: { type: String },
      type: { type: String, enum: ['chronic', 'acute', 'other'], default: 'other' },
      diagnosedDate: { type: Date },
      notes: { type: String }
    }
  ],

  doctor: [{
    name: { type: String },
    contact: { type: String },
    clinicAddress: { type: String }
  }],

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
