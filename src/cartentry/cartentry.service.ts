import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { cartEntryDto } from './dto/createCartEntry.dto';
import { updateCartEntry } from './dto/updateCartEntry.dto';

@Injectable()
export class CartentryService {
    constructor(private readonly db: PrismaService) { }

    async createCartEntry(cartEntryData: cartEntryDto, userId: number) {
        try {

            return await this.db.cartEntry.create({
                data: {
                    userId: userId,
                    productId: cartEntryData.productId
                }
            })
        } catch (error: any) {
            if (error.code === "P2002") {
                throw new BadRequestException("A termék már a kosárban van")
            }
        }
    }

    async getCart(userId: number) {
        return await this.db.cartEntry.findMany({
            where: {
                userId: userId
            },
            select: {
                product: true,
                quantity: true,
                productId: false,
                userId: false
            }
        })

    }
    async checkQuantity(updateDto: updateCartEntry) {
        try {

            if (updateDto.quantityChange == -1) {

                const cartentry = await this.db.cartEntry.findUnique({
                    where: {
                        userId_productId: {
                            userId: updateDto.userId,
                            productId: updateDto.productId
                        }
                    }
                })
                if (cartentry.quantity - 1 == 0) {
                    throw new Error("A mennyiség minimum 1, vagy törölje a terméket!")
                }
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }
    async updateQuantity(updateDto: updateCartEntry) {
        try {
            await this.checkQuantity(updateDto)

            return await this.db.cartEntry.update({
                where: {
                    userId_productId: {
                        userId: updateDto.userId,
                        productId: updateDto.productId
                    }
                },
                data: {
                    quantity: {
                        increment: updateDto.quantityChange
                    }
                }
            })
        } catch (err: any) {
            throw new Error(err.message)
        }
    }

    async deleteEntry(userId: number, productId: number) {
        return await this.db.cartEntry.delete({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: productId
                }
            }
        })
    }
}
