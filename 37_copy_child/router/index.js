import Home from "../components/Home"
import Err from "../components/Err";
import { Navigate } from "react-router-dom";
import Nav from "../components/Nav";
import ChildTest from "../components/ChildTest";

const routerMap = [
    {
        path: "/home",
        element: <Home />,
    },
    {
        path: "/nav",
        element: <Nav useDragHandle />,
    },
    {
        path: "/childTest",
        element: <ChildTest />,
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
