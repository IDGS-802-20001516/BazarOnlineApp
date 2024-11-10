import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${query}`);
    }
  };

  return (
    <div className="container text-center mt-5">
      {/* Imagen de encabezado más pequeña */}
      <div className="mb-4">
        <img 
          src="https://static.vecteezy.com/system/resources/previews/002/561/619/non_2x/bazaar-word-concepts-flat-color-banner-vector.jpg" 
          alt="Banner Bazar Online" 
          className="img-fluid rounded" 
          style={{ maxWidth: '50%', height: 'auto' }} 
        />
      </div>

      <h1 className="display-4 mb-4">Bazar Online</h1>

      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="d-flex justify-content-center">
        <div className="input-group w-50">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Buscar productos..." 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
          />
          <button type="submit" className="btn btn-primary">Buscar</button>
        </div>
      </form>
    </div>
  );
}

export default Home;
