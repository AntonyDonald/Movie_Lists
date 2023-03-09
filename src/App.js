import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import PublicRouting from './routing/PublicRouting';
import PrivateRouting from './routing/PrivateRouting'
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import "./assets/styles/myStyle.css"

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route 
            path="/"
            element={
              <PublicRouting>
                <Login />
              </PublicRouting>
            }
          />
          <Route 
            path="home/"
            element={
              <PrivateRouting>
                <Home />
              </PrivateRouting>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
