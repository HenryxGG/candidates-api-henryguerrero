const requestTimer = (req, res, next) => {
 const start = Date.now(); // tiempo de inicio
 // Cuando la respuesta termine, calculamos cuánto tardó
 res.on('finish', () => {
 const duration = Date.now() - start;
 console.log(
 `[${req.method}] ${req.url} → ${res.statusCode}
(${duration}ms)`);});
 next();
};
module.exports = requestTimer;