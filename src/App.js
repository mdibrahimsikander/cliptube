import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routePath } from './constants/routes';


// components
import Home from './pages/Home';
import Playlist from './pages/Playlist';
import Player from './pages/Player';
import Login from "./pages/Login"
import SignUp from './pages/SignUp';
import CategoryMovie from './pages/CategoryMovie';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={routePath.login} element={<Login />} />
          <Route path={routePath.signup} element={<SignUp />} />
          <Route path={routePath.home} element={<Home />} />
          <Route path={routePath.playlist} element={<Playlist />} />
          <Route path={routePath.player} element={<Player />} />
          <Route path={routePath.categories} element={<CategoryMovie />} />
          <Route path={routePath.invalid} element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
