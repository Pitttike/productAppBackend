import { Controller, Get, Post, Body, UseGuards, Request, Patch, Param, Delete, Req } from '@nestjs/common';
import { CartentryService } from './cartentry.service';
import { cartEntryDto } from './dto/createCartEntry.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('cartentry')
export class CartentryController {
  constructor(private readonly cartentryService: CartentryService) { }
  
  @UseGuards(AuthGuard)
  @Get('')
  getCart(@Request() req) {
    return this.cartentryService.getCart(+req.user.id);
  }

  @UseGuards(AuthGuard)
  @Post('')
  createCartEntry(@Body() EntryData: cartEntryDto, @Request() req) {
    return this.cartentryService.createCartEntry(EntryData, +req.user.id);
  }

  @UseGuards(AuthGuard)
  @Patch(':productId')
  updateQuantity(@Request() req, @Param('productId') productId: string, @Body('quantityChange') quantityChange: number) {
    return this.cartentryService.updateQuantity(+req.user.id, +productId, +quantityChange)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteEntry(@Request() req, @Param('id') productId: string) {
    return this.cartentryService.deleteEntry(+req.user.id, +productId);
  }

}
