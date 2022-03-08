import Home from "../components/Home"
import { C1 } from "../components/Home"
import { C2 } from "../components/Home"
import About from "../components/About"
import { Navigate } from "react-router-dom";
const routerMap = [
    {
        path: "/home",
        element: <Home />,
        children: [
            {
                path: 'c1',
                element: <C1 />
            },
            {
                path: 'c2',
                element: <C2 />
            },
        ]
    },
    {
        path: "/about",
        element: <About />,
    },
    {
        path: "/",
        element: <Navigate to="/home" />,
    },
]

export default routerMap;
