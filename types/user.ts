export interface User {
    userId: string;
    fullName: string;
    email: string;
    age: string;
    role?: "ADMIN" | "USER",
    password: string;
    profession: string;
    bgColor?: string
}


export interface AddUser {
    fullName: string;
    email: string;
    age: string;
    role?: "ADMIN" | "USER",
    password: string
    profession: string
    bgColor: string
}
