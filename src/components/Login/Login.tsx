import Logo from "../../assets/burger-queen-logo.png";
import { useState } from "react";
import { auth } from "../../services/request";
import { Token } from "../../types/Types";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  async function userAuth(e: { preventDefault: () => void }) {
    e.preventDefault();
    //autenticar al usuario con el correo electrónico y la contraseña
    const response: Token = await auth(email, password);
    if (response.accessToken) {
      // Si la respuesta contiene un token de acceso, se guarda en el almacenamiento local junto con el rol del usuario.
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("userRole", response.user.role);
      if (response.user.role === "Mesero") {
        navigate("/waiter/newOrder");
      } else if (response.user.role === "Chef") {
        navigate("/chef/orders");
      } else if (response.user.role === "Admin") {
        navigate("/admin/workerList");
      }
    } else {
      setError(true);
      if (`${response}` === "Email and password are required") {
        setErrorMessage("Ingrese email y contraseña");
      } else if (`${response}` === "Incorrect password") {
        setErrorMessage("Contraseña incorrecta");
      } else if (`${response}` === "Cannot find user") {
        setErrorMessage("Usuario no encontrado");
      } else if (`${response}` === "Email format is invalid") {
        setErrorMessage("Formato de email incorrecto");
      } else {
        setErrorMessage(
          "Error durante la autenticación. Por favor, inténtalo de nuevo."
        );
      }
      setEmail("");
      setPassword("");
    }
  }

  return (
    <section className="login-section">
      <main className="login-container">
        <img className="logo-img" src={Logo} />
        <h1>Bienvenido/a</h1>
        <form>
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Contraseña"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          {error && <p className="errormsg">{errorMessage}</p>}
          <button className="login-button" onClick={userAuth}>
            Ingresar
          </button>
        </form>
      </main>
    </section>
  );
};

export default Login;
