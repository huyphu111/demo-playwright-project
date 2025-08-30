export interface Account {
    username: string;
    email?: string;
    password: string;
    role?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const normalUser: Account = {
    username: "huyphu111@gmail.com",
    email: "huyphu111@gmail.com",
    password: "RealestPa$word69"
};

export const invalidUser: Account = {
    username: "user",
    password: "password"
};

export const accounts : { [key: string]: Account } = {
    normalUser,
    invalidUser
};