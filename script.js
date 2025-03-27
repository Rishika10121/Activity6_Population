const dataUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/main/Activity6_Population.csv";

d3.csv(dataUrl).then(data => {
    console.log("Raw Data Loaded:", data); // Debugging

    data.forEach(d => {
        // Ensure Population column exists and properly formatted
        if (d.Population) {
            d.Population = +d.Population.trim().replace(/,/g, ""); // Convert to number
        } else {
            d.Population = 0; // Default missing values to zero
        }
    });

    console.log("Processed Data:", data);

    // Check for NaN values
    const invalidData = data.filter(d => isNaN(d.Population));
    console.log("Invalid Data Rows:", invalidData); // Should be empty

    // Ensure Population is correctly sorted
    data = data.filter(d => !isNaN(d.Population)) // Remove NaN rows
               .sort((a, b) => b.Population - a.Population)
               .slice(0, 20);

    // Define chart dimensions
    const width = 1000, height = 700;
    const margin = { top: 40, right: 30, bottom: 100, left: 200 };

    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

    // Prevent NaN from breaking scales
    const maxPopulation = d3.max(data, d => d.Population) || 1; // Default to 1
    const xScale = d3.scaleLinear()
        .domain([0, maxPopulation])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([margin.top, height - margin.bottom])
        .padding(0.3);

    // Append bars, ensuring NaN width is avoided
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => yScale(d.Country))
        .attr("width", d => isNaN(d.Population) ? 0 : xScale(d.Population) - margin.left) // Handle NaN
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // Append x-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format(".2s")));

    // Append y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));
});
