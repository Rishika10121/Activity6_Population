// Use GitHub raw CSV link instead of a local file
const dataUrl = "https://raw.githubusercontent.com/your-username/repository/main/data.csv";

d3.csv(dataUrl).then(data => {
    // Convert population to numbers
    data.forEach(d => d.Population = +d.Population);

    // Sort data in descending order
    data.sort((a, b) => b.Population - a.Population);

    // Define chart dimensions
    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 30, bottom: 80, left: 100 };

    // Create SVG container
    const svg = d3.select("#chart")
        .attr("width", width)
        .attr("height", height);

    // Define scales
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.Population)])
        .range([margin.left, width - margin.right]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([margin.top, height - margin.bottom])
        .padding(0.2);

    // Create bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => yScale(d.Country))
        .attr("width", d => xScale(d.Population) - margin.left)
        .attr("height", yScale.bandwidth());

    // Add X-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format(".2s")));

    // Add Y-axis
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale));

    // Add labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 40)
        .attr("class", "axis-label")
        .text("Population");

    svg.append("text")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("transform", "rotate(-90)")
        .attr("class", "axis-label")
        .text("Countries");
});
