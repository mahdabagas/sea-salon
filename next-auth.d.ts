import { DefaultUser } from "next-auth";
declare module "next-auth" {
  interface Session {
    user?: DefaultUser & { id: any; role: any; name: any };
  }
  interface User extends DefaultUser {
    role: any;
  }
}
