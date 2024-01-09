const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('btn-load-more');
let isLoading = false;

const maxRecords = 151;
const limit = 12;
let offset = 0;

function loadState(message = 'Aguarde...') {
    isLoading = !isLoading;

    if (isLoading) {
        pokemonList.innerHTML += `
            <li id="loader" class="loader-container">
                <img src="assets/img/pokeball.svg" alt="${message}">
                <h4>${message}</h4>
            </li>
        `;
    } else {
        const loader = document.getElementById('loader');
        pokemonList.removeChild(loader);
    }
}

function loadPokemonItems(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img 
                        src="${pokemon.photo}"
                        alt="${pokemon.name}"
                    >
                </div>
            </li>
        `).join('');
        pokemonList.innerHTML += newHtml;
    });
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtdRecordNextPage = offset + limit;

    if (qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItems(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadPokemonItems(offset, limit);
    }
});
