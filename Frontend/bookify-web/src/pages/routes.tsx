import { Dashboard } from "./dashboard";
import * as React from "react";
import { SessionContext } from "../services/firebase/userSession";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import { Route } from "react-router-dom";
import Header from "./header";
import { rootCertificates } from "tls";
import UploadForm from "./uploadForm";
import HeaderDashboard from "./header-dashboard";

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
                  <HeaderDashboard />
                  <Route path="/uploadFile">
                    <UploadForm />
                  </Route>
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
              ) : (
                <>
                  <Header />
                  <Route path="/register">
                    <RegisterForm />
                  </Route>
                  <Route path="/Login">
                    <LoginForm />
                  </Route>
                  <Route path="/dashboard">
                    <Dashboard />
                  </Route>
                  {/* <Route path="/uploadForm">
                    <UploadForm />
                  </Route> */}
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
