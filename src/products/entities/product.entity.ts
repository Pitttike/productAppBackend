import { User } from 'src/users/entities/user.entity'

export class Product {
    id: number;
    title: string;
    price: number;
    imgSrc: string;
    interestedShoppers: User[]
}
