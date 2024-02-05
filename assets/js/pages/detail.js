let pokemon;

const section = document.getElementsByTagName('section')[0];
const pokemonName = document.querySelector('.title h1');
const pokemonNumber = document.querySelector('.title h3');
const pokemonPicture = document.getElementById('pokemon-picture');
const typeList = document.querySelector('.types');
const aboutTab = document.getElementById('about');


const tabs = document.querySelectorAll('.tab-item');
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelector('.tab-item.active').classList.remove('active');
        document.querySelector('.detail-tab.active').classList.remove('active');
        tab.classList.add('active');
        const targetTab = tab.dataset.target;
        document.getElementById(targetTab).classList.add('active');
    });
});

async function loadAboutTabData() {
    const details = await pokeapi.getPokemonData(pokemon.number);
    const speciesData = await pokeapi.getSpeciesData(pokemon.number);
    pokemon.specie
    pokemon.description = speciesData.flavor_text_entries.find(
        entry => entry.language.name === 'en'
    ).flavor_text;
    pokemon.height = parseDmToCm(details.height);
    pokemon.weight = parseHgToKg(details.weight);
    pokemon.abilities = details.abilities.map(ab => ab.ability.name);
    pokemon.gender = pokeapi.getGenderData(speciesData.gender_rate);
    pokemon.eggGroups = speciesData.egg_groups.map(egg => egg.name);
    
    const tabContent = `
        <div class="detail-grid-data">
            <div class="grid-data">
                <div class="label">Species</div>
                <div class="data"></div>
                <div class="label">Height</div>
                <div class="data">${pokemon.height} cm</div>
                <div class="label">Weight</div>
                <div class="data">${pokemon.weight} kg</div>
                <div class="label">Abilities</div>
                <div class="data capitalize">${pokemon.abilities.join(', ')}</div>
            </div>
            <h3>Breeding</h3>
            <div class="grid-data">
                <div class="label">Gender</div>
                <div class="data">${pokemon.gender}</div>
                <div class="label">Egg Groups</div>
                <div class="data capitalize">${pokemon.eggGroups.join(', ')}</div>
            </div>
            <h3>Description</h3>
            <span>${pokemon.description}</span>
        </div>
    `;
    aboutTab.innerHTML += tabContent;
}

function loadBaseData() {
    pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
    section.classList.add(pokemon.type);
    pokemonName.innerHTML = pokemon.name;
    pokemonNumber.innerHTML = '#' + formatHundred(`${pokemon.number}`);
    typeList.innerHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`)
        .join('');
    pokemonPicture.src = pokemon.photo;
    pokemonPicture.alt = `Pokémon ${pokemon.name}`;
}

function loadPokemonDetails() {
    try {
        if (!sessionStorage.getItem('pokemon'))
            throw new Error('Please, select a Pokémon from catalog!');

        loadPageState();
        loadBaseData();
        loadAboutTabData();
        loadPageState();
    } catch (err) {
        alert(err.message);
        window.location = 'index.html';
    }
}

createPageLoader('Getting the Pokémon data...');
document.addEventListener('DOMContentLoaded', loadPokemonDetails);
