import { IPost } from "../models/posts";
import { IUser } from "../models/users";

export interface IDashboard extends IPost {
  user: IUser;
  totalComment: number;
}
