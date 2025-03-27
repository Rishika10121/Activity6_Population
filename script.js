const dataUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/main/Activity6_Population.csv";

d3.csv(dataUrl).then(data => {
    console.log("Raw Data:", data); // Debug: Check how data loads

    data.forEach(d => {
        d.Population = +d.Population.trim().replace(/,/g, ""); // Convert to number
    });

    // Debug: Check for NaN values
    const invalidData = data.filter(d => isNaN(d.Population));
    console.log("Invalid Data Rows:", invalidData);

    // Remove invalid values and sort data
    data = data.filter(d => !isNaN(d.Population) && d.Population > 0)
               .sort((a, b) => b.Population - a.Population)
               .slice(0, 20);

    // Debug: Check sorted data
    console.log("Top 20 Sorted Data:", data);

    // Define chart dimensions
    const width = 1000, height = 700;
    const margin = { top: 40, right: 30, bottom: 100, left: 200 };

    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

    const maxPopulation = d3.max(data, d => d.Population) || 0; // Prevent NaN issues
    console.log("Max Population:", maxPopulation);

    const xScale = d3.scaleLinear()
        .domain([0, maxPopulation])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([margin.top, height - margin.bottom])
        .padding(0.3);

    // Append bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => yScale(d.Country))
        .attr("width", d => Math.max(1, xScale(d.Population) - margin.left)) // Ensure width is not zero
        .attr("height", yScale.bandwidth())
        .attr("fill", d => isNaN(d.Population) ? "red" : "steelblue"); // Debug color coding

    // Append X-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format(".2s")));

    // Append Y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // Append title
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", margin.top - 10)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Population Bar Chart (2020)");

    console.log("X Scale Domain:", xScale.domain());
    console.log("First Few Countries & Populations:", data.slice(0, 5));
});
