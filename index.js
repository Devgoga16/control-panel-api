require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB
const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://monkeywit:<db_password>@cluster0.2elgi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión a MongoDB:', err));

// CORS
const cors = require('cors');
app.use(cors());

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Control Panel API',
    version: '1.0.0',
    description: 'API REST básica en Node.js usando Express',
  },
  servers: [
    {
      url: 'http://localhost:' + PORT,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());

// Rutas
const authRoutes = require('./routes/auth');
app.use('auth', authRoutes);

// Seed de usuarios de prueba
const seedRoutes = require('./routes/seed');
app.use('seed', seedRoutes);

// Endpoint de ejemplo
app.get('/', (req, res) => {
  res.json({ message: 'API REST funcionando correctamente!' });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});