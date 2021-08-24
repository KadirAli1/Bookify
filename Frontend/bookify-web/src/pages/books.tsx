import { ChakraProvider, Container, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import api from "../api";
import { Card } from "../ui/compontents/cards";

function Books() {
  const [books, setBooks] = useState([]);

  const getDatafromBackEnd = async () => {
    const response = await api.getAllBooks();
    setBooks(response.data);
  };
  useEffect(() => {
    getDatafromBackEnd();
  }, []);
  return (
    <ChakraProvider>
      <Container maxW="80rem" centerContent pb="40">
        <SimpleGrid columns={[1, 3, 1, 3]}>
          {books.map((book: any, index: number) => (
            <Card key={index} book={book} disabled />
          ))}
        </SimpleGrid>
      </Container>
    </ChakraProvider>
  );
}
export default Books;
