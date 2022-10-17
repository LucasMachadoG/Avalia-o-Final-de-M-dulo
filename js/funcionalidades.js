const botaoMostrarSenhaCriar = document.querySelector ("#mostrar-senhaCriar")
const botaoMostrarSenhaLogin = document.querySelector ("#mostrarsenha-login")
const botaoMostrarSenhaConfirm = document.querySelector ("#mostrar-senhaConfirm")

//Mostrar senha
botaoMostrarSenhaLogin.addEventListener ("click", mostrarSenhaLogin)
botaoMostrarSenhaCriar.addEventListener ("click", mostrarSenhaCriar)
botaoMostrarSenhaConfirm.addEventListener ("click", mostrarSenhaConfirm)

function mostrarSenhaLogin () {
  let inputSenha = document.querySelector ("#input-senhalogin")
  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute ('type', 'text')
  } else {
    inputSenha.setAttribute ('type', 'password')
  }
}

function mostrarSenhaCriar () {
  let inputSenha = document.querySelector ("#input-senha")
  
  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute ('type', 'text')
  } else {
    inputSenha.setAttribute ('type', 'password')
  }
}

function mostrarSenhaConfirm () {
  let inputSenha = document.querySelector ("#input-confirmsenha")

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute ('type', 'text')
  } else {
    inputSenha.setAttribute ('type', 'password')
  }
}
