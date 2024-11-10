import React, { useEffect, useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function SearchResults() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const searchQuery = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    if (searchQuery) {
      setQuery(searchQuery);
      setLoading(true);
      fetch(`https://tienda20241107191408.azurewebsites.net/api/Productos/search?query=${searchQuery}`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${query}`);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-${i <= rating ? 'warning' : 'muted'}`}>
          &#9733;
        </span>
      );
    }
    return stars;
  };

  if (loading) return <p className="text-center">Cargando resultados...</p>;

  return (
    <div className="container my-5">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <div className="input-group w-75">
          {/* Imagen a la izquierda del buscador */}
          <span className="input-group-text" style={{ width: '60px', height: '60px' }}>
            <img 
              src="https://www.clipartmax.com/png/middle/227-2277179_store-icon-bazaar-icon-png.png" 
              alt="Buscar" 
              style={{ width: '40px', height: '40px' }} 
            />
          </span>
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

      <h3 className="text-center mb-4">Resultados de búsqueda para: "{searchQuery}"</h3>
      <p className="text-center mb-4">{products.length} resultados encontrados</p>

      <div className="row row-cols-1 row-cols-md-3 g-4">
        {products.map((product) => (
          <div key={product.id} className="col">
            <Link to={`/items/${product.id}`} className="card h-100 text-decoration-none">
              {/* Imagen del producto */}
              <img 
                src={product.miniatura} 
                alt={product.titulo} 
                className="card-img-top w-100" 
                style={{ maxHeight: '200px', objectFit: 'contain' }} 
              />
              <div className="card-body">
                <h5 className="card-title">{product.titulo}</h5>
                <p className="card-text">{product.descripcion}</p>
                <p className="card-text"><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
                <p className="card-text"><strong>Categoría:</strong> {product.categoria}</p>
                <div className="d-flex">
                  {renderStars(product.calificacion)}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
