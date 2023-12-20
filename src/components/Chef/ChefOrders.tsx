import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Orders, Product } from "../../types/Types";
import { updateOrder } from "../../services/request";
import Swal from "sweetalert2";
import getAllOrders from "../../services/GetAllOrders";

const ChefOrders: React.FC = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  //Definimos una función para finalizar las órdenes
  const finalizeOrder = async (orderId: number) => {
    //Configuramos la hora
    const currentDate = new Date();
    const formattedFinalDate = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
    });
    try {
      // Actualiza la orden, copia las ordenes y le agrega el nuevo status y la nueva propiedad dateFinal en el estado local
      setOrders((prevOrders) =>
        prevOrders.map((prevOrder) =>
          prevOrder.id === orderId
            ? {
                ...prevOrder,
                status: "Por entregar",
                dateFinal: formattedFinalDate,
              }
            : prevOrder
        )
      );
      // Actualiza la orden en la base de datos
      await updateOrder(orderId, "Por entregar", formattedFinalDate).then(
        () => {
          Swal.fire({ text: "Orden finalizada exitosamente", icon: "success" });
        }
      );
      //Actualiza el estado de las órdenes pendientes
      setPendingOrders(
        pendingOrders.filter((order: Orders) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error al actualizar el estado de la orden", error);
    }
  };

  //Con el hook llamamos a la función getAllOrders
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const ordersData = await getAllOrders(token);
          const updatedOrders = ordersData.map((order) =>
            !order.status ? { ...order, status: "Pendiente" } : order
          );
          setOrders(updatedOrders);
        }
      } catch (error) {
        console.error("Error al obtener las órdenes:", error);
      }
    };
    fetchData();
  }, [token]);

  //Creamos una función para convertir la hora
  function convertToValidDate(time: string): Date {
    const currentDate = new Date();
    const combinedDateTimeString = currentDate.toDateString() + " " + time;
    return new Date(combinedDateTimeString);
  }
  //Calculamos la diferencia entre la hora en que fué creado el pedido y la hora en que se finalizó
  function calculateTime(startDateTime: string, endDateTime: string): string {
    const dateEntry = convertToValidDate(startDateTime);
    const dateFinal = convertToValidDate(endDateTime);
    const timeDifferenceInMillis = dateFinal.getTime() - dateEntry.getTime();
    // Convertir la diferencia de tiempo a horas y minutos
    const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceInMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    // Formatear la diferencia de tiempo como una cadena
    const formattedTimeDifference = `${hours} horas y ${minutes} minutos`;
    return formattedTimeDifference;
  }

  return (
    <section className="chef-section">
      <Header />
      <main className="orders-section">
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
            <article className="orderCard-section" key={order.id}>
              <section className="table-section">
                <table className="table" key={`table-${order.id}`}>
                  <caption className="order-table">{order.table}</caption>
                  <caption className="order-time">{order.dateEntry}</caption>
                  <tbody>
                    {order.products.map(
                      (product: Product, productIndex: number) => (
                        <tr key={productIndex}>
                          <td id="product-name" className="order-product">
                            {product.name}
                          </td>
                          <td id="product-qty" className="order-product">
                            {product.qty}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </section>
              <section className="buttonChef-section">
                <button
                  className="finalice-order"
                  //Al hacer click llama a la función finalizeOrder y deshabilita el botón
                  onClick={() => {
                    finalizeOrder(order.id);
                  }}
                  disabled={
                    order.status === "Por entregar" ||
                    order.status === "Entregado"
                  }
                >
                  Finalizar
                </button>
                {(order.status === "Por entregar" ||
                  order.status === "Entregado") && (
                  <p data-testid="total-time" className="total-time">
                    {" "}
                    Tiempo: {calculateTime(order.dateEntry, order.dateFinal)}
                  </p>
                )}
              </section>
            </article>
          ))}
      </main>
    </section>
  );
};

export default ChefOrders;
