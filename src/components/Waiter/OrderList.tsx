import { Link } from "react-router-dom";
import Header from "../Header/Header"
//import { getOrders } from "../../services/request";


const OrderList = () => {

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
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    )

}

export default OrderList;