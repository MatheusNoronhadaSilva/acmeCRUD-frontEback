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

const selectAllClassificacoes = async function () {

    let sql = `select * from tbl_classificacao;`

    let listarClassificacoes = await prisma.$queryRawUnsafe(sql)
    
    if(listarClassificacoes){
        return listarClassificacoes
    }

}

// const InsertClassificacao = async function(dadosClassificacao) {

//     let sql

//     try {
//         sql = `insert into tbl_classificacao (
//             classificacao, 
//             caracteristicas, 
//             img_classificacao
//             ) values
//             ('${dadosClassificacao.classificacao}', '${dadosClassificacao.caracteristicas}', '${dadosClassificacao.img_classificacao}');
//             `

//             console.log(sql);

//             console.log('inserindo');

//             let result = await prisma.$executeRawUnsafe(sql)

//             if(result) {
//                 return result
//             } else {
//                 return false
//             }
//     } catch (error) {
//         return false
//     }
// }

module.exports = {
    selectAllClassificacoes
}