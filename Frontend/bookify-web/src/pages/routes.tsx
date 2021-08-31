import { Dashboard } from "./dashboard";
import * as React from "react";
import { SessionContext } from "../services/firebase/userSession";
import { LoginForm } from "./loginForm";
import { RegisterForm } from "./registerForm";
import { Route, Switch } from "react-router-dom";
import Header from "./header";
import { rootCertificates } from "tls";
import UploadForm from "./uploadForm";
import HeaderDashboard from "./header-dashboard";
import Books from "./books";
import UpdateUserForm from "./settings";
import MyBooks from "./myBooks";
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
                  <Switch>
                    <Route path="/uploadFile">
                      <UploadForm />
                    </Route>
                    <Route path="/register">
                      <RegisterForm />
                    </Route>
                    <Route path="/settings">
                      <UpdateUserForm />
                    </Route>
                    <Route path="/myBooks">
                      <MyBooks />
                    </Route>

                    <Route path="/Login">
                      <LoginForm />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/">
                      <Books />
                    </Route>
                  </Switch>
                </>
              ) : (
                <>
                  <Header />
                  <Switch>
                    <Route path="/register">
                      <RegisterForm />
                    </Route>
                    <Route path="/Login">
                      <LoginForm />
                    </Route>
                    <Route path="/dashboard">
                      <Dashboard />
                    </Route>
                    <Route path="/">
                      <Books />
                    </Route>
                    {/* <Route path="/uploadForm">
                    <UploadForm />
                  </Route> */}
                  </Switch>
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
