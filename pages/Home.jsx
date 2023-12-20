// no es necesario import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const IniciarClick = () => {
    //alert('funciona iniciar');
    navigate('/login');
  };

  const RegistrarseClick = () => {
   alert('funciona registrarse');
   // Navegar a la ruta de login
  };

  return (
    <div className="home">
      <h1>Menú</h1>
      <button onClick={IniciarClick}>Iniciar sesión</button>
      <button onClick={RegistrarseClick}>Registrarse</button>
    </div>
  );
};

export default Home;