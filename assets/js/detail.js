let params = (new URL(document.location)).searchParams;
document.getElementsByTagName('h1')[0].innerHTML = params.get('pokemon');