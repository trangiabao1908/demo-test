import { createBrowserRouter } from "react-router-dom";

// import pages
import Home from "../pages/home";
import Checkout from "../pages/checkout-product";
const router = createBrowserRouter([
  {
    element: <Home />,
    path: "/",
  },
  {
    element: <Checkout />,
    path: "/checkout-product",
  },
]);

export default router;
