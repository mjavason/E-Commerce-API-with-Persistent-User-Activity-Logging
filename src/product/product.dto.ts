import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';
import { IsObjectIdOrHexString } from 'src/decorators/is_object_id.decorator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsOptional()
  is_published: boolean;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  stock: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  image_url: string;

  @ApiProperty()
  @IsOptional()
  is_published: boolean;
}

export class FindProductDto {
  @ApiProperty()
  @IsOptional()
  @IsObjectIdOrHexString()
  _id: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category: string;

  @ApiProperty()
  @IsOptional()
  is_published: boolean;
}

export class GetAllProductsDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  pagination: number;
}

export class ProductIdDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsObjectIdOrHexString()
  id: string;
}
