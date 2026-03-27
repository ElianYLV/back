const express = require('express');
const app = express();

const pokemonRoutes = require('./routes/pokemonRoutes');
const pokemongen1Routes = require('./routes/pokemongen1Routes');
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.use('/api/pokemon', pokemonRoutes);
app.use('/api/pokemongen1', pokemongen1Routes);
app.use('/api/usuarios', userRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo');
});