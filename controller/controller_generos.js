/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const generosDAO = require('../model/DAO/generos.js')

const setExcluirGenero = async function (id) {

    let idGenero = id

    if( idGenero == '' || idGenero == undefined ||isNaN(idGenero)) {
        return message.ERROR_INVALID_ID //400
    } else {
        let resultGenero = await generosDAO.deleteGenero(idGenero)

        if(resultGenero == true) {
            return message.SUCESS_DELETE_ITEM
        } else if (resultGenero == false) {
            return message.ERROR_NOT_FOUND //500
        } else {
            return message.ERROR_INTERVAL_SERVER_DB
        }
    }
}

const setInserirNovogenero = async function (dadosGeneros, contentType) {


    try {
        
        if(String(contentType).toLowerCase() == 'application/json') {

            let novoGeneroJSON = {}



            if(dadosGeneros.genero == "" || dadosGeneros.genero == null || dadosGeneros.genero == undefined || dadosGeneros.genero > 50) {
                return message.ERROR_REQUIRED_FIELDS //400
            } else {

                let novoGenero = await generosDAO.insertGenero(dadosGeneros)

                if(novoGenero){
                    novoGeneroJSON.genero = novoGenero
                    novoGeneroJSON.status = message.SUCESS_CREATED_ITEM.status
                    novoGeneroJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                    novoGeneroJSON.message = message.SUCESS_CREATED_ITEM.message

                    console.log(novoGeneroJSON);

                    return novoGeneroJSON
                } else {
                    return message.ERROR_INTERVAL_SERVER //500
                }
            }
        }
    } catch (error) {
        
    }
}

const getAllgeneros = async function () {

    let generosJSON = {}

    let dadosgeneros = await generosDAO.selectAllGeneros()

    if(dadosgeneros) {
        generosJSON.generos = dadosgeneros
        generosJSON.quantidade = dadosgeneros.length
        generosJSON.status_code = 200

        return generosJSON
    } else {
        return false
    }
}

module.exports = {
    setInserirNovogenero,
    getAllgeneros,
    setExcluirGenero
}