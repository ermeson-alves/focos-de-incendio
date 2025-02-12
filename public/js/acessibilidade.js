function toggleTheme() {
    let themeLink = document.getElementById('themeStylesheet');
    let currentTheme = themeLink.getAttribute('href');

    // Alterna entre os estilos
    if (currentTheme === 'css/estilo.css') {
        themeLink.setAttribute('href', 'css/estiloacessivel.css');
    } else {
        themeLink.setAttribute('href', 'css/estilo.css');
    }
    
}