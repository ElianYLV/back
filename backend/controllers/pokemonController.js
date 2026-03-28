const pool = require('../db');

exports.getAllPokemon = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemon ORDER BY num_pokedex DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPokemonById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM pokemon WHERE num_pokedex = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPokemon = async (req, res) => {
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pokemon (nombre, especie, altura, peso, descripcion, generacion)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nombre, especie, altura, peso, descripcion, generacion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePokemon = async (req, res) => {
  const { id } = req.params;
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pokemon
       SET nombre=$1, especie=$2, altura=$3, peso=$4, descripcion=$5, generacion=$6
       WHERE num_pokedex=$7 RETURNING *`,
      [nombre, especie, altura, peso, descripcion, generacion, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePokemon = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM pokemon WHERE num_pokedex = $1',
      [id]
    );

    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};