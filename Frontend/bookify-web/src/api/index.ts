import { IRegisterUser, IUpdateUser, IUploadFile } from "../interfaces";
import http from "../services/axios/http";
import firebase from "firebase/app";
import "firebase/auth";

const apiPrefix = "/api";

export default {
  getAllBooks: async () => {
    return http.get(apiPrefix + "/books");
  },

  createUser: async (body: IRegisterUser) => {
    return http.post(apiPrefix + "/users", body);
  },
  updateUser: async (sub: string, body: IUpdateUser) => {
    return http.put(apiPrefix + `/users/${sub}`, body);
  },
  UploadFile: async (body: IUploadFile) => {
    // debugger;
    const data = new FormData();
    data.append("title", body.title);
    data.append("year_of_publish", body.yop);
    data.append("author", body.author);
    body.fileSelected &&
      data.append("file", body.fileSelected, body.fileSelected?.name);
    console.log(body);
    const jwtToken = await firebase.auth().currentUser?.getIdToken();
    return http.post(apiPrefix + "/books/file", data, {
      headers: { AUTHORIZATION: jwtToken },
    });
  },
};
