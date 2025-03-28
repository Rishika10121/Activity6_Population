let populationChart; // Define globally

function loadData() {
    const csvUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/refs/heads/main/Activity6_Population.csv";
    const year = "2000"; // Change this to fetch data for another year

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split(",")); // Convert CSV to array
            const headers = rows[0].map(h => h.trim()); // Remove spaces
            console.log("CSV Headers:", headers);

            // Find index for selected year column
            const yearIndex = headers.indexOf(year);
            if (yearIndex === -1) {
                console.error(`Year ${year} not found in dataset.`);
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
                    populations.push(parseInt(rows[i][yearIndex])); // Population for selected year
                }
                if (labels.length >= 10) break; // Limit to 10 countries
            }

            // Draw table
            displayTable(headers, rows.slice(1, 11)); // Only first 10 countries

            // Draw bar chart with updated axis labels
            drawBarChart(labels, populations, year);
        })
        .catch(error => console.error("Error loading data:", error));
}

function displayTable(headers, rows) {
    const table = document.getElementById("dataTable");
    table.innerHTML = ""; // Clear previous table data

    // Create table header
    let thead = document.createElement("thead");
    let headerRow = document.createElement("tr");
    ["Country", `Population in 2000`].forEach(text => {
        let th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    let tbody = document.createElement("tbody");

    rows.forEach(row => {
        let tr = document.createElement("tr");
        let countryCell = document.createElement("td");
        let populationCell = document.createElement("td");

        countryCell.textContent = row[0]; // Country name
        populationCell.textContent = row[1]; // Population in 2000

        tr.appendChild(countryCell);
        tr.appendChild(populationCell);
        tbody.appendChild(tr);
    });

    table.appendChild(tbody);
}

function drawBarChart(labels, data, year) {
    const ctx = document.getElementById("populationChart").getContext("2d");

    // Check if populationChart exists before destroying
    if (typeof populationChart !== "undefined" && populationChart instanceof Chart) {
        populationChart.destroy();
    }

    populationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: `Population in ${year}`,
                data: data,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            indexAxis: 'y', // Set Y-axis for country names
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: `POPULATION – ${year}` // Updated label
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
