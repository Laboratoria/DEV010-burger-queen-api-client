import { Link } from "react-router-dom";
import Header from "../Header/Header";
import newOrder from "../../assets/newOrder.png"
import allOrders from "../../assets/allOrders.png"

const WaiterHome = () => {
  return (
    <section className="waiter-home">
      <Header />
      <main className="waiterHomeSection">
          <Link to={"/waiter/newOrder"}>
            <button className="waiterHomeButton">
              <img src= {newOrder} alt="Nuevo pedido" className="waiterHomeImg"/>
              Trabajadores</button>
          </Link>
          <Link to={"/waiter/orderList"}>
            <button className="waiterHomeButton">
            <img src= {allOrders} alt="Ordenes" className="waiterHomeImg"/>
              Productos</button>
          </Link>
      </main>
    </section>
  );
};

export default WaiterHome;