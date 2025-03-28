let populationChart; // Store the chart instance

function loadData() {
    const csvUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/refs/heads/main/Activity6_Population.csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n");
            const headers = rows[0].split(",");

            const tableHeader = document.getElementById("tableHeader");
            const tableBody = document.getElementById("tableBody");

            tableHeader.innerHTML = "";
            tableBody.innerHTML = "";

            // Extract headers
            headers.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                tableHeader.appendChild(th);
            });

            let labels = []; // Country names
            let populations = []; // Population values
            let count = 0; // Limit to 30 countries

            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(",");
                if (rowData.length > 1 && rowData[2] === "2020" && count < 30) { // Ensure it's for year 2020
                    const tr = document.createElement("tr");
                    rowData.forEach(cell => {
                        const td = document.createElement("td");
                        td.textContent = cell;
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);

                    labels.push(rowData[0]); // Country
                    populations.push(parseInt(rowData[1])); // Population
                    count++;
                }
            }

            // Draw bar chart
            drawBarChart(labels, populations);
        })
        .catch(error => console.error("Error loading data:", error));
}

function drawBarChart(labels, data) {
    const ctx = document.getElementById("populationChart").getContext("2d");

    if (populationChart) {
        populationChart.destroy();
    }

    populationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Population in 2020",
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
