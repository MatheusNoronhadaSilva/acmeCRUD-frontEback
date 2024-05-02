/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const sexosDAO = require('../model/DAO/sexos.js')

const getAllSexos = async function () {

    let sexoJSON = {}

    let dadosSexos = await sexosDAO.selectAllSexos()

    console.log(dadosSexos);
    if(dadosSexos) {
        sexoJSON.sexos = dadosSexos
        sexoJSON.quantidade = dadosSexos.length
        sexoJSON.status_code = 200

        return sexoJSON
    } else {
        return false
    }
}

module.exports = {
    getAllSexos
}