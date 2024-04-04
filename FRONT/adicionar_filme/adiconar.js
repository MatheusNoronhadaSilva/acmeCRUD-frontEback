'use strict'

const botao = document.getElementById('botao')
const inserir_imagem = document.getElementById('inserir_imagem')
const link_imagem = document.getElementById('link_imagem')

inserir_imagem.addEventListener('mouseover', function(){

    link_imagem.classList.remove('hidden')
    link_imagem.classList.add('visible')
    link_imagem.classList.add('absolute')
})

inserir_imagem.addEventListener('mouseout', function(){

    link_imagem.classList.remove('visible')
    link_imagem.classList.add('hidden')
})

link_imagem.addEventListener('keypress', function(event){

    if(event.key === "Enter") {
        trocarimagem()
    }
})

function trocarimagem() {
    inserir_imagem.innerHTML = ''
    const link = link_imagem.value

    function validarURL(String) {
        try {
            new URL(String)
            return true
        } catch (error) {
            console.log('link não enviado');
            return false
        }
    }
    if(validarURL(link)) {
        const imagem = document.createElement('img')
        imagem.src = link
        imagem.classList.add('h-full', 'w-full')

        inserir_imagem.appendChild(imagem)

        return link
    }

}

botao.addEventListener('click', function(){

    const link = trocarimagem()
    const sinopse = document.getElementById('sinopse').value
    const valor_alugar = document.getElementById('valorAlugar').value
    const valor_comprar = document.getElementById('valorComprar').value
    const nome = document.getElementById('nome').value
    const duracao = document.getElementById('duracao').value
    const lancamento = document.getElementById('lancamento').value

    if(link == '' || sinopse == '' || valor_alugar == '' || valor_comprar == '' || nome == '' || duracao == '' || lancamento == ''){
        alert('todos os campos devem ser preenchidos')
    } else {


        const novoFilmeJSON = {}

        novoFilmeJSON.nome = nome,
        novoFilmeJSON.sinopse = sinopse,
        novoFilmeJSON.duracao = duracao,
        novoFilmeJSON.data_lancamento = lancamento,
        novoFilmeJSON.data_relancamento = null,
        novoFilmeJSON.foto_capa = link,
        novoFilmeJSON.valor_alugar = valor_alugar,
        novoFilmeJSON.valor_comprar = valor_comprar

        postarNovoFilme(novoFilmeJSON)

        window.location.href = '../admin/admin2.html'
    }
})

async function postarNovoFilme(novoFilmeJSON) {

    console.log('enviar');

    const endpoint = 'http://localhost:8080/v2/acmeFilmes/filme'
    
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(novoFilmeJSON),
    };

    try {
        const response = await fetch(endpoint, options);
        return response.ok;
      } catch (error) {
        console.error('Erro ao enviar filme: ', error);
      }
}