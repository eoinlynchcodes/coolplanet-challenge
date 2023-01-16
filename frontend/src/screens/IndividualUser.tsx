import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Spinner,
  List,
  ListItem,
  Avatar,
  Button,
  Heading,
  Divider,
  Badge,
  ListIcon,
} from "@chakra-ui/react";
import { ArrowBackIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { MdCheckCircle } from "react-icons/md";
import { User } from "../interfaces/User";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

const usersMachine = createMachine<User | any>({
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

export default function IndividualUser() {
  const { id: userId } = useParams<string>();
  const [current, send] = useMachine(usersMachine);

  useEffect(() => {
    if (current.value === "idle") {
      send("FETCH");
      axios
        .get(`http://localhost:5000/users/${userId}`)
        .then((response) => {
          send("FETCH_SUCCESS", { data: response.data });
        })
        .catch((error) => {
          if (error.response.status === 404) {
            send("FETCH_ERROR", { error });
          }
        });
    }
  }, [current.value]);

  return (
    <Box>
      <Box m={10}>
        {current.value === "error" && (
          <Flex
            flexDirection="column"
            border="2px solid red"
            p={40}
            borderRadius="12px"
            align="center"
            justify="center"
          >
            <WarningTwoIcon my={10} boxSize={20} color="red.500" />
            <Text my={10} as="b">
              {current?.event?.error.response?.data}
            </Text>
          </Flex>
        )}
        {current.value === "loading" && (
          <Flex minH="100vh" justify="center" align="center">
            <Spinner color="green" size="xl" />
          </Flex>
        )}

        {current.value === "success" && (
          <Box bgColor="#ecf7f9" borderRadius="12px" boxShadow="base" p={5}>
            <Flex flexDirection="column" align="center">
              {current.context?.data?.avatar && (
                <Avatar
                  bgColor="white"
                  size="2xl"
                  border="2px solid black"
                  src={current.context?.data.avatar}
                />
              )}
              <Heading>
                {current.context?.data.first_name}{" "}
                {current.context?.data.last_name}(ID: {current.context.data.id})
              </Heading>
              <Text my={2}>{current.context.data.email}</Text>
              {current.context.data.emailVerified ? (
                <Badge ml="1" fontSize="0.8em" colorScheme="green">
                  Verified Email
                </Badge>
              ) : (
                <Badge ml="1" fontSize="0.8em" colorScheme="red">
                  Unverified Email
                </Badge>
              )}
            </Flex>

            <Divider my={4} />

            <Flex my={10} justify="space-evenly" align="flex-start">
              <Box>
                <Box>
                  <Heading size="md">Date of Birth:</Heading>
                  <Text my={2}>{current.context.data.dob}</Text>
                </Box>

                <Divider my={4} />

                <Box my={2}>
                  <Heading size="md">Skills:</Heading>
                  <List my={2} spacing={2}>
                    {current.context?.data.skills?.map(
                      (item: string, key: number) => {
                        return (
                          <>
                            <ListItem key={key}>
                              <ListIcon as={MdCheckCircle} color="green.500" />
                              {item}
                            </ListItem>
                          </>
                        );
                      }
                    )}
                  </List>
                </Box>
              </Box>

              <Box>
                <Box>
                  <Heading size="md">Company name:</Heading>
                  <Text my={2}>{current.context?.data.company?.name}</Text>
                </Box>
                <Divider my={4} />
                <Box>
                  <Heading size="md">Department:</Heading>
                  <Text my={2}>
                    {current.context?.data.company?.department}
                  </Text>
                </Box>
              </Box>
            </Flex>
          </Box>
        )}
      </Box>
      <Button
        leftIcon={<ArrowBackIcon />}
        color="white"
        bgColor="black"
        mx={10}
        p={5}
      >
        <Link to="/users">Back to users</Link>
      </Button>
    </Box>
  );
}
