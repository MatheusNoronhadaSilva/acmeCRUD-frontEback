/**
 * Para realizar a integração com o Banco de Dados devemos
 * utilizar uma das seguintes bibliotecas:
 * - SEQUELIZE - É a biblioteca mais antiga
 * - PRISMA ORM - É a biblioteca mais atual (utilizaremos no projeto)
 * - FASTFY ORM - É a biblioteca mais atual
 * 
 * Para a instalação do PRISMA ORM:
 *    npm install prisma --save        (É responsavel pela conexão com o BD)
 *    npm install @prisma/client --save  (É responsável por executar scripts SQL no BD)
 *    npx prisma init  (inicializar o prisma no projeto)
 * 
 */




const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use((request, response, next) => {

    response.header('Access-Control-Allow-Origin', '*')

    response.header('Acesss-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')


    app.use(cors())


    next()
})

app.use(cors())

/*********************Import dos arquivos de Controller do projeto **********************/

const controllerFilmes = require('./controller/controller_filmes.js')

/************************************ */

//criando um objeto para controlar a chegada dos dados da requisição em formato JSON
const bodyParserJSON = bodyParser.json()




//Endpoint: Versão 1.0 que retorna os dados de um arquivo de filmes
//Período de utilização 01/2024 até 02/2024
app.get('/v1/acmeFilmes/filmes', cors(), (request, response) => {

    let controleFilmes = require('./controller/funcoes')

    const listaFilmes = controleFilmes.getListaFilmes()
    if (listaFilmes) {
        res.json(listaFilmes)
    } else {
        res.status(404).json({ erro: 'nenhum filme foi encontrado' })
    }
})


app.get('/v2/acmeFilmes/filmes/comprados', cors(), async function (request, response) {

    let idsFilmes = await controllerFilmes.getListarComprados()

    if(idsFilmes) {
        response.json(idsFilmes)
        response.status(200)
    } else {
        response.json({message: 'nenhum registro de comprados encontrado'})
        response.status(404)
    }
})

app.get('/v2/acmeFilmes/filmes/ultimos', cors(), async function(request, response){

    let Novidade = await controllerFilmes.getUltimosPedidos()

    if(Novidade){
        response.json(Novidade.novidades)
        response.status(200)
    } else {
        response.json({message: 'não há novidades'})
    }
})

app.post('/v2/acmeFilmes/filme/comprar', cors(), bodyParserJSON, async function (request, response) {

    let contentType = request.header('content-type')

    let dadosBody = request.body

    let resultComprarFilme = await controllerFilmes.setInserirCompra(dadosBody, contentType)

    if(resultComprarFilme) {
        response.json({message: 'filme comprado: ' + resultComprarFilme})
        response.status(200)
    } else {
        response.json({message: 'erro na hora da compra'})
    }
})

//GET - LISTAR TODOS OS FILMES
app.get('/v2/acmeFilmes/filmes', cors(), async function (request, response) {

    let dadosFilmes = await controllerFilmes.getListarFilmes()

    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado' })
        response.status(404)
    }
})


//GET - PEGAR PELO NOME, LETRAS INICIAIS
app.get('/v2/acmeFilmes/filmes/filtro', cors(), async function (req, response) {

    const nome = req.query.nome
    console.log(nome)
    const listaNomes = await controllerFilmes.getNomeFilme(nome)

    response.status(listaNomes.status_code)
    response.json(listaNomes)
})


//GET - PEGAR PELO ID
app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

//DELETE
app.delete('/v2/acmeFilmes/filme/deletar/:id', cors(), async function(request, response){

    let idFilme = request.params.id
    
    let dadosFilme = await controllerFilmes.setExcluirFilmes(idFilme)

    console.log(dadosFilme);

    response.json(dadosFilme)
    response.status(dadosFilme.status_code)
})

//POST
app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.header('content-type')

    console.log(contentType);

    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body

    //encaminhandoos dados para o controler para enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)

    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//PUT
app.put('/v2/acmeFilmes/filme/atualizar/:id', cors(), bodyParserJSON, async function(request, response){

    let idFilme = request.params.id

    let contentType = request.header('content-type')

    let dadosBody = request.body
    
    let dadosFilme = await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)

    console.log(dadosFilme);

    response.json(dadosFilme)
    response.status(dadosFilme.status_code)
})

app.get('/v1/acmeFilmes/:id', cors(), (req, res) => {

    let idFilme = req.params.id
    let controleFilmesId = require('./controller/funcoes')
    const listaFilmesId = controleFilmesId.getListaFilmeId(idFilme)
    console.log(listaFilmesId)
    if (listaFilmesId) {
        res.json(listaFilmesId)
    } else {
        res.status(404).json({ erro: 'nenhum filme com esse id foi encontrado' })
    }
})

// GENERO - GET
app.get('/v2/acmeFilmes/generos', cors(), async function(request, response){

    let dadosGeneros = await controllerFilmes.getAllgeneros()

    if (dadosGeneros) {
        response.json(dadosGeneros)
        response.status(200)
    } else {
        response.json({ message: 'nenhum registro encontrado'})
        response.status(404)
    }
})

//CLASSIFICAÇÃO - GET
app.get('/v2/acmeFilmes/classificacoes', cors(), async function(request, response){

    let dadosClassificacao = await controllerFilmes.getAllClassificacoes()

    if(dadosClassificacao){
        response.status(200)
        response.json(dadosClassificacao)
    } else {
        response.status(404)
        response.json({message: "nenhum registro encontrado"})
    }
})

//SEXO - GET
app.get('/v2/acmeFilmes/sexos', cors(), async function(request, response){

    let dadosSexos = await controllerFilmes.getAllSexos()

    if(dadosSexos) {
        response.status(200)
        response.json(dadosSexos)
    } else {
        response.status(404)
        response.json({message: 'nenhum registro encontrado'})
    }
})

//NACIONALIDADES - GET
app.get('/v2/acmeFilmes/nacionalidades', cors(), async function(request, response){

    let dadosNacionalidades = await controllerFilmes.getAllNacionalidades()

    if(dadosNacionalidades) {
        response.status(200)
        response.json(dadosNacionalidades)
    } else {
        response.status(404)
        response.json({messag: 'nenhum registro encontrado'})
    }
})

//GENERO - POST
app.post('/v2/acmeFilmes/genero', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.header('content-type')

    console.log(contentType);

    let dadosBody = request.body

    let resultDadosNovoGenero = await controllerFilmes.setInserirNovogenero(dadosBody, contentType)
    console.log(resultDadosNovoGenero);

    if(resultDadosNovoGenero){
        response.status(200)
        response.json(resultDadosNovoGenero)
    } else {
        response.status(404)
    }
})

//CLASSIFICACAO - POST
app.post('/v2/acmeFilmes/classificacao', cors(), bodyParserJSON, async function(request, response){

    let contentType = request.header('content-type')

    console.log(contentType);

    let dadosBody = request.body

    let resultDadosNovaClassificacao = await controllerFilmes.setInserirNovaClassificacao(dadosBody, contentType)

    if(resultDadosNovaClassificacao) {
        response.status(200)
        response.json(resultDadosNovaClassificacao)
    } else {
        response.status(404)
    }
})

//GENERO - DELETE
app.delete('/v2/acmeFilmes/genero/deletar/:id', cors(), async function(request, response){

    let idGenero = request.params.id

    let resultGenero = await controllerFilmes.setExcluirGenero(idGenero)

    if(resultGenero){
        response.status(200)
        response.json(resultGenero)
    } else {
        response.status(404)
    }
})

//CLASSIFICACAO - DELETE
app.delete('/v2/acmeFilmes/classificacao/deletar/:id', cors(), async function(request, response){

    let idDeletar = request.params.id

    let resultClassificacao = await controllerFilmes.setExcluirClassificacao(idDeletar)

    if(resultClassificacao){
        response.status(200)
        response.json(resultClassificacao)
    } else {
        response.status(404)
    }
})

// app.get('/v1/acmeFilmes/filmes/nomes', cors(), (req, res) => {

//     let controleNomes = require('./controller/funcoes')
//     const listaNomes = controleNomes.getListaFilmesNomes()
//     if (listaNomes) {
//         res.json(listaNomes)
//     } else {
//         res.status(404).json({ erro: 'nenhum nome de filme foi encontrado' })
//     }
// })

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`foiiii ${port}`)
})

