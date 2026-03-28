require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// RUTAS
app.use('/api/pokemon', require('./routes/pokemonRoutes'));
app.use('/api/pokemongen1', require('./routes/pokemongen1Routes'));
app.use('/api/usuarios', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor en puerto ${PORT}`);
});