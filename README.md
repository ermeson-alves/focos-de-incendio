# Organização dos Dados
## Ocorrências
O esquema de uma ocorrencia é o seguinte:<br>
{ <br>
    "tipo": "", (String) <br>
    "responsavel": "", (String) <br>
    "endereco": "", (String) <br>
    "data": "", (String) <br>
    "hora": "", (String) <br>
    <!-- "data finalizacao": "", (String)<br>
    "hora finalizacao": "", (String) <br> -->
    "status": "", (String) - Valores: ["concluida", "em andamento", "pendente"] <br>
} <br>

* **Concluida:** Deve aparecer no histórico;
* **Em andamento:** Deve aparecer na tela de ocorrências;
* **Pendente:** Deve aparecer na tela de chamados;
