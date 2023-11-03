(() => {
    // Créez un div pour le conteneur du graphique
    var chartContainer = document.createElement("div");
    chartContainer.id = "chart-container";

    // Créez un canvas pour le graphique
    var chartCanvas = document.createElement("canvas");

    // Ajoutez le canvas au div
    chartContainer.appendChild(chartCanvas);

    // Trouvez le tableau existant
    var table = document.getElementById("table1");

    // Insérez le conteneur du graphique juste au-dessus du tableau
    table.parentNode.insertBefore(chartContainer, table);

    // Créez un tableau pour stocker les années (échelle de mesure X)
    var years = [];

    // Créez un tableau pour stocker les données des pays (unités de mesure Y)
    var countriesData = [];

    // Extrayez les années du tableau à partir de la première rangée
    var tbody = table.querySelector("tbody");
    var firstRow = tbody.querySelector("tr");
    var firstRowCells = firstRow.querySelectorAll("th");

    for (var i = 2; i < firstRowCells.length; i++) {
        years.push(firstRowCells[i].textContent);
    }

    // Extrayez les données des pays des rangées suivantes
    var rows = tbody.querySelectorAll("tr");

    // Palette de couleurs
    var colors = [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(128, 0, 0, 1)',
        'rgba(0, 128, 0, 1)',
        'rgba(0, 0, 128, 1)',
        'rgba(128, 0, 128, 1)',
        'rgba(128, 128, 0, 1)',
        'rgba(0, 128, 128, 1)',
        'rgba(128, 64, 0, 1)',
        'rgba(64, 128, 0, 1)',
        'rgba(0, 128, 64, 1)',
        'rgba(128, 0, 64, 1)',
        'rgba(64, 0, 128, 1)',
        'rgba(0, 64, 128, 1)',
        'rgba(128, 128, 128, 1)',
        'rgba(192, 192, 192, 1)'
    ];

    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var cells = row.querySelectorAll("td");
        var countryData = {
            label: cells[0].textContent,
            data: [],
            backgroundColor: colors[i % colors.length], // Attribution de couleurs différentes
            borderColor: colors[i % colors.length],
            borderWidth: 1
        };

        for (var j = 1; j < cells.length; j++) {
            var value = parseFloat(cells[j].textContent.replace(",", ".").replace(":", ""));
            countryData.data.push(value);
        }

        countriesData.push(countryData);
    }

    // Créez un tableau de datasets pour Chart.js
    var datasets = [];

    for (var i = 0; i < countriesData.length; i++) {
        datasets.push(countriesData[i]);
    }

    // Créez un objet de données pour Chart.js
    var chartData = {
        labels: years, // Utilisez les années comme échelle de mesure X
        datasets: datasets
    };

    // Créez un contexte pour le canvas
    var ctx = chartCanvas.getContext('2d');

    // Créez un graphique à partir des données
    new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: {
            responsive: true,
            scales: {
                x: [{
                    ticks: {
                        maxTicksLimit: 10 // Limitez le nombre de marques sur l'axe X
                    },
                    display: true, // Afficher l'axe X
                    scaleLabel: {
                        display: true,
                        labelString: 'Années' // Étiquette de l'axe X
                    }
                }],
                y: [{
                    display: true,// Afficher l'axe Y
                    scaleLabel: {
                        display: true,
                        labelString: 'Valeurs' // Étiquette de l'axe Y
                    }
                }]
            }
        }
    });
})();