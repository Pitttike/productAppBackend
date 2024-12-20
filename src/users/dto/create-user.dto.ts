import { IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";
export class CreateUserDto {
    @MinLength(6, {message: "A felhasználónév minimum 6 betű!"} )
    username: string;

    @IsStrongPassword({},{message: "A jelszó nem elég erős!"})
    password: string;

    

    
}
