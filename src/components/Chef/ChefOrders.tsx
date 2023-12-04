import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { Orders, Product } from "../../types/Types";
import { getOrders, updateOrder } from "../../services/request";



const ChefOrders = () => {
  const token = localStorage.getItem("token");
  const [orders, setOrders] = useState<Orders[]>([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  //Definimos una función para obtener las órdenes
  function getAllOrders(token: string | "") {
    if (typeof token === 'string') {
      //Llamamos a la función que hace la petición GET de las órdenes
      getOrders(token)
        .then((response) => {
          console.log('Response:', response);
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          //actualizamos el estado de las órdenes con el resultado de la petición
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

  //Definimos una función para finalizar las órdenes
  const finalizeOrder = async (orderId: number) => {
    //Configuramos la hora
    const currentDate = new Date();
    const formattedFinalDate = currentDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
  
    try {
      // Actualiza la orden con la nueva propiedad dateFinal en el estado local
      setOrders(prevOrders => prevOrders.map(prevOrder =>
        prevOrder.id === orderId ? { ...prevOrder, status: 'Por entregar', dateFinal: formattedFinalDate } : prevOrder
      ));
  
      // Actualiza la orden en la base de datos
      await updateOrder(orderId, 'Por entregar', formattedFinalDate);
      //Actualiza el estado de las órdenes pendientes
      setPendingOrders(pendingOrders.filter((order: Orders) => order.id !== orderId));
      
    } catch (error) {
      console.error("Error al actualizar el estado de la orden", error);
    }
  };

  //Con el hook llamamos a la función getAllOrders
  useEffect(() => {
    if (token) {
      getAllOrders(token);
    }
  }, [token]);

  //Creamos una función para convertir la hora
  function convertToValidDate(time: string): Date {
    const currentDate = new Date();
    const combinedDateTimeString = currentDate.toDateString() + ' ' + time;
    return new Date(combinedDateTimeString);
}
//Calculamos la diferencia entre la hora en que fué creado el pedido y la hora en que se finalizó
  function calculateTime(startDateTime: string, endDateTime: string): string {
    const dateEntry = convertToValidDate(startDateTime);
    const dateFinal = convertToValidDate(endDateTime);

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
                  //Al hacer click cambia el estado de las ordenes con el status Por entregar, además llama a la función finalizeOrder y deshabilita el botón
                  onClick={() => {
                   
                    setOrders(prevOrders => prevOrders.map(prevOrder =>
                      prevOrder.id === order.id ? { ...prevOrder, status: 'Por entregar' } : prevOrder
                    ));

                    finalizeOrder(order.id);
                  }}
                  disabled={order.status === 'Por entregar'}
                >
                  Finalizar
                </button>
                
                {order.status === 'Por entregar' && (
                  <p className="total-time"> Tiempo: {calculateTime(order.dateEntry, order.dateFinal)}</p>
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