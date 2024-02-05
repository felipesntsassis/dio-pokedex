const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('btn-load-more');
let isLoading = false;

const maxRecords = 151;
const limit = 12;
let offset = 0;

if (sessionStorage.getItem('pokemon')) {
    sessionStorage.removeItem('pokemon');
}

function loadPokemonItems(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <a onclick="selectPokemon(event, ${pokemon.number})">
                    <div class="title">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${(formatHundred(pokemon.number + ''))}</span>
                    </div>
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img 
                            src="${pokemon.photo}"
                            alt="${pokemon.name}"
                        >
                    </div>
                </a>
            </li>
        `).join('');
        pokemonList.innerHTML += newHtml;
        window.scrollTo(0, document.body.scrollHeight - 100);
    });
}

function loadPage(message = 'Please wait...') {
    isLoading = !isLoading;
    
    if (isLoading) {
        loadMoreButton.setAttribute('disabled', isLoading);
        pokemonList.after(createInlineLoader(message));
    } else {
        const loader = document.getElementById('loader');
        loadMoreButton.removeAttribute('disabled');
        loader.parentElement.removeChild(loader);
    }
}

function selectPokemon(event, id) {
    event.preventDefault();
    const pokemon = pokemons.find(p => p.number === id);
    
    if (pokemon) {
        sessionStorage.setItem('pokemon', JSON.stringify(pokemon));
        window.location = 'detail.html';
    }
}

loadPokemonItems(offset, limit);

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('year').innerHTML = new Date().getFullYear();
});

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

    setTimeout(() => {
        
    }, 1000);
});
