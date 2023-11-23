import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import NewOrder from './components/Waiter/NewOrder';
import Orders from './components/Chef/ChefOrders';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/waiter/newOrder' element={<NewOrder />}/>
        <Route path='/chef/orders' element={<Orders />}/>
      </Routes>
    </Router>
  )
}

export default App
