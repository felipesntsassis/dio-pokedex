const API_URL = 'https://pokeapi.co/api/v2';
const pokeapi = {};
const pokemons = [];

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeapi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeapi.getPokemons = (offset = 0, limit = 12) => {
    const url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;
    loadState();

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
        .then((detailRequests) =>  Promise.all(detailRequests))
        .then((pokemonsDetails) => {
            pokemonsDetails.forEach(pokemon => pokemons.push(pokemon));
            // loadState();
            return pokemonsDetails;
        })
        .catch((error) => console.error(error));
};
