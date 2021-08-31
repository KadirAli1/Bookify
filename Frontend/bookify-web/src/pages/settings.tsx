import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  toast,
  useToast,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useContext, useState } from "react";
import api from "../api";
import { IUpdateUser } from "../interfaces";
import { SessionContext } from "../services/firebase/userSession";

function UpdateUserForm() {
  const { user, initializing } = useContext(SessionContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState<string | null>("");
  const [isLoading] = useState(false);
  const toast = useToast();

  const handleUpdateUser = () => {
    if (user) {
      const body: IUpdateUser = {
        name,
        surname,
        city,
      };
      console.log(body);
      api
        .updateUser(user?.uid, body)
        .then((response) => {
          user.updateProfile({ displayName: name });
          toast({
            title: "User data updated.",
            description: "Your user data is updated successfully.",
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) => {
          toast({
            title: "error updating user data!",
            description:
              "An error occurred while trying to update your user data!",
            status: "error",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };
  useEffect(() => {
    if (user) {
      if (user.displayName) setName(user.displayName);
      setEmail(user.email);

      api
        .getUserDetails(user.uid)
        .then((response) => {
          let { surname, city } = response.data;
          setSurname(surname);
          setCity(city);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div className="UpdateForm">
      <Center marginTop={3}>
        <Stack width="400px" spacing={2} mb={3}>
          <Heading textAlign="center" fontSize={"4xl"}>
            Update User!
          </Heading>
          <form action="">
            <Input
              mb={3}
              type="text"
              placeholder="Name"
              value={name ? name : ""}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              mb={3}
              type="text"
              placeholder="Surname"
              value={surname ? surname : ""}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />

            <Input
              mb={3}
              type="text"
              placeholder="Title"
              value={city ? city : ""}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
            <Input
              mb={3}
              disabled
              type="email"
              value={email ? email : ""}
              placeholder="enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Button
              width="full"
              colorScheme="teal"
              onClick={handleUpdateUser}
              isLoading={isLoading}
              disabled={!(name && name.length > 0)}
            >
              Update
            </Button>
          </form>
        </Stack>
      </Center>
    </div>
  );
}
export default UpdateUserForm;
