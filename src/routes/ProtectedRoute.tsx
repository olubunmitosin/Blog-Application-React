import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router";
import { getCurrentUser } from "../services/auth.service";

export type ProtectedRouteProps = {
  authenticationPath: string;
  redirectPath: string;
  setRedirectPath: (path: string) => void;
  outlet: JSX.Element;
};

export default function ProtectedRoute({
  authenticationPath,
  redirectPath,
  setRedirectPath,
  outlet,
}: ProtectedRouteProps) {
  const currentLocation = useLocation();
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    if (!user) {
      setRedirectPath(currentLocation.pathname);
      setIsAuthenticated(false);
    }
  }, [setIsAuthenticated, user, setRedirectPath, currentLocation]);

  if (isAuthenticated) {
    return outlet;
  } else {
    return (
      <Navigate
        to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }}
      />
    );
  }
}
