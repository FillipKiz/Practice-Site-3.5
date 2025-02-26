import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Child2 = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (data.length > 0) {
        console.log("Child2 data:", data); // Verify data is passed correctly
      const margin = { top: 20, right: 30, bottom: 40, left: 40 };
      const width = 500 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select(chartRef.current)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const days = ["Thur", "Fri", "Sat", "Sun"];
      const avgTips = days.map(day => {
        const filteredData = data.filter(d => d.day === day);
        const totalTips = filteredData.reduce((sum, d) => sum + +d.tip, 0);
        return totalTips / filteredData.length;
      });

      const x = d3.scaleBand()
        .domain(days)
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(avgTips)])
        .range([height, 0]);

      svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      svg.append("g")
        .call(d3.axisLeft(y));

      svg.selectAll("rect")
        .data(avgTips)
        .enter()
        .append("rect")
        .attr("x", (d, i) => x(days[i]))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d))
        .attr("fill", "#69b3a2");

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + margin.top + 20)
        .style("text-anchor", "middle")
        .text("Day");

      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -margin.left + 10)
        .style("text-anchor", "middle")
        .text("Average Tips");

      svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .style("text-anchor", "middle")
        .text("Average Tips by Day");
    }
  }, [data]);

  return <svg ref={chartRef}></svg>;
};

export default Child2;