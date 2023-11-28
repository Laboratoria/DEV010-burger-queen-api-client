import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Orders, Product } from "../../types/Types";
import { getOrders, updateOrder } from "../../services/request";



const ChefOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [pendingOrders, setPendingOrders] = useState([]); // Estado para órdenes pendientes


  const [disabledButtons, setDisabledButtons] = useState<{ [key: number]: boolean }>(() => {


    const storedState = localStorage.getItem("disabledButtons");
    return storedState ? JSON.parse(storedState) : {};
  });


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
  const finalizeOrder = async (orderId: number) => {
    // Obtén la hora actual al hacer clic en el botón "Finalizar"
    const currentDate = new Date();
    const formattedFinalDate = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });

    setDisabledButtons((prevDisabledButtons) => {
      return { ...(prevDisabledButtons || {}), [orderId]: true };
    });


    // Actualiza la orden con la nueva propiedad dateFinal
    await updateOrder(orderId, 'Por entregar', formattedFinalDate)
      .then(() => {
        // Actualiza el estado de las órdenes pendientes
        setPendingOrders(pendingOrders.filter((order: Orders) => order.id !== orderId));

        // Muestra ambas horas en la consola
        console.log('dateEntry:', orders.find(order => order.id === orderId)?.dateEntry);
        console.log('dateFinal:', formattedFinalDate);
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

  useEffect(() => {
    localStorage.setItem("disabledButtons", JSON.stringify(disabledButtons));
  }, [disabledButtons]);

  const orderedOrders = [...orders].sort((a, b) => {
    const isADisabled = disabledButtons[a.id] || false;
    const isBDisabled = disabledButtons[b.id] || false;

    // Coloca las órdenes con botones deshabilitados al final
    return isADisabled === isBDisabled ? 0 : isADisabled ? 1 : -1;
  });
  console.log(orders);


  function convertToValidDate(time: string): Date {
    const currentDate = new Date();
    const combinedDateTimeString = currentDate.toDateString() + ' ' + time;
    return new Date(combinedDateTimeString);
  }

  function calculateTime(startDateTime: string, endDateTime: string): string {
    const dateEntry = convertToValidDate(startDateTime);
    console.log(dateEntry)
    const dateFinal = convertToValidDate(endDateTime);
    console.log(dateFinal)

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
        {orderedOrders.map((order: Orders) => (
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
                onClick={() => finalizeOrder(order.id)} disabled={disabledButtons[order.id]}
              >
                Finalizar
              </button>
              {disabledButtons[order.id] && (
                <p className="total-time">
                  Tiempo: {calculateTime(order.dateEntry, order.dateFinal)}
                </p>
              )}
            </section>

          </section>
        ))}


      </section>
    </section>


  )
}

export default ChefOrders;