const pool = require('../db');

exports.getAll = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM pokemongen1 ORDER BY num_pokedex DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM pokemongen1 WHERE num_pokedex = $1', [id]);
  res.json(result.rows[0]);
};

exports.create = async (req, res) => {
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  const result = await pool.query(
    `INSERT INTO pokemongen1 (nombre, especie, altura, peso, descripcion, generacion)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [nombre, especie, altura, peso, descripcion, generacion]
  );

  res.json(result.rows[0]);
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  const result = await pool.query(
    `UPDATE pokemongen1 SET nombre=$1, especie=$2, altura=$3, peso=$4, descripcion=$5, generacion=$6
     WHERE num_pokedex=$7 RETURNING *`,
    [nombre, especie, altura, peso, descripcion, generacion, id]
  );

  res.json(result.rows[0]);
};

exports.remove = async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM pokemongen1 WHERE num_pokedex = $1', [id]);
  res.json({ ok: true });
};