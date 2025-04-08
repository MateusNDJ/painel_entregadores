/* auth.js */
function loginGestor() {
    const usuario = document.getElementById('gestor-usuario').value;
    const senha = document.getElementById('gestor-senha').value;
    if (usuario === 'admin' && senha === '1234') {
      sessionStorage.setItem('tipoUsuario', 'gestor');
      window.location.href = 'index.html';
    } else {
      document.getElementById('mensagem').textContent = 'Usuário ou senha incorretos';
    }
  }
  
  function loginEntregador() {
    const nome = document.getElementById('entregador-nome').value;
    const senha = document.getElementById('entregador-senha').value;
    const entregadores = JSON.parse(localStorage.getItem('entregadores')) || [];
    const existe = entregadores.find(e => e.nome === nome && e.senha === senha);
    if (existe) {
      sessionStorage.setItem('tipoUsuario', 'entregador');
      sessionStorage.setItem('nomeEntregador', nome);
      window.location.href = 'index.html';
    } else {
      document.getElementById('mensagem').textContent = 'Credenciais inválidas';
    }
  }
  
  function cadastrarEntregador() {
    const nome = document.getElementById('novo-nome').value;
    const senha = document.getElementById('nova-senha').value;
    let entregadores = JSON.parse(localStorage.getItem('entregadores')) || [];
    if (entregadores.find(e => e.nome === nome)) {
      document.getElementById('mensagem').textContent = 'Nome já cadastrado';
      return;
    }
    entregadores.push({ nome, senha });
    localStorage.setItem('entregadores', JSON.stringify(entregadores));
    document.getElementById('mensagem').textContent = 'Cadastrado com sucesso!';
    setTimeout(() => {
      window.location.href = 'login-entregador.html';
    }, 1500);
  }
  