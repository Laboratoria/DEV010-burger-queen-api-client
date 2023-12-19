import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import getAllOrders from "../../../services/GetAllOrders";
import { Orders } from "../../../types/Types";
import { updateFinalizedOrder } from "../../../services/request";
import Swal from "sweetalert2";

//Componente para renderizar las órdenes en la vista del Mesero
const OrderList = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Orders[]>([]);

  //Cambiamos el estado de la orden
  const finalizedOrder = async (order: Orders) => {
    setOrders((prevOrders) =>
      prevOrders.map((prevOrder) =>
        prevOrder.id === order.id
          ? { ...prevOrder, status: "Entregado" }
          : prevOrder
      )
    );
    await updateFinalizedOrder(order.id, "Entregado").then(() => {
      Swal.fire({ text: "Orden entregada exitosamente", icon: "success" });
    });
  };

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
      <nav className="orderSection">
        <Link to={"/waiter/newOrder"}>
          <button className="allOrdersButton"> Nuevo Pedido </button>
        </Link>
      </nav>
      <main className="orders-dashboard">
        <table className="orders-table">
          <caption className="orders-title">Pedidos</caption>
          <thead>
            <tr>
              <th id="order-th-1" className="order-th">
                ID
              </th>
              <th id="order-th-2" className="order-th">
                Nombre
              </th>
              <th id="order-th-3" className="order-th">
                Mesa
              </th>
              <th id="order-th-4" className="order-th">
                Estado
              </th>
              <th id="order-th-5" className="order-th">
                Acción
              </th>
            </tr>
          </thead>
          <tbody>
            {orders
              .sort((a, b) => {
                const orderStatus: { [key: string]: number } = {
                  Pendiente: 1,
                  "Por entregar": 2,
                  Entregado: 3,
                };
                return (
                  orderStatus[a.status as keyof typeof orderStatus] -
                  orderStatus[b.status as keyof typeof orderStatus]
                );
              })
              .map((order: Orders) => (
                <tr key={`tr-${order.id}`} >
                  <td className="tdClass">{order.id}</td>
                  <td className="tdClass">{order.client}</td>
                  <td className="tdClass">{order.table}</td>
                  <td className="tdClass">{order.status}</td>
                  <td className="tdClass">
                    {order.status === "Por entregar" && (
                      <button
                        className="button-action"
                        onClick={() => {
                          finalizedOrder(order);
                        }}
                      >
                        Entregar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </main>
    </section>
  );
};

export default OrderList;
