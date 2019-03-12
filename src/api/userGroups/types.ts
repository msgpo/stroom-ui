import { User } from "../../types";

export type IsGroup = "User" | "Group" | "" | undefined;

export interface StoreState {
  allUsers: Array<User>;
  usersInGroup: {
    [s: string]: Array<User>;
  };
  groupsForUser: {
    [s: string]: Array<User>;
  };
}
