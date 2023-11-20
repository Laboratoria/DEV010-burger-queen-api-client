import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/burger-queen-logo.png';
import LogOut from '../../assets/log-out.png';
import Profile from '../../assets/profile.png';
import ProductList from './ProductList';



const NewOrder = () => {
  const navigate = useNavigate();

  const handleLoggedSession = () => {
    localStorage.removeItem("token")
    navigate('/');

    
  }
  return (
    <section className='newOrder-Section'>
      <section className='headerSection'>
        <img className='logo-img' id='logo-Header' src={Logo} />
        <section className='buttonHeader'>
        <button id='profile-button' className='headerButton'>
          Role
          <img className='button-img' id='profileImg' src={Profile} />
        </button>
        <button id='logOut-button' className='headerButton' onClick={handleLoggedSession}>
          <img className='button-img' id='logOutimg' src={LogOut} />
        </button>
        </section>
      </section>
      <section className='orderSection'>
        <button className='allOrdersButton'> Ver todos los pedidos </button>
      </section>
      <section className='dashboardSection'>
        <section className='menuSection'>
          <section className='selectSection'>
            <select data-testid='table' className='tableSelect'>
              <option value="">Mesa</option>
              <option value="mesa1">Mesa1</option>
              <option value="mesa2">Mesa2</option>
              <option value="mesa3">Mesa3</option>
              <option value="mesa4">Mesa4</option>
              <option value="mesa5">Mesa5</option>
              <option value="mesa6">Mesa6</option>
              <option value="mesa7">Mesa7</option>
              <option value="mesa8">Mesa8</option>
              <option value="mesa9">Mesa9</option>
              <option value="mesa10">Mesa10</option>
            </select>
            <input type="
            text" className='name' placeholder='Nombre del cliente' />
          </section>
          <ProductList/>
        </section>
        <section className='orderInfoSection'>
          <h3> Pedido </h3>
          <table>
            <td> Producto </td>
            <td> Cantidad </td>
            <td> Valor </td>
            <tr></tr>
          </table>
          <button> Enviar pedido </button>
        </section>
      </section>
    </section>
  )
}

export default NewOrder;