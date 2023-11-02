import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
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
  FindProductDto,
  ProductIdDto,
  UpdateProductDto,
  GetAllProductsDto,
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
  async create(@Body() body: CreateProductDto): Promise<object> {
    const data = await this.service.create(body);

    if (!data) throw new InternalServerErrorException();

    return SuccessResponse(data);
  }

  // Get a list of all products with optional pagination
  @Get()
  @ApiOperation({
    summary: 'Get a list of all products with optional pagination',
  })
  async getAllDefault(): Promise<IResponseData<IProduct[]>> {
    const data = await this.service.getAll(0);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Find products based on search criteria
  @Get('search')
  @ApiOperation({ summary: 'Find products based on search criteria' })
  @ApiQuery({ type: FindProductDto }) // Define the query parameters
  async find(
    @Query() query: FindProductDto,
  ): Promise<IResponseData<IProduct[]>> {
    const data = await this.service.find(query);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Check if products exist based on search criteria
  @Get('exists')
  @ApiOperation({ summary: 'Check if products exist based on search criteria' })
  @ApiQuery({ type: FindProductDto }) // Define the query parameters
  async exists(@Query() query: FindProductDto): Promise<object> {
    const data = await this.service.exists(query);

    // If nothing exists, return 'false'
    if (!data) return SuccessResponse(false);

    return SuccessResponse(data);
  }

  // Get the count of products based on search criteria
  @Get('count')
  @ApiOperation({
    summary: 'Get the count of products based on search criteria',
  })
  @ApiQuery({ type: FindProductDto }) // Define the query parameters
  async getCount(@Query() query: FindProductDto): Promise<object> {
    const data = await this.service.getCount(query);

    // If nothing exists, return 0 as the count
    if (!data) return SuccessResponse(0);

    return SuccessResponse(data);
  }

  // Get a list of all products with optional pagination
  @Get(':pagination')
  @ApiOperation({
    summary: 'Get a list of all products with optional pagination',
  }) // Define the URL parameter
  async getAll(@Param() param: GetAllProductsDto): Promise<object> {
    let { pagination } = param;
    if (!pagination) pagination = 1;

    pagination = (pagination - 1) * 10;

    const data = await this.service.getAll(pagination);

    if (!data) throw new InternalServerErrorException();
    if (data.length === 0) throw new NotFoundException();

    return SuccessResponse(data);
  }

  // Update an existing product
  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing product' })
  @ApiBody({ type: UpdateProductDto }) // Specify the request body DTO
  async update(
    @Param() param: ProductIdDto,
    @Body() body: UpdateProductDto,
  ): Promise<object> {
    const { id } = param;

    const data = await this.service.update({ _id: id }, body);

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.UPDATED);
  }

  // Soft delete a product
  @Delete(':id')
  @ApiOperation({ summary: 'Soft delete a product' })
  async delete(@Param() param: ProductIdDto): Promise<object> {
    const { id } = param;

    const data = await this.service.softDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }

  // Hard delete a product (for admins only)
  @Delete(':id/hard')
  @ApiOperation({ summary: 'Hard delete a product (for admins only)' })
  async hardDelete(@Param() param: ProductIdDto): Promise<object> {
    const { id } = param;

    const data = await this.service.hardDelete({ _id: id });

    if (!data) throw new NotFoundException();

    return SuccessResponse(data, MESSAGES.DELETED);
  }
}
