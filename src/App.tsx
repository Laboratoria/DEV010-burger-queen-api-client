import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login'
import NewOrder from './components/NewOrder/NewOrder';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/waiter/newOrder' element={<NewOrder />}/>
      </Routes>
    </Router>
  )
}

export default App
