const body = document.getElementsByTagName('body');
let pageLoader;

function createPageLoader() {
    const base = document.createElement('div');
    base.setAttribute('id', 'page-loader');
    base.classList.add('loader', 'hide');
    
    const content = document.createElement('div');
    content.classList.add('loader-content');
    
    const img = document.createElement('img');
    img.src = 'assets/img/pokeball.svg';
    img.alt = 'Pokéball';
    
    const h3 = document.createElement('h3');
    
    content.appendChild(img, h3);
    base.appendChild(content);
    pageLoader = base;
    body.appendChild(pageLoader);
}

function createListLoader() {
    

}