const fs = require("fs");
const crypto = require('crypto')
const express = require("express");
const jwt = require('jsonwebtoken')
const app = express();
require("dotenv").config()
// Configurações do express
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
// Configuração do parsing de cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());
// Constantes
const PORT = 9000
const user = 1;


const lerJSON = (arquivo) => {
    return JSON.parse(fs.readFileSync(`./data/${arquivo}.json`, "utf8"));
};

var sha512 = (pwd, key) => {
    /* Gera um HMAC (Hash-based Message Authentication Code) 
     usando a função de hash SHA512 (Secure Hash Algorithm 512)
     a chave é passada em key
     */
    var hash = crypto.createHmac('sha512', key)
    hash.update(pwd)
    return hash.digest('hex') 
}

// Página inicial
app.get("/", (req, res) => {
    res.render("index", { titulo: "Início" });
});

app.post("/login", (req, res) => {
    const user = req.body.username;
    // Geração do Token a partir da password
    const password = sha512(req.body.password, process.env.SECRET_USERS)
    if (user && password) {
        // Authenticação
        const usuarios = lerJSON('usuarios');
        var userloc = usuarios.find((item) => {
            return (item.username == user && item.password == password)
        })

        if (userloc) {
            const token = jwt.sign(
                { userid: userloc.id, atribuicao: userloc.atribuicao }, // payload (podem ser colocadas outras infos)
                process.env.SECRET, // chave definida em .env
                { expiresIn: 300 }  // em segundos
            )
            return res.json({ auth: true, token }); // poderia ser usado um cabeçalho
        }
    }
    console.log('Erro no login!')
    res.status(401).end('Usuário e/ou senha inválidos!');
});

const blacklist = []


function verificaJWT(req, res, next) {
    const token = req.headers['x-access-token']

    // verifica se o token foi incluido na blacklist devido a logout
    const index = blacklist.findIndex(item => item === token)
 
    if (index !== -1) {// está na blacklist!
        console.log('O token está na blacklist!')
        res.status(401).end('O token está na blacklist! - fazer login novamente!') 
    } else {
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                console.log('Erro na verificação')
                res.status(403).end('token inválido - fazer login novamente');
            } else {
                req.userid = decoded.userid;
                req.atribuicao = decoded.atribuicao;
                next();
            }
        })
    }
}

// Página genérica de ocorrências
app.get("/painel", (req, res) => {
    const ocorrencias = lerJSON('ocorrencias');
    res.render("painel", {data: ocorrencias, user: user});
});


// Consumo dos dados de ocorrencias
app.get("/chamados", (req, res) => {
    var data = lerJSON('ocorrencias');
    data = data.ocorrencias.filter(ocorrencia => ocorrencia.status === 'pendente')
    res.set('Content-Type', 'application/json')
    res.end(JSON.stringify(data));
});

app.get("/historico", (req, res) => {
    var data = lerJSON('ocorrencias');
    data = data.ocorrencias.filter(ocorrencia => ocorrencia.status === 'concluida')
    res.set('Content-Type', 'application/json')
    res.end(JSON.stringify(data));
});


app.get("/ocorrencias", (req, res) => {
    var data = lerJSON('ocorrencias');
    data = data.ocorrencias.filter(ocorrencia => ocorrencia.status === 'em andamento')
    res.set('Content-Type', 'application/json')
    res.end(JSON.stringify(data));
});

app.get("/estatisticas", (req, res) => {
    var data = lerJSON('ocorrencias');

    var dataFormatted = {};
    // Agrupamento por tipo
    dataFormatted['tipo'] = data.ocorrencias.reduce((acc, ocorrencia) => {
        acc[ocorrencia.tipo] = (acc[ocorrencia.tipo] || 0) + 1;
        return acc;
    }, {});
    // Agrupamento por tipo e por status 'em andamento'
    var dataFiltered = data.ocorrencias.filter(ocorrencia => ocorrencia.status === 'em andamento')
    dataFormatted['em andamento'] = dataFiltered.reduce((acc, ocorrencia) => {
        acc[ocorrencia.tipo] = (acc[ocorrencia.tipo] || 0) + 1;
        return acc;
    }, {});



    res.set('Content-Type', 'application/json')
    res.end(JSON.stringify(dataFormatted));
});



endpoint = `http://localhost:${PORT}`
str = `Servidor rodando em ${endpoint}\n
Rotas:\n${endpoint}/painel
${endpoint}/chamados
${endpoint}/historico
${endpoint}/ocorrencias
${endpoint}/estatisticas`

app.listen(PORT, () => console.log(str));