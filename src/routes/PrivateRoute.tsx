import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";

type Props = {
  Component: Function;
};

const PrivateRoute = ({ Component }: Props) => {
  const { authorization } = useContext(GlobalContext);
  useEffect(() => {}, [authorization]);

  return <>{authorization ? <Component /> : <Navigate to={"/login"} />}</>;
};

export default PrivateRoute;
