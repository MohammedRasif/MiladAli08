import { Navigate } from "react-router-dom";

const SetNewPasswordRoute = ({ children }) => {
    const isVerified = localStorage.getItem("access_token");

    if (!isVerified) {
        return <Navigate to="/verification" replace />;
    }

    return children;
};

export default SetNewPasswordRoute;