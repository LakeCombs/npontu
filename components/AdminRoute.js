import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import AuthContext from "./AdminRoute";

const AuthContext = ({ Component: propComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(RouteProps) => {
        return currentUser ? (
          <PropsComponent {...RouteProps} />
        ) : (
          <Redirect to="/homePage" />
        );
      }}
    />
  );
};

export default AuthContext;
