// firebase-config.js

// Inicializa o Firebase com os dados do seu projeto
const firebaseConfig = {
    apiKey: "AIzaSyCWZLkC0UktPRRCCKPfGxn6fsJ1DXeckt8",
    authDomain: "painelentregadores.firebaseapp.com",
    databaseURL: "https://painelentregadores-default-rtdb.firebaseio.com",
    projectId: "painelentregadores",
    storageBucket: "painelentregadores.firebasestorage.app",
    messagingSenderId: "398984082203",
    appId: "1:398984082203:web:76b4761f3ee93c202699be",
    measurementId: "G-8QBVMDYWXC"
  };
  
  // Verifica se o Firebase já foi inicializado para evitar erros
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const database = firebase.database();
  