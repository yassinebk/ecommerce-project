import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/dto/findAll';
import { Repository } from 'typeorm';
import {
  CreateProductVariantInput,
  UpdateProductVariant,
} from '../dto/productVariant';
import { updateProductVariantQty } from '../dto/productVariant/update-productVariant-size.input';
import { ImageLink } from '../entities';
import { GenericProductService } from '../generic-product/generic-product.service';
import { ProductVariant } from './entities/productVariant.entity';
import { ProductVariantSize } from './entities/productVariantSize.entity';

@Injectable()
export class ProductVariantService {
  constructor(
    private genericProductService: GenericProductService,

    @InjectRepository(ProductVariant)
    private productVariantRepository: Repository<ProductVariant>,

    @InjectRepository(ImageLink)
    private imageLinkRepository: Repository<ImageLink>,

    @InjectRepository(ProductVariantSize)
    private productVariantSize: Repository<ProductVariantSize>,
  ) {}

  async createProductVariant(createProductInput: CreateProductVariantInput) {
    const { imageLinks, price, genericProductId, color } = createProductInput;
    try {
      const genericProduct = await this.genericProductService.findOne(
        genericProductId,
      );
      const product = await this.productVariantRepository.findOneOrFail({
        where: { color: color.toLowerCase(), genericProduct: genericProduct },
      });
      console.log('here');
      return product;
    } catch (e) {
      const genericProduct = await this.genericProductService.findOne(
        genericProductId,
      );
      const imageLinksEntities = imageLinks.map((link) =>
        this.imageLinkRepository.create({ image: link }),
      );

      const productVariant = this.productVariantRepository.create({
        price,
        color: color.toLowerCase(),
        imageLinks: imageLinksEntities,
        genericProduct,
      });

      // productVariant.sizes = sizesRes;
      return this.productVariantRepository.save(productVariant);
    }
  }

  findAll(findAllInput: FindAllInput) {
    if (findAllInput)
      return this.productVariantRepository.find({
        order: { [findAllInput.field]: findAllInput.order },
      });
    return this.productVariantRepository.find({
      relations: ['sizes', 'imageLinks'],
    });
  }

  findOne(id: number) {
    return this.productVariantRepository.findOneOrFail(id);
  }

  async update(updateProductInput: UpdateProductVariant) {
    const productToUpdate = await this.productVariantRepository.findOneOrFail(
      updateProductInput.id,
    );
    console.log(updateProductInput);
    productToUpdate.price = updateProductInput.price
      ? updateProductInput.price
      : productToUpdate.price;

    productToUpdate.imageLinks = updateProductInput.imageLinks
      ? updateProductInput.imageLinks.map((p) =>
          this.imageLinkRepository.create({
            image: p,
            productVariant: productToUpdate,
          }),
        )
      : productToUpdate.imageLinks;
    productToUpdate.color = updateProductInput.color
      ? updateProductInput.color
      : productToUpdate.color;
    // // productToUpdate.sizeQty =
    //   ? updateProductInput.sizes.map((s) =>
    //       this.sizeRepository.create({ size: s }),
    //     )
    //   : productToUpdate.sizes;

    return this.productVariantRepository.save(productToUpdate);
  }

  async remove(id: number) {
    const productToRemove = await this.productVariantRepository.findOneOrFail(
      id,
    );
    return this.productVariantRepository.remove(productToRemove);
  }

  async updateProductVariantQty(
    updateProductVariantQty: updateProductVariantQty,
  ) {
    const toUpdateProduct = await this.productVariantRepository.findOneOrFail(
      updateProductVariantQty.productVariantId,
    );

    const checkPresent = toUpdateProduct.sizeQty.find(
      (p) => p.size === updateProductVariantQty.size,
    );
    if (checkPresent) {
      toUpdateProduct.sizeQty = toUpdateProduct.sizeQty.map((sq) => {
        if (sq.size === updateProductVariantQty.size) {
          sq.quantity = updateProductVariantQty.quantity;
          return sq;
        }
        return sq;
      });

      return this.productVariantRepository.save(toUpdateProduct);
    } else {
      const toCreatePVSize = this.productVariantSize.create({
        productVariantId: toUpdateProduct.productVariantId,
        productVariant: toUpdateProduct,
        size: updateProductVariantQty.size,
        quantity: updateProductVariantQty.quantity,
      });
      const createdPvSize = await this.productVariantSize.save(toCreatePVSize);
      toUpdateProduct.sizeQty = toUpdateProduct.sizeQty.concat(createdPvSize);
      return toUpdateProduct;
    }
  }
}
