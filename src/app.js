const express = require("express"); //Exportames el framework Express para crear la aplicación web
const candidaturesRoutes = require("./routes/candidateV1"); // importamos las rutas de candidatos desde el archivo "candidateV1.js"
const authRoutes = require("./routes/auth"); // importamos las rutas de autenticación desde el archivo "auth.js"
const cors = require("cors"); // Importamos el middleware CORS para manejar solicitudes de diferentes orígenes
const morgan = require("morgan"); // Importamos el middleware Morgan para registrar las solicitudes HTTP
const rateLimiter = require("express-rate-limit"); // Importamos el middleware express-rate-limit para limitar la cantidad de solicitudes a la API
const helmet = require("helmet"); // Importamos Helmet para mejorar la seguridad de la aplicación
const errorHandler = require("./middlewares/errorHandler");
const requestTimer = require("./middlewares/requestTimer");
const passport = require("passport"); // Importamos Passport para manejar la autenticación
require("./middlewares/auth"); // Importamos la configuración de autenticación de Passport
const connectDB = require("./config/db"); // Importamos la función para conectar a la base de datos MongoDB
const jobRoutes = require("./routes/jobsV1"); // Importamos las rutas de trabajos desde el archivo "job.js"


connectDB(); // Conectamos a la base de datos MongoDB antes de iniciar el servidor
const app = express(); // Creamos una instancia de la aplicación Express

const limiter = rateLimiter({
    windowMs: 1 * 60 * 1000, // 1 minuto
    max: 100, // Limita cada IP a 100 solicitudes por ventana de tiempo
        message: {
            status: 429,
            message: "Demasiadas peticiones, intenelo más tarde"
        }
});

app.use(limiter);// Aplicamos el middleware de limitación de solicitudes a todas las rutas
app.use(cors()); // Habilitamos CORS para todas las rutas de la aplicación
app.use(helmet()); // Aplicamos Helmet para mejorar la seguridad de la aplicación
app.use(express.json()); //este middleware permite que express pueda leer datos en formato JSON 
app.use(morgan('dev')); // Configuramos Morgan para registrar las solicitudes HTTP siempre abajo de los middlewares de seguridad para que registre todas las solicitudes, incluso las bloqueadas por el limitador
app.use(requestTimer);
app.use(passport.initialize()); // Inicializamos Passport para manejar la autenticación


app.use("/api/v1/auth", authRoutes); // registramos rutas de autenticación bajo el prefijo "/api/v1/auth"
app.use('/api/v1/candidates', passport.authenticate("jwt", { session: false }), candidaturesRoutes); // Registramos las rutas de candidatos bajo el prefijo "/api/v1/candidates" y protegemos estas rutas con autenticación utilizando Passport. El middleware passport.authenticate('general', { session: false }) se encarga de verificar la autenticación antes de permitir el acceso a las rutas de candidatos. Si la autenticación falla, se devolverá un error 401 Unauthorized.
app.use('/api/v1/jobs', passport.authenticate("jwt", { session: false }), jobRoutes); // Registramos las rutas de jobs bajo el prefijo "/api/v1/jobs" con autenticación JWT y rate limiting


app.use(errorHandler); // Middleware de manejo de errores, debe ir después de todas las rutas para capturar cualquier error que ocurra en ellas

module.exports = app;
