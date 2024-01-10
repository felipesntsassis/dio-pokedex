const pokemonList = document.getElementById('pokemon-list');
const loadMoreButton = document.getElementById('btn-load-more');
const year = document.getElementById('year');
year.innerHTML = new Date().getFullYear();

let isLoading = false;

const maxRecords = 151;
const limit = 12;
let offset = 0;

function formatPokemonNumber(pokemonNumber) {
    while(pokemonNumber.length < 3) {
        pokemonNumber = `0${pokemonNumber}`
    }

    return pokemonNumber;
}

function loadState(message = 'Aguarde...') {
    isLoading = !isLoading;

    if (isLoading) {
        loadMoreButton.setAttribute('disabled', true);
        const loaderContainer = document.createElement('div');
        loaderContainer.setAttribute('id', 'loader');
        loaderContainer.classList.add('loader-container');

        const pokeLogo = document.createElement('img');
        pokeLogo.src = 'assets/img/pokeball.svg';
        pokeLogo.alt = message;

        const label = document.createElement('h4');
        label.innerHTML = message;
        
        loaderContainer.appendChild(pokeLogo);
        loaderContainer.appendChild(label);
        pokemonList.after(loaderContainer);
        loadMoreButton.removeAttribute('disabled', true);
    } else {
        const loader = document.getElementById('loader');
        loader.parentElement.removeChild(loader);
    }
}

function loadPokemonItems(offset, limit) {
    pokeapi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(pokemon => `
            <li class="pokemon ${pokemon.type}">
                <a href="/detail.html?pokemon=${pokemon.number}">
                    <div class="title">
                    <span class="name">${pokemon.name}</span>
                    <span class="number">#${(formatPokemonNumber(pokemon.number + ''))}</span>
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
