function formatHundred(pokemonNumber) {
    while(pokemonNumber.length < 3) {
        pokemonNumber = `0${pokemonNumber}`
    }

    return pokemonNumber;
}

function parseHgToKg(value = 0) {
    return value / 10;
}

function parseDmToCm(value) {
    return value * 10;
}
