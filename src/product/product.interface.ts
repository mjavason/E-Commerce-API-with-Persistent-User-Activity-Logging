import { Types } from 'mongoose';

export interface IProduct {
  _id?: Types.ObjectId | string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  image_url: string;
  is_published: boolean;
  deleted?: boolean;
}
