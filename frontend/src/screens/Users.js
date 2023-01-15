import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Card, Stack, Flex, Spinner } from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";

export default function Home() {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }, []);


  return (
    <Box>
      <Heading m={5}>Users</Heading>
      <Stack m={5}>
        {users === null && (
          <Flex minH="100vh" justify="center" align="center">
            <Spinner color="green" size="xl"/>
          </Flex>
        )}
        {users?.length === 0 && <Text>Uh oh! There seems to be no users?</Text>}
        {users?.map((item, key) => {
          return (
            <Card _hover={{ bgColor: "#ecf7f9" }} key={item.id} p={5} size="lg">
              <Link to={`/user/${item.id}`}>
                <Flex alignItems="center" justifyContent="space-between">
                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                  <ArrowRightIcon />
                </Flex>
              </Link>
            </Card>
          );
        })}
      </Stack>
    </Box>
  );
}
