import { useState } from "react";
import Header from "../Header/Header";
import { Orders } from "../../types/Types";
import React from "react";


const ChefOrders = () => {

  const [orders, ] = useState([]);



  return (
    <section className="chef-section">
      <Header />
      <section className="orders-section">
        <section className="orderCard-section">
          <table className="table">
            <caption className="order-table">Table</caption>
            <caption className="order-time">12:30</caption>
            <tbody>
              {orders.map((order: Orders, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <tr>
                      <td className="order-product">{order.products.name}</td>
                      <td className="order-product" >{order.dateEntry}</td>
                      <td>{order.status}</td>
  
                    </tr>
          
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>


          <button className="finalice-order">Finalizar</button>
        </section>

        <section className="orderCard-section">
          <table className="table">
            <caption className="order-table">Table</caption>
            <caption className="order-time">12:30</caption>
            <tbody>
              <tr>
                <td className="order-product">Name</td>
                <td className="order-product">Qty</td>
              </tr>
            </tbody>
          </table>


          <button className="finalice-order">Finalizar</button>
        </section>

        <section className="orderCard-section">
          <table className="table">
            <caption className="order-table">Table</caption>
            <caption className="order-time">12:30</caption>
            <tbody>
              <tr>
                <td className="order-product">Name</td>
                <td className="order-product">Qty</td>
              </tr>
            </tbody>
          </table>


          <button className="finalice-order">Finalizar</button>
        </section>

      </section>
    </section>


  )
}

export default ChefOrders;