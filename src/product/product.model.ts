import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { IProduct } from './product.interface';

@Schema()
export class Product implements IProduct {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  stock: number;

  @Prop({ required: true, default: 'https://image-link.com' })
  image_url: string;

  @Prop({ default: true })
  is_published: boolean;

  @Prop({ default: false, select: false })
  deleted: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
