let logado = sessionStorage.getItem ("logado")
const sessao = localStorage.getItem ("sessao")

const descricao = document.getElementById("input-descricao")
const detalhamento = document.getElementById ("input-detalhamento")
const form = document.getElementById ("form")

const cards = document.getElementById ("cards")


// Variaveis modal deletar recado
const modal = document.getElementById ("modal")
const fade = document.getElementById ("fade")
const buttonNo = document.getElementById ("button-no")
const buttonFecharDelete = document.getElementById ("botao-fechartroca")

// Variaveis modal visualizar recado
const modal2 = document.getElementById ("modal2")
const fade2 = document.getElementById ("fade2")
const buttonFecharVisu = document.getElementById ("botao-visu")

// Variaveis modal editar recado 
const modal3 = document.getElementById ("")
const fade3 = document.getElementById ("")



checkLogado ()
adicionarTabela ()


form.addEventListener("submit", (e) => {
    e.preventDefault ()
    
    validacaoInputs ()
})

function validacaoInputs () {
    const descricaoValue = descricao.value
    const detalhamentoValue = detalhamento.value
    const divErro = document.getElementsByClassName ("erro-mensagem")
    
    if (descricaoValue == "") {
        erro ("You need to fill in all the fields!")
        return
    } else {
        sucesso ()
    }
    
    if (detalhamentoValue == "") {
        erro ("You need to fill in all the fields!")
        return
    } else {
        sucesso ()
    }
    
    const listaRecados = pegarRecados()
    
    listaRecados.push({ 
        id: Math.random(0,1),
        descricao: descricaoValue,
        detalhamento: detalhamentoValue
    })
    
    salvarRecado(listaRecados)
    
    adicionarTabela ()
    
    form.reset()
    
}



function salvarRecado (recados) {
    const variavel =JSON.parse(localStorage.getItem (checkLogado())) 
    
    variavel.listaRecados = recados
    localStorage.setItem (checkLogado(), JSON.stringify(variavel))
}

function pegarRecados () {
    const recados = JSON.parse(localStorage.getItem(checkLogado())).listaRecados || "[]"
    return recados
}

function adicionarTabela () {
    const recados = pegarRecados()
    
    cards.innerHTML = ""
    
    for (const recado of recados) {
        cards.innerHTML += `
        <div class="card">
        <header>
        <p>Message ${recado.id}</p>
        <i class="fa-solid fa-magnifying-glass" onclick="updateModal2('${recado.descricao}', '${recado.detalhamento}')"></i>
        </header>
        <div class="card-div">
        <h4>Descricao: </h4>
        <p style="margin-bottom: 3%;" class="descricao-card">${recado.descricao}</p>
        
        <h4>Detalhamento: </h4>
        <p>${recado.detalhamento}</p>
        </div>
        <footer>
        <button class="button-card buttoncard-edit">Edit</button>
        <button onclick="updateModal (${recado.id})" class="button-card buttoncard-delete">Delete</button>
        </footer>
        </div>
        `
    }
}

function updateModal (id) {
    toggleModal () 
    
    const buttonYes = document.getElementById("button-yes")
    
    buttonYes.addEventListener("click", (e) => {
        removerRecados (id)
    })
}

function updateModal2 (descricao, detalhamento) {
    toggleModal2 ()

    const p = document.getElementById ("pdesc")
    const p2 = document.getElementById ("pdeta")

    p.innerText = descricao
    p2.innerText = detalhamento
}

function updateModal3 () {

}




function removerRecados (id) {
    const recados = pegarRecados()
    
    const recadosEdit = recados.findIndex ((recado) => recado.id === id)
    
    if (recadosEdit < 0) {
        return
    }
    
    
    recados.splice (recadosEdit, 1)
    
    salvarRecado (recados)
    
    adicionarTabela ()
    
    toggleModal ()
}

function editarRecados (id) {
    const recados = pegarRecados ()
    
    const editRecados = recados.findIndex ((recado) => recado.id === id)

    recados[editRecados].descricao = prompt ("Edit Description: ")
    
    recados[editRecados].detalhamento = prompt ("Edit Detail: ")
    
    if (recados[editRecados].detalhamento == "" || recados[editRecados].detalhamento == null) {
        alert ("You must fill in the fields!")
        return 
    } else {
        salvarRecado (recados)
    }
    
    if (recados[editRecados].descricao == "" || recados[editRecados].descricao == null) {
        alert ("You must fill in the fields!")
        return
    } else {
        salvarRecado (recados)
    }
    
    alert ("Message edited successfully!")
    
    adicionarTabela()
}


function erro (mensagem) {
    const divControl = document.getElementById("div-mensagem")
    const p = document.getElementById ("mensagem-erro")
    
    p.innerText = mensagem
    divControl.classList = "div-mensagem erro"
}

function sucesso () {
    const divControl = document.getElementById("div-mensagem")
    
    divControl.classList = "div-mensagem"
}


function checkLogado () {
    if (logado) {
        return logado
    } else if (sessao){
        return sessao
    } else {
        window.location.href = "index.html"
    }
}


function sair () {
    sessionStorage.removeItem("logado");
    localStorage.removeItem("sessao");
    
    window.location.href = "index.html"
}

function toggleModal () {
    modal.classList.toggle ("hide")
    fade.classList.toggle ("hide")
}

[buttonNo, fade, buttonFecharDelete].forEach((e) => {
    e.addEventListener ("click", () =>  toggleModal())
});


function toggleModal2 () {
    modal2.classList.toggle ("hide")
    fade2.classList.toggle ("hide")
}

[fade2, buttonFecharVisu].forEach((e) => {
    e.addEventListener ("click", () => toggleModal2())
})

function toggleModal3 () {
    
}