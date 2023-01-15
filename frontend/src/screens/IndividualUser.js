import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Box,
  Text,
  Flex,
  Spinner,
  UnorderedList,
  ListItem,
  Image,
} from "@chakra-ui/react";

export default function IndividualUser() {
  const { id: userId } = useParams();
  const [user, setUser] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/${userId}`)
      .then((response) => {
        console.log("response.data; ", response);
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setError(error.response.data);
        }
      });
  }, []);

  return (
    <Box>
      <Link m={10} p={10} to="/">
        Go back?
      </Link>
      <Box m={10}>
        {error && <Text>{error}</Text>}
        {!user && !error && (
          <Flex minH="100vh" justify="center" align="center">
            <Spinner color="green" size="xl" />
          </Flex>
        )}

        {user && (
          <Box borderRadius="12px" boxShadow="base" p={5}>
            <Box align="center">
              {user.avatar && (
                <Image border="2px solid black" src={user.avatar} />
              )}
              <Text>
                {user.first_name} {user.last_name}(ID: {user.id})
              </Text>
            </Box>
            <Text>DOB{user.dob}</Text>
            <Text>email{user.email}</Text>
            <Text>Skills:</Text>
            <UnorderedList>
              {user.skills.map((item, key) => {
                return <ListItem>{item}</ListItem>;
              })}
            </UnorderedList>
            <Text>Company details:</Text>
            <Text>DEPT: {user.company.department}</Text>
            <Text>Name: {user.company.name}</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
}
