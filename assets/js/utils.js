function formatHundred(pokemonNumber) {
    while(pokemonNumber.length < 3) {
        pokemonNumber = `0${pokemonNumber}`
    }

    return pokemonNumber;
}
