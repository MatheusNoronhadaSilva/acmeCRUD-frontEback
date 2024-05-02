/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')

const getAllNacionalidades = async function () {

    let nacionalidadeJSON = {}

    let dadosNacionalidades = await nacionalidadesDAO.selectAllNacionalidades()

    if(dadosNacionalidades) {
        nacionalidadeJSON.nacionalidade = dadosNacionalidades
        nacionalidadeJSON.quantidade = dadosNacionalidades.length
        nacionalidadeJSON.status_code = 200

        return nacionalidadeJSON
    } else {
        return false
    }
}

module.exports = {
    getAllNacionalidades
}