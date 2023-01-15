import React from "react";
import { ChakraProvider, Image, Flex } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from "./screens/Users";
import IndividualUser from "./screens/IndividualUser";
import coolplanetcircle from "./images/coolplanetcircle.svg";
import coolplanetlogo from "./images/coolplanetlogo.svg";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Flex bgColor="#ecf7f9" justify="center">
          <Image src={coolplanetcircle} m={2} />
          <Image src={coolplanetlogo} m={2} />
        </Flex>

        <Routes>
          <Route path="/" element={<Users />}></Route>
          <Route path="/user/:id" element={<IndividualUser />}></Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
