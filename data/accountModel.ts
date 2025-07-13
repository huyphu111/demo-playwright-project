export interface Account {
    username: string;
    email?: string;
    password: string;
    role?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export type Accounts = Account[];