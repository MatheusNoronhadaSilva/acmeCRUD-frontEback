/**************************************
 * Objetivo: Arquivo responsável pela manipulação de dados no banco de dados Mysql,
 *         aqui realizamos o CRUD (Create, Read, Update, Delete) utilizando a linguagem SQL
 * Data: 01/02/2024
 * Autor: Matheus Noronha da Silva
 * Versão: 1.0
 */

//Import da biblioteca do prisma client
const { PrismaClient } = require('@prisma/client')
const { Router } = require('express')

//instancia da classe prisma client
const prisma = new PrismaClient()

const deleteRelacaoFavoritoFilmeByIdFilme = async function(idFilme){

    try {
        
        let sql = `DELETE FROM tbl_favoritos WHERE id_filme = ${idFilme};`

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
    deleteRelacaoFavoritoFilmeByIdFilme
}