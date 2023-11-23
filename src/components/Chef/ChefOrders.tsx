import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Orders, Product } from "../../types/Types";
import { getOrders } from "../../services/request";


const ChefOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState([]);

  function getAllOrders(token: string | "") {
    if (typeof token === 'string') {
      getOrders(token)
        .then((response) => {
          console.log('Response:', response);  // Agrega este console log
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setOrders(data);
        })
        .catch(() => {
          console.error("Ocurrió un error al tratar de obtener las órdenes");
        });
    } else {
      console.error("No se encontró el token");
    }
  }

  useEffect(() => {
    if (token) {
      getAllOrders(token);
    }
  }, [token]);

  console.log(orders);

  return (
    <section className="chef-section">
      <Header />
      <section className="orders-section">
      {orders.map((order: Orders) => (
        <section className="orderCard-section">
          
            <table className="table" key={order.id}>
              <caption className="order-table">{order.table}</caption>
              <caption className="order-time">{order.dateEntry}</caption>
              <tbody>

                {order.products.map((product: Product, productIndex: number) => (
                  <tr key={productIndex}>
                    <td id= 'product-name' className="order-product">{product.name}</td>
                    <td id= 'product-qty' className="order-product">{product.qty}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
         

          <button className="finalice-order">Finalizar</button>
        </section>
 ))}


      </section>
    </section>


  )
}

export default ChefOrders;