import { BrowserRouter as Router } from "react-router-dom";
import { SessionProvider } from "./services/firebase/userSession";
import Routes from "./pages/routes";

export const App = () => {
  return (
    <>
      <Router>
        <SessionProvider>
          <Routes />
        </SessionProvider>
      </Router>
    </>
  );
};
