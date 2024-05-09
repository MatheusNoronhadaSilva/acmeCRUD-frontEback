/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const filmesDAO = require('../model/DAO/filme.js')
const classificacoesDAO = require('../model/DAO/classificacoes.js')
const diretoresDAO = require('../model/DAO/diretores.js')
const atoresDAO = require('../model/DAO/atores.js')
const  generosDAO = require('../model/DAO/generos.js')

const setInserirNovoFilme = async function (dadosFilme, contentType) {
    //função para inserir um novo filme

    try {
        
            // String(contentType).toLowerCase() == 'application/json' validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            let novoFilmeJSON = {}

            console.log(dadosFilme);
            console.log(dadosFilme.original_SitePirata);
    
            if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
                dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
                dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
                dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa > 300 ||
                dadosFilme.valor_alugar =='' || dadosFilme.valor_alugar == undefined || dadosFilme.valor_alugar == null || dadosFilme.valor_alugar.length > 6 || 
                dadosFilme.valor_comprar == '' || dadosFilme.valor_comprar == undefined || dadosFilme.valor_comprar == null || dadosFilme.valor_comprar.length > 6 ||
                dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || ![1,2,3,4,5,6].includes(dadosFilme.id_classificacao) ||
                dadosFilme.original_SitePirata != 1 && dadosFilme.original_SitePirata != 0 ||
                dadosFilme.diretores[0] == '' || dadosFilme.diretores[0] == undefined || dadosFilme.diretores[0] == null || dadosFilme.diretores[0] == 0 ||
                dadosFilme.atores[0] == '' || dadosFilme.atores[0] == undefined || dadosFilme.atores[0] == null || dadosFilme.atores[0] == 0 ||
                dadosFilme.generos[0] == '' || dadosFilme.generos[0] == undefined || dadosFilme.generos[0] == null || dadosFilme.generos[0] == 0 
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
    
                let validateStatus = false
    
                if (dadosFilme.data_relancamento != null &&
                    dadosFilme.data_relancamento != '' &&
                    dadosFilme.data_relancamento != undefined
    
                ) {
                    if (dadosFilme.data_relancamento.length != 10) {
                        return message.ERROR_REQUIRED_FIELDS //400
                    } else {
                        validateStatus = true
                    }
                } else {
                    validateStatus = true
                }
    
                if (validateStatus) {

                    console.log('adsdsdsdsd');
    
                    // encamiha para o DAO para inserir no banco
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)
                    let idPego = await filmesDAO.pegarUltimoId()
                    console.log('array: ' + dadosFilme.atores);
                    let novaRelacaoAtorFilme = await atoresDAO.setinserirRelacaoAtorFilme(idPego[0].id, dadosFilme.atores)
                    let novaRelacaoDiretorFilme = await diretoresDAO.setInserirRelacaoDiretorFilme(idPego[0].id, dadosFilme.diretores)
                    let novaRelacaogeneroFilme = await generosDAO.setInserirRelacaoGeneroFilme(idPego[0].id, dadosFilme.generos)
    
                    console.log(novoFilme);
                    console.log(idPego);
                    console.log(novaRelacaoAtorFilme);
                    console.log(novaRelacaoDiretorFilme);
                    console.log(novaRelacaogeneroFilme);

                    if (novoFilme && idPego && novaRelacaoAtorFilme && novaRelacaoDiretorFilme && novaRelacaogeneroFilme) {
                        const id = idPego[0].id
                        //retorno dos dados
                        novoFilmeJSON.filme = dadosFilme
                        novoFilmeJSON.id_adicionado = `O novo filme possui o id ${id}`
                        novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message
    
                        return novoFilmeJSON //201
                    } else {
                        return message.ERROR_INTERVAL_SERVER_DB //500
                    }
    
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        console.log('erro');
        return message.ERROR_INTERVAL_SERVER //500 erro na controller, e não no banco
    }
}

const setAtualizarFilme = async function (id, dadosFilme, contentType) {
    //função para atualizar um filme

    const idFilme = id

    try {
        
        // String(contentType).toLowerCase() == 'application/json' validação de content-type (apenas application/json)
    if (String(contentType).toLowerCase() == 'application/json') {

        let FilmeAlteradoJSON = {}

        if (dadosFilme.nome == '' || dadosFilme.nome == undefined || dadosFilme.nome == null || dadosFilme.nome.length > 80 ||
        dadosFilme.sinopse == '' || dadosFilme.sinopse == undefined || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
        dadosFilme.duracao == '' || dadosFilme.duracao == undefined || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
        dadosFilme.data_lancamento == '' || dadosFilme.data_lancamento == undefined || dadosFilme.data_lancamento == null || dadosFilme.data_lancamento.length != 10 ||
        dadosFilme.foto_capa == '' || dadosFilme.foto_capa == undefined || dadosFilme.foto_capa == null || dadosFilme.foto_capa > 300 ||
        dadosFilme.valor_alugar =='' || dadosFilme.valor_alugar == undefined || dadosFilme.valor_alugar == null || dadosFilme.valor_alugar.length > 6 || 
        dadosFilme.valor_comprar == '' || dadosFilme.valor_comprar == undefined || dadosFilme.valor_comprar == null || dadosFilme.valor_comprar.length > 6 ||
        dadosFilme.id_classificacao == '' || dadosFilme.id_classificacao == undefined || dadosFilme.id_classificacao == null || ![1,2,3,4,5,6].includes(dadosFilme.id_classificacao) ||
        dadosFilme.original_SitePirata != 1 && dadosFilme.original_SitePirata != 0 ||
        dadosFilme.diretores[0] == '' || dadosFilme.diretores[0] == undefined || dadosFilme.diretores[0] == null || dadosFilme.diretores[0] == 0 ||
        dadosFilme.atores[0] == '' || dadosFilme.atores[0] == undefined || dadosFilme.atores[0] == null || dadosFilme.atores[0] == 0 ||
        dadosFilme.generos[0] == '' || dadosFilme.generos[0] == undefined || dadosFilme.generos[0] == null || dadosFilme.generos[0] == 0 
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

            let validateStatus = false

            if (dadosFilme.data_relancamento != null &&
                dadosFilme.data_relancamento != '' &&
                dadosFilme.data_relancamento != undefined

            ) {
                if (dadosFilme.data_relancamento.length != 10) {
                    return message.ERROR_REQUIRED_FIELDS //400
                } else {
                    validateStatus = true
                }
            } else {
                validateStatus = true
            }

            if (validateStatus) {

                // encamiha para o DAO para inserir no banco
                let atualizarFilme = await filmesDAO.updateFilme(idFilme, dadosFilme)

                console.log('atualizar filme ' + atualizarFilme);

                let relacaoFilmeAtorAtual = await atoresDAO.selectAtoresFilmeById(idFilme)
                let relacaoFilmeGeneroAtual = await generosDAO.selectGenerosFilmeById(idFilme)
                let relacaoFilmeDiretorAtual = await diretoresDAO.selectDiretorFilmeById(idFilme)

                let idsAtoresAtuais = []
                let idsGenerosAtuais = []
                let idsDiretoresAtuais = []

                relacaoFilmeAtorAtual.forEach(ator => {
                    
                    idsAtoresAtuais.push(ator.id)
                });

                relacaoFilmeGeneroAtual.forEach(genero => {

                    idsGenerosAtuais.push(genero.id)
                })

                relacaoFilmeDiretorAtual.forEach(diretor => {

                    idsDiretoresAtuais.push(diretor.id)
                })




                let atualizarRelacaoAtor = await atoresDAO.setAlterarRelacaoAtorFilme(idFilme, dadosFilme.atores, idsAtoresAtuais)
                let atualizarRelacaoGenero = await generosDAO.setAlterarRelacaoGeneroFilme(idFilme, dadosFilme.generos, idsGenerosAtuais)
                let atualizarRelacaoDiretor = await diretoresDAO.setAlterarRelacaoDiretorFilme(idFilme, dadosFilme.diretores, idsDiretoresAtuais)

                console.log(atualizarFilme);
                console.log(atualizarRelacaoAtor);
                console.log(atualizarRelacaoDiretor);
                console.log(atualizarRelacaoGenero);
                
                if (atualizarFilme && atualizarRelacaoAtor && atualizarRelacaoGenero && atualizarRelacaoDiretor) {
                    //retorno dos dados
                    console.log('certooo');
                    FilmeAlteradoJSON.filme = dadosFilme
                    FilmeAlteradoJSON.id = `id do filme alterado: ${id}`
                    FilmeAlteradoJSON.status = message.SUCESS_UPDATED_ITEM.status
                    FilmeAlteradoJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                    FilmeAlteradoJSON.message = message.SUCESS_UPDATED_ITEM.message

                    return FilmeAlteradoJSON //201
                } else {
                    return message.ERROR_INTERVAL_SERVER_DB //500
                }

            }
        }
    } else {
        return message.ERROR_CONTENT_TYPE //415
    }

} catch (error) {
    return message.ERROR_INTERVAL_SERVER //500 erro na controller, e não no banco
}
}

const setExcluirFilmes = async function (id) {
    //Função para excluir um filme

    let idFilme = id

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let relacaoAtorFilme = await atoresDAO.deleteRelacaoAtorFilmeByIdFilme(idFilme)
        let relacaoDiretorFilme = await diretoresDAO.deleteRelacaoDiretorFilmeByIdFilme(idFilme)
        let relacaoGeneroFilme = await generosDAO.deleteRelacaoGeneroFilmeByIdFilme(idFilme)
        let dadosFilme = await filmesDAO.deleteFilme(idFilme)

        console.log(dadosFilme);

        //validação 
        if (dadosFilme && relacaoAtorFilme && relacaoDiretorFilme && relacaoGeneroFilme) {

            return message.SUCESS_DELETE_ITEM

        } else if (dadosFilme == false) {

            //Caso dadosFilme não receba os dados do DB, significa que o erro esta no DB, pois dadosFilme
            // Nem se quer esta retornando algo, mesmo que esteja retornando null, logo, o erro deve estar
            // na hora de fazer a requisição do banco, ou o model pra pegar o resultado do banco 
            return message.ERROR_NOT_FOUND //500
        } else {
            return message.ERROR_INTERVAL_SERVER_DB
        }


    } 

}

const getListarFilmes = async function () {

    //cria um objeto JSON
    let filmesJSON = {};

    filmesJSON.filmes = []

    //chama a função do DAO que retorna os filmes do DB
    let dadosFilmes = await filmesDAO.selectAllFilmes()
    let dadosClassificacao = await classificacoesDAO.selectAllClassificacoes()

    console.log(dadosClassificacao);

    //validação para verificar se o DAO retornou dados
    if(dadosFilmes){
        for(let i = 0; i < dadosFilmes.length; i++){

            let infoFilme = dadosFilmes[i]
            const filmeIdClassificacao = infoFilme.id_classificacao

            let dadosDiretores = await diretoresDAO.selectDiretorFilmeById(infoFilme.id)
            let dadosAtores = await atoresDAO.selectAtoresFilmeById(infoFilme.id)
            let dadosGeneros = await generosDAO.selectGenerosFilmeById(infoFilme.id)

            infoFilme.diretores = dadosDiretores
            infoFilme.atores = dadosAtores
            infoFilme.generos = dadosGeneros


            for(let j = 0; j < dadosClassificacao.length; j++) {
                let classificacao = dadosClassificacao[j]
                if(filmeIdClassificacao == classificacao.id){
                    infoFilme.classificacao = classificacao
                    delete infoFilme.id_classificacao
                    break;
                }
            }

            filmesJSON.filmes.push(infoFilme)
        }

        return filmesJSON
    } else {
        return false 
    }
    // if (dadosFilmes) {
    //     //cria o JSON
    //     filmesJSON.filmes = dadosFilmes
    //     filmesJSON.quantidade = dadosFilmes.length
    //     filmesJSON.status_code = 200

    //     return filmesJSON
    // } else {
    //     return false
    // }
}




const getUltimosPedidos = async function () {

    const novidadesJSON = {}

    let dadosNovidades = await filmesDAO.selectUltimosIds()

    if(dadosNovidades.length > 0) {

        novidadesJSON.novidades = dadosNovidades

        return novidadesJSON
    } else {
        return false
    }
}

const setInserirCompra = async function (idCompra) {
    
    try {
        
            // String(contentType).toLowerCase() == 'application/json' validação de content-type (apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {

            let novaCompraJSON = {}
    
            if (idCompra.id == '' || idCompra.id == undefined || idCompra.id == null) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {
    
                    // encamiha para o DAO para inserir no banco
                    let novaCompra = await filmesDAO.insertCompra(idCompra)
        
                    if (novaCompra) {
                        //retorno dos dados
                        novaCompraJSON.id = idCompra
    
                        return novoFilmeJSON //201
                    } else {
                        return message.ERROR_INTERVAL_SERVER_DB //500
                    }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERVAL_SERVER //500 erro na controller, e não no banco
    }
}

// const getListarComprados = async function () {

//     idsComprados = {}

//     let dadosComprados = await filmesDAO.selectAllComprados()

//     if(dadosComprados){
//         idsComprados.comprados = dadosComprados
//         idsComprados.quantidade = dadosComprados.length

//         return idsComprados
//     } else {
//         return false
//     }
// }

const getNomeFilme = async function (nome) {

    let nomeFilmeJSON = {}

    nomeFilmeJSON.filmes = []
    nomeFilmeJSON.filmes.diretores = []
    nomeFilmeJSON.filmes.atores = []

    if (nome == '' || nome == undefined) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosNomeFilme = await filmesDAO.selectByNameFilme(nome)

        console.log(dadosNomeFilme);
        let dadosClassificacao = await classificacoesDAO.selectAllClassificacoes()

        if(dadosNomeFilme){
            for(let i = 0; i < dadosNomeFilme.length; i++){

                let infoFilme = dadosNomeFilme[i]
                const filmeIdClassificacao = infoFilme.id_classificacao

                let dadosDiretores = await diretoresDAO.selectDiretorFilmeById(dadosNomeFilme[i].id)
                let dadosAtores = await atoresDAO.selectAtoresFilmeById(dadosNomeFilme[i].id)
                let dadosGeneros = await generosDAO.selectGenerosFilmeById(dadosNomeFilme[i].id)

                infoFilme.diretores = dadosDiretores
                infoFilme.atores = dadosAtores
                infoFilme.generos = dadosGeneros

                for(let j = 0; j < dadosClassificacao.length; j++) {
                    let classificacao = dadosClassificacao[j]
                    if(filmeIdClassificacao == classificacao.id){
                        infoFilme.classificacao = classificacao
                        delete infoFilme.id_classificacao
                        break;
                    }
                }
    
                nomeFilmeJSON.filmes.push(infoFilme)
            }
    
            return nomeFilmeJSON
        } else {
            return false 
        }
        // if (dadosNomeFilme) {

        //     console.log('verificação');

        //     if (dadosNomeFilme.length > 0) {

        //         nomeFilmeJSON.filmes = dadosNomeFilme
        //         nomeFilmeJSON.quantidade = dadosNomeFilme.length
        //         nomeFilmeJSON.status_code = 200

        //         return nomeFilmeJSON

        //     } else {

        //         return message.ERROR_NOT_FOUND
        //     }
        // } else {

        //     return message.ERROR_INTERVAL_SERVER_DB //500

        // }
    }
}

const getBuscarFilme = async function (id) {
    //função para buscar um filme

    let idFilme = id

    let filmeJSON = {}

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosFilme = await filmesDAO.selectByIdFilme(idFilme)
        let dadosDiretores = await diretoresDAO.selectDiretorFilmeById(idFilme)
        let dadosAtores = await atoresDAO.selectAtoresFilmeById(idFilme)
        let dadosGeneros = await generosDAO.selectGenerosFilmeById(idFilme)

        //validação 
        if (dadosFilme) {

            if (dadosFilme.length > 0) {

                let infoFilme = dadosFilme[0]

                infoFilme.diretores = dadosDiretores
                infoFilme.atores = dadosAtores
                infoFilme.generos = dadosGeneros

                filmeJSON.filme = infoFilme;
                filmeJSON.status_code = 200

                return filmeJSON

            } else {

                //Caso dadoFilme receba os dados do DB e o tamanho dele não seja maior que 0,
                // o erro é de que não foi encontrado, pois nos conseguimos retornar o valor dadosFilme,
                // porém, não foi selecionado da forma correta no DB e não pegamos o id, por isso do 404
                return message.ERROR_NOT_FOUND
            }
        } else {

            //Caso dadosFilme não receba os dados do DB, significa que o erro esta no DB, pois dadosFilme
            // Nem se quer esta retornando algo, mesmo que esteja retornando null, logo, o erro deve estar
            // na hora de fazer a requisição do banco, ou o model pra pegar o resultado do banco 
            return message.ERROR_INTERVAL_SERVER_DB //500
        }


    }
}

module.exports = {
    getNomeFilme,
    setInserirNovoFilme,
    setAtualizarFilme,
    getUltimosPedidos,
    setExcluirFilmes,
    getListarFilmes,
    setInserirCompra,
    getBuscarFilme,
}