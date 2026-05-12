const { message } = require('statuses');
const candidateModel = require('../models/candidate'); //importamos el modelo de candidato tiene acceso a db
const { RunCommandCursor } = require('mongodb');

const getAll = async (_req, res) => {
    const filter = { deleted: false }; // Solo candidatos no eliminados
    const candidates = await candidateModel.find(filter); // Busca todos los candidatos que no estén marcados como eliminados (deleted: false) y devuelve la lista de candidatos encontrados en formato JSON. Si no se encuentran candidatos, devolverá un array vacío.
    res.json(candidates); 
};
const getById = async (req, res) => {
    const { id } = req.params;
    const filter = { _id: id, deleted: false }; // Solo candidatos no eliminados
    const candidate = await candidateModel.findOne(filter); // Busca un candidato por su ID utilizando el método getById del modelo de candidato. Si el candidato no se encuentra, devuelve null.
    if (!candidate) {
        return res.status(404).json({ message: "Candidato no encontrado" });
    }
    res.json(candidate); // no fue encontrado 404 - fue encontrado 200 

};
exports.getAll = getAll;
exports.getById = getById;


const create = async (req, res) => {
    try {
     if(!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({status:0, message: "Datos del candidato son requeridos"});
     }
        console.log("Candidato creado:", req.body);
    const candidate = await candidateModel.create(req.body);
    res.status(201).json(candidate); //crea un nuevo candidato con los datos enviados en el cuerpo de la solicitud. Si la creación es exitosa, devuelve el nuevo candidato con un estado 201.
} catch (error) {
    console.log("Algo fallo ", error);
    res.status(500).json({status:0, message: "Error al crear el candidato"});// Si ocurre un error, devuelve un mensaje de error con un estado 500, ocultando detalles específicos del error para evitar exponer información sensible.
};
};//crea un nuevo candidato con los datos enviados en el cuerpo de la solicitud. Si la creación es exitosa, devuelve el nuevo candidato con un estado 201. Si ocurre un error, devuelve un mensaje de error con un estado 500.

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await candidateModel.findOneAndUpdate(
      { _id: id, deleted: false }, // filtro
      req.body, // datos nuevos
      { returnDocument: 'after', runValidators: true } // opciones
    );
    if (!candidate) {
      return res.status(404).json({ message: "Candidato no encontrado" });
    }
    res.json(candidate);
  } catch (error) {
    console.log("Algo falló", error);
    res.status(500).json({ status: 0, message: "Error al actualizar el candidato" });
  }
}; // actualiza un candidato por su ID. Si el candidato no se encuentra, devuelve un mensaje de error con un estado 404. Si la actualización es exitosa, devuelve el candidato actualizado con un estado 200. Si ocurre un error, devuelve un mensaje de error con un estado 500, ocultando detalles específicos del error para evitar exponer información sensible.

const remove = async (req, res) => {
        const { id } = req.params;
        const filter = { _id: id, deleted: false }; // filtro
        const candidateDeleted = await candidateModel.findOneAndUpdate(
            filter,
            { deleted: true }, // datos nuevos
            {
            returnDocument: 'after', 
            runValidators: true
            }
    );
     if (!candidateDeleted) {
      return res.status(404).json({ message: "Candidato no encontrado" });
    };
    res.json({ status: 1, candidateDeleted });

}; //  elimina un candidato por su ID. Si el candidato no se encuentra, devuelve un mensaje de error con un estado 404. Si la eliminación es exitosa, devuelve un mensaje de confirmación con un estado 200.

exports.update = update;
exports.remove = remove;
exports.create = create;