/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const atoresDAO = require('../model/DAO/atores.js')
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')
const sexosDAO = require('../model/DAO/sexos.js')

const setInserirNovoAtor = async function (dadosAtor, contentType) {

    try {
        
        if(String(contentType).toLowerCase() == 'application/json') {

            let infoAtor = {}
            let infoAtorNacionalidade = {}

            console.log(dadosAtor);

            console.log('sdsdsd');

            if(dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 60 ||
               dadosAtor.email == '' || dadosAtor.email == undefined || dadosAtor.email == null || dadosAtor.email.length > 80 ||
               dadosAtor.biografia > 65000 ||
               dadosAtor.nascimento == '' || dadosAtor.nascimento == undefined || dadosAtor.nascimento == null || dadosAtor.nascimento.length > 10 ||
               dadosAtor.sexo == '' || dadosAtor.sexo == undefined || dadosAtor.sexo == null || dadosAtor.sexo.length > 1 || dadosAtor.sexo != 1 && dadosAtor.sexo != 2 ||
               dadosAtor.nacionalidade[0] == '' || dadosAtor.nacionalidade[0] == undefined || dadosAtor.nacionalidade[0] == null || dadosAtor.nacionalidade[0].length > 3
            ) {
                message.ERROR_REQUIRED_FIELDS //400
            } else {

                console.log('assasa');

                infoAtor.nome = dadosAtor.nome
                infoAtor.email = dadosAtor.email
                infoAtor.biografia = dadosAtor.biografia
                infoAtor.nascimento = dadosAtor.nascimento
                infoAtor.sexo = dadosAtor.sexo 

                console.log(infoAtor);

                let novoAtor = await atoresDAO.setInserirNovoAtor(infoAtor)
                console.log('envio: ' + novoAtor);

                if(novoAtor == 1) {

                    console.log('dsdsdsdsdsdsd');
                    let ultimoEnvioAtor = await atoresDAO.selectUltimoEnvioAtor()
                    console.log('ultimo ator: ' + ultimoEnvioAtor);

                    infoAtorNacionalidade.idAtor = ultimoEnvioAtor
                    infoAtorNacionalidade.nacionalidade = dadosAtor.nacionalidade

                    console.log(infoAtorNacionalidade);

                    let relacaoAtorNacionalidade = await nacionalidadesDAO.setInserirRelacaoNacionalidadeAtor(infoAtorNacionalidade.idAtor, infoAtorNacionalidade.nacionalidade[0])

                    if(relacaoAtorNacionalidade) {
                        if(infoAtorNacionalidade.nacionalidade[1] != null) {
                            relacaoAtorNacionalidade = await nacionalidadesDAO.setInserirRelacaoNacionalidadeAtor(infoAtorNacionalidade.idAtor, infoAtorNacionalidade.nacionalidade[1])

                            return ultimoEnvioAtor
                        } else {
                            return ultimoEnvioAtor
                        }
                    } else {
                        return false
                    }
                } else {
                    return false 
                }
            }
        }
    } catch (error) {
        return false
    }
}

const getAllAtores = async function() {
    let atoresJSON = {};

    atoresJSON.atores = []

    let dadosAtores = await atoresDAO.selectAllAtores();
    let dadosSexos = await sexosDAO.selectAllSexos();

    if (dadosAtores) {
        for (let i = 0; i < dadosAtores.length; i++) {
            let InfoAtor = dadosAtores[i];
            const atorIdSexo = InfoAtor.id_sexo;
            for (let j = 0; j < dadosSexos.length; j++) {
                let sexo = dadosSexos[j];
                if (atorIdSexo == sexo.id) {
                    InfoAtor.sexo = sexo;
                    delete InfoAtor.id_sexo;
                    break; 
                }
            }

            let dadosNacionalidades = await nacionalidadesDAO.selectNacionalidadeAtorById(InfoAtor.id);

            InfoAtor.nacionalidade = dadosNacionalidades;

            atoresJSON.atores.push(InfoAtor);
        }

        atoresJSON.status_code = 200;
        return atoresJSON;
    } else {
        return false;
    }
};

const setExcluirAtor = async function(id) {

    let idAtor = id

    if( idAtor == '' || idAtor == undefined ||isNaN(idAtor)) {

        return message.ERROR_INVALID_ID //400

    } else {


        let resultRelacaoNacionalidadeAtor = await nacionalidadesDAO.deleteRelacaoNacionalidadeAtor(idAtor)
        console.log(resultRelacaoNacionalidadeAtor);

        if(resultRelacaoNacionalidadeAtor) {

            let resultAtor = await atoresDAO.deleteAtor(idAtor)

            if(resultAtor){

                return message.SUCESS_DELETE_ITEM

            }
        } else if (resultRelacaoNacionalidadeAtor == false) {
            return message.ERROR_NOT_FOUND //404
        } else {
            return message.ERROR_INTERVAL_SERVER_DB
        }
    }

}

const getAtorByIdFilme = async function(id){

    let idFilme = id

    let atoresJSON = {}

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosAtores = await atoresDAO.selectAtoresFilmeById(idFilme)

        //validação 
        if (dadosAtores) {

            if (dadosAtores.length > 0) {


                atoresJSON = dadosAtores;
                atoresJSON.status_code = 200

                return atoresJSON

            } else {

                return message.ERROR_NOT_FOUND
            }
        } else {

            return message.ERROR_INTERVAL_SERVER_DB //500
        }


    }
}

const setAtualizarAtor = async function(id, dadosAtor, contentType){

    const idAtor = id

    try {
        
        // String(contentType).toLowerCase() == 'application/json' validação de content-type (apenas application/json)
    if (String(contentType).toLowerCase() == 'application/json') {

        let atorAlteradoJSON = {}

        if (dadosAtor.nome == '' || dadosAtor.nome == undefined || dadosAtor.nome == null || dadosAtor.nome.length > 60 ||
        dadosAtor.email == '' || dadosAtor.email == undefined || dadosAtor.email == null || dadosAtor.email.length > 80 ||
        dadosAtor.biografia > 65000 ||
        dadosAtor.nascimento == '' || dadosAtor.nascimento == undefined || dadosAtor.nascimento == null || dadosAtor.nascimento.length > 10 ||
        dadosAtor.sexo == '' || dadosAtor.sexo == undefined || dadosAtor.sexo == null || dadosAtor.sexo.length > 1 || dadosAtor.sexo != 1 && dadosAtor.sexo != 2 ||
        dadosAtor.nacionalidade[0] == '' || dadosAtor.nacionalidade[0] == undefined || dadosAtor.nacionalidade[0] == null || dadosAtor.nacionalidade[0].length > 3
        ) {
            return message.ERROR_REQUIRED_FIELDS //400
        } else {

                // encamiha para o DAO para inserir no banco
                let atualizarAtor = await atoresDAO.updateAtor(idAtor, dadosAtor)

                console.log('atualizar ator ' + atualizarAtor);
                
                if (atualizarAtor) {
                    //retorno dos dados
                    console.log('certooo');
                    atorAlteradoJSON.ator = dadosAtor
                    atorAlteradoJSON.id = `id do ator alterado: ${id}`
                    atorAlteradoJSON.status = message.SUCESS_UPDATED_ITEM.status
                    atorAlteradoJSON.status_code = message.SUCESS_UPDATED_ITEM.status_code
                    atorAlteradoJSON.message = message.SUCESS_UPDATED_ITEM.message

                    return FilmeAlteradoJSON //201
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

module.exports = {
    setAtualizarAtor,
    getAtorByIdFilme,
    setExcluirAtor,
    getAllAtores,
    setInserirNovoAtor
}