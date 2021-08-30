export type IRegisterUser = {
  email: string;
  name: string;
  surname: string;
  password: string;
};
export type IUploadFile = {
  title: string;
  yop: string;
  author: string;
  fileSelected: File | undefined;
};
export type IUpdateUser = {
  name: string;
  surname: string;
  city: string;
};
