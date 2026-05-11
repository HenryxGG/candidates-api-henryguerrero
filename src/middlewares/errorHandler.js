const errorHandler = (err, req, res, next) => {
 console.log("Error handler Log", err);
 const status = err.statusCode || 500;
 res.status(status).json({
    message: "Error del servidor",
 })
}; 
module.exports = errorHandler;