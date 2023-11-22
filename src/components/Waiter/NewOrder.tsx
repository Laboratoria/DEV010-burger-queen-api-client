import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/burger-queen-logo.png';
import LogOut from '../../assets/log-out.png';
import Profile from '../../assets/profile.png';
import ProductList from './ProductList';
import { useState } from 'react';
import { createOrder } from '../../services/request';
import { Product } from '../../types/Types';
import Swal from 'sweetalert2'


const NewOrder = () => {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]); // Nuevo estado para los productos seleccionados
  const [clientName, setClientName] = useState('');
  const [table, setTable] = useState('');

  const navigate = useNavigate();

  const handleLoggedSession = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAddProduct = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProductIndex = prevSelectedProducts.findIndex((p) => p.id === product.id);

      if (existingProductIndex !== -1) {
        // Creamos una copia del array prevSelectedProducts con el operador de propagación.
        const updatedProducts = [...prevSelectedProducts];
        const existingProduct = updatedProducts[existingProductIndex];
        // A la copia del array le pasamos el índice del producto existente, que sería igual a una copia de todas las propiedades del objeto para mantener las propiedades originales y solo modificar las que necesitamos cambiar
        updatedProducts[existingProductIndex] = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
          pricetotal: (existingProduct.qty + 1) * existingProduct.price,
        };

        return updatedProducts;
      } else {
        return [
          ...prevSelectedProducts,
          {
            id: product.id,
            name: product.name,
            price: product.price,
            qty: 1,
            pricetotal: product.price,
            image: product.image,
            type: product.type,
            dateEntry: product.dateEntry,
          },
        ];
      }
    });
  };

  const saveOrder = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const date = Date.now()
    const dataOrder = {
      client: clientName,
      table: table,
      products: selectedProducts,
      dateEntry: new Date(date)

    };


    if(dataOrder.client==''){
      Swal.fire({ text:'Ingrese nombre de cliente', icon:'warning'}) 
      return
  }
  if(dataOrder.table==''){
      Swal.fire({ text:'Seleccione una mesa', icon:'warning'}) 
      return
  }
  if(dataOrder.products.length == 0){
      Swal.fire({ text:'Pedido vacío', icon:'warning'}) 
      return
  }

  createOrder(dataOrder).then(()=> {
      Swal.fire({text:'Orden creada exitosamente', icon: 'success'})
  })
  console.log(dataOrder)

  };

  return (
    <section className="newOrder-Section">
      <section className="headerSection">
        <img className="logo-img" id="logo-Header" src={Logo} />
        <section className="buttonHeader">
          <button id="profile-button" className="headerButton">
            Role
            <img className="button-img" id="profileImg" src={Profile} />
          </button>
          <button id="logOut-button" className="headerButton" onClick={handleLoggedSession}>
            <img className="button-img" id="logOutimg" src={LogOut} />
          </button>
        </section>
      </section>
      <section className="orderSection">
        <button className="allOrdersButton"> Ver todos los pedidos </button>
      </section>
      <section className="dashboardSection">
        <section className="menuSection">
          <section className="selectSection">
            <select data-testid="table" className="tableSelect" value={table} onChange={(e) => setTable(e.target.value)}>
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
            <input
              type="text"
              className="name"
              placeholder="Nombre del cliente"
              onChange={(e) => setClientName(e.target.value)}
            />
          </section>
          <ProductList onAddProduct={handleAddProduct} />
        </section>
        <section className="orderInfoSection">
          <h3> Pedido </h3>
          <table>
            <thead>
              <tr>
                <th> Producto </th>
                <th> Cant </th>
                <th> Valor </th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product.id}>
                  <td>{product.name} </td>
                  <td>
                    {product.qty}

                  </td>
                  <td>$ {product.pricetotal} </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="sendOrderButton" onClick={saveOrder}>
            Enviar pedido
          </button>
        </section>
      </section>
    </section>
  );
};

export default NewOrder;