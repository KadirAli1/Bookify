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
import { useContext, useState } from "react";
import api from "../api";
import { IUpdateUser } from "../interfaces";
import { SessionContext } from "../services/firebase/userSession";

function UpdateUserForm() {
  const { user, initializing } = useContext(SessionContext);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [city, setCity] = useState("");
  const [isLoading] = useState(false);
  const toast = useToast();

  const handleUpdateUser = () => {
    if (user) {
      const body: IUpdateUser = {
        name,
        surname,
        city,
      };
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

    // console.log(body);
  };

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
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              mb={3}
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
              }}
            />

            <Input
              mb={3}
              type="text"
              placeholder="Title"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />

            <Button
              width="full"
              colorScheme="teal"
              onClick={handleUpdateUser}
              isLoading={isLoading}
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
