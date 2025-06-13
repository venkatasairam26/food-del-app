import Cookie from "js-cookie";
import { Redirect, Route } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/navbar";

const ProtuctedRoute = (props) => {
    
    const token = Cookie.get("jwt_token");
    if (token === undefined) {
        return <Redirect to="/login" />;
    }
    return <>
        <NavBar />
        <Route {...props} />
    </>;
}

export default ProtuctedRoute;