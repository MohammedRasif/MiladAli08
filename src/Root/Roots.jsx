import { Outlet } from "react-router-dom";
import Navbar from "../component/Navbar/Navbar";
import Header from "../component/Shared/Header";

const Roots = () => {
    return (      
        <div>
            <Navbar />
            
            <Outlet />  
        </div>
    );
};

export default Roots;
