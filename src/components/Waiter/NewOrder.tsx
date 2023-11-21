import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/burger-queen-logo.png';
import LogOut from '../../assets/log-out.png';
import Profile from '../../assets/profile.png';
import ProductList from './ProductList';
import { useState } from 'react';
import { createOrder } from '../../services/request';
import { Product } from '../../types/Types';


/* interface newOrderProps {
  products: Product[]
  setProducts: Product[]
} */
const NewOrder/* : React.FC<newOrderProps> */ = () => {

  const [selectedProducts, setSelectedProducts] = useState([]); // Nuevo estado para los productos seleccionados
  const [clientName, setClientName] = useState('');
  const [table, setTable] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  const navigate = useNavigate();

  const handleLoggedSession = () => {
    localStorage.removeItem("token")
    navigate('/')
  }

  const saveOrder = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const dataOrder = {
      client: clientName,
      table: table,
      products: selectedProducts,
      /*     status: "pending",
          dateEntry: Date.now() */
    }

    /*       if(dataOrder.client==''){
            Swal.fire({ text:'Ingrese el nombre del cliente', icon:'warning'}) 
            return
        }
        if(dataOrder.mesa==''){
            Swal.fire({ text:'Seleccione una mesa', icon:'warning'}) 
            return
        }
        if(dataOrder.products.length == 0){
            Swal.fire({ text:'Asegurese de seleccionar al menos un producto', icon:'warning'}) 
            return
        } */

    createOrder(dataOrder).then(() => {
      console.log({ text: 'Orden creada exitosamente', icon: 'success' })
    })
    console.log(dataOrder)

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
          <ProductList />
        </section>
        <section className='orderInfoSection'>
          <h3> Pedido </h3>
          <table>
            <thead>
              <tr>
                <th> Producto </th>
                <th> Cantidad </th>
                <th> Valor </th>
              </tr>
            </thead>
            <tbody>

              {
                selectedProducts.map(product => (
                  <tr key={product.id}>
                    <td >{product.name} </td>
                    <td > <button className="icon-button" type="button"></button>{product.cantidad} <button className="icon-button" type="button"></button></td>
                    <td >$ {product.price} </td>
                    <td >$ {product.pricetotal} </td>
                    <td> <button className="icon-button" type="button"></button> </td>
                  </tr>
                ))
              }

    
            </tbody>
          </table>
          <button className='sendOrderButton' onClick={saveOrder}> Enviar pedido </button>
        </section>
      </section>
    </section>
  )
}

export default NewOrder;