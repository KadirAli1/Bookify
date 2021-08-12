import { IRegisterUser } from "../interfaces";
import http from "../services/axios/http";
import firebase from "firebase/app";
import "firebase/auth";

const apiPrefix = "/api";

export default {
  createUser: async (body: IRegisterUser) => {
    return http.post(apiPrefix + "/users", body);
  },
};
