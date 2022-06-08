import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  categoryId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['DateTime'];
  products?: Maybe<Array<GenericProduct>>;
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type CreateAuthInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateCategoryInput = {
  title: Scalars['String'];
};

export type CreateGenericProductInput = {
  basePrice: Scalars['Float'];
  categories: Array<Scalars['Int']>;
  description: Scalars['String'];
  name: Scalars['String'];
};

export type CreateOrderInput = {
  products: Array<ProductInOrder>;
  user: Scalars['Int'];
};

export type CreateProductVariantInput = {
  color: Scalars['String'];
  genericProductId: Scalars['Int'];
  imageLinks: Array<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type CreateUserInput = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Discount = {
  __typename?: 'Discount';
  createdAt: Scalars['DateTime'];
  discountId: Scalars['Float'];
  discountValue: Scalars['Float'];
  discountedProducts: Array<GenericProduct>;
  endDate: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type FindAllInput = {
  field: Scalars['String'];
  order: ResultOrderBy;
};

export type FindOneCategoryInput = {
  id: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type GenericProduct = {
  __typename?: 'GenericProduct';
  basePrice: Scalars['Float'];
  categories?: Maybe<Array<Category>>;
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  discount?: Maybe<Discount>;
  genericProductId: Scalars['Int'];
  name: Scalars['String'];
  productVariants?: Maybe<Array<ProductVariant>>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ImageLink = {
  __typename?: 'ImageLink';
  image: Scalars['String'];
  imageLinkId: Scalars['Float'];
  productVariant: ProductVariant;
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategoryToProduct: GenericProduct;
  bulkCreateCategories: Array<Category>;
  confirmEmail: Scalars['Boolean'];
  createCategory: Category;
  createGenericProduct: GenericProduct;
  createOrder: Order;
  createProductVariant: ProductVariant;
  createUser: User;
  login: LoginResponse;
  register: RegisterRespnse;
  removeCategory: Category;
  removeCategoryFromProduct: GenericProduct;
  removeGenericProduct: GenericProduct;
  removeOrderAdmin: Order;
  removeOrderUser: Order;
  removeProductVariant: ProductVariant;
  removeUser: User;
  updateCategory: Category;
  updateGenericProduct: GenericProduct;
  updateOrder: Order;
  updateProductVariant: ProductVariant;
  updateProductVariantQty: ProductVariant;
  updateUserEmail: User;
  updateUserPassword: User;
  uploadFile: Scalars['String'];
};


export type MutationAddCategoryToProductArgs = {
  categoryId: Scalars['Int'];
  genericProductId: Scalars['Int'];
};


export type MutationBulkCreateCategoriesArgs = {
  categories: Array<Scalars['String']>;
};


export type MutationConfirmEmailArgs = {
  confirmationToken: Scalars['String'];
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateGenericProductArgs = {
  createProductInput: CreateGenericProductInput;
};


export type MutationCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationCreateProductVariantArgs = {
  createProductInput: CreateProductVariantInput;
};


export type MutationCreateUserArgs = {
  createUserInput: CreateUserInput;
};


export type MutationLoginArgs = {
  loginUserInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: CreateAuthInput;
};


export type MutationRemoveCategoryArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveCategoryFromProductArgs = {
  categoryId: Scalars['Int'];
  genericProductId: Scalars['Float'];
};


export type MutationRemoveGenericProductArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveOrderAdminArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveOrderUserArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveProductVariantArgs = {
  id: Scalars['Int'];
};


export type MutationRemoveUserArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
};


export type MutationUpdateGenericProductArgs = {
  updateProductInput: UpdateGenericProductInput;
};


export type MutationUpdateOrderArgs = {
  updateOrderInput: UpdateOrderInput;
};


export type MutationUpdateProductVariantArgs = {
  updateProductInput: UpdateProductVariant;
};


export type MutationUpdateProductVariantQtyArgs = {
  updateProductVariatnQty: UpdateProductVariantQty;
};


export type MutationUpdateUserEmailArgs = {
  updateUserInput: UpdateUserEmailInput;
};


export type MutationUpdateUserPasswordArgs = {
  updateUserInput: UpdateUserPasswordInput;
};


export type MutationUploadFileArgs = {
  file: Scalars['Upload'];
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  orderId: Scalars['Int'];
  orderProducts: Array<OrderProduct>;
  state: OrderState;
  updatedAt?: Maybe<Scalars['DateTime']>;
  user: User;
};

export type OrderProduct = {
  __typename?: 'OrderProduct';
  currentOrder: Order;
  /** Example field (placeholder) */
  orderProductId: Scalars['Int'];
  productVariant: ProductVariant;
  quantity: Scalars['Int'];
  sizeId?: Maybe<Scalars['Int']>;
};

/** The state of an orded */
export enum OrderState {
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Pending = 'PENDING',
  Settled = 'SETTLED'
}

export type ProductInOrder = {
  productVariantId: Scalars['Int'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  color: Scalars['String'];
  createdAt: Scalars['DateTime'];
  genericProduct: GenericProduct;
  imageLinks: Array<ImageLink>;
  price: Scalars['Float'];
  productVariantId?: Maybe<Scalars['Int']>;
  sizeQty: Array<ProductVariantSize>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type ProductVariantSize = {
  __typename?: 'ProductVariantSize';
  productVariantId: Scalars['Int'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
  sizeQtyId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  findAllCategories: Array<Category>;
  findAllGenericProducts: Array<GenericProduct>;
  findAllOrders: Array<Order>;
  findAllOrdersForOneUser: Array<Order>;
  findAllOrdersForOneUserAdmin: Array<Order>;
  findAllProductVariants: Array<ProductVariant>;
  findOneCategory: Category;
  findOneGenericProduct: GenericProduct;
  findOneOrderAdmin: Order;
  findOneOrderUser: Order;
  findOneProductVariant: ProductVariant;
  refreshToken: Tokens;
  user: User;
};


export type QueryFindAllCategoriesArgs = {
  findAllInput?: InputMaybe<FindAllInput>;
};


export type QueryFindAllGenericProductsArgs = {
  findAllInput?: InputMaybe<FindAllInput>;
};


export type QueryFindAllOrdersForOneUserAdminArgs = {
  userId: Scalars['Int'];
};


export type QueryFindAllProductVariantsArgs = {
  findAllInput?: InputMaybe<FindAllInput>;
};


export type QueryFindOneCategoryArgs = {
  findOneInput: FindOneCategoryInput;
};


export type QueryFindOneGenericProductArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneOrderAdminArgs = {
  id: Scalars['Int'];
};


export type QueryFindOneProductVariantArgs = {
  id: Scalars['Int'];
};


export type QueryRefreshTokenArgs = {
  refreshTokenInput: UpdateUserRefreshTokenInput;
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};

export type RegisterRespnse = {
  __typename?: 'RegisterRespnse';
  message: Scalars['String'];
  user: User;
};

/** How to order result */
export enum ResultOrderBy {
  Asc = 'ASC',
  Desc = 'DESC'
}

/** role of user */
export enum Role {
  Admin = 'ADMIN',
  Customer = 'CUSTOMER',
  Dev = 'DEV'
}

export type Tokens = {
  __typename?: 'Tokens';
  access_token: Scalars['String'];
  refresh_token: Scalars['String'];
};

export type UpdateCategoryInput = {
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type UpdateGenericProductInput = {
  basePrice?: InputMaybe<Scalars['Float']>;
  categories?: InputMaybe<Array<Scalars['String']>>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['Float'];
  name: Scalars['String'];
};

export type UpdateOrderInput = {
  id: Scalars['Int'];
  products?: InputMaybe<Array<ProductInOrder>>;
  state: OrderState;
  user?: InputMaybe<Scalars['Int']>;
};

export type UpdateProductVariant = {
  categories?: InputMaybe<Array<Scalars['String']>>;
  color?: InputMaybe<Scalars['String']>;
  genericProductId?: InputMaybe<Scalars['Int']>;
  id: Scalars['Int'];
  imageLinks?: InputMaybe<Array<Scalars['String']>>;
  price?: InputMaybe<Scalars['Float']>;
  qty?: InputMaybe<Scalars['Int']>;
  sizes?: InputMaybe<Array<Scalars['String']>>;
};

export type UpdateUserEmailInput = {
  email: Scalars['String'];
  id: Scalars['Int'];
};

export type UpdateUserPasswordInput = {
  id: Scalars['Int'];
  password: Scalars['String'];
};

export type UpdateUserRefreshTokenInput = {
  id: Scalars['Int'];
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  hashedPassword?: Maybe<Scalars['String']>;
  infos?: Maybe<UserBasicInfo>;
  isVerified: Scalars['Boolean'];
  lastSeen?: Maybe<Scalars['DateTime']>;
  orders: Array<Order>;
  refreshToken?: Maybe<Scalars['String']>;
  role: Role;
  updatedAt?: Maybe<Scalars['DateTime']>;
  userId: Scalars['Int'];
};

export type UserBasicInfo = {
  __typename?: 'UserBasicInfo';
  address: Scalars['String'];
  branch: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
  socialLinkProfile?: Maybe<Scalars['String']>;
  user: User;
  userBasicInfoId: Scalars['Int'];
};

export type UpdateProductVariantQty = {
  productVariantId: Scalars['Int'];
  quantity: Scalars['Int'];
  size: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  loginUserInput: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', email: string, createdAt: any, lastSeen?: any | null } } };

export type RegisterMutationVariables = Exact<{
  registerInput: CreateAuthInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterRespnse', message: string, user: { __typename?: 'User', email: string, lastSeen?: any | null, createdAt: any, userId: number } } };

export type FindAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindAllCategoriesQuery = { __typename?: 'Query', findAllCategories: Array<{ __typename?: 'Category', categoryId?: number | null }> };


export const LoginDocument = gql`
    mutation Login($loginUserInput: LoginInput!) {
  login(loginUserInput: $loginUserInput) {
    access_token
    refresh_token
    user {
      email
      createdAt
      lastSeen
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginUserInput: // value for 'loginUserInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: CreateAuthInput!) {
  register(registerInput: $registerInput) {
    message
    user {
      email
      lastSeen
      createdAt
      userId
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const FindAllCategoriesDocument = gql`
    query FindAllCategories {
  findAllCategories {
    categoryId
  }
}
    `;

/**
 * __useFindAllCategoriesQuery__
 *
 * To run a query within a React component, call `useFindAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindAllCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
      }
export function useFindAllCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>(FindAllCategoriesDocument, options);
        }
export type FindAllCategoriesQueryHookResult = ReturnType<typeof useFindAllCategoriesQuery>;
export type FindAllCategoriesLazyQueryHookResult = ReturnType<typeof useFindAllCategoriesLazyQuery>;
export type FindAllCategoriesQueryResult = Apollo.QueryResult<FindAllCategoriesQuery, FindAllCategoriesQueryVariables>;