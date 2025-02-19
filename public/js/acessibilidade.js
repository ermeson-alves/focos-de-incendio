function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + "; path=/" + expires;
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}


function toggleTheme() {
    let themeLink = document.getElementById('themeStylesheet');
    let currentTheme = themeLink.getAttribute('href');

    // Alterna entre os estilos
    if (currentTheme === 'css/estilo.css') {
        themeLink.setAttribute('href', 'css/estiloacessivel.css');
        setCookie("theme", "css/estiloacessivel.css", 1);
    } else {
        themeLink.setAttribute('href', 'css/estilo.css');
        setCookie("theme", "css/estilo.css", 1);

    }
    
}

function ajustarFonte(tamanho) {
    document.body.style.fontSize = tamanho + "px";
    setCookie("fontSize", tamanho, 1);
}

function aumentarFonte() {
    let tamanhoAtual = parseInt(getComputedStyle(document.body).fontSize);
    let novoTamanho = tamanhoAtual + 2;
    ajustarFonte(novoTamanho);
}

function diminuirFonte() {
    let tamanhoAtual = parseInt(getComputedStyle(document.body).fontSize);
    let novoTamanho = Math.max(tamanhoAtual - 2, 12); // Mantém no mínimo 12px
    ajustarFonte(novoTamanho);
}

document.addEventListener("DOMContentLoaded", function () {
    let tamanhoFonteSalvo = getCookie("fontSize");
    let savedTheme = getCookie("theme");

    if (tamanhoFonteSalvo) {
        ajustarFonte(parseInt(tamanhoFonteSalvo));
    }
    if (savedTheme) {
        document.getElementById('themeStylesheet').setAttribute('href', savedTheme);
    }
});
