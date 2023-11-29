import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Orders, Product } from "../../types/Types";
import { getOrders, updateOrder } from "../../services/request";



const ChefOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  function getAllOrders(token: string | "") {
    if (typeof token === 'string') {
      getOrders(token)
        .then((response) => {
          console.log('Response:', response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setOrders(data);

          // Cargar el estado disabledButtons después de obtener las órdenes
        })
        .catch(() => {
          console.error("Ocurrió un error al tratar de obtener las órdenes");
        });
    } else {
      console.error("No se encontró el token");
    }
  }

  const finalizeOrder = (orderId: number, timeDifference: string) => {
    const currentDate = new Date();
    const formattedFinalDate = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    // Actualiza la orden con la nueva propiedad dateFinal
    updateOrder(orderId, 'Por entregar', formattedFinalDate)
      .then(() => {
        setPendingOrders(pendingOrders.filter((order: Orders) => order.id !== orderId));
        console.log('dateEntry:', orders.find((order) => order.id === orderId)?.dateEntry);
        console.log('dateFinal:', formattedFinalDate);
        console.log('Tiempo:', timeDifference); // Muestra el tiempo calculado
      })
      .catch((error) => {
        console.error("Error al actualizar el estado de la orden", error);
      });
  };

  useEffect(() => {
    if (token) {
      getAllOrders(token);
    }
  }, [token]);


  function convertToValidDate(time: string): Date {
    const currentDate = new Date();
    const combinedDateTimeString = currentDate.toDateString() + ' ' + time;
    return new Date(combinedDateTimeString);
  }

  function calculateTime(startDateTime: string, endDateTime: string): string {
    const dateEntry = convertToValidDate(startDateTime);
    console.log(dateEntry)
    const dateFinal = convertToValidDate(endDateTime);
    console.log('Hora final:', dateFinal)

    const timeDifferenceInMillis = dateFinal.getTime() - dateEntry.getTime();

    // Convertir la diferencia de tiempo a horas y minutos
    const hours = Math.floor(timeDifferenceInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceInMillis % (1000 * 60 * 60)) / (1000 * 60));

    // Formatear la diferencia de tiempo como una cadena
    const formattedTimeDifference = `${hours} horas y ${minutes} minutos`;

    return formattedTimeDifference;
  }



  return (
    <section className="chef-section">
      <Header />
      <section className="orders-section" >
      {orders
        .sort((a) => (a.status === 'Por entregar' ? 1 : -1)) // Ordenar por estado
        .map((order: Orders) => (
          <section className="orderCard-section" key={order.id}>
            <section className="table-section">

              <table className="table" key={`table-${order.id}`}>

                <caption className="order-table">{order.table}</caption>
                <caption className="order-time">{order.dateEntry}</caption>
                <tbody>

                  {order.products.map((product: Product, productIndex: number) => (
                    <tr key={productIndex}>
                      <td id='product-name' className="order-product">{product.name}</td>
                      <td id='product-qty' className="order-product">{product.qty}</td>

                    </tr>
                  ))}
                </tbody>
              </table>

            </section>
            <section className="buttonChef-section">

              <button
                className="finalice-order"
                onClick={() => {
                  const timeDifference = calculateTime(order.dateEntry, order.dateFinal);

                  // Actualizar el estado local antes de llamar a finalizeOrder
                  setOrders(prevOrders => prevOrders.map(prevOrder => 
                    prevOrder.id === order.id ? { ...prevOrder, status: 'Por entregar' } : prevOrder
                  ));

                  finalizeOrder(order.id, timeDifference);
                }}
                disabled={order.status === 'Por entregar'}
              >
                Finalizar
              </button>
              {order.status === 'Por entregar' && (
                  <p> Tiempo: {calculateTime(order.dateEntry, order.dateFinal)}</p>
                )}          
            </section>

          </section>
        ))}


      </section>
    </section>


  )
}

export default ChefOrders;

//disabled