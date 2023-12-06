import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import NewOrder from './components/Waiter/NewOrder';
import ChefOrders from './components/Chef/ChefOrders';
import OrderList from './components/Waiter/OrderList';

const ProtectedRoute = ({ element, allowedRoles }: any) => {
  const userRole = localStorage.getItem('userRole');

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
          element={<ProtectedRoute element={<NewOrder />} allowedRoles={['Mesero']} />}
        />
        <Route
          path="/chef/orders"
          element={<ProtectedRoute element={<ChefOrders />} allowedRoles={['Chef']} />}
        />
        <Route
          path="/waiter/OrderList"
          element={<ProtectedRoute element={<OrderList />} allowedRoles={['Mesero']} />}
        />
      </Routes>
    </Router>
  );
}

export default App;