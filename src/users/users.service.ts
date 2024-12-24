import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  findAll() {
    return this.db.user.findMany();
  }
  constructor(private readonly db: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password == createUserDto.username) {
      throw new BadRequestException({
        cause: new Error(),
        description: 'A felhasználó és a jelszó nem lehet ugyanaz!'
      })
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    try {

      return await this.db.user.create({
        data: {
          userName: createUserDto.username,
          password: hashedPassword,
          roles: {
            connect: {
              name: 'User'
            }
          }
        },
        select: {
          id: true,
          userName: true,
          password: false
        }
      });
    } catch (error: any) {
      if (error.code === "P2002") {
        throw new BadRequestException('A felhasználó már regisztrálva van!')
      }
      throw new Error;
    }
  }


  async findOneByName(username: string) {
    return await this.db.user.findUnique({
      where: {
        userName: username
      },
    })
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.db.user.update({
      where: {
        id: id
      },
      data: {
        ...updateUserDto
      }
    });
  }

  remove(id: number) {
    return this.db.user.delete({ where: { id: id } });
  }
}
