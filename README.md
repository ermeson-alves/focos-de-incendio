# Execução
```shell
npm i  # instalar dependencias
```
```shell
node server.js  # executar
```



# Organização dos Dados
## Ocorrências
O esquema de uma ocorrencia é o seguinte:<br>
```json
{
    "tipo": "", (String)
    "responsavel": "", (String)
    "endereco": "", (String)
    "data": "", (String)
    "hora": "", (String)
    "status": "", (String) - Valores: ["concluida", "em andamento", "pendente"]
}
```
<!-- "data finalizacao": "", (String)
"hora finalizacao": "", (String) -->

* **Concluida:** Deve aparecer no histórico;
* **Em andamento:** Deve aparecer na tela de ocorrências;
* **Pendente:** Deve aparecer na tela de chamados;
