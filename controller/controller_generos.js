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

        let relacaogeneroFilme = await generosDAO.deleteRelacaoGeneroFilmeByIdGenero(idGenero)
        let resultGenero = await generosDAO.deleteGenero(idGenero)

        if(resultGenero && relacaogeneroFilme) {
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
        return message.ERROR_INTERVAL_SERVER_DB //500
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

const getGenerosByIdFilme = async function(id){

    let idFilme = id

    let generosJSON = {}

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosGeneros = await generosDAO.selectGenerosFilmeById(idFilme)

        //validação 
        if (dadosGeneros) {

            if (dadosGeneros.length > 0) {


                generosJSON = dadosGeneros;
                generosJSON.status_code = 200

                return generosJSON

            } else {

                return message.ERROR_NOT_FOUND
            }
        } else {

            return message.ERROR_INTERVAL_SERVER_DB //500
        }


    }
}

const setAtualizargeneros = async function (idGenero, dadosgenero, contentType) {

    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {

            let generoAlteradoJSON = {}
            let id = idGenero

            if(dadosgenero.nome == '' || dadosgenero.nome == null || dadosgenero.nome == undefined){
                return message.ERROR_REQUIRED_FIELDS //400
            } else {

                let atualizarGenero = await generosDAO.updateGenero(id)

                if(atualizarGenero){
                    
                    generoAlteradoJSON.genero = atualizarGenero
                    generoAlteradoJSON.id = `id do genero alterado: ${id}`
                    generoAlteradoJSON.status = message.SUCESS_UPDATED_ITEM.status
                    generoAlteradoJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                    generoAlteradoJSON.message = message.SUCESS_UPDATED_ITEM.message
                } else {
                    return message.ERROR_INTERVAL_SERVER_DB //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    setAtualizargeneros,
    getGenerosByIdFilme,
    setInserirNovogenero,
    getAllgeneros,
    setExcluirGenero
}