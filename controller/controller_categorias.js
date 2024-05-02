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