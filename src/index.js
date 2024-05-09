import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './routes/RootLayout';
import Login, {action as LoginAction} from './routes/Login';
import Register from './routes/Register';
import Home, {loader as coursesLoader} from './routes/Home';



const router = createBrowserRouter([
  {path:'/', element: <RootLayout />, children: [
    {
      path:'/login',
      element: <Login />, 
      action: LoginAction
    },
    {
      path:'/register',
      element: <Register />, 
    },
    {
      path: '/home',
      element: <Home />, 
      // loader: coursesLoader
    }
  ]}
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
