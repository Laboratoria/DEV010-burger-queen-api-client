import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Menu from '../pages/Menu'

function App() {
  return (
    <Routes>

        <Route exact path="/" element={<Home/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/menu" element={<Menu/>}/>
   
    </Routes>
  );
}

export default App;
