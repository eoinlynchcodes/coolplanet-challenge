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
import { User } from '../interfaces/User';

export default function IndividualUser() {
  const { id: userId } = useParams();
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | null>();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError(error.response.data);
        }
      });
  }, [userId]);

  return (
    <Box>
      <Box m={10}>
        {error && (
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
              {error}
            </Text>
          </Flex>
        )}
        {!user && !error && (
          <Flex minH="100vh" justify="center" align="center">
            <Spinner color="green" size="xl" />
          </Flex>
        )}

        {user && (
          <Box bgColor="#ecf7f9" borderRadius="12px" boxShadow="base" p={5}>
            <Flex flexDirection="column" align="center">
              {user?.avatar && (
                <Avatar
                  bgColor="white"
                  size="2xl"
                  border="2px solid black"
                  src={user.avatar}
                />
              )}
              <Heading>
                {user.first_name} {user.last_name}(ID: {user.id})
              </Heading>
              <Text my={2}>{user.email}</Text>
              {user.emailVerified ? (
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
                  <Text my={2}>{user.dob}</Text>
                </Box>
                
                <Divider my={4} />

                <Box my={2}>
                  <Heading size="md">Skills:</Heading>
                  <List my={2} spacing={2}>
                    {user?.skills?.map((item, key) => {
                      return (
                        <ListItem key={key}>
                          <ListIcon as={MdCheckCircle} color="green.500" />
                          {item}
                        </ListItem>
                      );
                    })}
                  </List>
                </Box>
              </Box>

              <Box>
                <Box>
                  <Heading size="md">Company name:</Heading>
                  <Text my={2}>{user?.company?.name}</Text>
                </Box>
                <Divider my={4} />
                <Box>
                  <Heading size="md">Department:</Heading>
                  <Text my={2}>{user?.company?.department}</Text>
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
