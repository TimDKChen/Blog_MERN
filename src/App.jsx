import React, { useContext} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Single from './pages/Single';
import Write from './pages/Write';
import { Context } from './context/Context';
import './App.css';


function App() {
  const { user } = useContext(Context);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={user ? <Home/> : <Register/>} />
            <Route path="/login" element={user ? <Home/> : <Login/>} />
            <Route path="/settings" element={user ? <Settings/> : <Login/>} />
            <Route path="/write" element={user ? <Write/> : <Login/>} />
            <Route path="/post">
              <Route path=":postId" element={<Single />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
