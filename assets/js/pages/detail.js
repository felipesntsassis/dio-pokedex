const section = document.getElementsByTagName('section')[0];
const pokemonName = document.querySelector('.title h1');
const pokemonNumber = document.querySelector('.title h3');
const pokemonPicture = document.getElementById('pokemon-picture');
const typeList = document.querySelector('.types');
const aboutTab = document.getElementById('about');
const baseStatsTab = document.getElementById('base-stats');
const evolutionTab = document.getElementById('evolution');

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

let pokemon;
let pokemonDetails;
let evolutionChain;

function getStatRow(stat) {
    let color = 'fire';

    if (stat.value > 60) {
        color = 'grass';
    } else if (stat.value > 30 && stat.value <= 60) {
        color = 'fighting';
    }

    return `
        <div class="label">${stat.type}</div>
        <div class="data">${stat.value}</div>
        <div class="data-chart-bar">
            <span class="chart-data ${color}" style="width:${stat.type !== 'Total' ? stat.value : '100'}%;"></span>
        </div>
    `;
}

async function loadAboutTabData() {
    const speciesData = await pokeapi.getSpeciesData(pokemon.number);
    pokemon.description = speciesData.flavor_text_entries.find(
        entry => entry.language.name === 'en'
    ).flavor_text;
    pokemon.height = parseDmToCm(pokemonDetails.height);
    pokemon.weight = parseHgToKg(pokemonDetails.weight);
    pokemon.abilities = pokemonDetails.abilities.map(ab => ab.ability.name);
    pokemon.gender = pokeapi.getGenderData(speciesData.gender_rate);
    pokemon.eggGroups = speciesData.egg_groups.map(egg => egg.name);
    
    const tabContent = `
        <div class="detail-grid-data">
            <div class="grid-data">
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
    section.classList.add(pokemon.type);
    pokemonName.innerHTML = pokemon.name;
    pokemonNumber.innerHTML = '#' + formatHundred(`${pokemon.number}`);
    typeList.innerHTML = pokemon.types.map(type => `<li class="type ${type}">${type}</li>`)
        .join('');
    pokemonPicture.src = pokemon.photo;
    pokemonPicture.alt = `Pokémon ${pokemon.name}`;
}


function loadBaseStatsTabData() {
    const stats = pokemonDetails.stats.map(s => {
        let statName = s.stat.name.toUpperCase();

        switch(statName) {
            case 'ATTACK':
                statName = 'Attack';
                break;
            case 'DEFENSE':
                statName = 'Defense';
                break;
            case 'SPECIAL-ATTACK':
                statName = 'Sp. Atk';
                break;
            case 'SPECIAL-DEFENSE':
                statName = 'Sp. Def';
                break;
            case 'SPEED':
                statName = 'Speed';
                break;
        }

        return new Stat(statName, s.base_stat);
    });
    const total = stats.map(s => s.value).reduce((prev, next) => prev + next, 0);
    stats.push(new Stat('Total', total));

    const tabContent = `
        <div class="detail-grid-data">
            <div class="grid-data with-chart">
                ${stats.map(s => getStatRow(s)).join('')}
            </div>
        </div>
    `;
    baseStatsTab.innerHTML = tabContent;
}

function loadEvolutionTabData(evolutions = []) {
    let tabContent = '<div class="evolution-list">';

    if (evolutions.length > 0) {
        tabContent += evolutions.map((ev, index) => `
            <figure>
                <img src="${ev.photo}" alt="${ev.name}">
                <legend>
                    ${ev.name}
                </legend>
            </figure>
        `).join('');
        tabContent += '</div>';
    } else {
        tabContent += `<p class="no-data">The <span class="capitalize">${pokemon.name}</span> haven't an evolution chain.</p>`
    }

    evolutionTab.innerHTML = tabContent;
}

async function loadPokemonDetails() {
    try {
        if (!sessionStorage.getItem('pokemon'))
            throw new Error('Please, select a Pokémon from catalog!');

        loadPageState();

        pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
        pokemonDetails = await pokeapi.getPokemonData(pokemon.number);
        const evolutions = await pokeapi.getEvolutions(pokemon.number);
        loadBaseData();
        loadAboutTabData();
        loadBaseStatsTabData();

        loadEvolutionTabData(evolutions);

        loadPageState();
    } catch (err) {
        alert(err.message);
        window.location = 'index.html';
    }
}

async function processEvolutionChain(evolutionChain) {
    const evolutions = [];
    return evolutions;
}

createPageLoader('Getting the Pokémon data...');
document.addEventListener('DOMContentLoaded', loadPokemonDetails);
