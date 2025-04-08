document.getElementById("formCadastro").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const nome = document.getElementById("nome").value.trim();
    const regiao = document.getElementById("regiao").value;
    const senha = document.getElementById("senha").value;
  
    if (!nome || !regiao || !senha) {
      document.getElementById("mensagem").textContent = "Preencha todos os campos.";
      return;
    }
  
    const entregador = {
      nome,
      regiao,
      senha,
      status: "inativo"
    };
  
    database.ref("entregadores/" + nome).set(entregador)
      .then(() => {
        document.getElementById("mensagem").textContent = "Entregador cadastrado com sucesso!";
        document.getElementById("formCadastro").reset();
      })
      .catch((error) => {
        document.getElementById("mensagem").textContent = "Erro ao cadastrar entregador.";
        console.error(error);
      });
  });
  