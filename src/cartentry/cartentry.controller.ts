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
  createCartEntry(@Body() EntryData: cartEntryDto) {
    return this.cartentryService.createCartEntry(EntryData);
  }

  @UseGuards(AuthGuard)
  @Patch(':productId')
  updateQuantity(@Request() req, @Param('productId') productId: string, @Body() quantityChange: number) {
    return this.cartentryService.updateQuantity(+req.user.id, +productId, +quantityChange)
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deleteEntry(@Param('id') productId: string, @Request() req) {
    return this.cartentryService.deleteEntry(+productId, +req.user.id);
  }

}
