import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { v2 as cloudinary } from 'cloudinary';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FileUploadResolver {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  @Mutation(() => String, { name: 'uploadFile' })
  async uploadFile(
    @Args({ name: 'file', type: () => GraphQLUpload })
    file: FileUpload,
  ): Promise<string> {
    // return new Promise(async (resolve, reject) =>
    //   createReadStream()
    //     .pipe(createWriteStream(`./uploads/${filename}`))
    //     .on('finish', () => resolve(true))
    //     .on('error', () => reject(false))
    // );
    try {
      const result = await cloudinary.uploader.upload(file, {
        //here i chose to allow only jpg and png upload
        allowed_formats: ['jpg', 'png'],
        //generates a new id for each uploaded image
        public_id: '',
        /*creates a folder called "your_folder_name" where images will be stored.
         */
        folder: 'ecommerce',
      });
      return `Successful-Photo URL: ${result.url}`;
    } catch (e) {
      //returns an error message on image upload failure.
      return `Image could not be uploaded:${e.message}`;
    }
    /*returns uploaded photo url if successful `result.url`.
    if we were going to store image name in database,this
    */
  }
}
