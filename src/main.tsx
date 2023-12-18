import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/components/Login/login.css";
import "../src/components/Waiter/takeOrder/NewOrder.css";
import "../src/components/Chef/ChefOrders.css";
import "../src/components/Waiter/orderList/OrderList.css";
import "../src/components/Header/Header.css";
import "../src/components/Admin/Workers/workerList.css";
import "../src/components/Admin/Products/adminProducts.css";
import "../src/components/Admin/adminHome.css";
import "../src/components/Waiter/waiterHome.css";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
