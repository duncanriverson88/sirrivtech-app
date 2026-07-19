import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(function () {
    const unsubscribe = onAuthStateChanged(auth, function (currentUser) {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  if (user === undefined) {
    return <p>Checking login status...</p>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default ProtectedRoute;