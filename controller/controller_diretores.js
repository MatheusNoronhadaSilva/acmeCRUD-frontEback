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

module.exports = {
    getAllDiretores
}