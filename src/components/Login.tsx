import Logo from '../assets/burger-queen-logo.png';


const Login = () => {
return (
    <section className='login-section'>
        <section className='login-container'>
            <img className = 'logo-img' src={Logo} />
            <h1>Bienvenido/a</h1>
            <form>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Contraseña'/>
                <button className='login-button'>Ingresar</button>
            </form>

        </section>
    </section>
)

}

export default Login;