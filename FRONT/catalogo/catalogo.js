'use strict'

const idFilmeAtual = new URLSearchParams(window.location.search).get('id')
let titulo = document.getElementById('nome')
let lancamento = document.getElementById('lancamento')
let duracao = document.getElementById('duracao')
let generos = document.getElementById('generos')
let sinopse = document.getElementById('sinopse')
const img_filme = document.getElementById('img_filme')
const comprar = document.getElementById('comprar')
const alugar = document.getElementById('alugar')
const divComprar = document.getElementById('divComprar')
const elenco = document.getElementById('elenco')

async function carregarInfoFilme(){

    const filme = await pegarFilmeDados(idFilmeAtual)
    const generosFilme = []
    console.log(idFilmeAtual);
    console.log(filme);

    filme.generos.forEach(generos => {
        console.log('oi');
        generosFilme.push(generos.genero)
    });

    console.log(generosFilme);

    titulo.textContent = filme.nome
    lancamento.textContent = arrumardata(filme.data_lancamento)
    duracao.textContent = arrumarDuracao(filme.duracao)
    generos.textContent = generosFilme
    sinopse.textContent = filme.sinopse
    img_filme.src = filme.foto_capa
    comprar.textContent = 'R$'+filme.valor_comprar
    alugar.textContent = 'R$'+filme.valor_alugar +'/mês'
}

elenco.addEventListener('click', async function(){

    const atores = await pegaAtoresDoFilme(idFilmeAtual)
    const diretor = await pegarDiretoresDoFilme(idFilmeAtual)

    console.log('diretor: ' + diretor + ' atores: ' + atores);
})

async function pegarDiretoresDoFilme(idFilmeAtual) {

    const id = idFilmeAtual
    const endpoint = `/v2/acmeFilme/diretores/filtro/${id}`
    console.log(endpoint);
    const diretor = await fetch(endpoint);
    const DadosDiretor = await diretor.json();
    console.log(DadosDiretor);
    return DadosDiretor.diretor;
}

async function pegaAtoresDoFilme(idFilmeAtual) {

    const id = idFilmeAtual
    const endpoint = `/v2/acmeFilme/atores/filtro/${id}`
    const atores = await fetch(endpoint);
    const DadosAtores = await atores.json();
    console.log(DadosAtores);
    return DadosAtores.atores;
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
    const endpoint = `http://localhost:8080/v2/acmeFilmes/filme/${id}`
    const filme = await fetch(endpoint);
    const filmeDados = await filme.json();
    return filmeDados.filme;

}

carregarInfoFilme()