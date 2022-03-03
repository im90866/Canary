import React from "react";
import { Redirect, Route, Navigate} from "react-router-dom";

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const isAuthenticated = getCookie('username') != null
  console.log("this", isAuthenticated);
  

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        getCookie('username') != null ? <Component {...props} /> : <Navigate replace to="/login" />
      }
    />
  );
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

export default ProtectedRoute