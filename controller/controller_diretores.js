/**************************************
 * Objetivo: Arquivo responsável pelas validações e consistencias de dados de filme
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

const message = require('../module/config.js')

//import do arquivo responsável pela interação com o BD (model)
const nacionalidadesDAO = require('../model/DAO/nacionalidades.js')
const diretoresDAO = require('../model/DAO/diretores.js')
const sexosDAO = require('../model/DAO/sexos.js')

const getAllDiretores  = async function() {
    let diretoresJSON = {};

    diretoresJSON.diretores = []

    let dadosDiretores = await diretoresDAO.selectAllDiretores();
    let dadosSexos = await sexosDAO.selectAllSexos();

    if (dadosDiretores) {
        for (let i = 0; i < dadosDiretores.length; i++) {
            let InfoDiretor = dadosDiretores[i];
            const diretorIdSexo = InfoDiretor.id_sexo;
            for (let j = 0; j < dadosSexos.length; j++) {
                let sexo = dadosSexos[j];
                if (diretorIdSexo == sexo.id) {
                    InfoDiretor.sexo = sexo;
                    delete InfoDiretor.id_sexo;
                    break; 
                }
            }

            let dadosNacionalidades = await nacionalidadesDAO.selectNacionalidadeDiretorById(InfoDiretor.id);
            console.log(dadosNacionalidades);

            InfoDiretor.nacionalidade = dadosNacionalidades;

            diretoresJSON.diretores.push(InfoDiretor);
        }

        diretoresJSON.status_code = 200;
        return diretoresJSON;
    } else {
        return false;
    }
}

const getDiretoresByIdFilme = async function(id){

    let idFilme = id

    let diretoresJSON = {}

    //validação para ver se o id é valido
    if (idFilme == '' || idFilme == undefined || isNaN(idFilme)) {
        return message.ERROR_INVALID_ID //400
    } else {

        let dadosDiretores = await diretoresDAO.selectDiretorFilmeById(idFilme)

        //validação 
        if (dadosDiretores) {

            if (dadosDiretores.length > 0) {


                diretoresJSON = dadosDiretores;
                diretoresJSON.status_code = 200

                return diretoresJSON

            } else {

                return message.ERROR_NOT_FOUND
            }
        } else {

            return message.ERROR_INTERVAL_SERVER_DB //500
        }


    }
}

const setInserirNovoDiretor = async function (dadosDiretor, contentType) {

    try {
        
        if(String(contentType).toLowerCase() == 'application/json') {

            let infoDiretor = {}
            let infoDiretorNacionalidade = {}

            console.log(dadosDiretor);

            console.log('sdsdsd');

            if(dadosDiretor.nome == '' || dadosDiretor.nome == undefined || dadosDiretor.nome == null || dadosDiretor.nome.length > 60 ||
               dadosDiretor.email == '' || dadosDiretor.email == undefined || dadosDiretor.email == null || dadosDiretor.email.length > 80 ||
               dadosDiretor.biografia > 65000 ||
               dadosDiretor.nascimento == '' || dadosDiretor.nascimento == undefined || dadosDiretor.nascimento == null || dadosDiretor.nascimento.length > 10 ||
               dadosDiretor.sexo == '' || dadosDiretor.sexo == undefined || dadosDiretor.sexo == null || dadosDiretor.sexo.length > 1 || dadosDiretor.sexo != 1 && dadosDiretor.sexo != 2 ||
               dadosDiretor.nacionalidade[0] == '' || dadosDiretor.nacionalidade[0] == undefined || dadosDiretor.nacionalidade[0] == null || dadosDiretor.nacionalidade[0].length > 3
            ) {
                message.ERROR_REQUIRED_FIELDS //400
            } else {

                console.log('assasa');

                infoDiretor.nome = dadosDiretor.nome
                infoDiretor.email = dadosDiretor.email
                infoDiretor.biografia = dadosDiretor.biografia
                infoDiretor.nascimento = dadosDiretor.nascimento
                infoDiretor.sexo = dadosDiretor.sexo 

                console.log(infoDiretor);

                let novoDiretor = await diretoresDAO.setInserirNovoDiretor(infoDiretor)
                console.log('envio: ' + novoDiretor);

                if(novoDiretor == 1) {

                    console.log('dsdsdsdsdsdsd');
                    let ultimoEnvioDiretor = await diretoresDAO.selectUltimoEnvioDiretor()
                    console.log('ultimo diretor: ' + ultimoEnvioDiretor);

                    infoDiretorNacionalidade.idDiretor = ultimoEnvioDiretor
                    infoDiretorNacionalidade.nacionalidade = dadosDiretor.nacionalidade

                    console.log(infoDiretorNacionalidade);

                    let relacaoDiretorNacionalidade = await nacionalidadesDAO.setInserirRelacaoNacionalidadeDiretor(infoDiretorNacionalidade.idDiretor, infoDiretorNacionalidade.nacionalidade[0])

                    if(relacaoDiretorNacionalidade) {
                        if(infoDiretorNacionalidade.nacionalidade[1] != null) {
                            relacaoDiretorNacionalidade = await nacionalidadesDAO.setInserirRelacaoNacionalidadeDiretor(infoDiretorNacionalidade.idDiretor, infoDiretorNacionalidade.nacionalidade[1])

                            return ultimoEnvioDiretor
                        } else {
                            return ultimoEnvioDiretor
                        }
                    } else {
                        console.log('ssdsdsdsd');
                        return false
                    }
                } else {
                    console.log('aaaaaaaa');
                    return false 
                }
            }
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    setInserirNovoDiretor,
    getDiretoresByIdFilme,
    getAllDiretores
}