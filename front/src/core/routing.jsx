import {createBrowserRouter} from "react-router-dom";
import Function from "../ui/pages/Function.jsx"
import UserCard from "../ui/pages/UserCard.jsx";
import BidInfo from "../ui/pages/BidInfo.jsx";
import ProductsInfo from "../ui/pages/ProductsInfo.jsx"
import BlockchainState from "../ui/pages/BlockchainState.jsx";
import UserInfo from "../ui/pages/UserInfo.jsx";


const routes = [
    {
        path: "/",
        element: <UserInfo />,
    },
    {
        path: "/userCard",
        element: <UserCard />,
    },
    {
        path: "/state",
        element: <BlockchainState />,
    },
    {
        path: "/bids",
        element: <BidInfo />,
    },
    {
        path: "/products",
        element: <ProductsInfo />,
    },
    {
        path: "/func",
        element: <Function />,
    }
]
const routing = createBrowserRouter(routes);
export { routing };