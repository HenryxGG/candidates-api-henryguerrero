# Candidates-API

API REST para gestión de candidatos y ofertas de trabajo con autenticación JWT, CRUD completo, soft delete y Docker.

## Tecnologías usadas

- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication (Passport)
- bcrypt
- Helmet
- express-rate-limit
- Docker

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/HenryxGG/candidates-api-henryguerrero.git
```

Entrar a la carpeta:

```bash
cd candidates-api-henryguerrero
```

Instalar dependencias:

```bash
npm install
```

## Variables de entorno

Crear un archivo `.env` basado en `.env.example`

Ejemplo:

```env
PORT=4000
MONGO_DB_URI=tu_uri_mongodb
JWT_SECRET=tu_clave_secreta
NODE_ENV=development
```

## Ejecutar proyecto

Modo desarrollo:

```bash
npm run dev
```

Modo producción:

```bash
npm start
```

## Docker

Levantar la API junto con MongoDB usando Docker Compose:

```bash
docker-compose up
```

Esto crea dos contenedores: la API en el puerto `4000` y una instancia de MongoDB.

## Endpoints principales

### Auth (rutas públicas)

- POST `/api/v1/auth/register` — Crear una cuenta nueva
- POST `/api/v1/auth/login` — Iniciar sesión y obtener un token

### Candidates (requieren token JWT)

- GET `/api/v1/candidates` — Obtener la lista de todos los candidatos
- GET `/api/v1/candidates/:id` — Obtener un candidato por su ID
- POST `/api/v1/candidates` — Crear un nuevo candidato
- PUT `/api/v1/candidates/:id` — Actualizar los datos de un candidato
- DELETE `/api/v1/candidates/:id` — Eliminar un candidato por medio de un soft delete, no delete físico

### Jobs (requieren token JWT)

- GET `/api/v1/jobs` — Obtener la lista de todos los jobs
- GET `/api/v1/jobs/:id` — Obtener un job por su ID
- POST `/api/v1/jobs` — Crear un nuevo job
- PUT `/api/v1/jobs/:id` — Actualizar un job
- DELETE `/api/v1/jobs/:id` — Eliminar un job

## Autor

Henry Guerrero
