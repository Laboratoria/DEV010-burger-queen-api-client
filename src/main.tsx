import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import '../src/components/Login/login.css'
import '../src/components/Waiter/NewOrder.css'
import '../src/components/Chef/ChefOrders.css'
import '../src/components/Waiter/OrderList.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
