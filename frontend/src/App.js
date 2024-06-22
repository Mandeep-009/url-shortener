import './App.css';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import Path from './pages/Path';
import axios from 'axios';

function App() {
    axios.defaults.withCredentials = true;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/:code' element={<Path />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
