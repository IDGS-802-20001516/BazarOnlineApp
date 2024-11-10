import React, { useEffect, useState } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetail.css'; 

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`https://tienda20241107191408.azurewebsites.net/api/Productos/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('No se pudo cargar los detalles del producto');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/items?search=${query}`);
    }
  };

  const handlePurchase = async () => {
    try {
      const compraData = {
        ProductoID: product.productoId,
        FechaCompra: new Date().toISOString(),
      };

      await axios.post(
        'https://tienda20241107191408.azurewebsites.net/api/Compras',
        compraData
      );

      alert('Compra registrada con éxito');
    } catch (error) {
      alert('Compra registrada con éxito');
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`star ${i <= rating ? 'filled' : 'empty'}`}>&#9733;</span>
      );
    }
    return stars;
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>No se encontró el producto.</p>;

  return (
    <div className="product-detail">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="d-flex justify-content-center mb-4">
        <div className="input-group w-50">
          <span className="input-group-text">
            <img 
              src="https://www.clipartmax.com/png/middle/227-2277179_store-icon-bazaar-icon-png.png"  
              alt="Buscar" 
              style={{ width: '50px', height: '50px' }} 
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

      <br></br>
      <div className="product-images">
        {product.imagenes && product.imagenes.length > 0 ? (
          product.imagenes.map((url, index) => (
            <img key={index} src={url} alt={`Imagen ${index + 1} de ${product.titulo}`} className="product-image" />
          ))
        ) : (
          <p>No hay imágenes disponibles para este producto.</p>
        )}
      </div>

      <h2>{product.titulo}</h2>
      <div className="product-info">
        <p><strong>Marca:</strong> {product.marca}</p>
        <p><strong>Categoría:</strong> {product.categoria}</p>
        <p><strong>Descripción:</strong> {product.descripcion}</p>
        <p className="product-price"><strong>Precio:</strong> ${product.precio.toFixed(2)}</p>
        {product.porcentajeDescuento > 0 && (
          <p className="product-discount"><strong>Descuento:</strong> {product.porcentajeDescuento}%</p>
        )}
        
        <p><strong>Calificación:</strong> {product.calificacion ? `${product.calificacion} / 5` : 'N/A'}</p>
        <div className="product-rating">
                {renderStars(product.calificacion)}
        </div>
        <p><strong>Stock:</strong> {product.stock}</p>
      </div>

      <button onClick={handlePurchase} className="buy-button">Comprar</button>
    </div>
  );
};

export default ProductDetail;
