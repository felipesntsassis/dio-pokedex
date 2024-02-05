const body = document.getElementsByTagName('body')[0];
let loading = false;
let pageLoader;

function createPageLoader(message = 'Please wait...') {
    const base = document.createElement('div');
    base.setAttribute('id', 'page-loader');
    base.classList.add('loader', 'hide');
    
    const content = document.createElement('div');
    content.classList.add('loader-content');
    
    const img = document.createElement('img');
    img.src = 'assets/img/pokeball.svg';
    img.alt = 'Pokéball';
    
    const h3 = document.createElement('h3');
    h3.innerHTML = message;
    
    content.appendChild(img);
    content.appendChild(h3);
    base.appendChild(content);
    pageLoader = base;
    body.appendChild(pageLoader);
}

function loadPageState() {
    loading = !loading;

    if (loading) {
        pageLoader.classList.remove('hide');
    } else {
        pageLoader.classList.add('hide');
    }
}

function createInlineLoader(message = 'Please wait...') {
    const loaderContainer = document.createElement('div');
    loaderContainer.setAttribute('id', 'loader');
    loaderContainer.classList.add('loader-container');

    const img = document.createElement('img');
    img.src = 'assets/img/pokeball.svg';
    img.alt = message;

    const label = document.createElement('h4');
    label.innerHTML = message;
    
    loaderContainer.appendChild(img);
    loaderContainer.appendChild(label);

    return loaderContainer;
}
