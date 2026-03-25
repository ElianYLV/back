const pool = require('../db');



exports.getAllPokemon = async (req, res) => {

  try {
    const result = await pool.query('SELECT * FROM pokemon ORDER BY num_pokedex DESC');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
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
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



exports.createPokemon = async (req, res) => {
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  try {
    const maxResult = await pool.query('SELECT MAX(num_pokedex) as max_id FROM pokemon');
    const nextId = (maxResult.rows[0].max_id || 0) + 1;

    const result = await pool.query(
      `INSERT INTO pokemon (num_pokedex, nombre, especie, altura, peso, descripcion, generacion) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nextId, nombre, especie, altura, peso, descripcion, generacion]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
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

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.partialUpdatePokemon = async (req, res) => {
  const { id } = req.params;
  const allowedFields = ['nombre', 'especie', 'altura', 'peso', 'descripcion', 'generacion'];
  const updates = Object.keys(req.body).filter(key => allowedFields.includes(key));

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No hay campos válidos para actualizar' });
  }

  try {
    let query = 'UPDATE pokemon SET ';
    const values = [];

    updates.forEach((field, index) => {
      query += `${field} = $${index + 1}`;
      values.push(req.body[field]);
      if (index < updates.length - 1) query += ', ';
    });

    query += ` WHERE num_pokedex = $${updates.length + 1} RETURNING *`;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pokemon no encontrado' });
    }

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

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


