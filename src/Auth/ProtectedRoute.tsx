import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./authStore";

type Props = {
  children: React.ReactNode;
};


const ProtectedRoute = ({ children }: Props) => {
    
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
