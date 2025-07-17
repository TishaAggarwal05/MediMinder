const mongoose = require("mongoose");




const appointmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorName: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // optional: format it in UI like HH:MM
  notes: { type: String }, // optional
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
