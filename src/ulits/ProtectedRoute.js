import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, slug, ...rest }) => {
  const logged = useSelector((state) => state.userReducer.logged);
  return (
    <Route
      {...rest}
      render={(props) => (logged ? <Component {...props} slug={slug} /> : <Redirect to="/sign-in" />)}
    />
  );
};
export default ProtectedRoute;