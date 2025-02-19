function criarGraficoPizza(id, data) {
    /* Formato dos dados:
    data = {labels: ["l1", "l2", "..."], "values": [x, y, ...], "colors": ["#FFFFFf", "#FFFFFf", ...]}
    */
    new Chart(document.getElementById(id), {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.colors
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                datalabels: {
                    color: "white",
                    font: { weight: "bold", size: 16 },
                    formatter: (value, ctx) => `${value}%`
                }
            }
        }
    });
}