import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'; // Import Swagger decorators
import { MESSAGES } from 'src/constants';
import { SuccessResponse } from 'src/helpers/response.helper';
import { IProduct } from './product.interface';
import { IResponseData } from 'src/interfaces/response.interface';
import { ResponseDto } from 'src/dto/response.dto';
import {
  CreateProductDto,
  ProductIdDto,
  UpdateProductDto,
} from './product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth('jwt')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(private readonly service: ProductService) {}

  // Create a new product
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' }) // Add an API operation summary
  @ApiBody({ type: CreateProductDto }) // Specify the request body DTO
  async create(
    @Body() body: CreateProductDto,
  ): Promise<IResponseData<IProduct>> {
    const data = await this.service.create(body);

    if (!data) throw new InternalServerErrorException();

    return SuccessResponse(data);
  }

  // Update an existing product
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiBody({ type: UpdateProductDto }) // Specify the request body DTO
  async update(
    @Param() param: ProductIdDto,
    @Body() body: UpdateProductDto,
  ): Promise<IResponseData<IProduct>> {
    const { id } = param;

    const data = await this.service.update({ _id: id }, body);

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.UPDATED);
  }

  // Soft delete a product
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product' })
  async delete(@Param() param: ProductIdDto): Promise<IResponseData<IProduct>> {
    const { id } = param;

    const data = await this.service.softDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }

  // Hard delete a product (for admins only)
  @Delete(':id/hard')
  @ApiOperation({ summary: 'Hard delete a product (for admins only)' })
  async hardDelete(
    @Param() param: ProductIdDto,
  ): Promise<IResponseData<IProduct>> {
    const { id } = param;

    const data = await this.service.hardDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }
}
