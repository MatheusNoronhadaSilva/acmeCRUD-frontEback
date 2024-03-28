/*
Objetivo: Arquivo responsável pela padronização de variáveis e constantes globais do projeto

*/

//********************** MENSAGENS DE ERRO ****************************** */
const ERROR_INVALID_ID = {

    status: false,
    status_code: 400,
    message: 'o ID encaminhado na requisição não é valido!!'
} 

const ERROR_REQUIRED_FIELDS = {

    status: false,
    status_code: 400,
    message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação'
}

const ERROR_NOT_FOUND = {

    status: false,
    status_code: 404,
    message: 'Não foi encontrado nenhum item com este id'
}

const ERROR_INTERVAL_SERVER_DB = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a um erro no acesso ao Banco de Dados. Contate o administrador da API !!'
}

const ERROR_CONTENT_TYPE = {
        status: false,
        status_code: 404,
        message: 'O content-type encaminhado pela requisição não é suortadopelo servidor, deve-se encaminhar apenas requisições com application/json'
}

const ERROR_INTERVAL_SERVER = {
    status: false,
    status_code: 500,
    message: 'Não foi possível processar a requisição, devido a um problema na camada de negócio/controle da aplicação. Contate o administrador da API !!'
}

//********************** MENSAGENS DE SUCESSO ****************************** */


const SUCESS_CREATED_ITEM = {

    status: true,
    status_code: 201,
    message: 'Item criado com sucesso!!'
} 

const SUCESS_DELETE_ITEM =  {
    status: true,
    status_code: 204,
    message: 'Item excluido com sucesso!!'
}

const SUCESS_UPDATED_ITEM = {
    status: true,
    status_code: 200,
    message: 'Item alterado com sucesso'
}

module.exports = {
    SUCESS_DELETE_ITEM,
    SUCESS_UPDATED_ITEM,
    SUCESS_CREATED_ITEM,
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERVAL_SERVER,
    ERROR_CONTENT_TYPE,
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERVAL_SERVER_DB
}