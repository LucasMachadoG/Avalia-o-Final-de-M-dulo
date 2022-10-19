let logado = sessionStorage.getItem ("logado")
const sessao = localStorage.getItem ("sessao")

//Variaveis criar conta
const usuario = document.getElementById ("input-usuario")
const email = document.getElementById ("input-email")
const senha = document.getElementById ("input-senha")
const confirmSenha = document.getElementById ("input-confirmsenha")
const form = document.getElementById ("form")

//Variaveis criar conta modal
const botaoOpenModal = document.querySelector ("#botao-abrir");
const botaoCloseModal = document.querySelector ("#botao-fechar");
const modal = document.querySelector ("#modal");
const fade = document.querySelector ("#fade");

//Variaveis trocar senha modal
const botaoOpenModalTroca = document.querySelector ("#botao-trocasenha")
const botaoCloseModalTroca = document.querySelector ("#botao-fechartroca")
const modal2 = document.querySelector ("#modal2")
const fade2 = document.querySelector ("#fade2")
const form2 = document.querySelector ("#form2")


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
    erroLogin ("Check your email and password!")
    return;
  }

  if(conta){
      if(conta.senha !== senha){
        erroLogin ("Check your email and password!")
        return;
    }
    salvarSessao(email, check);

    window.location.href = "home.html";
}
}

//Criacao de conta 

if (form) {
  form.addEventListener ("submit", (e) => {
    e.preventDefault()
    
    validacaoInput ()
  })
}


function validacaoInput (){
  
  const usuarioValue = usuario.value
  const emailValue = email.value
  const senhaValue = senha.value
  const senhaConfirmValue = confirmSenha.value 
  
  
  if (usuarioValue === "") {
    erro (usuario, "Username is required!")
    return
  } else {
    sucesso (usuario)
  }
  
  if (emailValue === "") {
    erro (email, "Email is mandatory!")
    return
  } else {
    sucesso (email)
  }
  
  if (senhaValue === "") {
    erro (senha, "Password is mandatory!")
    return
  } else if (senhaValue.length < 7) {
    erro (senha, "The password must be at least 7 characters long!")
    return
  } else {
    sucesso (senha)
  }
  
  if (senhaConfirmValue === "") {
    erro (confirmSenha, "Password confirmation is required!")
    return
  } else if (senhaConfirmValue != senhaValue) {
    erro (confirmSenha, "The password is not the same!")
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

  alert ("Your account has been successfully created!")
  toggleModal()
  
}


// Troca de senha!
if (form2) {
  form2.addEventListener ("submit", (e) => {
    e.preventDefault()
    
    validacaoTroca ()
  })
} 

function validacaoTroca () {
  
  const email = document.getElementById ("input-trocarsenha").value

  const conta = pegarConta (email)

  if (!conta) {
    erroTroca ("This email is not registered!")
    return
  }

  toggleModal2()
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

function erroLogin (mensagem) {
  const p = document.getElementById ("p-erro")

  p.innerText = mensagem
  p.className = "p-mensagem erro-login"
}

function erroTroca (mensagem) {
  const p = document.getElementById ("mensagem-troca")

  p.innerText = mensagem
  p.className = "mensagem-troca erro-troca"
}

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

//Fade
function toggleModal () {
  modal.classList.toggle("hide")
  fade.classList.toggle("hide")
}

[botaoCloseModal, botaoOpenModal, fade].forEach((e) => {
  e.addEventListener("click", () => toggleModal());
});


function toggleModal2 () {
  modal2.classList.toggle ("hide")
  fade2.classList.toggle ("hide")
}

[botaoCloseModalTroca, botaoOpenModalTroca, fade2].forEach((e) => {
  e.addEventListener("click", () =>  toggleModal2 ())
})







