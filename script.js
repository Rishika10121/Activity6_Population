let populationChart; // Store chart instance

function loadData() {
    const csvUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/refs/heads/main/Activity6_Population.csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split(",")); // Convert CSV to array
            const headers = rows[0].map(h => h.trim()); // Remove spaces
            console.log("CSV Headers:", headers);


            // Find index for "2020" column
            const yearIndex = headers.indexOf("2020");
            if (yearIndex === -1) {
                console.error("Year 2020 not found in dataset.");
                return;
            }

            // Get country index
            const countryIndex = headers.indexOf("Country");

            // Prepare data for visualization
            let labels = [];
            let populations = [];

            for (let i = 1; i < rows.length; i++) {
                if (rows[i].length > yearIndex) {
                    labels.push(rows[i][countryIndex]); // Country name
                    populations.push(parseInt(rows[i][yearIndex])); // Population in 2020
                }
                if (labels.length >= 30) break; // Limit to 30 countries
            }

            // Draw table
            displayTable(headers, rows);

            // Draw bar chart
            drawBarChart(labels, populations);
        })
        .catch(error => console.error("Error loading data:", error));
}

function displayTable(headers, rows) {
    const tableHeader = document.getElementById("tableHeader");
    const tableBody = document.getElementById("tableBody");

    tableHeader.innerHTML = "";
    tableBody.innerHTML = "";

    headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        tableHeader.appendChild(th);
    });

    for (let i = 1; i < Math.min(rows.length, 31); i++) {
        const tr = document.createElement("tr");
        rows[i].forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell;
            tr.appendChild(td);
        });
        tableBody.appendChild(tr);
    }
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
            indexAxis: 'y', // Make it a horizontal bar chart
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Population-2020"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Country"
                    }
                }
            }
        }
    });
}
