import { lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from '../Layout/MainLayout/MainLayout';
import PublicLayout from '../Layout/PublicLayout/PublicLayout';
import { Routing } from './Routing';

const Login = lazy(() => import("../Pages/Account/Login"));
const Transaction = lazy(() => import("../Pages/Transaction/Transaction"));
const Register = lazy(() => import("../Pages/Account/Register"));

const routesConfig = [
  { path: "/", element: <Navigate to={Routing.Login} /> },
  { path: Routing.Login, element: <PublicLayout><Login /></PublicLayout> },
  { path: Routing.Transaction, element: <MainLayout><Transaction/></MainLayout> },
  {path:Routing.Register, element:  <MainLayout><Register/></MainLayout> }
];

const routes = createBrowserRouter(routesConfig);

const AppRouting = () => {
  return <RouterProvider router={routes} />;
}

export default AppRouting