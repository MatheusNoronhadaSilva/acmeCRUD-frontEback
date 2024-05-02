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

const selectAllSexos = async function () {

    let sql = "select * from tbl_sexo;"

    let rsSql = await prisma.$queryRawUnsafe(sql)

    console.log(rsSql);

    if(rsSql){
        return rsSql
    } else {
        return false 
    }
}

module.exports = {
    selectAllSexos
}