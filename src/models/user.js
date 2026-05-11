const mongoose = require('mongoose'); // Importamos Mongoose para interactuar con MongoDB

const userSchema = new mongoose.Schema({ // Creamos el esquema de Mongoose para el modelo de usuario
    
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
        },
        deleted: {
            type: Boolean,
            default: false,
        }
    });

    module.exports = mongoose.model('User', userSchema);