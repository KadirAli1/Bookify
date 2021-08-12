import { Dashboard } from "./dashboard";
import * as React from "react";
import { SessionContext } from "../services/firebase/userSession";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import { Route } from "react-router-dom";

const Routes = () => {
  const { initializing, user } = React.useContext(SessionContext);
  return (
    <>
      <div
        style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
      >
        {initializing ? (
          <>Loading...</>
        ) : (
          <>
            <div style={{ flex: 1 }}>
              {user ? (
                <>
                  {/* <Route path="/Login">
                    <LoginForm />
                  </Route> */}
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </>
              ) : (
                <>
                  <Route path="/register">
                    <RegisterForm />
                  </Route>
                  <Route path="/Login">
                    <LoginForm />
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Routes;
