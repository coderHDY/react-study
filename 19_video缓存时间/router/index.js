import Home from "../components/Home"
import About from "../components/About"
import { Navigate } from "react-router-dom";
import Err from "../components/Err";
const routerMap = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/about",
        element: <About />,
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
