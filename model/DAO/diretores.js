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

const setInserirNovoDiretor = async function (infoAtor) {

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

const selectUltimoEnvioDiretor = async function () {

    let sql_id

    sql_id = 'select cast(last_insert_id() as decimal) as id from tbl_ator limit 1' 

    let pegarId = await prisma.$queryRawUnsafe(sql_id)

    if(pegarId && pegarId.length >  0) {
        return pegarId[0].id
    } else {
        return false 
    }
}

const selectAllDiretores = async function () {

    let sql = `select * from tbl_diretor;`

    let rssql = await prisma.$queryRawUnsafe(sql)

    console.log('diretores enviados');
    if(rssql) {
        return rssql
    } else {
        return false
    }
}

const selectDiretorFilmeById = async function(id) {

    try {

        
        let sql = `SELECT tbl_diretor.id, tbl_diretor.nome
    FROM tbl_diretor
    JOIN tbl_filme_diretor ON tbl_diretor.id = tbl_filme_diretor.id_diretor
    WHERE tbl_filme_diretor.id_filme = ${id};`

    let result = await prisma.$queryRawUnsafe(sql)

    if(result){
        return result
    } else {
        return false
    }
    } catch (error) {
        return false
    }
}

const setInserirRelacaoDiretorFilme = async function (idFilme, arrayIdDiretor) {

    try {

        console.log('oioiiooioioiioioiioiiiio');
        console.log(idFilme);
        
        for(let i = 0; i < arrayIdDiretor.length; i++) {

            console.log(arrayIdDiretor);
            let sql =`insert into tbl_filme_diretor (id_filme, id_diretor) values
            (${idFilme},${arrayIdDiretor[i]});`

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

const deleteRelacaoDiretorFilmeByIdFilme = async function(idFilme) {

    try {
        
        let sql = `DELETE FROM tbl_filme_diretor WHERE id_filme = ${idFilme};`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

module.exports = {
    deleteRelacaoDiretorFilmeByIdFilme,
    setInserirRelacaoDiretorFilme,
    selectDiretorFilmeById,
    selectAllDiretores,
    selectUltimoEnvioDiretor,
    setInserirNovoDiretor
}