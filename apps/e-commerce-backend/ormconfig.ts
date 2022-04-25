import { Category } from 'src/category/entities';
import { OrderProduct } from 'src/order-product/entities/order-product.entity';
import { Order } from 'src/order/entities';
import { Discount, ImageLink, Size } from 'src/product/entities';
import { GenericProduct } from 'src/product/generic-product/entities/genericProduct.entity';
import { ProductVariant } from 'src/product/product-variant/entities/productVariant.entity';
import { ProductVariantSize } from 'src/product/product-variant/entities/productVariantSize.entity';
import { User, UserBasicInfo } from 'src/user/entities';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'ecommerce2',
  entities: [
    User,
    UserBasicInfo,
    ProductVariant,
    ProductVariantSize,
    GenericProduct,
    Order,
    OrderProduct,
    Category,
    ImageLink,
    Size,
    Discount,
  ],
  synchronize: true,
  // migrations: ['dist/migrations'],
  logging: true,
};

export default config;
