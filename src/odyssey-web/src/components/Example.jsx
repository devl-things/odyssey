import { useState, useEffect, useRef } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import axios from 'axios';
import * as go from 'gojs';
import '../styles/App.scss';

function Example() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const diagramRef = useRef(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => setData(response.data))
      .catch(error => console.log('Error fetching data:', error));
  }, []);

  useEffect(() => {
    // Create the GoJS Diagram
    const $ = go.GraphObject.make;
    const diagram = $(go.Diagram, diagramRef.current, {
      'undoManager.isEnabled': true,  // Enable undo/redo
    });

    // Define the node template
    diagram.nodeTemplate =
      $(go.Node, 'Auto',
        $(go.Shape, 'Rectangle', {
          strokeWidth: 2,
          fill: 'lightblue',
        }),
        $(go.TextBlock, {
          margin: 10,
          font: 'bold 12pt sans-serif',
        },
        new go.Binding('text', 'key'))
      );

    // Define the link template
    diagram.linkTemplate =
      $(go.Link,
        $(go.Shape),  // Line shape
        $(go.Shape, { toArrow: 'Standard' })  // Arrow at the end of the link
      );

    // Create the model (data for the nodes and links)
    diagram.model = new go.GraphLinksModel(
      [
        { key: 'Alpha' },
        { key: 'Beta' },
        { key: 'Gamma' },
      ],
      [
        { from: 'Alpha', to: 'Beta' },
        { from: 'Beta', to: 'Gamma' },
      ]
    );

    return () => {
      diagram.div = null; // Clean up the diagram when the component is unmounted
    };
  }, []);
  return (
    <div className="App">
      <div className="main">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR. Is it? Maybe it is. Look
        </p>
        <h1>Fetched Data:</h1>
      <ul>
        {data.map(item => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      </div>
      <div
      ref={diagramRef}
      style={{ width: '100%', height: '500px', border: '1px solid black' }}
    />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      </div>
    </div>
  )
}

export default Example
