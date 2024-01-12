let params = (new URL(document.location)).searchParams;
//document.getElementsByTagName('h1')[0].innerHTML = params.get('pokemon');

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