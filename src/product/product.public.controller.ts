import {
  Controller,
  Get,

  Param,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
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
  FindProductDto,

  GetAllProductsDto,
} from './product.dto';

@Controller('product')
@ApiTags('Product')
@ApiResponse({
  status: HttpStatus.OK,
  type: ResponseDto,
  description: 'Successful response with data',
})
@ApiInternalServerErrorResponse({ description: MESSAGES.INTERNAL_ERROR })
@ApiBadRequestResponse({ description: MESSAGES.BAD_PARAMETERS })
export class ProductPublicController {
  constructor(private readonly service: ProductService) {}

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
}
