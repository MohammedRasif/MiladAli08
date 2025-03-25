import { Navigate } from "react-router-dom";

const VerificationRoute = ({ children }) => {
    const isVerified = localStorage.getItem("forgetEmail");

    if (!isVerified) {
        return <Navigate to="/forgetPassword" replace />;
    }

    return children;
};

export default VerificationRoute;