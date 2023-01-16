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
import { User, UserList } from "../interfaces/User";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const usersMachine = createMachine<UserList | any>({
  id: "usersMachineId",
  initial: "idle",
  states: {
    idle: {
      on: { FETCH: "loading" },
    },
    loading: {
      on: {
        FETCH_SUCCESS: {
          target: "success",
          actions: assign((context: any, event) => {
            return { data: event.data };
          }),
        },
        FETCH_ERROR: "error",
      },
    },
    success: {},
    error: {},
  },
});

export default function Home() {
  const [current, send] = useMachine(usersMachine);

  useEffect(() => {
    if (current.value === "idle") {
      send("FETCH");
      axios
        .get("http://localhost:5000/users")
        .then((response) => {
          send("FETCH_SUCCESS", { data: response.data });
        })
        .catch((error) => {
          send("FETCH_ERROR", { error });
        });
    }
  }, [current.value]);

  return (
    <Box>
      <Heading m={5}>Users</Heading>
      <Stack m={5}>
        {current.value === "idle" ||
          (current.value === "loading" && (
            <Flex minH="100vh" justify="center" align="center">
              <Spinner color="green" size="xl" />
            </Flex>
          ))}
        {current.value === "success" &&
          current?.context?.data?.users?.map((item: User) => {
            return (
              <Link key={item.id} to={`/users/${item.id}`}>
                <Card _hover={{ bgColor: "#ecf7f9" }} p={5} size="lg">
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
