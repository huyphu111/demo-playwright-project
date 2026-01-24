export interface Account {
    username: string;
    email?: string;
    password: string;
    role?: string;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

// Use environment variables for username, email and password
// What is the CI/CD friendly way? How to apply into CI/CD?