import About from '../components/About';
import Home from '../components/Home';

const router = [
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
]

export default router;
