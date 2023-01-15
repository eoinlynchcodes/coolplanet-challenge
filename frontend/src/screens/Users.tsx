import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Card,
  Stack,
  Flex,
  Spinner,
} from "@chakra-ui/react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { UserList } from "../interfaces/User";

export default function Home() {
  const [users, setUsers] = useState<UserList>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    axios
      .get("http://localhost:5000/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        setError(error.response);
      });
  }, []);

  return (
    <Box>
      <Heading m={5}>Users</Heading>
      <Stack m={5}>
        {error && <Text>{error}</Text>}
        {users === undefined && (
          <Flex minH="100vh" justify="center" align="center">
            <Spinner color="green" size="xl" />
          </Flex>
        )}
        {users?.length === 0 && <Text>Uh oh! There seems to be no users?</Text>}
        {users?.map((item) => {
          return (
            <Link to={`/users/${item.id}`}>
              <Card
                _hover={{ bgColor: "#ecf7f9" }}
                key={item.id}
                p={5}
                size="lg"
              >
                <Flex alignItems="center" justifyContent="space-between">
                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                  <ArrowRightIcon />
                </Flex>
              </Card>
            </Link>
          );
        })}
      </Stack>
    </Box>
  );
}
