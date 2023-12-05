import { Link } from "react-router-dom";
import Header from "../Header/Header"
import { useEffect, useState } from "react";
//import getAllOrders from "../Orders/getAllOrders";
//import { getOrders } from "../../services/request";
import getAllOrders from "../../services/GetAllOrders";
import { Orders } from "../../types/Types";

//Componente para renderizar las órdenes en la vista del Mesero
const OrderList = () => {
    const token = localStorage.getItem("token");
    const [orders, setOrders] = useState<Orders[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
          try {
            if (token) {
              const orderData = await getAllOrders(token);
              setOrders(orderData);
            }
          } catch (error) {
            console.error("Error al obtener las órdenes:", error);
          }
        };
    
        fetchOrders();
      }, [token]);

    return (
        <section className="order-list">
            <Header />
            <section className="orderSection">
                <Link to={'/waiter/NewOrder'}>
                    <button className="allOrdersButton"> Nuevo Pedido </button>
                </Link>
            </section>
            <section className="orders-dashboard">
                <table className="orders-table">
                    <caption className="orders-title">Pedidos</caption>
                    <thead>
                        <tr>
                            <th id= 'order-th-1' className="order-th">ID</th>
                            <th id= 'order-th-2' className="order-th">Nombre</th>
                            <th id= 'order-th-3' className="order-th">Mesa</th>
                            <th id= 'order-th-4' className="order-th">Estado</th>
                            <th id= 'order-th-5' className="order-th">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order: Orders) => (
                        <tr key={`tr-${order.id}`}>
                        <td>{order.id}</td>
                        <td>{order.client}</td>
                        <td>{order.table}</td>
                        <td>{order.status}</td>
                        <td>
                            <button className="button-action">Entregar</button>
                        </td>
                    </tr>
                        ))}

                    </tbody>
                </table>
            </section>
        </section>
    )

}

export default OrderList;