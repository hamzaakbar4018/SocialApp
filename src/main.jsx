import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import IndustryContext from './Context/IndustryContext.jsx'
import NotificationContext from './Context/NotificatinContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <IndustryContext>
      <NotificationContext>
        <App />
      </NotificationContext>
    </IndustryContext>
  </BrowserRouter>,
)
