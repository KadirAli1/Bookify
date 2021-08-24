import {
  Button,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Box,
  Stack,
  Icon,
  IconButton,
  textDecoration,
} from "@chakra-ui/react";

import React, { Fragment } from "react";

import Media from "react-media";
import { Link as ReactRouterLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  return (
    <>
      <Media
        queries={{
          small: "(max-width: 768px)",
          medium: "(min-width: 769px)",
        }}
      >
        {(matches) => (
          <Fragment>
            {matches.small && (
              <Stack direction="column" width="fit-content">
                <Menu>
                  <MenuButton as={Button}>☰</MenuButton>
                  <MenuList>
                    <Link
                      as={ReactRouterLink}
                      to="/"
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>Home</MenuItem>
                    </Link>

                    <Link
                      as={ReactRouterLink}
                      to="/about"
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>About.29</MenuItem>{" "}
                    </Link>

                    <Link
                      as={ReactRouterLink}
                      to="/dashboard"
                      style={{ textDecoration: "none" }}
                    >
                      <MenuItem>Login</MenuItem>
                    </Link>
                    <Box paddingLeft="10px"></Box>
                    <MenuItem>
                      <React.Suspense
                        fallback={<>Loading ~~~</>}
                      ></React.Suspense>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Stack>
            )}

            {matches.medium && (
              <Stack
                direction="row"
                spacing="4px"
                padding="2.5"
                h="9vh"
                boxShadow="md"
                fontWeight="bold"
              >
                <Box p={2} as="h1">
                  <Link
                    as={ReactRouterLink}
                    to="/"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Box>

                {/* <Box p={2} as="h1">
                  <Link
                    p={2}
                    as={ReactRouterLink}
                    to="/about"
                    style={{ textDecoration: "none" }}
                  >
                    About
                  </Link>
                </Box> */}

                <Box
                  pb="4"
                  display="flex"
                  alignItems="center"
                  ml="auto !important"
                  spacing="5px"
                >
                  <React.Suspense fallback={<>Loading ~~~</>}></React.Suspense>
                  <Box></Box>
                  <Box p={2}>
                    <Link
                      as={ReactRouterLink}
                      style={{ textDecoration: "none" }}
                      to="/dashboard"
                    >
                      <IconButton
                        ml={30}
                        m={3}
                        isRound={true}
                        borderColor="grey.100"
                        aria-label="faUserAlt"
                        icon={<FaUserAlt />}
                      ></IconButton>
                      Login
                    </Link>
                  </Box>
                </Box>
              </Stack>
            )}
          </Fragment>
        )}
      </Media>
    </>
  );
}

export default Header;
