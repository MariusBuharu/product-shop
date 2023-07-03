import {createBrowserRouter, Navigate} from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Signup from "./views/Signup.jsx";
import SignIn from "./views/SignIn.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import Products from "./views/Products.jsx";
import ProductView from "./views/ProductView.jsx";
import Product from "./views/Product.jsx";
import Categories from "./views/Categories.jsx";
import Category from "./components/Category.jsx";

const router=createBrowserRouter([
    {
        path:"/",
        element:<DefaultLayout/>,
        children:[
            {
                path:'/dashboard',
                element: <Navigate to='/'/>
            },
            {
                path:'/',
                element: <Dashboard />
            },
            {
                path:'/products',
                element: <Products />
            },
            {
                path:'/products/create',
                element: <ProductView/>
            },
            {
                path: '/categories/:category_id/products/:product_id',
                element: <Product/>
            },
            {
                path:'/categories',
                element:<Categories />
            },
            {
                path: "/categories/:category_id/products",
                element: <Products />,
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:"/register",
                element: <Signup />
            } ,
            {
                path:"/login",
                element: <SignIn />
            }
        ]
    },


])
export default router;
