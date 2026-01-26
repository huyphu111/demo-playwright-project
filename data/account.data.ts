import { Account } from "@models/account.model";
import { getNormalUserAuth } from "@utils/auth" 

export const normalUser: Account = getNormalUserAuth();

export const invalidUser: Account = {
    username: "user",
    password: "password"
};
   
export const accounts : { [key: string]: Account } = {
    normalUser,
    invalidUser
};