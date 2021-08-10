import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { firebaseAPI } from "../services/firebase/firebaseAPI";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

enum MODE {
  LOGIN,
  FORGOT,
}

export function LoginForm() {
  const toast = useToast();
  const [mode, setMode] = React.useState<MODE>(MODE.LOGIN);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [show, setShow] = React.useState(false);
  const [rememberMe, setRememberMe] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  const handleClick = () => setShow(!show);

  const handleLogin = () => {
    setIsLoading(true);
    firebaseAPI.signInWithEmailAndPassword(
      email,
      password,
      rememberMe,
      () => {},
      (error) => {
        toast({
          title: "Error logging in",
          description: "Incorrect username or password!",
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
      }
    );
  };

  const handleSendResetPasswordLink = () => {
    firebaseAPI.sendPasswordResetEmail(
      email,
      () => {
        toast({
          title: "Reset Password.",
          description: "A password reset link has been sent to your mail!",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      },
      () => {
        toast({
          title: "Reset Password",
          description:
            "An error occurred while sending a mail with the password reset link!",
          status: "error",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
      }
    );
  };
  return (
    <>
      {mode == MODE.LOGIN && (
        <Stack spacing={3}>
          <Input
            value={email}
            placeholder="e-mail"
            size="md"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="password"
              onChange={(e: any) => {
                setPassword(e.target.value);
              }}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : <p>Show</p>}
              </Button>
            </InputRightElement>
          </InputGroup>
          {/* <Checkbox
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
            size="sm"
          >
            <p>"Remember.7</p>
          </Checkbox> */}

          <Button
            onClick={handleLogin}
            isLoading={isLoading}
            loadingText="Logging in..."
            colorScheme="teal"
            variant="outline"
          >
            <p>Login</p>
          </Button>
          <Button
            onClick={() => {
              setMode(MODE.FORGOT);
            }}
            colorScheme="teal"
            variant="link"
          >
            <p>Forgot password.10</p>
          </Button>
          <Text>
            <p>Not a member</p>
            <Link to="/register">Signup now</Link>
          </Text>
        </Stack>
      )}

      {mode == MODE.FORGOT && (
        <Stack spacing={3}>
          <Input
            value={email}
            placeholder="e-mail"
            size="md"
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
          <Button
            onClick={handleSendResetPasswordLink}
            isLoading={isLoading}
            loadingText="Sending reset password link..."
            colorScheme="teal"
            variant="outline"
            disabled={email.length == 0}
          >
            <p>Reset Password</p>
          </Button>
        </Stack>
      )}
    </>
  );
}
