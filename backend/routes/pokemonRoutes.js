const express = require('express');
const pokemonController = require('../controllers/pokemonController');
const router = express.Router();

router.get('/', pokemonController.getAllPokemon);
router.get('/:id', pokemonController.getPokemonById);
router.post('/', pokemonController.createPokemon);
router.put('/:id', pokemonController.updatePokemon);
router.patch('/:id', pokemonController.partialUpdatePokemon);
router.delete('/:id', pokemonController.deletePokemon);

module.exports = router;

