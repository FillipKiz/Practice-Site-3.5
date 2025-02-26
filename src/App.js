import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import Child1 from './Child1';
import Child2 from './Child2';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    d3.csv('/tips.csv').then(data => {
      setData(data);
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