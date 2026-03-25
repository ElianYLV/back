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

  try {
    const result = await pool.query(
      'SELECT * FROM pokemongen1 WHERE num_pokedex = $1',
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


exports.create = async (req, res) => {
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO pokemongen1 (nombre, especie, altura, peso, descripcion, generacion)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [nombre, especie, altura, peso, descripcion, generacion]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
    res.status(500).json({ error: "Error al guardar pokemon" });
  }
};



exports.update = async (req, res) => {
  const { id } = req.params;
  const { nombre, especie, altura, peso, descripcion, generacion } = req.body;

  try {
    const result = await pool.query(
      `UPDATE pokemongen1 
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



exports.partialUpdate = async (req, res) => {
  const { id } = req.params;

  const allowedFields = ['nombre', 'especie', 'altura', 'peso', 'descripcion', 'generacion'];
  const updates = Object.keys(req.body).filter(key => allowedFields.includes(key));

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No hay campos válidos' });
  }

  try {
    let query = 'UPDATE pokemongen1 SET ';
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


exports.remove = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      'DELETE FROM pokemongen1 WHERE num_pokedex = $1',
      [id]
    );

    res.json({ status: "ok" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};