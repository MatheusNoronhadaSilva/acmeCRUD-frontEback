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

const setInserirNovaNacionalidade = async function (dadosNacionalidade, contentType) {

    let novoNacionalidadeJSON = {}


    try {
        
        if(String(contentType).toLowerCase() == 'application/json'){
        


            if(dadosNacionalidade.nacionalidade == undefined || dadosNacionalidade.nacionalidade == null || dadosNacionalidade.nacionalidade == '' || dadosNacionalidade.nacionalidade.length > 60) {
    
                return message.ERROR_REQUIRED_FIELDS
            } else {
    
                let novaNacionalidade = await nacionalidadesDAO.insertNacionalidade(dadosNacionalidade)
    
                if(novaNacionalidade) {
                    novoNacionalidadeJSON.nacionalidade = novaNacionalidade
                    novoNacionalidadeJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoNacionalidadeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoNacionalidadeJSON.message = message.SUCESS_CREATED_ITEM.message
    
                    console.log(novoNacionalidadeJSON);
    
                    return novoNacionalidadeJSON
                } else {
                    return message.ERROR_INTERVAL_SERVER //500
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERVAL_SERVER_DB //500
    }
}

module.exports = {
    setInserirNovaNacionalidade,
    getAllNacionalidades
}