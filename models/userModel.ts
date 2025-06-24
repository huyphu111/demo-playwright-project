export interface IUser {
    id?: string | null;
    username: string;
    email: string;
    password?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export class User implements IUser {
    id: string | null;
    username: string;
    email: string;
    password: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;

    constructor(data: IUser) {
        this.id = data.id ?? null;
        this.username = data.username;
        this.email = data.email;
        this.password = data.password ?? null;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
    }
}