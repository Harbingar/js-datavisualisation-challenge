(() => {
    // Créez un div pour le conteneur du graphique
    var chartContainer1 = document.createElement("div");
    chartContainer1.id = "chart-container1";


    // Créez un canvas pour le graphique
    var chartCanvas1 = document.createElement("canvas");

    // Ajoutez le canvas au div
    chartContainer1.appendChild(chartCanvas1);

    // Trouvez le tableau existant
    var table1 = document.getElementById("table1");

    // Insérez le conteneur du graphique juste au-dessus du tableau
    table1.parentNode.insertBefore(chartContainer1, table1);

    // Créez un tableau pour stocker les années (échelle de mesure X)
    var years = [];

    // Créez un tableau pour stocker les données des pays (unités de mesure Y)
    var countriesData = [];

    // Extrayez les années du tableau à partir de la première rangée
    var tbody = table1.querySelector("tbody");
    var firstRow = tbody.querySelector("tr");
    var firstRowCells = firstRow.querySelectorAll("th");

    for (var i = 2; i < firstRowCells.length; i++) {
        years.push(firstRowCells[i].textContent);
    }

    // Extrayez les données des pays des rangées suivantes
    var rows = tbody.querySelectorAll("tr");

    // Palette de couleurs pour différencier les pays
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
    var ctx = chartCanvas1.getContext('2d');

    // Créez un graphique à partir des données avec Chart.js
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
                    // type : 'logarithmic',
                    scaleLabel: {
                        display: true,
                        labelString: 'Valeurs' // Étiquette de l'axe Y
                    }
                }]
            }
        }
    });

    /* DEUXIEME GRAPHIQUE */
    // Créez un div pour le conteneur du deuxième graphique
    var chartContainer2 = document.createElement("div");
    chartContainer2.id = "chart-container2";

    // Créez un canvas pour le deuxième graphique
    var chartCanvas2 = document.createElement("canvas");

    // Ajoutez le canvas au div du deuxième graphique
    chartContainer2.appendChild(chartCanvas2);

    // Trouvez le tableau existant pour le deuxième graphique
    var table2 = document.getElementById("table2");

    // Insérez le conteneur du deuxième graphique juste au-dessus du tableau
    table2.parentNode.insertBefore(chartContainer2, table2);

    // Créez un tableau pour stocker les noms des pays (échelle de mesure X)
    var countryNames = [];

    // Créez un tableau pour stocker les données de prisonniers par année (unités de mesure Y)
    var prisonData = [];

    // Extrayez les données des rangées du deuxième tableau
    var rows2 = table2.querySelector("tbody").querySelectorAll("tr");

    // Parcourez les rangées pour extraire les noms de pays et les données
    for (var i = 0; i < rows2.length; i++) {
        var row = rows2[i];
        var cells = row.querySelectorAll("td");
        
        if (cells.length >= 3) { // Assurez-vous qu'il y a suffisamment de cellules de données
            var countryName = cells[0].textContent;
            var prisonValues = [parseFloat(cells[1].textContent), parseFloat(cells[2].textContent)];

            countryNames.push(countryName);
            prisonData.push(prisonValues);
        }
    }

    // Créez un tableau de datasets pour Chart.js
    var datasets2 = [];

    for (var i = 0; i < prisonData.length; i++) {
        datasets2.push({
            label: countryNames[i],
            data: prisonData[i],
            backgroundColor: colors[i % colors.length], // Attribution de couleurs différentes
            borderWidth: 1
        });
    }

    // Créez un objet de données pour le deuxième graphique
    var chartData2 = {
        labels: ["2007-09", "2010-12"], // Années
        datasets: datasets2
    };

    // Créez un contexte pour le canvas du deuxième graphique
    var ctx2 = chartCanvas2.getContext('2d');

    // Créez un graphique à partir des données
    new Chart(ctx2, {
        type: 'bar', // Utilisez un graphique de type bar
        data: chartData2,
        options: {
            responsive: true,
            scales: {
                x: [{
                    display: true, // Afficher l'axe X
                    scaleLabel: {
                        display: true,
                        labelString: 'Années' // Étiquette de l'axe X
                    }
                }],
                y: [{
                    display: true, // Afficher l'axe Y
                    scaleLabel: {
                        display: true,
                        labelString: 'Nombre de personnes en prison' // Étiquette de l'axe Y
                    }
                }]
            }
        }
    });

    /* DYNAMIC CANVAS  */
})();