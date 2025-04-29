import { IUser } from "./interfaces/User";

export const USER_DATA: IUser[] = [
  {
    testName: "Registration with full data User",
    username: "InterviewUser",
    password: "InreviewUser",
    email: "inreviewuser@gmail.com",
    fullName: "Interview User",
    result: {
      message: `Public email are not allowed. Please, be aware that your domain or email address was banned. To find out the reason please contact support by filling the form.`,
    },
  },
  {
    testName: "Registration with empty data User",
    username: "",
    password: "",
    email: "",
    fullName: "",
    result: {
      message: `The username you entered is too short.The password you entered is too short.The password confirmation you entered is too short.The email address you entered is too short.`,
    },
  },
];
