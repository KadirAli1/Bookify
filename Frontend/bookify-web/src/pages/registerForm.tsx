import { useState } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { IRegisterUser } from "../interfaces";
import api from "../api";

export function RegisterForm() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswod] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = () => {
    let body: IRegisterUser = {
      email,
      name,
      surname: lastName,
      password,
    };

    api
      .createUser(body)
      .then((response) => {
        toast({
          title: "Account created successfully",
          description: "",
          status: "success",
          position: "top",
          duration: 9000,
          isClosable: true,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        {
          toast({
            title: "Error logging in",
            description: "Incorrect username or password!",
            status: "error",
            position: "top",
            duration: 9000,
            isClosable: true,
          });
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="RegisterForm">
      <Center>
        <Box width="400px">
          <form action="">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                value={name}
                placeholder="enter your name"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Surname</FormLabel>
              <Input
                type="text"
                value={lastName}
                placeholder="enter your surname"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <FormControl>
                <FormLabel>City</FormLabel>
                <Input
                  type="text"
                  value={city}
                  placeholder="enter your city"
                  onChange={(e) => {
                    setCity(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Phone number</FormLabel>
                <Input
                  type="text"
                  value={phone}
                  placeholder="enter your phone number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </FormControl>
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                placeholder="enter your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                // type={show ? "text" : "password"}
                placeholder="enter your password"
                onChange={(e) => {
                  setPasswod(e.target.value);
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Confirm Password </FormLabel>
              <Input
                type="password"
                placeholder="confirm password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </FormControl>

            <Button
              mt={5}
              mb={20}
              width="full"
              onClick={handleRegister}
              isLoading={isLoading}
              loadingText="registering..."
              colorScheme="teal"
              variant="outline"
              disabled={
                !(
                  email.length > 0 &&
                  name.length > 0 &&
                  lastName.length > 0 &&
                  password.length > 6 &&
                  password == confirmPassword
                )
              }
            >
              Register
            </Button>
          </form>
        </Box>
      </Center>
    </div>
  );
}
