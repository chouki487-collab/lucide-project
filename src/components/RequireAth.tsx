import { Navigate} from "react-router-dom";
import { useAuth } from "./Auth";

interface RequireAuthProps {
    children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
    const auth = useAuth();
    if (!auth.user) {
        return <Navigate to="/Login" />;
    }
    return <>{children}</>;
};

export default RequireAuth;