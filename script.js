function loadData() {
    const csvUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/refs/heads/main/Activity6_Population.csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n").map(row => row.split(",")); // Convert CSV to array
            const headers = rows[0].map(h => h.trim()); // Remove spaces
            console.log("CSV Headers:", headers);

            // Find index for "2000" column
            const yearIndex = headers.indexOf("2000");
            if (yearIndex === -1) {
                console.error("Year 2000 not found in dataset.");
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
                    populations.push(parseInt(rows[i][yearIndex])); // Population in 2000
                }
                if (labels.length >= 10) break; // Limit to 10 countries
            }

            // Remove this line to fix the error
            // displayTable(headers, rows);  

            // Draw bar chart
            drawBarChart(labels, populations);
        })
        .catch(error => console.error("Error loading data:", error));
}


function drawBarChart(labels, data) {
    const ctx = document.getElementById("populationChart").getContext("2d");

    // Ensure populationChart is a Chart instance before destroying
    if (populationChart instanceof Chart) {
        populationChart.destroy();
    }

    populationChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Population in 2000",
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
                        text: "Population in 2000"
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
