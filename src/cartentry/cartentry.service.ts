import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { cartEntryDto } from './dto/createCartEntry.dto';

@Injectable()
export class CartentryService {
    constructor(private readonly db: PrismaService) {}
    
    async createCartEntry(cartEntryData: cartEntryDto, userId: number) {
        return await this.db.cartEntry.create({
            data: {
                userId: userId,
                productId: cartEntryData.productId
            }
        })
    }

    async getCart(userId: number) {
        return await this.db.cartEntry.findMany({
            where: {
                userId: userId
            },
            include: {
                product:true,
            }
        })
    }

    async updateQuantity(userId: number, productId: number, quantityChange: number) {
        return await this.db.cartEntry.update({
            where: {
                userId_productId: {
                    userId: userId,
                    productId: productId
                }
            },
            data: {
                quantity: {
                    increment: quantityChange
                }
            }
        })
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
