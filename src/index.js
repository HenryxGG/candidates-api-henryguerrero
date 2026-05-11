require('dotenv').config();

const app = require('./app');

const PORT  = process.env.PORT || 8080;
console.log(`Server is running on port 😁 🛩️  ${PORT}`);


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
