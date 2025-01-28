import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  user: User;
};

export type AuthPayloadWithToken = {
  __typename?: 'AuthPayloadWithToken';
  token?: Maybe<Scalars['String']['output']>;
  user: User;
};

export type Category = {
  __typename?: 'Category';
  category: Scalars['String']['output'];
  courses?: Maybe<Array<Maybe<Course>>>;
  id?: Maybe<Scalars['Int']['output']>;
};

export type CategoryInput = {
  category?: InputMaybe<Scalars['String']['input']>;
};

export type Course = {
  __typename?: 'Course';
  category?: Maybe<Category>;
  courseDescription?: Maybe<Scalars['String']['output']>;
  courseDuration?: Maybe<Scalars['String']['output']>;
  courseOutcome?: Maybe<Scalars['String']['output']>;
  courseTitle: Scalars['String']['output'];
  id?: Maybe<Scalars['Int']['output']>;
};

export type CourseInput = {
  category?: InputMaybe<CategoryInput>;
  courseDescription?: InputMaybe<Scalars['String']['input']>;
  courseDuration?: InputMaybe<Scalars['String']['input']>;
  courseOutcome?: InputMaybe<Scalars['String']['input']>;
  courseTitle: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCourse?: Maybe<Course>;
  deleteCourse?: Maybe<Course>;
  login?: Maybe<AuthPayloadWithToken>;
  register?: Maybe<AuthPayload>;
  updateCourse?: Maybe<Course>;
};


export type MutationAddCourseArgs = {
  input: CourseInput;
};


export type MutationDeleteCourseArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLoginArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationRegisterArgs = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};


export type MutationUpdateCourseArgs = {
  id: Scalars['Int']['input'];
  input: CourseInput;
};

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Category>;
  collections?: Maybe<Array<Maybe<Category>>>;
  course?: Maybe<Course>;
  courses?: Maybe<Array<Maybe<Course>>>;
};


export type QueryCollectionArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCourseArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCoursesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sortOrder?: InputMaybe<SortOrder>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  AuthPayloadWithToken: ResolverTypeWrapper<AuthPayloadWithToken>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CategoryInput: CategoryInput;
  Course: ResolverTypeWrapper<Course>;
  CourseInput: CourseInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AuthPayload: AuthPayload;
  AuthPayloadWithToken: AuthPayloadWithToken;
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CategoryInput: CategoryInput;
  Course: Course;
  CourseInput: CourseInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  String: Scalars['String']['output'];
  User: User;
}>;

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = ResolversObject<{
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type AuthPayloadWithTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayloadWithToken'] = ResolversParentTypes['AuthPayloadWithToken']> = ResolversObject<{
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = ResolversObject<{
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  courses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CourseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Course'] = ResolversParentTypes['Course']> = ResolversObject<{
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  courseDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseDuration?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseOutcome?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  courseTitle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationAddCourseArgs, 'input'>>;
  deleteCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationDeleteCourseArgs, 'id'>>;
  login?: Resolver<Maybe<ResolversTypes['AuthPayloadWithToken']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'password' | 'username'>>;
  register?: Resolver<Maybe<ResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'password' | 'username'>>;
  updateCourse?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<MutationUpdateCourseArgs, 'id' | 'input'>>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  collection?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType, RequireFields<QueryCollectionArgs, 'id'>>;
  collections?: Resolver<Maybe<Array<Maybe<ResolversTypes['Category']>>>, ParentType, ContextType>;
  course?: Resolver<Maybe<ResolversTypes['Course']>, ParentType, ContextType, RequireFields<QueryCourseArgs, 'id'>>;
  courses?: Resolver<Maybe<Array<Maybe<ResolversTypes['Course']>>>, ParentType, ContextType, Partial<QueryCoursesArgs>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  AuthPayloadWithToken?: AuthPayloadWithTokenResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Course?: CourseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

