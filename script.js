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

            // Prepare data for chart
            let labels = []; // Country names
            let populations = []; // Population values

            for (let i = 1; i < rows.length; i++) {
                const rowData = rows[i].split(",");
                if (rowData.length > 1) {
                    const tr = document.createElement("tr");
                    rowData.forEach(cell => {
                        const td = document.createElement("td");
                        td.textContent = cell;
                        tr.appendChild(td);
                    });
                    tableBody.appendChild(tr);

                    // Assuming the first column is "Country" and second is "Population"
                    labels.push(rowData[0]); // Country
                    populations.push(parseInt(rowData[1])); // Population
                }
            }

            // Draw bar chart
            drawBarChart(labels, populations);
        })
        .catch(error => console.error("Error loading data:", error));
}

function drawBarChart(labels, data) {
    const ctx = document.getElementById("populationChart").getContext("2d");

    // Destroy existing chart if it exists (to prevent overlapping)
    if (populationChart) {
        populationChart.destroy();
    }

    populationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Population",
                data: data,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
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
