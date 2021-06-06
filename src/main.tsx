import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Snake from './GreedySnake/GreedySnake'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';


ReactDOM.render(
  <React.StrictMode>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Snake></Snake>
  </React.StrictMode>,
  document.getElementById('root')
)
