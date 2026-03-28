const express = require('express');
const controller = require('../controllers/pokemonController');

const router = express.Router();

router.get('/', controller.getAllPokemon);
router.get('/:id', controller.getPokemonById);
router.post('/', controller.createPokemon);
router.put('/:id', controller.updatePokemon);
router.delete('/:id', controller.deletePokemon);

module.exports = router;