import Home from "../components/Home"
import Err from "../components/Err";
import { Navigate } from "react-router-dom";

const routerMap = [
    {
        path: "/home",
        element: <Home />,
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
