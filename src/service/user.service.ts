import { IUserOptions } from "../interface";

import { Provide } from "@midwayjs/decorator";

@Provide()
export class UserService {
  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: "mockedName",
      phone: "12345678901",
      email: "xxx.xxx@xxx.com",
    };
  }
}
