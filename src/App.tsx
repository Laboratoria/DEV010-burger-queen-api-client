import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import NewOrder from "./components/Waiter/NewOrder";
import ChefOrders from "./components/Chef/ChefOrders";
import OrderList from "./components/Waiter/OrderList";
import WorkerList from "./components/Admin/Workers/WorkerList";
import AdminProducts from "./components/Admin/Products/AdminProducts";

// Ruta protegida. Verifica si el rol del usuario almacenado en localStorage,
// Está dentro de los permitidos para decidir que ruta tomar
const ProtectedRoute = ({ element, allowedRoles }: any) => {
  const userRole = localStorage.getItem("userRole");

  if (userRole && allowedRoles.includes(userRole)) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/waiter/newOrder"
          element={
            <ProtectedRoute element={<NewOrder />} allowedRoles={["Mesero"]} />
          }
        />
        <Route
          path="/chef/orders"
          element={
            <ProtectedRoute element={<ChefOrders />} allowedRoles={["Chef"]} />
          }
        />
        <Route
          path="/waiter/orderList"
          element={
            <ProtectedRoute element={<OrderList />} allowedRoles={["Mesero"]} />
          }
        />
        <Route
          path="/admin/workerList"
          element={
            <ProtectedRoute element={<WorkerList />} allowedRoles={["Admin"]} />
          }
        />
                <Route
          path="/admin/adminProducts"
          element={
            <ProtectedRoute element={<AdminProducts />} allowedRoles={["Admin"]} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
