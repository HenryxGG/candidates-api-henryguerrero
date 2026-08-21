const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  salary: { type: Number, required: true },
  status: {type: String, enum: ["Open", "Closed"], default: "Open" },
  deleted: { type: Boolean, default: false } 
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);