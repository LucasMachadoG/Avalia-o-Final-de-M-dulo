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
const modal3 = document.getElementById ("modal3")
const fade3 = document.getElementById ("fade3")
const buttonFecharEdit = document.getElementById ("botao-edit")
const form2 = document.getElementById ("form2")
const descEdit = document.getElementById ("input-desc")
const detaEdit = document.getElementById ("input-deta")
let id = 0


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
        <p style="font-size: 1.4rem;">Message ${recado.id}</p>
        <i style="font-size: 1.4rem;" class="fa-solid fa-magnifying-glass" onclick="updateModal2('${recado.descricao}', '${recado.detalhamento}')"></i>
        </header>
        <div class="card-div">
        <h4 style="font-size: 1.4rem;">Description: </h4>
        <p style="margin-bottom: 3%; font-size: 1.4rem;" class="descricao-card">${recado.descricao}</p>
        
        <h4 style="font-size: 1.4rem;">Detailing: </h4>
        <p style="font-size: 1.4rem;">${recado.detalhamento}</p>
        </div>
        <footer>
        <button class="button-card buttoncard-edit" onclick="updateModal3(${recado.id})">Edit</button>
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

function updateModal3 (idValue) {
    toggleModal3 ()

    id = idValue

    form2.addEventListener ("submit", (event) => {
        event.preventDefault ()
    
        validaEditar ()
    })
}


function validaEditar () {
    let recados = pegarRecados ()
    const index = recados.findIndex((recado) => recado.id === id)

    if (!descEdit.value || !detaEdit.value) {
    erroEdit ("You must fill in the fields!")
        return
    } else {
        recados[index].descricao = descEdit.value
        recados[index].detalhamento = detaEdit.value
        salvarRecado (recados)
    }

    alert ("Message edited successfully!")

    adicionarTabela()

    form2.reset()

    toggleModal3()
}

function erro (mensagem) {
    const divControl = document.getElementById("div-mensagem")
    const p = document.getElementById ("mensagem-erro")
    
    p.innerText = mensagem
    divControl.classList = "div-mensagem erro"
}

function erroEdit (mensagem) {
    const p = document.getElementById ("erro-edit")

    p.innerText = mensagem
    p.classList = "mensagem-edit erro-edit"
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
    modal3.classList.toggle ("hide")
    fade3.classList.toggle ("hide")
}

[fade3, buttonFecharEdit].forEach ((e) => {
    e.addEventListener ("click", () => toggleModal3())
})