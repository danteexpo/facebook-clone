import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dropdown from './components/Dropdown/Dropdown';
import Home from './pages/Home/Home';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Login from './pages/Login/Login';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="app">
      {authIsReady && (
        <Router>
          {user && <Dropdown />}
          <Routes>
            {!user && <Route path="/login" element={<Login />} />}
            {user && <Route path="/login" element={<Navigate to="/" />} />}

            {!user && <Route path="/" element={<Navigate to="/login" />} />}
            {user && <Route path="/" element={<Home />} />}

            {!user && (
              <Route path="/bookmarks" element={<Navigate to="/login" />} />
            )}
            {user && <Route path="/bookmarks" element={<Bookmarks />} />}
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
