const JobModel = require("../models/jobs");

const getAll = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    filter.deleted = false;

    const jobsList = await JobModel.find(filter);
    res.send(jobsList);
  } catch (error) {
    console.log("Error al obtener jobs", error);
    res.status(500).json({ status: 0, message: "Error al obtener los jobs" });
  }
}; // Obtiene todos los jobs, opcionalmente filtrados por status

const getById = async (req, res) => {
  try {
    const job = await JobModel.findOne({ _id: req.params.id, deleted: false});
    if (!job) {
      return res.status(404).json({ message: "Job no encontrado" });
    }
    res.send(job);
  } catch (error) {
    console.log("Error al obtener job", error);
    res.status(500).json({ status: 0, message: "Error al obtener el job" });
  }
}; // Obtiene un job por su ID

const create = async (req, res) => {
  try {
    const job = await JobModel.create(req.body);
    res.status(201).send(job);
  } catch (error) {
    console.log("Error al crear job", error);
    res.status(500).json({ status: 0, message: "Error al crear el job" });
  }
}; // Crea un nuevo job con los datos enviados

const update = async (req, res) => {
  try {
    const job = await JobModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job no encontrado" });
    }
    res.send(job);
  } catch (error) {
    console.log("Error al actualizar job", error);
    res.status(500).json({ status: 0, message: "Error al actualizar el job" });
  }
}; // Actualiza un job existente por su ID

const remove = async (req, res) => {
  try {
    const job = await JobModel.findOneAndUpdate(
      { _id: req.params.id, deleted: false },
      { deleted: true },
      { new: true }
    );
    if (!job) {
      return res.status(404).json({ message: "Job no encontrado" });
    }
    res.send({ message: "Job eliminado", job });
  } catch (error) {
    console.log("Error al eliminar job", error);
    res.status(500).json({ status: 0, message: "Error al eliminar el job" });
  }
}; // Elimina un job por su ID

module.exports = { getAll, getById, create, update, remove };