import { Spinner } from "@chakra-ui/spinner";
import { Button } from "@chakra-ui/button";
import { useClipboard } from "@chakra-ui/hooks";
import { Box, Grid, Link, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import { firebaseAPI } from "../services/firebase/firebaseAPI";
import { SessionContext } from "../services/firebase/userSession";
import { LoginForm } from "./loginForm";
//import { useTranslation } from "react-i18next";

export const Dashboard = () => {
  const { initializing, user } = React.useContext(SessionContext);
  const [jwtToken, setJwtToken] = React.useState<string>("");
  const { hasCopied, onCopy } = useClipboard(jwtToken);
  //   const { t } = useTranslation();

  React.useEffect(() => {
    user?.getIdToken().then((jwtToken) => {
      setJwtToken(jwtToken);
    });
  }, [user]);

  const handleSendEmailVerification = () => {
    user?.sendEmailVerification();
  };

  return (
    <div className="Dashboard">
      <Box textAlign="center" fontSize="xl">
        <Grid p={3}>
          <VStack spacing={8}>
            {initializing === true ? (
              <Spinner />
            ) : (
              <>
                {user && (
                  <>
                    {user.emailVerified == false && (
                      <>
                        <Text fontSize="sm" color="red.300">
                          You have not yet verified your account. Click{" "}
                          <Link
                            fontWeight="bold"
                            color="red.600"
                            onClick={handleSendEmailVerification}
                          >
                            here
                          </Link>{" "}
                          to send a new verification mail!
                        </Text>
                      </>
                    )}
                    {/* {t("Loggedinuser.28")}: {user.displayName} */}
                    {user.displayName}
                    <br />
                    <Button onClick={onCopy} ml={2}>
                      {hasCopied ? "Copied" : "Copy jwtToken"}
                    </Button>
                    <Button
                      onClick={() => {
                        firebaseAPI.signOut();
                      }}
                      colorScheme="teal"
                      variant="outline"
                    >
                      <p>Logout</p>
                    </Button>
                  </>
                )}
                {!user && <LoginForm />}
              </>
            )}
          </VStack>
        </Grid>
      </Box>
    </div>
  );
};
