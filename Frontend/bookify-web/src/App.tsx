import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SessionProvider } from "./services/firebase/userSession";
import Routes from "./pages/routes";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./ui/theme";

export const App = () => {
  return (
    <>
      <Router>
        <SessionProvider>
          <ChakraProvider theme={theme}>
            <Routes />
          </ChakraProvider>
        </SessionProvider>
      </Router>
    </>
  );
};
