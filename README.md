# 📦 Painel de Gestão de Entregadores em Tempo Real

Este projeto é um sistema completo para gestão e rastreamento de entregadores com visualização em tempo real de rotas, status e localização no mapa. Ele foi desenvolvido como parte de um desafio técnico para demonstrar habilidades de front-end, back-end e integração com banco de dados em tempo real.

---

## 🚀 Funcionalidades

- **Login e Cadastro de Entregadores**
- **Painel do Gestor:**
  - Visualização de todos os entregadores cadastrados
  - Status Ativo/Inativo
  - Filtros por status e nome
  - Atribuição de rotas com início, checkpoints e destino
  - Rota exibida no mapa com status "A Caminho" ou "Entregue"
- **Painel do Entregador:**
  - Visualização da própria rota e status
  - Movimento simulado no mapa (sem necessidade de GPS real)
  - Atualização em tempo real da posição no mapa
- **Integração com Firebase Realtime Database**
- **Mapa com Leaflet.js e OpenStreetMap (open-source)**

---

## 🛠️ Tecnologias Utilizadas

### 🧩 Frontend
- HTML5, CSS3 e JavaScript puro
- Leaflet.js para mapa e rotas
- Firebase para autenticação e banco de dados em tempo real

### 🧩 Backend (Firebase)
- Firebase Realtime Database (sem necessidade de servidor)
- Estrutura de dados baseada em:
  - `/entregadores/{id}`
  - `/rotas/{entregadorId}`

---

## 🧱 Estrutura de Pastas

```
painel_entregadores/
│
├── index.html                # Tela de login (gestor e entregador)
├── cadastro.html             # Tela de cadastro do entregador
├── painel-gestor.html        # Painel do gestor
├── painel-entregador.html    # Painel do entregador
│
├── js/
│   ├── firebase-config.js
│   ├── cadastro.js
│   ├── login.js
│   ├── gestor.js
│   ├── entregador.js
│   └── rotas.js
│
├── css/
│   └── style.css
│
└── README.md
```

---

## 🔧 Como Rodar o Projeto

1. **Clone ou baixe o repositório**
2. **Abra o arquivo `index.html` no navegador** para começar
3. **Utilize o login:**
   - Gestor: `admin / 1234`
   - Entregadores: cadastrar novo entregador em `cadastro.html`
4. **Cadastre uma rota pelo painel do gestor**
5. **Abra o painel do entregador para simular a rota em movimento**

---

## 🔐 Requisitos

- Navegador moderno (Chrome, Edge, Firefox)
- Conexão com a internet para uso do Firebase
- Firebase Realtime Database configurado

> ⚠️ **Observação:** Substitua as credenciais de `firebase-config.js` pelas suas ao publicar ou testar com sua própria instância do Firebase.

---

## 📌 Possíveis Melhorias Futuras

- Autenticação real com Firebase Auth
- Rastreamento real por GPS no celular do entregador
- Relatórios de entregas
- Integração com notificações
- Deploy com Firebase Hosting ou Vercel

---

## 👨‍💻 Desenvolvido por

**Mateus Nóbrega**  
Técnico de Suporte | Estudante de ADS | Desenvolvedor Web