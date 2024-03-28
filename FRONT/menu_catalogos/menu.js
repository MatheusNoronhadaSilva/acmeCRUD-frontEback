'use strict'

const filmesSugestoes = document.getElementById('filmes_sugestoes')

async function criarFilmesSugestoes(){

    const listaFilmes = await pegarFilmes()

    console.log(listaFilmes);
    listaFilmes.filmes.forEach(filme => {

        console.log(filme.nome);

        const filme_container = document.createElement('div')
        filme_container.classList.add('cursor-pointer', 'h-40', 'w-72')

        const img_filme = document.createElement('img')
        img_filme.classList.add('h-full', 'w-full', 'border', 'hover:border-red-500', 'border-white', 'border-solid', 'border-4', 'rounded-xl')
        img_filme.src = filme.foto_capa

        filme_container.appendChild(img_filme)
        filmesSugestoes.appendChild(filme_container)

        filme_container.addEventListener('click', ()=>{
            window.location.href='../catalogo/catalogo.html?id='+filme.id
        })
    });
}

async function pegarFilmes() {
    const endpoint = 'http://localhost:5080/v2/acmeFilmes/filmes';
    const filmesApi = await fetch(endpoint);
    const listFilmes = await filmesApi.json();
    return listFilmes;
}

criarFilmesSugestoes()