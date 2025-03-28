function loadData() {
    const csvUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/refs/heads/main/Activity6_Population.csv";

    fetch(csvUrl)
        .then(response => response.text())
        .then(data => {
            const rows = data.split("\n");
            const tableHeader = document.getElementById("tableHeader");
            const tableBody = document.getElementById("tableBody");

            tableHeader.innerHTML = "";
            tableBody.innerHTML = "";

            // Extract headers
            const headers = rows[0].split(",");
            headers.forEach(header => {
                const th = document.createElement("th");
                th.textContent = header;
                tableHeader.appendChild(th);
            });

            // Extract rows
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
                }
            }
        })
        .catch(error => console.error("Error loading data:", error));
}
