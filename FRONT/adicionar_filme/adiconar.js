'use strict'

const botao = document.getElementById('botao')
const inserir_imagem = document.getElementById('inserir_imagem')
const link_imagem = document.getElementById('link_imagem')

inserir_imagem.addEventListener('mouseover', function(){

    link_imagem.classList.remove('hidden')
    link_imagem.classList.add('visible')
    link_imagem.classList.add('absolute')
})

inserir_imagem.addEventListener('mouseout', function(){

    link_imagem.classList.remove('visible')
    link_imagem.classList.add('hidden')
})

link_imagem.addEventListener('keypress', function(event){

    if(event.key === "Enter") {
        trocarimagem()
    }
})

async function adicionarOpcaoGeneros () {

    const selectGeneros = document.getElementById('selectGeneros')

    const generos = await pegarTodosOsGeneros()

    console.log(generos);

    generos.forEach(genero => {
        
        console.log(genero);
        const novaOpcaoGenero = document.createElement('option')
        novaOpcaoGenero.text = genero.genero
        novaOpcaoGenero.value = genero.id

        selectGeneros.add(novaOpcaoGenero)
    });
}

async function adicionarOpcaoAtores() {

    const selectAtores = document.getElementById('selectAtores')

    const atores = await pegarTodosOsAtores()

    atores.forEach(ator => {
        
        const novaOpcaoAtor = document.createElement('option')
        novaOpcaoAtor.text = ator.nome
        novaOpcaoAtor.value = ator.id

        selectAtores.add(novaOpcaoAtor)
    });
}

async function adicionarOpcaoDiretores () {

    const selectDiretores = document.getElementById('selectDiretores')
    
    const diretores = await pegarTodosOsDiretores()

    diretores.forEach(diretor => {

        const novaOpcaoDiretor = document.createElement('option')
        novaOpcaoDiretor.text = diretor.nome
        novaOpcaoDiretor.value = diretor.id

        selectDiretores.add(novaOpcaoDiretor)
    })
}

function trocarimagem() {
    inserir_imagem.innerHTML = ''
    const link = link_imagem.value

    function validarURL(String) {
        try {
            new URL(String)
            return true
        } catch (error) {
            console.log('link não enviado');
            return false
        }
    }
    if(validarURL(link)) {
        const imagem = document.createElement('img')
        imagem.src = link
        imagem.classList.add('h-full', 'w-full')

        inserir_imagem.appendChild(imagem)

        return link
    }

}

function pegarOpcoesSelecionadasGeneros() {

    const selectGeneros = document.getElementById('selectGeneros');
    
    let opcoesSelecionadas = [];
    
    for (let i = 0; i < selectGeneros.options.length; i++) {
      const option = selectGeneros.options[i];
      if (option.selected) {
        opcoesSelecionadas.push(option.value);
      }
    }
    
    // Exibindo os valores das opções selecionadas
    console.log("Opções generos:", opcoesSelecionadas);

    return opcoesSelecionadas
  }

  function pegarOpcoesSelecionadasAtores() {

    const selectAtores = document.getElementById('selectAtores');
    
    let opcoesSelecionadas = [];
    
    for (let i = 0; i < selectAtores.options.length; i++) {
      const option = selectAtores.options[i];
      if (option.selected) {
        opcoesSelecionadas.push(option.value);
      }
    }
    
    // Exibindo os valores das opções selecionadas
    console.log("Opções atores:", opcoesSelecionadas);

    return opcoesSelecionadas
  }

  function pegarOpcoesSelecionadasDiretores() {

    const selectDiretores = document.getElementById('selectDiretores');
    
    let opcoesSelecionadas = [];
    
    for (let i = 0; i < selectDiretores.options.length; i++) {
      const option = selectDiretores.options[i];
      if (option.selected) {
        opcoesSelecionadas.push(option.value);
      }
    }
    
    // Exibindo os valores das opções selecionadas
    console.log("Opções diretores:", opcoesSelecionadas);

    return opcoesSelecionadas
  }

botao.addEventListener('click', async function(){

    const link = trocarimagem()
    const sinopse = document.getElementById('sinopse').value
    const valor_alugar = document.getElementById('valorAlugar').value
    const valor_comprar = document.getElementById('valorComprar').value
    const nome = document.getElementById('nome').value
    const duracao = document.getElementById('duracao').value
    const lancamento = document.getElementById('lancamento').value
    const originalidadeCheckbox = document.getElementById('originalidade')
    const originalidade = false
    const generos = pegarOpcoesSelecionadasGeneros()
    const atores = pegarOpcoesSelecionadasAtores()
    const diretores = pegarOpcoesSelecionadasDiretores()
    idClassficacao
    

    if(link == '' || sinopse == '' || valor_alugar == '' || valor_comprar == '' || nome == '' || duracao == '' || lancamento == '' || generos == '' || generos == null || atores == '' || atores == null || diretores == '' || diretores == null){
        alert('todos os campos devem ser preenchidos')
    } else {

        if(originalidadeCheckbox.checked){
            originalidade = true
        } else {
            originalidade = false
        }


        const novoFilmeJSON = {}

        novoFilmeJSON.nome = nome,
        novoFilmeJSON.sinopse = sinopse,
        novoFilmeJSON.duracao = duracao,
        novoFilmeJSON.data_lancamento = lancamento,
        novoFilmeJSON.data_relancamento = null,
        novoFilmeJSON.foto_capa = link,
        novoFilmeJSON.valor_alugar = valor_alugar,
        novoFilmeJSON.valor_comprar = valor_comprar,
        novoFilmeJSON.id_classificacao = idClassficacao
        novoFilmeJSON.original_SitePirata = originalidade
        novoFilmeJSON.diretores = diretores,
        novoFilmeJSON.atores = atores,
        novoFilmeJSON.generos = generos

        console.log(novoFilmeJSON);

        // postarNovoFilme(novoFilmeJSON)

        // window.location.href = '../admin/admin2.html'
    }
})

async function postarNovoFilme(novoFilmeJSON) {

    console.log('enviar');

    const endpoint = 'http://localhost:8080/v2/acmeFilmes/filme'
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoFilmeJSON),
    };

    try {
        const response = await fetch(endpoint, options);
        return response.ok;
      } catch (error) {
        console.error('Erro ao enviar filme: ', error);
      }
}

async function pegarTodosOsAtores () {

    const endpoint = `http://localhost:8080/v2/acmeFilmes/atores`
    const atores = await fetch(endpoint);
    const atoresDados = await atores.json();
    return atoresDados.atores;

}

async function pegarTodosOsGeneros () {

    const endpoint = `http://localhost:8080/v2/acmeFilmes/generos`
    const generos = await fetch(endpoint);
    const generosDados = await generos.json();
    return generosDados.generos;

}

async function pegarTodosOsDiretores () {

    const endpoint = `http://localhost:8080/v2/acmeFilmes/diretores`
    const diretores = await fetch(endpoint);
    const diretoresDados = await diretores.json();
    return diretoresDados.diretores;

}

adicionarOpcaoGeneros()
adicionarOpcaoAtores()
adicionarOpcaoDiretores()

$(".select2").select2();
