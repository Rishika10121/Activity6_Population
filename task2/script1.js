// Define the dataset
const data = [
    { genre: "Documentary", below5: 0.067, between5_6_5: 0.169, between6_5_7_5: 0.347, between7_5_8_5: 0.314, above8_5: 0.101 },
    { genre: "Drama", below5: 0.157, between5_6_5: 0.373, between6_5_7_5: 0.325, between7_5_8_5: 0.115, above8_5: 0.031 },
    { genre: "Comedy", below5: 0.233, between5_6_5: 0.414, between6_5_7_5: 0.240, between7_5_8_5: 0.082, above8_5: 0.031 },
    { genre: "Romance", below5: 0.172, between5_6_5: 0.449, between6_5_7_5: 0.259, between7_5_8_5: 0.096, above8_5: 0.023 },
    { genre: "Animation", below5: 0.216, between5_6_5: 0.330, between6_5_7_5: 0.227, between7_5_8_5: 0.205, above8_5: 0.023 },
    { genre: "Action", below5: 0.400, between5_6_5: 0.370, between6_5_7_5: 0.162, between7_5_8_5: 0.056, above8_5: 0.012 }
];

// Define dimensions
const margin = { top: 50, right: 150, bottom: 50, left: 120 };
const width = 700 - margin.left - margin.right;
const height = 400 - margin.top - margin.bottom;

// Define the SVG
const svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Stack the data
const keys = ["below5", "between5_6_5", "between6_5_7_5", "between7_5_8_5", "above8_5"];
const stackedData = d3.stack().keys(keys)(data);

// Define scales
const x = d3.scaleLinear().domain([0, 1]).range([0, width]);
const y = d3.scaleBand().domain(data.map(d => d.genre)).range([0, height]).padding(0.2);
const color = d3.scaleOrdinal()
    .domain(keys)
    .range(["#4CAF50", "#FFB74D", "#64B5F6", "#E91E63", "#616161"]);

// Draw the stacked bars
svg.append("g")
    .selectAll("g")
    .data(stackedData)
    .enter().append("g")
    .attr("fill", d => color(d.key))
    .selectAll("rect")
    .data(d => d)
    .enter().append("rect")
    .attr("y", d => y(d.data.genre))
    .attr("x", d => x(d[0]))
    .attr("width", d => x(d[1]) - x(d[0]))
    .attr("height", y.bandwidth());

// Add X axis
svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format(".0%")));

// Add Y axis
svg.append("g").call(d3.axisLeft(y));

// Add legend
const legend = d3.select("#legend").append("svg")
    .attr("width", 150)
    .attr("height", 150)
    .selectAll("g")
    .data(keys)
    .enter().append("g")
    .attr("transform", (d, i) => `translate(0, ${i * 20})`);

legend.append("rect")
    .attr("width", 18)
    .attr("height", 18)
    .attr("fill", color);

legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", "0.35em")
    .text(d => d.replace(/_/g, " "));
