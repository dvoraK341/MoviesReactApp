import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ItemDetails from './components/ItemDetails';
import MoviesPage from './components/MoviesPage';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/item/:imdbID" element={<ItemDetails />} />
        <Route path="/" element={<MoviesPage />} />
      </Routes>
    </Router>
  );
}

export default App;