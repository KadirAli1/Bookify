import {
  Stack,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Box,
  Avatar,
  Link,
} from "@chakra-ui/react";
import Media from "react-media";
import { Link as ReactRouterLink, useHistory } from "react-router-dom";
import { firebaseAPI } from "../services/firebase/firebaseAPI";
import React, { Fragment } from "react";
import { SessionContext } from "../services/firebase/userSession";
function HeaderDashboard() {
  const { user } = React.useContext(SessionContext);
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
              <Stack display="flex" flexDirection="row">
                <Stack>
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
                    </MenuList>
                  </Menu>
                </Stack>

                <Stack width="inherit">
                  <Menu>
                    <MenuButton
                      variant="outline"
                      cursor={"pointer"}
                      position="absolute"
                      top="0"
                      right="0"
                      // float="right"
                      // pl="4"
                      // mr="10px"
                    >
                      {user?.displayName}
                      <Avatar
                        ml="10px"
                        size={"sm"}
                        src={
                          "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        }
                        float="right"
                      />
                    </MenuButton>
                    <MenuList>
                      <Link
                        as={ReactRouterLink}
                        to="/uploadFile"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem fontWeight="bold">Upload FILE</MenuItem>
                      </Link>

                      <Link
                        as={ReactRouterLink}
                        to="/user-page"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem fontWeight="bold">Settings</MenuItem>
                      </Link>
                      <Link
                        as={ReactRouterLink}
                        to="/"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem
                          onClick={() => {
                            firebaseAPI.signOut();
                          }}
                          fontWeight="bold"
                        >
                          Logout
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </Stack>
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
                <Box paddingTop={4} as="h1">
                  <Link
                    as={ReactRouterLink}
                    to="/"
                    style={{ textDecoration: "none" }}
                  >
                    Home
                  </Link>
                </Box>
                <Box
                  pb="4"
                  display="flex"
                  alignItems="center"
                  ml="auto !important"
                  spacing="5px"
                >
                  {user?.displayName}
                  <Menu>
                    <MenuButton
                      variant="outline"
                      cursor={"pointer"}
                      src={"/"}
                      float="right"
                      pl="4"
                      mr="10px"
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                        }
                        float="right"
                      />
                    </MenuButton>
                    <MenuList>
                      <Link
                        as={ReactRouterLink}
                        to="/uploadFile"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem fontWeight="bold">Upload File</MenuItem>
                      </Link>
                      {/* <Link
                as={ReactRouterLink}
                to="/"
                style={{ textDecoration: "none" }}
              >
                <MenuItem fontWeight="bold">{t("Appointments.31")}</MenuItem>
              </Link> */}

                      <Link
                        as={ReactRouterLink}
                        to="/user-page"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem fontWeight="bold">Settings</MenuItem>
                      </Link>
                      <Link
                        as={ReactRouterLink}
                        to="/"
                        style={{ textDecoration: "none" }}
                      >
                        <MenuItem
                          onClick={() => {
                            firebaseAPI.signOut();
                          }}
                          fontWeight="bold"
                        >
                          Logout
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </Menu>
                </Box>
              </Stack>
            )}
          </Fragment>
        )}
      </Media>
    </>
  );
}
export default HeaderDashboard;
