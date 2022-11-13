const listPokemon = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
const modal = document.getElementById('modal');
const limit = 5;
let offset = 0;
const maxRecords = 15;

loadPokemonItens(offset, limit);

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
        const newHtml = pokemonList.map((pokemon) => `
            <div onclick="openInfos(${pokemon.number})">
                <li class="pokemon ${pokemon.type}">
                    <span class="number">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span> 

                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>

                        <img src="${pokemon.photo}" alt="${pokemon.name}" srcset="">

                    </div>
                </li>
            </div>
            `
        ).join('');
        listPokemon.innerHTML += newHtml
    })
}

function openInfos(id){
   //console.log(id)
    modal.style.display = 'grid'
    listPokemon.style.display = 'none'
    loadMoreButton.style.display = 'none'

    listPokemon.classList.toggle('fade')


    pokeApi.getPokemonById(id).then((res) => {
        const types = res.types.map((typeSlot) => typeSlot.type);
        const ability = res.types.map((ability) => ability);
        const color = types[0].name
        const ablty = ability[0].type.name
        console.log(ablty)
         console.log(res)
          const newHtml = `
         <img id="logo" src="/img/1.png">
          <div class="modal ${color}">
          <button onclick="closeModal()">&#8592;</button>
                <img id="imgModal" src="${res.sprites.other.dream_world.front_default}">
                <div class="textInfo">
                    <span>Nome: ${res.name}</span>
                    <span>Altura: ${res.height}</span>
                    <span>Habilidade: ${ablty}</span>
                </div>
            </div>
            `
         modal.innerHTML = newHtml

    });

}


function closeModal(){
    modal.style.display = 'none'
    listPokemon.style.display = 'grid'
    loadMoreButton.style.display = 'grid'
}


loadMoreButton.addEventListener('click', () => {
    offset += limit;

    const qtdRecord = offset + limit;

    if(qtdRecord >= maxRecords){
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }else{
        loadPokemonItens(offset,limit);
    }
})