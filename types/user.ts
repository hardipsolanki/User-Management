export interface User {
    userId: string;
    fullName: string;
    email: string;
    age: number | null;
    role?: "ADMIN" | "USER",
    password: string;
    profession: string;
    bgColor: string
}


export interface AddUser {
    fullName: string;
    email: string;
    age: number | null;
    role?: "ADMIN" | "USER",
    password: string
    profession: string
    bgColor: string
}

export interface ChangePassword {
    userId: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
