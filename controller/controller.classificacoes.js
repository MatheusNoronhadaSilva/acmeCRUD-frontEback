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

module.exports = {
    getAllClassificacoes
}