/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const classificacoesDAO = require('../model/DAO/classificacoes.js')

const getAllClassificacoes = async function () {

    let classificacaoJSON = {}

    let dadosClassificacao = await classificacoesDAO.selectAllClassificacoes()

    if(dadosClassificacao) {
        classificacaoJSON.classificacao = dadosClassificacao
        classificacaoJSON.quantidade - dadosClassificacao.length
        classificacaoJSON.status_code = 200

        return classificacaoJSON
    } else {
        return false
    }
}

const setExcluirClassificacao = async function (id) {

    let idClassificacao = id

    if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let resultClassificacao = await filmesDAO.deleteClassificacao(idClassificacao)

console.log(resultClassificacao);
        if(resultClassificacao == true) {
            return message.SUCESS_DELETE_ITEM
        } else if (resultClassificacao == false ) {
            return message.ERROR_NOT_FOUND //404
        } else {
            return message.ERROR_INTERVAL_SERVER_DB
        }
    }
}

const setInserirNovaClassificacao = async function(dadosClassificacao, contentType) {

    console.log('kkfdsdsdsd');

    try {
        
        if(String(contentType).toLowerCase() == 'application/json') {

            console.log(dadosClassificacao);

            let novaClassificacaoJSON = {}

            if(dadosClassificacao.classificacao == "" ||  dadosClassificacao.classificacao == null || dadosClassificacao.classificacao.length > 5 ||
               dadosClassificacao.caracteristicas == "" || dadosClassificacao.caracteristicas == null || dadosClassificacao.caracteristicas.length > 65000 ||
               dadosClassificacao.img_classificacao == "" || dadosClassificacao.img_classificacao == null || dadosClassificacao.img_classificacao.length > 250
            ) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {

                console.log('skdfbsdbfjkb');

                let novaClassificacao = await filmesDAO.InsertClassificacao(dadosClassificacao)

                console.log(novaClassificacao);
                if(novaClassificacao){
                    novaClassificacaoJSON.genero = novaClassificacao
                    novaClassificacaoJSON.status = message.SUCESS_CREATED_ITEM.status
                    novaClassificacaoJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novaClassificacaoJSON.message = message.SUCESS_CREATED_ITEM.message

                    return novaClassificacaoJSON
                } else {
                    return message.ERROR_INTERVAL_SERVER //500
                }
            }
        }
    } catch (error) {
        
    }
}

module.exports = {
    setInserirNovaClassificacao,
    setExcluirClassificacao,
    getAllClassificacoes
}