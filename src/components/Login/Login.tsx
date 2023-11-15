import Logo from '../../assets/burger-queen-logo.png';
import { useState } from 'react';
import { auth } from '../../services/request';
import { Token } from '../../types/Types';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const navigate = useNavigate();


return (
    <section className='login-section'>
        <section className='login-container'>
            <img className = 'logo-img' src={Logo} />
            <h1>Bienvenido/a</h1>
            <form>
                <input type='email' placeholder='Email' onChange={(event) => setEmail(event.target.value)}
                value={email}/>
                <input type='password' placeholder='Contraseña' onChange={(event) => setPassword(event.target.value)}
                value={password}/>

                
                
                <button className='login-button' onClick={async (e) => {
                    e.preventDefault();
                    const response: Token = await auth(email, password);
                    console.log('response:', response)
                    if (response.accessToken) {
                        localStorage.setItem("token", response.accessToken);
                        if( response.user.role === 'waiter') {
                            navigate("/waiter/newOrder");
                        } else if ( response.user.role === 'chef') {
                            navigate("/chef/orders");
                        }
                    } else {
                        console.log(response);
                        setError(true);
                        setErrorMessage(`${response}`);
                        setEmail("") 
                        setPassword("")
                    }

                }}>Ingresar</button>

                {error && <p>{errorMessage}</p>}

                
            </form>

        </section>
    </section>
)

}

export default Login;