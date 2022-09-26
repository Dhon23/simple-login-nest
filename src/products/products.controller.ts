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
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiBearerAuth('access_token')
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      await this.productsService.create(createProductDto);
      return { message: 'Product created' };
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Get()
  @ApiBearerAuth('access_token')
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':_id')
  @ApiBearerAuth('access_token')
  findOne(@Param('_id') _id: string) {
    return this.productsService.findOne({ _id });
  }

  @Patch(':_id')
  @ApiBearerAuth('access_token')
  update(
    @Param('_id') _id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    this.productsService.update({ _id }, updateProductDto);
    return { message: 'Product updated' };
  }

  @Delete(':_id')
  @ApiBearerAuth('access_token')
  remove(@Param('_id') _id: string) {
    return this.productsService.remove({ _id });
  }
}
