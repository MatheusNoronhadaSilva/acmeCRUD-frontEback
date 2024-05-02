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

const deleteGenero = async function (id) {

    try {
        
        let sql = `delete from tbl_genero where id =${id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result) {
            return true
        } else {
             return false
        }
    } catch (error) {
        return false
    }
}

const insertGenero = async function (dadosGenero) {

    let sql

    try {
        sql = `insert into tbl_genero (genero) 
        values
        (
            '${dadosGenero.genero}'
        );`

        let result = await prisma .$executeRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        
    }
}

const selectAllGeneros = async function () {

    let sql = `select * from tbl_genero;`
    
    let rsgeneros = await prisma.$queryRawUnsafe(sql)
    
    if(rsgeneros.length > 0) {
        return  rsgeneros
    } else {
        return false
    }
}

const selectGenerosFilmeById = async function (idFilme) {

    try {
        
        let sql = `SELECT tbl_genero.*
        FROM tbl_genero
        JOIN tbl_filme_genero ON tbl_genero.id = tbl_filme_genero.id_genero
        WHERE tbl_filme_genero.id_filme = ${idFilme};`

        console.log(sql);

        let result = await prisma.$queryRawUnsafe(sql)

        if(result){
            return result
        } else {
            return false
        }
    } catch (error) {
        
    }
}

const setInserirRelacaoGeneroFilme = async function (idFilme, arrayIdGenero) {

    try {

        console.log('oioiiooioioiioioiioiiiio');
        console.log(idFilme);
        
        for(let i = 0; i < arrayIdGenero.length; i++) {

            console.log(arrayIdGenero);
            let sql =`insert into tbl_filme_genero (id_filme, id_genero) values
            (${idFilme},${arrayIdGenero[i]});`

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

const deleteRelacaoGeneroFilmeByIdFilme = async function (idFilme){

    try {
        
        let sql = `DELETE FROM tbl_filme_genero WHERE id_filme = ${idFilme};`

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

const deleteRelacaoGeneroFilmeByIdGenero = async function (idgenero) {

    try {
        
        let sql = `DELETE FROM tbl_filme_genero WHERE id_genero = ${idgenero};`

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
    deleteRelacaoGeneroFilmeByIdGenero,
    deleteRelacaoGeneroFilmeByIdFilme,
    setInserirRelacaoGeneroFilme,
    selectGenerosFilmeById,
    selectAllGeneros,
    insertGenero,
    deleteGenero
}