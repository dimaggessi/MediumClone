import { CurrentUserInterface } from "./currentUser.interface";

export interface CurrentUserRequestInterface {
  // all fields of currentUserInterface plus password
  user: CurrentUserInterface & {password: string}
}
