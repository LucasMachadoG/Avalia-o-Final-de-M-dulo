let logado = sessionStorage.getItem ("logado")
const sessao = localStorage.getItem ("sessao")

//Variaveis criar conta
const usuario = document.getElementById ("input-usuario")
const email = document.getElementById ("input-email")
const senha = document.getElementById ("input-senha")
const confirmSenha = document.getElementById ("input-confirmsenha")
const form = document.getElementById ("form")

const botaoOpenModal = document.querySelector("#botao-abrir");
const botaoCloseModal = document.querySelector("#botao-fechar");
const modal = document.querySelector("#modal");
const fade = document.querySelector("#fade");


// Realizar login
const formLogin = document.getElementById ("form-login")

checkLogado ()

formLogin.addEventListener ("submit", (e) => {
  e.preventDefault ()

  validacaoLogin ()
})

function validacaoLogin () {
  const email = document.getElementById ("input-emaillogin").value
  const senha = document.getElementById ("input-senhalogin").value
  const check = document.getElementById ("input-manter").checked

  const conta = pegarConta (email)

  if(!conta){
    // alert("Verifique o usuario ou a senha.");
    alert ("Verifique o email e a senha!")
    return;
  }

  if(conta){
      if(conta.senha !== senha){
        alert("Verifique o usuario ou a senha.");
        return;
    }
    salvarSessao(email, check);

    window.location.href = "home.html";
}
}

//Criacao de conta 

form.addEventListener ("submit", (e) => {
  e.preventDefault()
  
  validacaoInput ()
})

function validacaoInput (){
  
  const usuarioValue = usuario.value
  const emailValue = email.value
  const senhaValue = senha.value
  const senhaConfirmValue = confirmSenha.value 
  
  
  if (usuarioValue === "") {
    erro (usuario, "Nome de usuário é obrigatório!")
    return
  } else {
    sucesso (usuario)
  }
  
  if (emailValue === "") {
    erro (email, "O email é obrigatório!")
    return
  } else {
    sucesso (email)
  }
  
  if (senhaValue === "") {
    erro (senha, "A senha é obrigatória")
    return
  } else if (senhaValue.length < 7) {
    erro (senha, "A senha precisa ter no mínimo 7 caracteres!")
    return
  } else {
    sucesso (senha)
  }
  
  if (senhaConfirmValue === "") {
    erro (confirmSenha, "A confirmação de senha é obrigatório!")
    return
  } else if (senhaConfirmValue != senhaValue) {
    erro (confirmSenha, "A senha não é a mesma!")
    return
  } else {
    sucesso (confirmSenha)
  } 

  salvarConta ({
    usuario: usuarioValue,
    email: emailValue,
    senha: senhaValue,
    listaRecados: []
  })

  alert ("Sua conta foi criada com sucesso!")
  toggleModal()
  
}

function salvarConta (data) {
  localStorage.setItem (data.email, JSON.stringify (data))
}

function pegarConta(key){
  const conta = localStorage.getItem(key);

  if (conta){
      return JSON.parse(conta)
  }
  return "";
}

function salvarSessao (data, salvarsessao) {
  if(salvarsessao){
    localStorage.setItem("sessao", data);
  }

  sessionStorage.setItem("logado", data)
}


function sucesso (input) {
  const formControl = input.parentElement
  formControl.className = "controle-form sucesso"
}

function erro (input, mensagem) {
  const formControl = input.parentElement
  const paragrafo = formControl.querySelector ("p")
  
  paragrafo.innerText = mensagem
  formControl.className = "controle-form erro"
}


//Fade
function toggleModal () {
  modal.classList.toggle("hide")
  fade.classList.toggle("hide")
}

[botaoCloseModal, botaoOpenModal, fade].forEach((el) => {
  el.addEventListener("click", () => toggleModal());
});


function checkLogado(){
  if(sessao){
      sessionStorage.setItem("logado", sessao);
      logado = sessao;
  }
  if(logado){
      salvarSessao(logado, sessao);

      window.location.href = "home.html";
  }
}





