const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../data/entregadores.json');

function carregarDados() {
  const raw = fs.readFileSync(filePath);
  return JSON.parse(raw);
}

function salvarDados(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

function listarEntregadores(req, res) {
  const entregadores = carregarDados();
  res.json(entregadores);
}

function atualizarLocalizacao(req, res) {
  const { id, latitude, longitude, status } = req.body;
  const entregadores = carregarDados();
  const index = entregadores.findIndex(e => e.id === id);

  if (index !== -1) {
    entregadores[index].latitude = latitude;
    entregadores[index].longitude = longitude;
    if (status) entregadores[index].status = status;
    salvarDados(entregadores);
    res.json({ mensagem: 'Localização atualizada com sucesso' });
  } else {
    res.status(404).json({ erro: 'Entregador não encontrado' });
  }
}

module.exports = {
  listarEntregadores,
  atualizarLocalizacao
};
