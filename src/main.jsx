import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import IndustryContext from './Context/IndustryContext.jsx';
import NotificationContext from './Context/NotificatinContext.jsx';
import PostContext from './Context/PostContext.jsx';
import ApplicationContext from './Context/ApplicationContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';  // Import AuthProvider

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>  {/* Use AuthProvider instead of AuthContext */}
      <ApplicationContext>
        <IndustryContext>
          <PostContext>
            <NotificationContext>
              <App />
            </NotificationContext>
          </PostContext>
        </IndustryContext>
      </ApplicationContext>
    </AuthProvider>
  </BrowserRouter>
);
