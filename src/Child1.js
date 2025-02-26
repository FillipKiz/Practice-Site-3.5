import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Child1 = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
        console.log("Child1 data:", data); // Verify data is passed correctly
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.total_bill)])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.tip)])
        .range([height, 0]);

      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", d => x(+d.total_bill))
        .attr("cy", d => y(+d.tip))
        .attr("r", 5)
        .attr("fill", "#69b3a2");

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .style("text-anchor", "middle")
        .text("Total Bill");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .style("text-anchor", "middle")
        .text("Tips");

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .style("text-anchor", "middle")
        .text("Total Bill vs Tips");
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default Child1;