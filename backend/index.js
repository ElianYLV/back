require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

pool.query('SELECT current_database()', (err, res) => {
  if (err) {
    console.error('Error obteniendo base de datos:', err);
  } else {
    console.log('BASE:', res.rows);
  }
});

const PORT = process.env.PORT || 3001;

const app = express();


app.use(cors());

app.use(express.json());
app.use('/api/pokemongen1', require('./routes/pokemongen1Routes'));
app.use('/api/pokemon', require('./routes/pokemonRoutes'));
app.use('/api/usuarios', require('./routes/userRoutes'));

app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});