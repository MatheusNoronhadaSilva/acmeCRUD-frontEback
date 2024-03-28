const { json } = require('body-parser')
var api = require('../module/api_filmes')
var apiJson = api.api

function getListaFilmesNomes () {

    let todosNomes = []
    let nomes
    for(i = 0; i < apiJson.filmes.length; i++) {
        nomes = apiJson.filmes[i].nome
        todosNomes.push(nomes)
    }

    console.log(todosNomes)

    return todosNomes
}

function getListaFilmes () {

    let todosFilmes = []
    let filmes
    for(i = 0; i < apiJson.filmes.length; i++) {
        filmes = apiJson.filmes[i]
        todosFilmes.push(filmes)
    }

    console.log(todosFilmes)

    return todosFilmes
}

function getListaFilmeId (escolha) {

    let JSON = {}
    for(i = 0; i < apiJson.filmes.length; i++) {
        let id = apiJson.filmes[i].id
        if(id == escolha) {
            JSON.nome = apiJson.filmes[i].nome
            JSON.sinopse = apiJson.filmes[i].sinopse
            JSON.duracao = apiJson.filmes[i].duracao
            JSON.data_lancamento = apiJson.filmes[i].data_lancamento
            JSON.data_relancamento = apiJson.filmes[i].data_relancamento
            JSON.foto_capa = apiJson.filmes[i].foto_capa
            JSON.valor_unitario = apiJson.filmes[i].valor_unitario
        }
    }

    return JSON
}


getListaFilmeId()
getListaFilmes()
getListaFilmesNomes()

module.exports = {
    getListaFilmeId,
    getListaFilmes,
    getListaFilmesNomes
}