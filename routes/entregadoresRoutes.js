const express = require('express');
const router = express.Router();
const {
  listarEntregadores,
  atualizarLocalizacao
} = require('../controllers/entregadoresController');

router.get('/', listarEntregadores);
router.post('/atualizar', atualizarLocalizacao);

module.exports = router;
