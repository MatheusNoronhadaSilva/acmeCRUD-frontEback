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

module.exports = {
    selectAllGeneros,
    insertGenero,
    deleteGenero
}