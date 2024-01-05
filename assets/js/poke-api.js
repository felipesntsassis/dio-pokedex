const API_URL = 'https://pokeapi.co/api/v2';
const pokeapi = {};

pokeapi.getPokemons = (offset = 0, limit = 10) => {
    const url = `${API_URL}/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .catch((error) => console.error(error));
};
