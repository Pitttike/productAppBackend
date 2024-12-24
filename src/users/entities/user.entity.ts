import { Role } from "src/auth/roles.enum";

export class User {
    id: number;
    userName: string;
    password: string;
    roles: Role[];
}
