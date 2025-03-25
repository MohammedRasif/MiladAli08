import { Navigate } from "react-router-dom";

const RegisterVerification = ({ children }) => {
    const isVerified = localStorage.getItem("userEmail");

    if (!isVerified) {
        return <Navigate to="/register" replace />;
    }

    return children;
};

export default RegisterVerification;