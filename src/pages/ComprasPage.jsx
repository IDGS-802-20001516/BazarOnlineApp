import React, { useEffect, useState } from 'react';  
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Compra.css'; 


const Compras = () => {
  const [compras, setCompras] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await axios.get(
          'https://tienda20241107191408.azurewebsites.net/api/Compras'
        );
        setCompras(response.data);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
      }
    };

    fetchCompras();
  }, []);

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Mis Compras</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Fecha de Compra</th>
            </tr>
          </thead>
          <tbody>
            {compras.map((compra) => (
              <tr key={compra.compraID}>
                <td>
                  <img 
                    src={compra.producto.miniatura} 
                    alt={compra.producto.titulo} 
                    className="img-fluid" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{compra.producto.titulo}</td>
                <td>{compra.descripcion}</td>
                <td>${compra.precio.toFixed(2)}</td>
                <td>{new Date(compra.fechaCompra).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón "Salir" centrado al final */}
      <div className="text-center mt-4">
        <button 
          className="btn btn-danger" 
          onClick={handleLogout} 
        >
          SALIR
        </button>
      </div>
    </div>
  );
};

export default Compras;
