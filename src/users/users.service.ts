import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly db: PrismaService) { }
  async create(createUserDto: CreateUserDto) {
    console.log(createUserDto)
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    
    return await this.db.user.create({
      data: {
        userName: createUserDto.username,
        password: hashedPassword
      },
      select: {
        id: true,
        userName: true,
        cartItems: true,
        password: false
      }
    });
  }
  
  findAll() {
    return this.db.user.findMany();
  }
  
  async findOneById(id: number) {
    return await this.db.user.findUnique({
      where: {
        id: id
      },
      include: {
        cartItems: true,
      }
    });
  }
  
  async findOneByName(username: string) {
    return await this.db.user.findUnique({
      where: {
        userName: username
      },
    })
  }
  async putItemToUserCart(userId: number, productId: number) {
    const product = await this.db.product.findFirst({
      where: {
        id: productId
      }
    });
    return await this.db.user.update({
      where: {
        id: userId
      },
      data: {
        cartItems: {
          connect: product
        }
      }

    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return this.db.user.delete({where: {id: id}});
  }

  async removeItemFromUserCart(id: number, productId: number) {
    const product = await this.db.product.findFirst({
      where: {
        id: productId
      }
    });
    return await this.db.user.update({
      where: {
        id: id
      },
      data: {
        cartItems: {
          disconnect: product
        }
      }
    });
  }
}
