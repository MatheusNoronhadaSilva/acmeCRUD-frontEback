/**************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no banco de dados Mysql,
 *         aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')

//instancia da classe prisma client
const prisma = new PrismaClient()

const selectAllNacionalidades = async function() {


    try {
        
        let sql = `select * from tbl_nacionalidade;`

    let rsSql = await prisma.$queryRawUnsafe(sql)

    if(rsSql) {
        return rsSql
    } else {
        return false
    }

    } catch (error) {
        return false
    }
}

const setInserirRelacaoNacionalidadeAtor = async function (idAtor, idNacionalidade) {

    try {

        console.log('relação: ' + idAtor + ' com ' + idNacionalidade);

        let sql = `insert into tbl_ator_nacionalidade (
            id_ator, 
            id_nacionalidade
        ) values
        (
            ${idAtor},
            ${idNacionalidade});`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        
    }
}

const deleteRelacaoNacionalidadeAtor = async function(id){

    try {

        let sql = `delete from tbl_ator_nacionalidade where tbl_ator_nacionalidade.id_ator = ${id};`
        console.log(sql);

        let resultSql = await prisma.$executeRawUnsafe(sql)

        if(resultSql){
            return resultSql
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }
}

const selectNacionalidadeAtorById = async function(id) {


    let sql = `SELECT tbl_nacionalidade.id, tbl_nacionalidade.nacionalidade
    FROM tbl_ator_nacionalidade
    JOIN tbl_nacionalidade ON tbl_ator_nacionalidade.id_nacionalidade = tbl_nacionalidade.id where tbl_ator_nacionalidade.id_ator = ${id};`

    let rssql = await prisma.$queryRawUnsafe(sql)

    if(rssql) {
        return rssql
    } else {
        return false
    }
}

const selectNacionalidadeDiretorById = async function(id){

    let sql = `SELECT tbl_nacionalidade.*
    FROM tbl_nacionalidade
    JOIN tbl_diretor_nacionalidade ON tbl_nacionalidade.id = tbl_diretor_nacionalidade.id_nacionalidade
    WHERE tbl_diretor_nacionalidade.id_diretor = ${id};`

    let rssql = await prisma.$queryRawUnsafe(sql)

    if(rssql) {
        return rssql
    } else {
        return false
    }
}

const insertNacionalidade = async function(dadosNacionalidade){

    try {
        
        let sql = `INSERT INTO tbl_nacionalidade (nome)
        VALUES ('${dadosNacionalidade.nacionalidade}');
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        return false   
    }
}

module.exports = {
    insertNacionalidade,
    selectNacionalidadeDiretorById,
    deleteRelacaoNacionalidadeAtor,
    selectNacionalidadeAtorById,
    setInserirRelacaoNacionalidadeAtor,
    selectAllNacionalidades
}