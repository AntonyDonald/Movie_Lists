import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import PublicRouting from './routing/PublicRouting';
import PrivateRouting from './routing/PrivateRouting'
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import "./assets/styles/myStyle.css"
import { useState } from 'react';

function App() {

  const [showLoginToast , setShowLoginToast] = useState(false)
  const [showLogoutToast , setShowLogoutToast] = useState(false)

  return (
    <div className="App">
      <Router>        
        <Header 
          setShowLogoutToast={setShowLogoutToast}
        />
        <Routes>
          <Route 
            path="/"
            element={
              <PublicRouting>
                <Login 
                  setShowLoginToast = {setShowLoginToast}
                  showLogoutToast={showLogoutToast}
                  setShowLogoutToast={setShowLogoutToast}
                />
              </PublicRouting>
            }
          />
          <Route 
            path="home/"
            element={
              <PrivateRouting>
                <Home                    
                   showLoginToast = {showLoginToast}
                   setShowLoginToast = {setShowLoginToast}
                />
              </PrivateRouting>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
