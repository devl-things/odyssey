import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Example from './components/Example.jsx'

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <App />
  //</StrictMode>,
)
