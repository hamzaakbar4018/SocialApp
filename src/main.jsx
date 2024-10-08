import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import IndustryContext from './Context/IndustryContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <IndustryContext>
      <App />
    </IndustryContext>
  </BrowserRouter>,
)
