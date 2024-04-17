import { IsNotEmpty, IsString} from "class-validator";

export class ChangeLoggedUserPasswordDto {
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;
    @IsNotEmpty()
    @IsString()
    currentPassword: string;
};

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    password: string;
    @IsNotEmpty()
    @IsString()
    passwordConfirm: string;
};