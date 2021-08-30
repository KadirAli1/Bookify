import {
  textDecoration,
  Input,
  Stack,
  InputLeftElement,
  InputGroup,
  Center,
  Button,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import api from "../api";
import { IUploadFile } from "../interfaces";

function UploadForm() {
  const [title, setTitle] = useState("");
  const [yop, setYop] = useState(""); // yop Year of publish
  const [author, setAuthor] = useState("");
  //   const [uploadFile, setUploadFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [fileSelected, setFileSelected] = useState<File>();

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    setFileSelected(fileList[0]);
  };

  //   const uploadFile = function (
  //     e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  //   ) {
  //     if (fileSelected) {
  //       const formData = new FormData();
  //       formData.append("image", fileSelected, fileSelected.name);
  //     }
  //   };
  const handleModalResetState = () => {
    setTitle("");
    setYop("");
    setAuthor("");
    // setUploadFile();
  };

  const handleUploadFile = () => {
    let body: IUploadFile = {
      title,
      yop,
      author,
      fileSelected,
    };
    // console.log(body);
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
        handleModalResetState();
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
        handleModalResetState();
      });
  };

  return (
    <>
      <Center marginTop={4}>
        <Stack spacing={2} m={3} textAlign="center">
          <Heading text-align="center" fontSize={"4xl"}>
            Upload File!
          </Heading>
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
          <Input
            type="file"
            // value={uploadFile}
            onChange={handleImageChange}
          ></Input>
          <Button
            colorScheme="green"
            onClick={handleUploadFile}
            isLoading={isLoading}
            _hover={{
              bgGradient: "linear(to-r, green.400,blue.400)",
              boxShadow: "xl",
            }}
          >
            Save
          </Button>
        </Stack>
      </Center>
    </>
  );
}
export default UploadForm;
