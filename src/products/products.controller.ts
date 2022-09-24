import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { errorHandler } from 'src/middlewares/errorHandler';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      await this.productsService.create(createProductDto);
      return { message: 'Product created' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':_id')
  findOne(@Param('_id') _id: string) {
    return this.productsService.findOne({ _id });
  }

  @Patch(':_id')
  update(
    @Param('_id') _id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.productsService.update({ _id }, updateProductDto);
    return { message: 'Product updated' };
  }

  @Delete(':_id')
  remove(@Param('_id') _id: string) {
    return this.productsService.remove({ _id });
  }
}
