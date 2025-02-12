const express = require("express");
const fs = require("fs");
const app = express();
const porta = 9000

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

const lerJSON = (arquivo) => {
    return JSON.parse(fs.readFileSync(`./data/${arquivo}.json`, "utf8"));
};

app.post("/login", (req, res) => {
    //Acrescentar JWT depois
    const {nome, senha} = req.body;
    const usuarios = lerJSON('usuarios');
    const usuario = usuarios.find((u) => {
        return (u.nome === nome && u.senha === senha)
    });

    if (!usuario) return res.status(401).json({ error: "Credenciais inválidas!" });
    res.json({ autenticado: true, atribuicao: usuario.atribuicao});
});

// Página inicial
app.get("/", (req, res) => {
    res.render("index", { titulo: "Início" });
});

// Página de chamados
app.get("/chamados", (req, res) => {
    const chamados = carregarDados("chamados");
    res.render("chamados", { titulo: "Chamados", chamados });
});

// Página de ocorrências
app.get("/ocorrencias", (req, res) => {
    const ocorrencias = carregarDados("ocorrencias");
    res.render("ocorrencias", { titulo: "Ocorrências", ocorrencias });
});

// Página do painel de estatísticas
app.get("/painel", (req, res) => {
    const estatisticas = carregarDados("estatisticas");
    res.render("painel", { titulo: "Painel de Controle", estatisticas });
});

// // API para assumir um chamado
// app.post("/api/assumir-chamado", (req, res) => {
//     let chamados = carregarDados("chamados");
//     const { id } = req.body;

//     let chamado = chamados.find(c => c.id === id);
//     if (chamado) {
//         chamado.status = "Em andamento";
//         fs.writeFileSync("./data/chamados.json", JSON.stringify(chamados, null, 2));
//         return res.json({ sucesso: true });
//     }
//     res.status(400).json({ erro: "Chamado não encontrado." });
// });

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));