let logado = sessionStorage.getItem ("logado")
const sessao = localStorage.getItem ("sessao")

const descricao = document.getElementById("input-descricao")
const detalhamento = document.getElementById ("input-detalhamento")
const form = document.getElementById ("form")

const tbody = document.getElementById ("tbody")


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
        erro ("Voce precisa preencher todos os campos!")
        return
    } else {
        sucesso ()
    }

    if (detalhamentoValue == "") {
        erro ("Voce precisa preencher todos os campos!")
        return
    } else {
        sucesso ()
    }

    const listaRecados = pegarRecados()

    listaRecados.push({ 
        id: listaRecados.length + 1,
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

    tbody.innerHTML = ""

    for (const recado of recados) {
        tbody.innerHTML += `
            <tr>
                <td>${recado.id}</td>
                <td>${recado.descricao}</td>
                <td>${recado.detalhamento}</td>
                <td><button id="botao-editar" onclick="editarRecados(${recado.id})">Editar</button><button id="botao-excluir" onclick="removerRecados(${recado.id})">Excluir</button></td>
            </tr>
        `
    }
}

function removerRecados (id) {
    const recados = pegarRecados()

    const recadosEdit = recados.findIndex ((recado) => recado.id === id)

    if (recadosEdit < 0) {
        return
    } 

    recados.splice (recadosEdit, 1)

    salvarRecado (recados)

    alert ("Recado removido com sucesso!")

    adicionarTabela ()
}

function editarRecados (id) {
    const recados = pegarRecados ()

    const editRecados = recados.findIndex ((recado) => recado.id === id)

    recados[editRecados].descricao = prompt ("Editar descrição: ")

    recados[editRecados].detalhamento = prompt ("Editar detalhamento: ")

    if (recados[editRecados].detalhamento == "" || recados[editRecados].detalhamento == null) {
        alert ("Voce deve preencer os campos!")
        return 
    } else {
        salvarRecado (recados)
    }

    if (recados[editRecados].descricao == "" || recados[editRecados].descricao == null) {
        alert ("Voce deve preencer os campos!")
        return
    } else {
        salvarRecado (recados)
    }

    alert ("Recado editado com sucesso!")

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

