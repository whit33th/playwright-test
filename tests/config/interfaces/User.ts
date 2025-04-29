import { ITest } from "./Test";

export interface IUser extends ITest {
  username: string;
  password: string;
  email: string;
  fullName: string;
}
