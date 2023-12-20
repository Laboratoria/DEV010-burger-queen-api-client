import React, { useState } from 'react';

  const Login = () => {
    //[valorDelEstado, metodoParaActulizarElEstado]
    const [correo, setCorreo] = useState(''); // cadena vacia para iniciar desde cero los datos
    const [contraseña, setContraseña] = useState('');
  
    const iniciarRegistro = () => {
      alert(`Correo: ${correo} Contraseña: ${contraseña}`);
    };
  const logearse = ()=>{
    const config = {method: 'POST', headers:{'Content-Type':"application/json"},body:JSON.stringify({email:correo, password:contraseña})}
    fetch('http://localhost:8080/login', config)
    .then((respuesta)=>{console.log(respuesta)
      const respuestas = respuesta.json()
      return respuestas
    }).then((respuestas)=> {// Almacenar el token en el Local Storage
      localStorage.setItem('token', respuestas.accessToken);
      console.log(respuestas);
      alert(respuestas.accessToken);
      
    })

  };
    return (
      <div>
        <form>
          <h1>Bienvenido, ingresa tu cuenta</h1>
          <h2>CORREO</h2>
          <input
            type="email"
            placeholder="Introduzca su correo"
            value={correo} //value almacena los datos en correo
            onChange={(e) => setCorreo(e.target.value)}
          />
          <h2>CONTRASEÑA</h2>
          <input
            type="password"
            placeholder="Introduzca su contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
          <button onClick={logearse} type='button'>Iniciar sesión</button>
          <div>
            <h3>AQUI EL TEXTO DE ALERTA</h3>
          </div>
        </form>
      </div>
    );
  };

export default Login;


