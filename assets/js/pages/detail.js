let pokemon;
const loader = document.getElementById('page-loader');
const tabs = document.querySelectorAll('.tab-item');
tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
        document.querySelector('.tab-item.active').classList.remove('active');
        document.querySelector('.detail-tab.active').classList.remove('active');
        tab.classList.add('active');
        const targetTab = tab.dataset.target;
        document.getElementById(targetTab).classList.add('active');
    })
});

function loadPokemon() {
    try {
        if (!sessionStorage.getItem('pokemon'))
            throw new Error('Please, select a Pokémon from catalog!');

        pokemon = JSON.parse(sessionStorage.getItem('pokemon'));
        document.getElementsByTagName('section')[0].classList.add(pokemon.type);
        document.querySelector('.title h1').innerHTML = pokemon.name;
        document.querySelector('.title h3').innerHTML = formatHundred(`${pokemon.number}`);
        setTimeout(() => {
            loader.classList.add('hide');
        }, 500);
    } catch (err) {
        alert(err.message);
        window.location = 'index.html';
    }
}


document.addEventListener('DOMContentLoaded', () => loadPokemon());
// document.addEventListener('visibilitychange', () =>
//     sessionStorage.removeItem('pokemon')
// );