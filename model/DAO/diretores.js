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

const setInserirNovoDiretor = async function (infoDiretor) {

    try {

        let sql

        if(infoDiretor.biografia == null || infoDiretor.biografia == undefined || infoDiretor.biografia == '') {

            sql = `insert into tbl_diretor (
                nome, 
                email,
                biografia,
                nascimento, 
                id_sexo
            ) values
            (
                '${infoDiretor.nome}', 
                '${infoDiretor.email}',
                null, 
                '${infoDiretor.nascimento}', 
                ${infoDiretor.sexo});`
        } else {
            sql = `insert into tbl_diretor (
                nome, 
                email,
                biografia,
                nascimento, 
                id_sexo
            ) values
            (
                '${infoDiretor.nome}', 
                '${infoDiretor.email}',
                '${infoDiretor.biografia}', 
                '${infoDiretor.nascimento}', 
                 ${infoDiretor.sexo});`
        }
        console.log(sql);
    

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

    sql_id = 'select cast(last_insert_id() as decimal) as id from tbl_diretor limit 1' 

    let pegarId = await prisma.$queryRawUnsafe(sql_id)

    console.log('id pego: ' + pegarId[0].id);

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

const setAlterarRelacaoDiretorFilme = async function(idFilme, arrayIdDiretor, arrayIdDiretorAtual){

    try {
        
        for (let i = 0; i < arrayIdDiretor.length; i++) {

            let sql = `UPDATE tbl_filme_diretor
            SET id_diretor = ${arrayIdDiretor[i]}
            WHERE id_filme = ${idFilme} AND id_diretor = ${arrayIdDiretorAtual[i]};`

            console.log(sql);

            let result = await prisma.$executeRawUnsafe(sql)

            if(!result){
                return false
            }
            
        }

        return true 
    } catch (error) {
        return false
    }
}

module.exports = {
    setAlterarRelacaoDiretorFilme,
    deleteRelacaoDiretorFilmeByIdFilme,
    setInserirRelacaoDiretorFilme,
    selectDiretorFilmeById,
    selectAllDiretores,
    selectUltimoEnvioDiretor,
    setInserirNovoDiretor
}