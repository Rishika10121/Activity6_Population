// Use GitHub raw CSV link instead of a local file
const dataUrl = "https://raw.githubusercontent.com/Rishika10121/Activity6_Population/main/Activity6_Population.csv";

d3.csv(dataUrl).then(data => {
    // Convert population to numbers
    data.forEach(d => d.Population = +d.Population);

    // Sort data in descending order and limit to top 20
    data = data.sort((a, b) => b.Population - a.Population).slice(0, 20);

    // Define chart dimensions
    const width = 1000;
    const height = 700;
    const margin = { top: 40, right: 30, bottom: 100, left: 150 };

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
        .padding(0.3);

    // Create bars
    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", margin.left)
        .attr("y", d => yScale(d.Country))
        .attr("width", d => xScale(d.Population) - margin.left)
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue");

    // Add X-axis
    svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format(".2s")))
        .selectAll("text")
        .attr("transform", "rotate(-10)")
        .style("text-anchor", "end");

    // Add Y-axis with rotated labels
    svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(yScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-0.8em")
        .attr("dy", "0.15em")
        .attr("transform", "rotate(-10)");

    // Add labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height - 50)
        .attr("class", "axis-label")
        .style("text-anchor", "middle")
        .text("Population");

    svg.append("text")
        .attr("x", -height / 2)
        .attr("y", 20)
        .attr("transform", "rotate(-90)")
        .attr("class", "axis-label")
        .style("text-anchor", "middle")
        .text("Countries");
});