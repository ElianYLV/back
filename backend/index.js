require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// prueba conexión DB
pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('Error DB:', err);
  } else {
    console.log('BASE:', res.rows);
  }
});

app.use('/api/pokemon', require('./routes/pokemonRoutes'));
app.use('/api/pokemongen1', require('./routes/pokemongen1Routes'));
app.use('/api/usuarios', require('./routes/userRoutes'));

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});