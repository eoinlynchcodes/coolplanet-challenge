import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Flex align="center" justify="center" h="80vh">
      <Button bgColor="black" color="white">
        <Link to="/users">Go to Users</Link>
      </Button>
    </Flex>
  );
}
