const bcrypt = require("bcrypt"); //importamos bcrypt para encriptar las contraseñas
const jwt = require("jsonwebtoken"); //importamos jsonwebtoken para generar tokens de autenticación
const userModel = require("../models/user"); //importamos el modelo de candidato tiene acceso a db

const JWT_SECRET = process.env.JWT_SECRET;

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({email, deleted: false}); 
    if (!user) {
        return res.status(401).send({ message: "Credenciales inválidas" });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if(!isValid) {
        return res.status(401).send({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user._id, email: user.email}, JWT_SECRET, 
        { expiresIn: "15min" });
        res.send({ token, id: user._id });
};
const register = async (req, res) => {
    const { email, password } = req.body;
    const exist = await userModel.findOne({email, deleted: false}); // Busca un usuario por su email utilizando el método find del modelo de usuario. Si el usuario no se encuentra, devuelve null.
    if (exist) {
        return res.status(409).send({ message: "Datos inválidos" },);
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await userModel.create({ email, password: hash });
    return res.send({message: "Cuenta creada", id: user.email});
};
exports.login = login;
exports.register = register;

