'use strict'

const idFilmeAtual = new URLSearchParams(window.location.search).get('id')
let titulo = document.getElementById('nome')
let lancamento = document.getElementById('lancamento')
let duracao = document.getElementById('duracao')
let sinopse = document.getElementById('sinopse')
const img_filme = document.getElementById('img_filme')
const comprar = document.getElementById('comprar')
const alugar = document.getElementById('alugar')
const divComprar = document.getElementById('divComprar')

async function carregarInfoFilme(){

    const filme = await pegarFilmeDados(idFilmeAtual)
    console.log(filme);

    titulo.textContent = filme.nome
    lancamento.textContent = arrumardata(filme.data_lancamento)
    duracao.textContent = arrumarDuracao(filme.duracao)
    sinopse.textContent = filme.sinopse
    img_filme.src = filme.foto_capa
    comprar.textContent = 'R$'+filme.valor_comprar
    alugar.textContent = 'R$'+filme.valor_alugar +'/mês'
}

function arrumardata(data){
    const dataReduzida = data.substr(0,10)
    const dataDividida = dataReduzida.split('-')
    const dataCerta = dataDividida[0]+'/'+dataDividida[1]+'/'+dataDividida[2]
    return dataCerta
}

function arrumarDuracao(duracao){
    const duracaoReduzida = duracao.substr(12,7)
    console.log(duracaoReduzida);
    return duracaoReduzida
}

async function pegarFilmeDados(idFilmeAtual){

    const id = idFilmeAtual
    const endpoint = `http://localhost:5080/v2/acmeFilmes/filme/${id}`
    const filme = await fetch(endpoint);
    const filmeDados = await filme.json();
    return filmeDados.filme[0];

}

carregarInfoFilme()