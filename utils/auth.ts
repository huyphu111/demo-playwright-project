import { Account } from "@models/account.model";


export function getNormalUserAuth(): Account {
    const env = process.env.TEST_ENV;
    return {
        username: process.env[`USERNAME_${env.toUpperCase()}`],
        password: process.env[`PASSWORD_${env.toUpperCase()}`],
    }
}