const API_URL = 'https://pokeapi.co/api/v2';
const pokeapi = {};
const pokemons = [];

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    pokemon.height = parseDmToCm(pokeDetail.height);
    pokemon.weight = parseHgToKg(pokeDetail.weight);

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    pokemon.types = types;

    const [type] = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeapi.getData = (url) => {
    return fetch(url).then((response) => response.json());
}

pokeapi.getEvolutions = (id) => {
    return fetch(`${API_URL}/evolution-chain/${id}`)
        .then((response) => response.json())
        .then((data) => data.chain)
        .then((chain) => chain)
        .catch((error) => console.error(error));
}

pokeapi.getGenderData = (genderRate) => {
    let gender = 'Male and Female';

    if (genderRate === -1) {
        gender = 'Without Gender';
    } else if (genderRate === 0) {
        gender = 'Only Male';
    } else if (genderRate === 8) {
        gender = 'Only Female'
    }

    return gender;
}

pokeapi.getPokemonData = (id) => {
    return pokeapi.getData(`${API_URL}/pokemon/${id}`);
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeapi.getPokemons = (offset = 0, limit = 12) => {
    const url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    loadPage();

    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) =>  Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            pokemonsDetails.forEach(pokemon => pokemons.push(pokemon));
            loadPage();
            return pokemonsDetails;
        })
        .catch((error) => console.error(error));
};

pokeapi.getSpeciesData = async (id) => {
    return pokeapi.getData(`${API_URL}/pokemon-species/${id}`);
}
