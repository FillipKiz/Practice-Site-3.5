import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Child1 from './Child1';
import Child2 from './Child2';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('/tips.csv').then(data => {
      console.log("Loaded data:", data); // Check if data is loaded
      setData(data);
    }).catch(error => {
      console.error("Error loading data:", error); // Check for errors
    });
  }, []);

  return (
    <div className="App">
      <h1>Tips Dataset Visualization</h1>
      <Child1 data={data} />
      <Child2 data={data} />
    </div>
  );
}

export default App;