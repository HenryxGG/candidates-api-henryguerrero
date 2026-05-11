//const mongoose = require('mongoose');
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({ // Creamos el esquema de Mongoose para el modelo de candidato
 name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    minlength: [2, 'Mínimo 2 caracteres'],
    maxlength: [20, 'Máximo 20 caracteres'],
    trim: true,
 },
 lastname:{
    type: String,
    required: [true, 'El apellido es obligatorio'],
    minlength: [1, 'Mínimo 1 caracter'],
    maxlength: [50, 'Máximo 50 caracteres'],
  trim: true,
 },
 email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    trim: true,
    match: [/\S+@\S+\.\S+/, 'Email no válido'],
 },
 age: {
    type: Number,
    required: [true, 'La edad es obligatoria'],
    min: [18, 'Debe ser mayor de 18'],
    max: [100, 'Edad no válida'],
 },
 status: {
    type: String,
    enum: {
    values: ['Pending','Reviewing','Interviewing','Hired'],
    message: '{VALUE} no es un status válido',
 }, 
 default: 'Pending',
 },
 skills: {
    type: [String],
    default: [],
 },
 linkedIn: {
    type: String,
    trim: true,
    match: [/^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/, 'URL de LinkedIn no válida'],
 },
  appliedAt: {
    type: Date,
    default: Date.now,
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
 updatedAt: {
    type: Date,
    default: Date.now,
 },
 deleted: {
    type: Boolean,
    default: false,
 },
},
 {timestamps: true,}, // Agrega campos createdAt y updatedAt automáticamente y tu lo administras con mongoose, no es necesario que lo hagas manualmente
);


module.exports = mongoose.model('Candidates', candidateSchema); // Exportamos el modelo de candidato para usarlo en otras partes de la aplicación