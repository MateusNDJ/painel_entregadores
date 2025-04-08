// Inicia o mapa
const map = L.map('mapa').setView([-23.5505, -46.6333], 13);

// Adiciona tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Lista de entregadores
const entregadores = [
  {
    id: 1, nome: "João", status: "ativo",
    rota: [[-23.5505, -46.6333], [-23.5515, -46.6320], [-23.5520, -46.6310], [-23.5530, -46.6300]],
    marcador: null, passo: 0, rotaLinha: null
  },
  {
    id: 2, nome: "Maria", status: "ativo",
    rota: [[-23.5550, -46.6400], [-23.5540, -46.6390], [-23.5530, -46.6380], [-23.5520, -46.6370]],
    marcador: null, passo: 0, rotaLinha: null
  },
  {
    id: 3, nome: "Pedro", status: "ativo",
    rota: [[-23.5460, -46.6340], [-23.5470, -46.6330], [-23.5480, -46.6320], [-23.5490, -46.6310]],
    marcador: null, passo: 0, rotaLinha: null
  },
  {
    id: 4, nome: "Carlos", status: "inativo",
    rota: [[-23.5470, -46.6350]],
    marcador: null
  },
  {
    id: 5, nome: "Juliana", status: "inativo",
    rota: [[-23.5440, -46.6365]],
    marcador: null
  }
];

// Inicializa todos os entregadores no mapa
function inicializarEntregadores() {
  entregadores.forEach((e) => {
    const cor = e.status === 'ativo' ? 'green' : 'gray';
    const icone = L.divIcon({
      html: `<div style="background:${cor};width:20px;height:20px;border-radius:50%;border:2px solid white;"></div>`,
      className: ""
    });

    e.marcador = L.marker(e.rota[0], { icon: icone }).addTo(map);

    if (e.status === 'ativo') {
      // Linha da rota
      e.rotaLinha = L.polyline(e.rota, { color: cor, weight: 2 }).addTo(map);

      // Checkpoints
      e.rota.forEach((ponto) => {
        const checkpoint = L.circleMarker(ponto, {
          radius: 5,
          color: "#000",
          fillColor: "#fff",
          fillOpacity: 1
        }).addTo(map);
      });

      // Status por etapas
      const statusEtapas = ["Saindo do Centro", "A caminho", "Quase chegando", "Entrega concluída"];
      e.marcador.bindPopup(`${e.nome}: ${statusEtapas[0]}`);

      // Movimento + atualização de status
      setInterval(() => {
        e.passo = (e.passo + 1) % e.rota.length;
        e.marcador.setLatLng(e.rota[e.passo]);

        const statusIndex = Math.floor((e.passo / (e.rota.length - 1)) * (statusEtapas.length - 1));
        e.marcador.setPopupContent(`${e.nome}: ${statusEtapas[statusIndex]}`);

        e.marcador.openPopup();
        setTimeout(() => e.marcador.closePopup(), 2000);
      }, 3000);
    }
  });
}

// Atualiza o painel lateral com os entregadores
function atualizarPainel(statusSelecionado = "todos") {
  const container = document.getElementById("lista-entregadores");
  container.innerHTML = "";

  entregadores.forEach((e) => {
    if (statusSelecionado === "todos" || e.status === statusSelecionado) {
      const div = document.createElement("div");
      div.className = `entregador ${e.status}`;
      div.innerText = `${e.nome} (${e.status})`;
      div.style.cursor = "pointer";

      // Clicar centraliza o mapa no entregador
      div.addEventListener("click", () => {
        map.setView(e.marcador.getLatLng(), 15);
        e.marcador.openPopup();
      });

      container.appendChild(div);
    }
  });
}

// Filtro de status no painel
document.getElementById("status-filter").addEventListener("change", (e) => {
  atualizarPainel(e.target.value);
});

// Início
inicializarEntregadores();
atualizarPainel();
// === Painel Movível ===
const painel = document.getElementById("painel");
let isDragging = false;
let offsetX, offsetY;

painel.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - painel.offsetLeft;
  offsetY = e.clientY - painel.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (isDragging) {
    painel.style.left = `${e.clientX - offsetX}px`;
    painel.style.top = `${e.clientY - offsetY}px`;
  }
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});
const apiUrl = 'http://localhost:3000/api/entregadores';
let entregadoresMap = {}; // Armazena os marcadores por entregador

// Ícone customizado (exemplo)
const iconeEntregador = L.icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function carregarEntregadores() {
  fetch(apiUrl)
    .then(res => res.json())
    .then(entregadores => {
      entregadores.forEach(entregador => {
        const { id, nome, latitude, longitude, status } = entregador;

        // Se já existe marcador, atualiza a posição
        if (entregadoresMap[id]) {
          entregadoresMap[id].setLatLng([latitude, longitude]);
        } else {
          // Cria marcador novo
          const marker = L.marker([latitude, longitude], {
            icon: iconeEntregador
          }).addTo(map);

          marker.bindPopup(`<b>${nome}</b><br>Status: ${status}`);

          entregadoresMap[id] = marker;
        }
      });
    })
    .catch(err => console.error('Erro ao buscar entregadores:', err));
}

// Atualiza a cada 5 segundos
setInterval(carregarEntregadores, 5000);
carregarEntregadores(); // Primeira chamada


