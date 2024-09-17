import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../utils/context";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/";
  const [isLoggedIn] = useContext(AppContext);

  if (!anonymous && !isLoggedIn) {
    // While redirecting to /login we set the location objects
    // state.from property to store the current location value.
    // This allows us to redirect them appropriately after they
    // log in.
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  return children;
}

export default ProtectedRoute;
