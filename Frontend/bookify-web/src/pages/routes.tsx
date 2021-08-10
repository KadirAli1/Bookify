import { Dashboard } from "./dashboard";
import * as React from "react";
import { SessionContext } from "../services/firebase/userSession";
import { LoginForm } from "./loginForm";

const Routes = () => {
  //   const { initializing, user } = React.useContext(SessionContext);
  return (
    <>
      <Dashboard />;
      <LoginForm />
    </>
  );
};
export default Routes;
