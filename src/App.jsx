import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import ProductDetail from './pages/ProductDetailPage';
import SearchResults from './pages/SearchResultsPage';
import Compras from './pages/ComprasPage';
import Navbar from './components/Navbar';


function App() {
  return (
      <Router> 
      <Navbar />    
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/items" element={<SearchResults />} />
          <Route path="/items/:id" element={<ProductDetail />} />
          <Route path="/compras" element={<Compras />} />
        </Routes>
      </  Router>
  );
}

export default App;
