import {
  textDecoration,
  Input,
  Stack,
  InputLeftElement,
  InputGroup,
  Center,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../api";
import { IUploadFile } from "../interfaces";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [yop, setYop] = useState(""); // yop Year of publish
  const [author, setAuthor] = useState("");
  const [uploadFile, setUploadFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleUploadFile = () => {
    let body: IUploadFile = {
      title,
      yop,
      author,
    };
    api
      .UploadFile(body)
      .then((response) => {
        toast({
          title: "Entity account created successfully",
          description: "",
          status: "success",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        //   handleModalResetState();
        //   history.push("/myEntity");
      })
      .catch((error) => {
        console.log(error, "can't create entity");
        toast({
          title: " Error, Can't create entity",
          description: "",
          status: "error",
          position: "top",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        // handleModalResetState();
      });
  };

  return (
    <>
      <Center>
        <Stack spacing={2}>
          <h1>Upload a File!</h1>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <Input
            placeholder="Year of publish"
            value={yop}
            onChange={(e) => {
              setYop(e.target.value);
            }}
          />
          <Input
            placeholder="author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
            }}
          />
          <input
            type="file"
            value={uploadFile}
            onChange={(e) => {
              setUploadFile(e.target.value);
            }}
          ></input>
          <Button onClick={handleUploadFile} isLoading={isLoading}>
            Save
          </Button>
        </Stack>
      </Center>
    </>
  );
}
export default UploadForm;
