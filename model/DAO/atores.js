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

const setInserirNovoAtor = async function (infoAtor) {

    try {

        let sql

        if(infoAtor.biografia == null || infoAtor.biografia == undefined || infoAtor.biografia == '') {

            sql = `insert into tbl_ator (
                nome, 
                email,
                biografia,
                nascimento, 
                id_sexo
            ) values
            (
                '${infoAtor.nome}', 
                '${infoAtor.email}',
                null, 
                '${infoAtor.nascimento}', 
                ${infoAtor.sexo});`
        } else {
            sql = `insert into tbl_ator (
                nome, 
                email,
                biografia,
                nascimento, 
                id_sexo
            ) values
            (
                '${infoAtor.nome}', 
                '${infoAtor.email}',
                '${infoAtor.biografia}', 
                '${infoAtor.nascimento}', 
                ${infoAtor.sexo});`
        }

        let result = await prisma.$executeRawUnsafe(sql)
        
        if( result) {
            return result
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

const selectUltimoEnvioAtor = async function () {

    let sql_id

    sql_id = 'select cast(last_insert_id() as decimal) as id from tbl_ator limit 1' 

    let pegarId = await prisma.$queryRawUnsafe(sql_id)

    if(pegarId && pegarId.length >  0) {
        return pegarId[0].id
    } else {
        return false 
    }
}

const selectAllAtores = async function () {

    let sql = `select * from tbl_ator;`

    let rssql = await prisma.$queryRawUnsafe(sql)

    console.log('atores enviados');
    if(rssql) {
        return rssql
    } else {
        return false
    }
}

const deleteAtor = async function(id){

    try {

        let sql = `delete from tbl_ator where tbl_ator.id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {

        return false

    }
}

const selectAtoresFilmeById = async function(id){

    try {
        
        let sql = `SELECT tbl_ator.id, tbl_ator.nome
        FROM tbl_ator
        JOIN tbl_filme_ator ON tbl_ator.id = tbl_filme_ator.id_ator
        WHERE tbl_filme_ator.id_filme = ${id};`

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        
    }
}

const setinserirRelacaoAtorFilme = async function (idFilme, arrayIdAtor) {

    try {

        console.log('oioiiooioioiioioiioiiiio');
        console.log(idFilme);
        
        for(let i = 0; i < arrayIdAtor.length; i++) {

            console.log(arrayIdAtor);
            let sql =`insert into tbl_filme_ator (id_filme, id_ator) values
            (${idFilme},${arrayIdAtor[i]});`

            console.log(sql);

            let result = await prisma.$executeRawUnsafe(sql)

            if(result == false){
                return false
            }
        }

        return true
    } catch (error) {
        return false
    }
}

const deleteRelacaoAtorFilmeByIdFilme = async function(idFilme) {

    try {
        
        let sql = `DELETE FROM tbl_filme_ator WHERE id_filme = ${idFilme}; `

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
    deleteRelacaoAtorFilmeByIdFilme,
    setinserirRelacaoAtorFilme,
    selectAtoresFilmeById,
    deleteAtor,
    selectAllAtores,
    selectUltimoEnvioAtor,
    setInserirNovoAtor
}