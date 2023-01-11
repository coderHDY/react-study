import Home from "../components/Home"
import About from "../components/About"
import Detail from "../components/Detail";
import { Navigate } from "react-router-dom";
import Err from "../components/Err";
import KeepAlive from 'react-activation'

const routerMap = [
    {
        path: "/home",
        element: <KeepAlive cacheKey="Home" ><Home /></KeepAlive>,
    },
    {
        path: "/about",
        element: <KeepAlive cacheKey="About" ><About /></KeepAlive>,
    },
    {
        path: "/detail",
        element: <KeepAlive cacheKey="Detail" ><Detail /></KeepAlive>,
    },
    {
        path: "/",
        element: <Navigate to="/home" />,
    },
    {
        path: '*',
        element: <Err />
    }
]

export default routerMap;
