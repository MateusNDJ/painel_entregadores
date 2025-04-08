const express = require('express');
const cors = require('cors');
const app = express();
const entregadoresRoutes = require('./routes/entregadoresRoutes');

app.use(cors());
app.use(express.json());
app.use('/api/entregadores', entregadoresRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, './data/entregadores.json');

// Função para simular movimento
function simularMovimento() {
  const raw = fs.readFileSync(filePath);
  const entregadores = JSON.parse(raw);

  let houveMudanca = false;

  entregadores.forEach(entregador => {
    if (entregador.status === 'ativo' && entregador.rota.length > 0) {
      const proximo = entregador.checkpointAtual + 1;

      if (proximo < entregador.rota.length) {
        entregador.latitude = entregador.rota[proximo][0];
        entregador.longitude = entregador.rota[proximo][1];
        entregador.checkpointAtual = proximo;
        houveMudanca = true;
      } else {
        // Final da rota: marca como chegou
        entregador.status = 'inativo';
        houveMudanca = true;
      }
    }
  });

  if (houveMudanca) {
    fs.writeFileSync(filePath, JSON.stringify(entregadores, null, 2));
    console.log('✅ Atualização simulada das posições dos entregadores.');
  }
}

// Simula a cada 5 segundos
setInterval(simularMovimento, 5000);
