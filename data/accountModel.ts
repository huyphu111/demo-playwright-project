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

export interface Endpoint {
    name: string;
    path: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' ;
    description?: string;
    requiresAuth?: boolean;
}

export type Endpoints = Endpoint[];