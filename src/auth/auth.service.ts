import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService, private jwtService: JwtService, private readonly db: PrismaService) { }

    async signIn(username: string, pass: string): Promise<{ access_token: string }> {
        const user = await this.userService.findOneByName(username);
        if (!user) {
            throw new UnauthorizedException('Érvénytelen adatok!')
        }
        const isPasswordValid = await bcrypt.compare(pass, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Érvénytelen adatok!');
        }

        const payload = { id: user.id, username: user.userName };

        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }
}
