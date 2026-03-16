
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model ProcessingLog
 * 
 */
export type ProcessingLog = $Result.DefaultSelection<Prisma.$ProcessingLogPayload>
/**
 * Model Batch
 * 
 */
export type Batch = $Result.DefaultSelection<Prisma.$BatchPayload>
/**
 * Model Promo
 * 
 */
export type Promo = $Result.DefaultSelection<Prisma.$PromoPayload>
/**
 * Model CreditLog
 * 
 */
export type CreditLog = $Result.DefaultSelection<Prisma.$CreditLogPayload>
/**
 * Model Permissions
 * 
 */
export type Permissions = $Result.DefaultSelection<Prisma.$PermissionsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const UserRole: {
  user: 'user',
  cs: 'cs',
  marketing: 'marketing',
  finance: 'finance',
  admin: 'admin',
  super_admin: 'super_admin'
};

export type UserRole = (typeof UserRole)[keyof typeof UserRole]


export const ProcessingStatus: {
  PENDING: 'PENDING',
  CREDITED: 'CREDITED',
  FAILED: 'FAILED'
};

export type ProcessingStatus = (typeof ProcessingStatus)[keyof typeof ProcessingStatus]


export const BatchStatus: {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  PROCESSING: 'PROCESSING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  PARTIALLY_COMPLETED: 'PARTIALLY_COMPLETED'
};

export type BatchStatus = (typeof BatchStatus)[keyof typeof BatchStatus]

}

export type UserRole = $Enums.UserRole

export const UserRole: typeof $Enums.UserRole

export type ProcessingStatus = $Enums.ProcessingStatus

export const ProcessingStatus: typeof $Enums.ProcessingStatus

export type BatchStatus = $Enums.BatchStatus

export const BatchStatus: typeof $Enums.BatchStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs>;

  /**
   * `prisma.processingLog`: Exposes CRUD operations for the **ProcessingLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProcessingLogs
    * const processingLogs = await prisma.processingLog.findMany()
    * ```
    */
  get processingLog(): Prisma.ProcessingLogDelegate<ExtArgs>;

  /**
   * `prisma.batch`: Exposes CRUD operations for the **Batch** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Batches
    * const batches = await prisma.batch.findMany()
    * ```
    */
  get batch(): Prisma.BatchDelegate<ExtArgs>;

  /**
   * `prisma.promo`: Exposes CRUD operations for the **Promo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Promos
    * const promos = await prisma.promo.findMany()
    * ```
    */
  get promo(): Prisma.PromoDelegate<ExtArgs>;

  /**
   * `prisma.creditLog`: Exposes CRUD operations for the **CreditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more CreditLogs
    * const creditLogs = await prisma.creditLog.findMany()
    * ```
    */
  get creditLog(): Prisma.CreditLogDelegate<ExtArgs>;

  /**
   * `prisma.permissions`: Exposes CRUD operations for the **Permissions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Permissions
    * const permissions = await prisma.permissions.findMany()
    * ```
    */
  get permissions(): Prisma.PermissionsDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Customer: 'Customer',
    ProcessingLog: 'ProcessingLog',
    Batch: 'Batch',
    Promo: 'Promo',
    CreditLog: 'CreditLog',
    Permissions: 'Permissions'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "customer" | "processingLog" | "batch" | "promo" | "creditLog" | "permissions"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      ProcessingLog: {
        payload: Prisma.$ProcessingLogPayload<ExtArgs>
        fields: Prisma.ProcessingLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProcessingLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProcessingLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          findFirst: {
            args: Prisma.ProcessingLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProcessingLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          findMany: {
            args: Prisma.ProcessingLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>[]
          }
          create: {
            args: Prisma.ProcessingLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          createMany: {
            args: Prisma.ProcessingLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProcessingLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>[]
          }
          delete: {
            args: Prisma.ProcessingLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          update: {
            args: Prisma.ProcessingLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          deleteMany: {
            args: Prisma.ProcessingLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProcessingLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProcessingLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProcessingLogPayload>
          }
          aggregate: {
            args: Prisma.ProcessingLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProcessingLog>
          }
          groupBy: {
            args: Prisma.ProcessingLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProcessingLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProcessingLogCountArgs<ExtArgs>
            result: $Utils.Optional<ProcessingLogCountAggregateOutputType> | number
          }
        }
      }
      Batch: {
        payload: Prisma.$BatchPayload<ExtArgs>
        fields: Prisma.BatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findFirst: {
            args: Prisma.BatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          findMany: {
            args: Prisma.BatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          create: {
            args: Prisma.BatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          createMany: {
            args: Prisma.BatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>[]
          }
          delete: {
            args: Prisma.BatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          update: {
            args: Prisma.BatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          deleteMany: {
            args: Prisma.BatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BatchPayload>
          }
          aggregate: {
            args: Prisma.BatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBatch>
          }
          groupBy: {
            args: Prisma.BatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<BatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.BatchCountArgs<ExtArgs>
            result: $Utils.Optional<BatchCountAggregateOutputType> | number
          }
        }
      }
      Promo: {
        payload: Prisma.$PromoPayload<ExtArgs>
        fields: Prisma.PromoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PromoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PromoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          findFirst: {
            args: Prisma.PromoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PromoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          findMany: {
            args: Prisma.PromoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>[]
          }
          create: {
            args: Prisma.PromoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          createMany: {
            args: Prisma.PromoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PromoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>[]
          }
          delete: {
            args: Prisma.PromoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          update: {
            args: Prisma.PromoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          deleteMany: {
            args: Prisma.PromoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PromoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PromoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PromoPayload>
          }
          aggregate: {
            args: Prisma.PromoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePromo>
          }
          groupBy: {
            args: Prisma.PromoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PromoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PromoCountArgs<ExtArgs>
            result: $Utils.Optional<PromoCountAggregateOutputType> | number
          }
        }
      }
      CreditLog: {
        payload: Prisma.$CreditLogPayload<ExtArgs>
        fields: Prisma.CreditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CreditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CreditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          findFirst: {
            args: Prisma.CreditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CreditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          findMany: {
            args: Prisma.CreditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>[]
          }
          create: {
            args: Prisma.CreditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          createMany: {
            args: Prisma.CreditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CreditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>[]
          }
          delete: {
            args: Prisma.CreditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          update: {
            args: Prisma.CreditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          deleteMany: {
            args: Prisma.CreditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CreditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CreditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CreditLogPayload>
          }
          aggregate: {
            args: Prisma.CreditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCreditLog>
          }
          groupBy: {
            args: Prisma.CreditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<CreditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.CreditLogCountArgs<ExtArgs>
            result: $Utils.Optional<CreditLogCountAggregateOutputType> | number
          }
        }
      }
      Permissions: {
        payload: Prisma.$PermissionsPayload<ExtArgs>
        fields: Prisma.PermissionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermissionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermissionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          findFirst: {
            args: Prisma.PermissionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermissionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          findMany: {
            args: Prisma.PermissionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>[]
          }
          create: {
            args: Prisma.PermissionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          createMany: {
            args: Prisma.PermissionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermissionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>[]
          }
          delete: {
            args: Prisma.PermissionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          update: {
            args: Prisma.PermissionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          deleteMany: {
            args: Prisma.PermissionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermissionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PermissionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermissionsPayload>
          }
          aggregate: {
            args: Prisma.PermissionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermissions>
          }
          groupBy: {
            args: Prisma.PermissionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermissionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermissionsCountArgs<ExtArgs>
            result: $Utils.Optional<PermissionsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    permissions: number
    batchesApproved: number
    batchesRejected: number
    promoUploaded: number
    creditsIssued: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | UserCountOutputTypeCountPermissionsArgs
    batchesApproved?: boolean | UserCountOutputTypeCountBatchesApprovedArgs
    batchesRejected?: boolean | UserCountOutputTypeCountBatchesRejectedArgs
    promoUploaded?: boolean | UserCountOutputTypeCountPromoUploadedArgs
    creditsIssued?: boolean | UserCountOutputTypeCountCreditsIssuedArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBatchesApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountBatchesRejectedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPromoUploadedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCreditsIssuedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditLogWhereInput
  }


  /**
   * Count Type BatchCountOutputType
   */

  export type BatchCountOutputType = {
    recipients: number
    processingLogs: number
  }

  export type BatchCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipients?: boolean | BatchCountOutputTypeCountRecipientsArgs
    processingLogs?: boolean | BatchCountOutputTypeCountProcessingLogsArgs
  }

  // Custom InputTypes
  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BatchCountOutputType
     */
    select?: BatchCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountRecipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
  }

  /**
   * BatchCountOutputType without action
   */
  export type BatchCountOutputTypeCountProcessingLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessingLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    role: $Enums.UserRole | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    role: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    role: $Enums.UserRole
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
    permissions?: boolean | User$permissionsArgs<ExtArgs>
    batchesApproved?: boolean | User$batchesApprovedArgs<ExtArgs>
    batchesRejected?: boolean | User$batchesRejectedArgs<ExtArgs>
    promoUploaded?: boolean | User$promoUploadedArgs<ExtArgs>
    creditsIssued?: boolean | User$creditsIssuedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    role?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permissions?: boolean | User$permissionsArgs<ExtArgs>
    batchesApproved?: boolean | User$batchesApprovedArgs<ExtArgs>
    batchesRejected?: boolean | User$batchesRejectedArgs<ExtArgs>
    promoUploaded?: boolean | User$promoUploadedArgs<ExtArgs>
    creditsIssued?: boolean | User$creditsIssuedArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      permissions: Prisma.$PermissionsPayload<ExtArgs>[]
      batchesApproved: Prisma.$BatchPayload<ExtArgs>[]
      batchesRejected: Prisma.$BatchPayload<ExtArgs>[]
      promoUploaded: Prisma.$PromoPayload<ExtArgs>[]
      creditsIssued: Prisma.$CreditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      role: $Enums.UserRole
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permissions<T extends User$permissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findMany"> | Null>
    batchesApproved<T extends User$batchesApprovedArgs<ExtArgs> = {}>(args?: Subset<T, User$batchesApprovedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany"> | Null>
    batchesRejected<T extends User$batchesRejectedArgs<ExtArgs> = {}>(args?: Subset<T, User$batchesRejectedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany"> | Null>
    promoUploaded<T extends User$promoUploadedArgs<ExtArgs> = {}>(args?: Subset<T, User$promoUploadedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findMany"> | Null>
    creditsIssued<T extends User$creditsIssuedArgs<ExtArgs> = {}>(args?: Subset<T, User$creditsIssuedArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'UserRole'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.permissions
   */
  export type User$permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    where?: PermissionsWhereInput
    orderBy?: PermissionsOrderByWithRelationInput | PermissionsOrderByWithRelationInput[]
    cursor?: PermissionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermissionsScalarFieldEnum | PermissionsScalarFieldEnum[]
  }

  /**
   * User.batchesApproved
   */
  export type User$batchesApprovedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    cursor?: BatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * User.batchesRejected
   */
  export type User$batchesRejectedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    cursor?: BatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * User.promoUploaded
   */
  export type User$promoUploadedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    where?: PromoWhereInput
    orderBy?: PromoOrderByWithRelationInput | PromoOrderByWithRelationInput[]
    cursor?: PromoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PromoScalarFieldEnum | PromoScalarFieldEnum[]
  }

  /**
   * User.creditsIssued
   */
  export type User$creditsIssuedArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    where?: CreditLogWhereInput
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    cursor?: CreditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerAvgAggregateOutputType = {
    amount: number | null
  }

  export type CustomerSumAggregateOutputType = {
    amount: number | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    phoneNumber: string | null
    amount: number | null
    batchId: string | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    phoneNumber: string | null
    amount: number | null
    batchId: string | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    phoneNumber: number
    amount: number
    batchId: number
    _all: number
  }


  export type CustomerAvgAggregateInputType = {
    amount?: true
  }

  export type CustomerSumAggregateInputType = {
    amount?: true
  }

  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    phoneNumber?: true
    amount?: true
    batchId?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    phoneNumber?: true
    amount?: true
    batchId?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    phoneNumber?: true
    amount?: true
    batchId?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CustomerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CustomerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _avg?: CustomerAvgAggregateInputType
    _sum?: CustomerSumAggregateInputType
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    phoneNumber: string
    amount: number
    batchId: string
    _count: CustomerCountAggregateOutputType | null
    _avg: CustomerAvgAggregateOutputType | null
    _sum: CustomerSumAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phoneNumber?: boolean
    amount?: boolean
    batchId?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    phoneNumber?: boolean
    amount?: boolean
    batchId?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    phoneNumber?: boolean
    amount?: boolean
    batchId?: boolean
  }

  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      phoneNumber: string
      amount: number
      batchId: string
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */ 
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly phoneNumber: FieldRef<"Customer", 'String'>
    readonly amount: FieldRef<"Customer", 'Int'>
    readonly batchId: FieldRef<"Customer", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model ProcessingLog
   */

  export type AggregateProcessingLog = {
    _count: ProcessingLogCountAggregateOutputType | null
    _avg: ProcessingLogAvgAggregateOutputType | null
    _sum: ProcessingLogSumAggregateOutputType | null
    _min: ProcessingLogMinAggregateOutputType | null
    _max: ProcessingLogMaxAggregateOutputType | null
  }

  export type ProcessingLogAvgAggregateOutputType = {
    amount: number | null
  }

  export type ProcessingLogSumAggregateOutputType = {
    amount: number | null
  }

  export type ProcessingLogMinAggregateOutputType = {
    id: string | null
    batchId: string | null
    msisdn: string | null
    amount: number | null
    status: $Enums.ProcessingStatus | null
    smsStatus: string | null
    errorMessage: string | null
    processedAt: Date | null
  }

  export type ProcessingLogMaxAggregateOutputType = {
    id: string | null
    batchId: string | null
    msisdn: string | null
    amount: number | null
    status: $Enums.ProcessingStatus | null
    smsStatus: string | null
    errorMessage: string | null
    processedAt: Date | null
  }

  export type ProcessingLogCountAggregateOutputType = {
    id: number
    batchId: number
    msisdn: number
    amount: number
    status: number
    creditResponse: number
    smsStatus: number
    errorMessage: number
    processedAt: number
    _all: number
  }


  export type ProcessingLogAvgAggregateInputType = {
    amount?: true
  }

  export type ProcessingLogSumAggregateInputType = {
    amount?: true
  }

  export type ProcessingLogMinAggregateInputType = {
    id?: true
    batchId?: true
    msisdn?: true
    amount?: true
    status?: true
    smsStatus?: true
    errorMessage?: true
    processedAt?: true
  }

  export type ProcessingLogMaxAggregateInputType = {
    id?: true
    batchId?: true
    msisdn?: true
    amount?: true
    status?: true
    smsStatus?: true
    errorMessage?: true
    processedAt?: true
  }

  export type ProcessingLogCountAggregateInputType = {
    id?: true
    batchId?: true
    msisdn?: true
    amount?: true
    status?: true
    creditResponse?: true
    smsStatus?: true
    errorMessage?: true
    processedAt?: true
    _all?: true
  }

  export type ProcessingLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingLog to aggregate.
     */
    where?: ProcessingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingLogs to fetch.
     */
    orderBy?: ProcessingLogOrderByWithRelationInput | ProcessingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProcessingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProcessingLogs
    **/
    _count?: true | ProcessingLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProcessingLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProcessingLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProcessingLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProcessingLogMaxAggregateInputType
  }

  export type GetProcessingLogAggregateType<T extends ProcessingLogAggregateArgs> = {
        [P in keyof T & keyof AggregateProcessingLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProcessingLog[P]>
      : GetScalarType<T[P], AggregateProcessingLog[P]>
  }




  export type ProcessingLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProcessingLogWhereInput
    orderBy?: ProcessingLogOrderByWithAggregationInput | ProcessingLogOrderByWithAggregationInput[]
    by: ProcessingLogScalarFieldEnum[] | ProcessingLogScalarFieldEnum
    having?: ProcessingLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProcessingLogCountAggregateInputType | true
    _avg?: ProcessingLogAvgAggregateInputType
    _sum?: ProcessingLogSumAggregateInputType
    _min?: ProcessingLogMinAggregateInputType
    _max?: ProcessingLogMaxAggregateInputType
  }

  export type ProcessingLogGroupByOutputType = {
    id: string
    batchId: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse: JsonValue | null
    smsStatus: string | null
    errorMessage: string | null
    processedAt: Date
    _count: ProcessingLogCountAggregateOutputType | null
    _avg: ProcessingLogAvgAggregateOutputType | null
    _sum: ProcessingLogSumAggregateOutputType | null
    _min: ProcessingLogMinAggregateOutputType | null
    _max: ProcessingLogMaxAggregateOutputType | null
  }

  type GetProcessingLogGroupByPayload<T extends ProcessingLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProcessingLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProcessingLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProcessingLogGroupByOutputType[P]>
            : GetScalarType<T[P], ProcessingLogGroupByOutputType[P]>
        }
      >
    >


  export type ProcessingLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    msisdn?: boolean
    amount?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    processedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processingLog"]>

  export type ProcessingLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batchId?: boolean
    msisdn?: boolean
    amount?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    processedAt?: boolean
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["processingLog"]>

  export type ProcessingLogSelectScalar = {
    id?: boolean
    batchId?: boolean
    msisdn?: boolean
    amount?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    processedAt?: boolean
  }

  export type ProcessingLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }
  export type ProcessingLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    batch?: boolean | BatchDefaultArgs<ExtArgs>
  }

  export type $ProcessingLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProcessingLog"
    objects: {
      batch: Prisma.$BatchPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batchId: string
      msisdn: string
      amount: number
      status: $Enums.ProcessingStatus
      creditResponse: Prisma.JsonValue | null
      smsStatus: string | null
      errorMessage: string | null
      processedAt: Date
    }, ExtArgs["result"]["processingLog"]>
    composites: {}
  }

  type ProcessingLogGetPayload<S extends boolean | null | undefined | ProcessingLogDefaultArgs> = $Result.GetResult<Prisma.$ProcessingLogPayload, S>

  type ProcessingLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ProcessingLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ProcessingLogCountAggregateInputType | true
    }

  export interface ProcessingLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProcessingLog'], meta: { name: 'ProcessingLog' } }
    /**
     * Find zero or one ProcessingLog that matches the filter.
     * @param {ProcessingLogFindUniqueArgs} args - Arguments to find a ProcessingLog
     * @example
     * // Get one ProcessingLog
     * const processingLog = await prisma.processingLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProcessingLogFindUniqueArgs>(args: SelectSubset<T, ProcessingLogFindUniqueArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one ProcessingLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ProcessingLogFindUniqueOrThrowArgs} args - Arguments to find a ProcessingLog
     * @example
     * // Get one ProcessingLog
     * const processingLog = await prisma.processingLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProcessingLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ProcessingLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first ProcessingLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogFindFirstArgs} args - Arguments to find a ProcessingLog
     * @example
     * // Get one ProcessingLog
     * const processingLog = await prisma.processingLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProcessingLogFindFirstArgs>(args?: SelectSubset<T, ProcessingLogFindFirstArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first ProcessingLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogFindFirstOrThrowArgs} args - Arguments to find a ProcessingLog
     * @example
     * // Get one ProcessingLog
     * const processingLog = await prisma.processingLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProcessingLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ProcessingLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more ProcessingLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProcessingLogs
     * const processingLogs = await prisma.processingLog.findMany()
     * 
     * // Get first 10 ProcessingLogs
     * const processingLogs = await prisma.processingLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const processingLogWithIdOnly = await prisma.processingLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProcessingLogFindManyArgs>(args?: SelectSubset<T, ProcessingLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a ProcessingLog.
     * @param {ProcessingLogCreateArgs} args - Arguments to create a ProcessingLog.
     * @example
     * // Create one ProcessingLog
     * const ProcessingLog = await prisma.processingLog.create({
     *   data: {
     *     // ... data to create a ProcessingLog
     *   }
     * })
     * 
     */
    create<T extends ProcessingLogCreateArgs>(args: SelectSubset<T, ProcessingLogCreateArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many ProcessingLogs.
     * @param {ProcessingLogCreateManyArgs} args - Arguments to create many ProcessingLogs.
     * @example
     * // Create many ProcessingLogs
     * const processingLog = await prisma.processingLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProcessingLogCreateManyArgs>(args?: SelectSubset<T, ProcessingLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ProcessingLogs and returns the data saved in the database.
     * @param {ProcessingLogCreateManyAndReturnArgs} args - Arguments to create many ProcessingLogs.
     * @example
     * // Create many ProcessingLogs
     * const processingLog = await prisma.processingLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ProcessingLogs and only return the `id`
     * const processingLogWithIdOnly = await prisma.processingLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProcessingLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ProcessingLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a ProcessingLog.
     * @param {ProcessingLogDeleteArgs} args - Arguments to delete one ProcessingLog.
     * @example
     * // Delete one ProcessingLog
     * const ProcessingLog = await prisma.processingLog.delete({
     *   where: {
     *     // ... filter to delete one ProcessingLog
     *   }
     * })
     * 
     */
    delete<T extends ProcessingLogDeleteArgs>(args: SelectSubset<T, ProcessingLogDeleteArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one ProcessingLog.
     * @param {ProcessingLogUpdateArgs} args - Arguments to update one ProcessingLog.
     * @example
     * // Update one ProcessingLog
     * const processingLog = await prisma.processingLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProcessingLogUpdateArgs>(args: SelectSubset<T, ProcessingLogUpdateArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more ProcessingLogs.
     * @param {ProcessingLogDeleteManyArgs} args - Arguments to filter ProcessingLogs to delete.
     * @example
     * // Delete a few ProcessingLogs
     * const { count } = await prisma.processingLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProcessingLogDeleteManyArgs>(args?: SelectSubset<T, ProcessingLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProcessingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProcessingLogs
     * const processingLog = await prisma.processingLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProcessingLogUpdateManyArgs>(args: SelectSubset<T, ProcessingLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProcessingLog.
     * @param {ProcessingLogUpsertArgs} args - Arguments to update or create a ProcessingLog.
     * @example
     * // Update or create a ProcessingLog
     * const processingLog = await prisma.processingLog.upsert({
     *   create: {
     *     // ... data to create a ProcessingLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProcessingLog we want to update
     *   }
     * })
     */
    upsert<T extends ProcessingLogUpsertArgs>(args: SelectSubset<T, ProcessingLogUpsertArgs<ExtArgs>>): Prisma__ProcessingLogClient<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of ProcessingLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogCountArgs} args - Arguments to filter ProcessingLogs to count.
     * @example
     * // Count the number of ProcessingLogs
     * const count = await prisma.processingLog.count({
     *   where: {
     *     // ... the filter for the ProcessingLogs we want to count
     *   }
     * })
    **/
    count<T extends ProcessingLogCountArgs>(
      args?: Subset<T, ProcessingLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProcessingLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProcessingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProcessingLogAggregateArgs>(args: Subset<T, ProcessingLogAggregateArgs>): Prisma.PrismaPromise<GetProcessingLogAggregateType<T>>

    /**
     * Group by ProcessingLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProcessingLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProcessingLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProcessingLogGroupByArgs['orderBy'] }
        : { orderBy?: ProcessingLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProcessingLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProcessingLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProcessingLog model
   */
  readonly fields: ProcessingLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProcessingLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProcessingLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    batch<T extends BatchDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BatchDefaultArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProcessingLog model
   */ 
  interface ProcessingLogFieldRefs {
    readonly id: FieldRef<"ProcessingLog", 'String'>
    readonly batchId: FieldRef<"ProcessingLog", 'String'>
    readonly msisdn: FieldRef<"ProcessingLog", 'String'>
    readonly amount: FieldRef<"ProcessingLog", 'Int'>
    readonly status: FieldRef<"ProcessingLog", 'ProcessingStatus'>
    readonly creditResponse: FieldRef<"ProcessingLog", 'Json'>
    readonly smsStatus: FieldRef<"ProcessingLog", 'String'>
    readonly errorMessage: FieldRef<"ProcessingLog", 'String'>
    readonly processedAt: FieldRef<"ProcessingLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ProcessingLog findUnique
   */
  export type ProcessingLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingLog to fetch.
     */
    where: ProcessingLogWhereUniqueInput
  }

  /**
   * ProcessingLog findUniqueOrThrow
   */
  export type ProcessingLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingLog to fetch.
     */
    where: ProcessingLogWhereUniqueInput
  }

  /**
   * ProcessingLog findFirst
   */
  export type ProcessingLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingLog to fetch.
     */
    where?: ProcessingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingLogs to fetch.
     */
    orderBy?: ProcessingLogOrderByWithRelationInput | ProcessingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingLogs.
     */
    cursor?: ProcessingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingLogs.
     */
    distinct?: ProcessingLogScalarFieldEnum | ProcessingLogScalarFieldEnum[]
  }

  /**
   * ProcessingLog findFirstOrThrow
   */
  export type ProcessingLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingLog to fetch.
     */
    where?: ProcessingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingLogs to fetch.
     */
    orderBy?: ProcessingLogOrderByWithRelationInput | ProcessingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProcessingLogs.
     */
    cursor?: ProcessingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProcessingLogs.
     */
    distinct?: ProcessingLogScalarFieldEnum | ProcessingLogScalarFieldEnum[]
  }

  /**
   * ProcessingLog findMany
   */
  export type ProcessingLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter, which ProcessingLogs to fetch.
     */
    where?: ProcessingLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProcessingLogs to fetch.
     */
    orderBy?: ProcessingLogOrderByWithRelationInput | ProcessingLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProcessingLogs.
     */
    cursor?: ProcessingLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProcessingLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProcessingLogs.
     */
    skip?: number
    distinct?: ProcessingLogScalarFieldEnum | ProcessingLogScalarFieldEnum[]
  }

  /**
   * ProcessingLog create
   */
  export type ProcessingLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ProcessingLog.
     */
    data: XOR<ProcessingLogCreateInput, ProcessingLogUncheckedCreateInput>
  }

  /**
   * ProcessingLog createMany
   */
  export type ProcessingLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProcessingLogs.
     */
    data: ProcessingLogCreateManyInput | ProcessingLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProcessingLog createManyAndReturn
   */
  export type ProcessingLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many ProcessingLogs.
     */
    data: ProcessingLogCreateManyInput | ProcessingLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ProcessingLog update
   */
  export type ProcessingLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ProcessingLog.
     */
    data: XOR<ProcessingLogUpdateInput, ProcessingLogUncheckedUpdateInput>
    /**
     * Choose, which ProcessingLog to update.
     */
    where: ProcessingLogWhereUniqueInput
  }

  /**
   * ProcessingLog updateMany
   */
  export type ProcessingLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProcessingLogs.
     */
    data: XOR<ProcessingLogUpdateManyMutationInput, ProcessingLogUncheckedUpdateManyInput>
    /**
     * Filter which ProcessingLogs to update
     */
    where?: ProcessingLogWhereInput
  }

  /**
   * ProcessingLog upsert
   */
  export type ProcessingLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ProcessingLog to update in case it exists.
     */
    where: ProcessingLogWhereUniqueInput
    /**
     * In case the ProcessingLog found by the `where` argument doesn't exist, create a new ProcessingLog with this data.
     */
    create: XOR<ProcessingLogCreateInput, ProcessingLogUncheckedCreateInput>
    /**
     * In case the ProcessingLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProcessingLogUpdateInput, ProcessingLogUncheckedUpdateInput>
  }

  /**
   * ProcessingLog delete
   */
  export type ProcessingLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    /**
     * Filter which ProcessingLog to delete.
     */
    where: ProcessingLogWhereUniqueInput
  }

  /**
   * ProcessingLog deleteMany
   */
  export type ProcessingLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProcessingLogs to delete
     */
    where?: ProcessingLogWhereInput
  }

  /**
   * ProcessingLog without action
   */
  export type ProcessingLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
  }


  /**
   * Model Batch
   */

  export type AggregateBatch = {
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  export type BatchAvgAggregateOutputType = {
    total_amount: number | null
  }

  export type BatchSumAggregateOutputType = {
    total_amount: number | null
  }

  export type BatchMinAggregateOutputType = {
    id: string | null
    batch_no: string | null
    particulars: string | null
    status: $Enums.BatchStatus | null
    csv: string | null
    total_amount: number | null
    date_initiated: Date | null
    date_approved: Date | null
    approvedById: string | null
    rejectedById: string | null
  }

  export type BatchMaxAggregateOutputType = {
    id: string | null
    batch_no: string | null
    particulars: string | null
    status: $Enums.BatchStatus | null
    csv: string | null
    total_amount: number | null
    date_initiated: Date | null
    date_approved: Date | null
    approvedById: string | null
    rejectedById: string | null
  }

  export type BatchCountAggregateOutputType = {
    id: number
    batch_no: number
    particulars: number
    status: number
    csv: number
    total_amount: number
    date_initiated: number
    date_approved: number
    approvedById: number
    rejectedById: number
    _all: number
  }


  export type BatchAvgAggregateInputType = {
    total_amount?: true
  }

  export type BatchSumAggregateInputType = {
    total_amount?: true
  }

  export type BatchMinAggregateInputType = {
    id?: true
    batch_no?: true
    particulars?: true
    status?: true
    csv?: true
    total_amount?: true
    date_initiated?: true
    date_approved?: true
    approvedById?: true
    rejectedById?: true
  }

  export type BatchMaxAggregateInputType = {
    id?: true
    batch_no?: true
    particulars?: true
    status?: true
    csv?: true
    total_amount?: true
    date_initiated?: true
    date_approved?: true
    approvedById?: true
    rejectedById?: true
  }

  export type BatchCountAggregateInputType = {
    id?: true
    batch_no?: true
    particulars?: true
    status?: true
    csv?: true
    total_amount?: true
    date_initiated?: true
    date_approved?: true
    approvedById?: true
    rejectedById?: true
    _all?: true
  }

  export type BatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batch to aggregate.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Batches
    **/
    _count?: true | BatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BatchMaxAggregateInputType
  }

  export type GetBatchAggregateType<T extends BatchAggregateArgs> = {
        [P in keyof T & keyof AggregateBatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBatch[P]>
      : GetScalarType<T[P], AggregateBatch[P]>
  }




  export type BatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BatchWhereInput
    orderBy?: BatchOrderByWithAggregationInput | BatchOrderByWithAggregationInput[]
    by: BatchScalarFieldEnum[] | BatchScalarFieldEnum
    having?: BatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BatchCountAggregateInputType | true
    _avg?: BatchAvgAggregateInputType
    _sum?: BatchSumAggregateInputType
    _min?: BatchMinAggregateInputType
    _max?: BatchMaxAggregateInputType
  }

  export type BatchGroupByOutputType = {
    id: string
    batch_no: string
    particulars: string
    status: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date
    date_approved: Date | null
    approvedById: string | null
    rejectedById: string | null
    _count: BatchCountAggregateOutputType | null
    _avg: BatchAvgAggregateOutputType | null
    _sum: BatchSumAggregateOutputType | null
    _min: BatchMinAggregateOutputType | null
    _max: BatchMaxAggregateOutputType | null
  }

  type GetBatchGroupByPayload<T extends BatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BatchGroupByOutputType[P]>
            : GetScalarType<T[P], BatchGroupByOutputType[P]>
        }
      >
    >


  export type BatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batch_no?: boolean
    particulars?: boolean
    status?: boolean
    csv?: boolean
    total_amount?: boolean
    date_initiated?: boolean
    date_approved?: boolean
    approvedById?: boolean
    rejectedById?: boolean
    recipients?: boolean | Batch$recipientsArgs<ExtArgs>
    processingLogs?: boolean | Batch$processingLogsArgs<ExtArgs>
    approvedBy?: boolean | Batch$approvedByArgs<ExtArgs>
    rejectedBy?: boolean | Batch$rejectedByArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    batch_no?: boolean
    particulars?: boolean
    status?: boolean
    csv?: boolean
    total_amount?: boolean
    date_initiated?: boolean
    date_approved?: boolean
    approvedById?: boolean
    rejectedById?: boolean
    approvedBy?: boolean | Batch$approvedByArgs<ExtArgs>
    rejectedBy?: boolean | Batch$rejectedByArgs<ExtArgs>
  }, ExtArgs["result"]["batch"]>

  export type BatchSelectScalar = {
    id?: boolean
    batch_no?: boolean
    particulars?: boolean
    status?: boolean
    csv?: boolean
    total_amount?: boolean
    date_initiated?: boolean
    date_approved?: boolean
    approvedById?: boolean
    rejectedById?: boolean
  }

  export type BatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    recipients?: boolean | Batch$recipientsArgs<ExtArgs>
    processingLogs?: boolean | Batch$processingLogsArgs<ExtArgs>
    approvedBy?: boolean | Batch$approvedByArgs<ExtArgs>
    rejectedBy?: boolean | Batch$rejectedByArgs<ExtArgs>
    _count?: boolean | BatchCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approvedBy?: boolean | Batch$approvedByArgs<ExtArgs>
    rejectedBy?: boolean | Batch$rejectedByArgs<ExtArgs>
  }

  export type $BatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Batch"
    objects: {
      recipients: Prisma.$CustomerPayload<ExtArgs>[]
      processingLogs: Prisma.$ProcessingLogPayload<ExtArgs>[]
      approvedBy: Prisma.$UserPayload<ExtArgs> | null
      rejectedBy: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      batch_no: string
      particulars: string
      status: $Enums.BatchStatus
      csv: string
      total_amount: number
      date_initiated: Date
      date_approved: Date | null
      approvedById: string | null
      rejectedById: string | null
    }, ExtArgs["result"]["batch"]>
    composites: {}
  }

  type BatchGetPayload<S extends boolean | null | undefined | BatchDefaultArgs> = $Result.GetResult<Prisma.$BatchPayload, S>

  type BatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BatchFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BatchCountAggregateInputType | true
    }

  export interface BatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Batch'], meta: { name: 'Batch' } }
    /**
     * Find zero or one Batch that matches the filter.
     * @param {BatchFindUniqueArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BatchFindUniqueArgs>(args: SelectSubset<T, BatchFindUniqueArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Batch that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BatchFindUniqueOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BatchFindUniqueOrThrowArgs>(args: SelectSubset<T, BatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Batch that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BatchFindFirstArgs>(args?: SelectSubset<T, BatchFindFirstArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Batch that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindFirstOrThrowArgs} args - Arguments to find a Batch
     * @example
     * // Get one Batch
     * const batch = await prisma.batch.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BatchFindFirstOrThrowArgs>(args?: SelectSubset<T, BatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Batches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Batches
     * const batches = await prisma.batch.findMany()
     * 
     * // Get first 10 Batches
     * const batches = await prisma.batch.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const batchWithIdOnly = await prisma.batch.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BatchFindManyArgs>(args?: SelectSubset<T, BatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Batch.
     * @param {BatchCreateArgs} args - Arguments to create a Batch.
     * @example
     * // Create one Batch
     * const Batch = await prisma.batch.create({
     *   data: {
     *     // ... data to create a Batch
     *   }
     * })
     * 
     */
    create<T extends BatchCreateArgs>(args: SelectSubset<T, BatchCreateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Batches.
     * @param {BatchCreateManyArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BatchCreateManyArgs>(args?: SelectSubset<T, BatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Batches and returns the data saved in the database.
     * @param {BatchCreateManyAndReturnArgs} args - Arguments to create many Batches.
     * @example
     * // Create many Batches
     * const batch = await prisma.batch.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Batches and only return the `id`
     * const batchWithIdOnly = await prisma.batch.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BatchCreateManyAndReturnArgs>(args?: SelectSubset<T, BatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Batch.
     * @param {BatchDeleteArgs} args - Arguments to delete one Batch.
     * @example
     * // Delete one Batch
     * const Batch = await prisma.batch.delete({
     *   where: {
     *     // ... filter to delete one Batch
     *   }
     * })
     * 
     */
    delete<T extends BatchDeleteArgs>(args: SelectSubset<T, BatchDeleteArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Batch.
     * @param {BatchUpdateArgs} args - Arguments to update one Batch.
     * @example
     * // Update one Batch
     * const batch = await prisma.batch.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BatchUpdateArgs>(args: SelectSubset<T, BatchUpdateArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Batches.
     * @param {BatchDeleteManyArgs} args - Arguments to filter Batches to delete.
     * @example
     * // Delete a few Batches
     * const { count } = await prisma.batch.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BatchDeleteManyArgs>(args?: SelectSubset<T, BatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Batches
     * const batch = await prisma.batch.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BatchUpdateManyArgs>(args: SelectSubset<T, BatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Batch.
     * @param {BatchUpsertArgs} args - Arguments to update or create a Batch.
     * @example
     * // Update or create a Batch
     * const batch = await prisma.batch.upsert({
     *   create: {
     *     // ... data to create a Batch
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Batch we want to update
     *   }
     * })
     */
    upsert<T extends BatchUpsertArgs>(args: SelectSubset<T, BatchUpsertArgs<ExtArgs>>): Prisma__BatchClient<$Result.GetResult<Prisma.$BatchPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Batches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchCountArgs} args - Arguments to filter Batches to count.
     * @example
     * // Count the number of Batches
     * const count = await prisma.batch.count({
     *   where: {
     *     // ... the filter for the Batches we want to count
     *   }
     * })
    **/
    count<T extends BatchCountArgs>(
      args?: Subset<T, BatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BatchAggregateArgs>(args: Subset<T, BatchAggregateArgs>): Prisma.PrismaPromise<GetBatchAggregateType<T>>

    /**
     * Group by Batch.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BatchGroupByArgs['orderBy'] }
        : { orderBy?: BatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Batch model
   */
  readonly fields: BatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Batch.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    recipients<T extends Batch$recipientsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$recipientsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany"> | Null>
    processingLogs<T extends Batch$processingLogsArgs<ExtArgs> = {}>(args?: Subset<T, Batch$processingLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProcessingLogPayload<ExtArgs>, T, "findMany"> | Null>
    approvedBy<T extends Batch$approvedByArgs<ExtArgs> = {}>(args?: Subset<T, Batch$approvedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    rejectedBy<T extends Batch$rejectedByArgs<ExtArgs> = {}>(args?: Subset<T, Batch$rejectedByArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Batch model
   */ 
  interface BatchFieldRefs {
    readonly id: FieldRef<"Batch", 'String'>
    readonly batch_no: FieldRef<"Batch", 'String'>
    readonly particulars: FieldRef<"Batch", 'String'>
    readonly status: FieldRef<"Batch", 'BatchStatus'>
    readonly csv: FieldRef<"Batch", 'String'>
    readonly total_amount: FieldRef<"Batch", 'Int'>
    readonly date_initiated: FieldRef<"Batch", 'DateTime'>
    readonly date_approved: FieldRef<"Batch", 'DateTime'>
    readonly approvedById: FieldRef<"Batch", 'String'>
    readonly rejectedById: FieldRef<"Batch", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Batch findUnique
   */
  export type BatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findUniqueOrThrow
   */
  export type BatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch findFirst
   */
  export type BatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findFirstOrThrow
   */
  export type BatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batch to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Batches.
     */
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch findMany
   */
  export type BatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter, which Batches to fetch.
     */
    where?: BatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Batches to fetch.
     */
    orderBy?: BatchOrderByWithRelationInput | BatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Batches.
     */
    cursor?: BatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Batches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Batches.
     */
    skip?: number
    distinct?: BatchScalarFieldEnum | BatchScalarFieldEnum[]
  }

  /**
   * Batch create
   */
  export type BatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Batch.
     */
    data: XOR<BatchCreateInput, BatchUncheckedCreateInput>
  }

  /**
   * Batch createMany
   */
  export type BatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Batch createManyAndReturn
   */
  export type BatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Batches.
     */
    data: BatchCreateManyInput | BatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Batch update
   */
  export type BatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Batch.
     */
    data: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
    /**
     * Choose, which Batch to update.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch updateMany
   */
  export type BatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Batches.
     */
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyInput>
    /**
     * Filter which Batches to update
     */
    where?: BatchWhereInput
  }

  /**
   * Batch upsert
   */
  export type BatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Batch to update in case it exists.
     */
    where: BatchWhereUniqueInput
    /**
     * In case the Batch found by the `where` argument doesn't exist, create a new Batch with this data.
     */
    create: XOR<BatchCreateInput, BatchUncheckedCreateInput>
    /**
     * In case the Batch was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BatchUpdateInput, BatchUncheckedUpdateInput>
  }

  /**
   * Batch delete
   */
  export type BatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
    /**
     * Filter which Batch to delete.
     */
    where: BatchWhereUniqueInput
  }

  /**
   * Batch deleteMany
   */
  export type BatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Batches to delete
     */
    where?: BatchWhereInput
  }

  /**
   * Batch.recipients
   */
  export type Batch$recipientsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    cursor?: CustomerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Batch.processingLogs
   */
  export type Batch$processingLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProcessingLog
     */
    select?: ProcessingLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProcessingLogInclude<ExtArgs> | null
    where?: ProcessingLogWhereInput
    orderBy?: ProcessingLogOrderByWithRelationInput | ProcessingLogOrderByWithRelationInput[]
    cursor?: ProcessingLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProcessingLogScalarFieldEnum | ProcessingLogScalarFieldEnum[]
  }

  /**
   * Batch.approvedBy
   */
  export type Batch$approvedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Batch.rejectedBy
   */
  export type Batch$rejectedByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Batch without action
   */
  export type BatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Batch
     */
    select?: BatchSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BatchInclude<ExtArgs> | null
  }


  /**
   * Model Promo
   */

  export type AggregatePromo = {
    _count: PromoCountAggregateOutputType | null
    _avg: PromoAvgAggregateOutputType | null
    _sum: PromoSumAggregateOutputType | null
    _min: PromoMinAggregateOutputType | null
    _max: PromoMaxAggregateOutputType | null
  }

  export type PromoAvgAggregateOutputType = {
    amount: number | null
  }

  export type PromoSumAggregateOutputType = {
    amount: number | null
  }

  export type PromoMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    carousel_image: string | null
    image: string | null
    start: Date | null
    end: Date | null
    term_and_conditions: string | null
    amount: number | null
    is_active: boolean | null
    uploaded_by_id: string | null
  }

  export type PromoMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    carousel_image: string | null
    image: string | null
    start: Date | null
    end: Date | null
    term_and_conditions: string | null
    amount: number | null
    is_active: boolean | null
    uploaded_by_id: string | null
  }

  export type PromoCountAggregateOutputType = {
    id: number
    title: number
    description: number
    info: number
    carousel_image: number
    image: number
    start: number
    end: number
    term_and_conditions: number
    amount: number
    is_active: number
    uploaded_by_id: number
    _all: number
  }


  export type PromoAvgAggregateInputType = {
    amount?: true
  }

  export type PromoSumAggregateInputType = {
    amount?: true
  }

  export type PromoMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    carousel_image?: true
    image?: true
    start?: true
    end?: true
    term_and_conditions?: true
    amount?: true
    is_active?: true
    uploaded_by_id?: true
  }

  export type PromoMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    carousel_image?: true
    image?: true
    start?: true
    end?: true
    term_and_conditions?: true
    amount?: true
    is_active?: true
    uploaded_by_id?: true
  }

  export type PromoCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    info?: true
    carousel_image?: true
    image?: true
    start?: true
    end?: true
    term_and_conditions?: true
    amount?: true
    is_active?: true
    uploaded_by_id?: true
    _all?: true
  }

  export type PromoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promo to aggregate.
     */
    where?: PromoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promos to fetch.
     */
    orderBy?: PromoOrderByWithRelationInput | PromoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PromoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Promos
    **/
    _count?: true | PromoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PromoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PromoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PromoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PromoMaxAggregateInputType
  }

  export type GetPromoAggregateType<T extends PromoAggregateArgs> = {
        [P in keyof T & keyof AggregatePromo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePromo[P]>
      : GetScalarType<T[P], AggregatePromo[P]>
  }




  export type PromoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PromoWhereInput
    orderBy?: PromoOrderByWithAggregationInput | PromoOrderByWithAggregationInput[]
    by: PromoScalarFieldEnum[] | PromoScalarFieldEnum
    having?: PromoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PromoCountAggregateInputType | true
    _avg?: PromoAvgAggregateInputType
    _sum?: PromoSumAggregateInputType
    _min?: PromoMinAggregateInputType
    _max?: PromoMaxAggregateInputType
  }

  export type PromoGroupByOutputType = {
    id: string
    title: string
    description: string
    info: JsonValue
    carousel_image: string
    image: string
    start: Date
    end: Date | null
    term_and_conditions: string | null
    amount: number | null
    is_active: boolean
    uploaded_by_id: string | null
    _count: PromoCountAggregateOutputType | null
    _avg: PromoAvgAggregateOutputType | null
    _sum: PromoSumAggregateOutputType | null
    _min: PromoMinAggregateOutputType | null
    _max: PromoMaxAggregateOutputType | null
  }

  type GetPromoGroupByPayload<T extends PromoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PromoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PromoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PromoGroupByOutputType[P]>
            : GetScalarType<T[P], PromoGroupByOutputType[P]>
        }
      >
    >


  export type PromoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    info?: boolean
    carousel_image?: boolean
    image?: boolean
    start?: boolean
    end?: boolean
    term_and_conditions?: boolean
    amount?: boolean
    is_active?: boolean
    uploaded_by_id?: boolean
    uploaded_by?: boolean | Promo$uploaded_byArgs<ExtArgs>
  }, ExtArgs["result"]["promo"]>

  export type PromoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    info?: boolean
    carousel_image?: boolean
    image?: boolean
    start?: boolean
    end?: boolean
    term_and_conditions?: boolean
    amount?: boolean
    is_active?: boolean
    uploaded_by_id?: boolean
    uploaded_by?: boolean | Promo$uploaded_byArgs<ExtArgs>
  }, ExtArgs["result"]["promo"]>

  export type PromoSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    info?: boolean
    carousel_image?: boolean
    image?: boolean
    start?: boolean
    end?: boolean
    term_and_conditions?: boolean
    amount?: boolean
    is_active?: boolean
    uploaded_by_id?: boolean
  }

  export type PromoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploaded_by?: boolean | Promo$uploaded_byArgs<ExtArgs>
  }
  export type PromoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploaded_by?: boolean | Promo$uploaded_byArgs<ExtArgs>
  }

  export type $PromoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Promo"
    objects: {
      uploaded_by: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string
      info: Prisma.JsonValue
      carousel_image: string
      image: string
      start: Date
      end: Date | null
      term_and_conditions: string | null
      amount: number | null
      is_active: boolean
      uploaded_by_id: string | null
    }, ExtArgs["result"]["promo"]>
    composites: {}
  }

  type PromoGetPayload<S extends boolean | null | undefined | PromoDefaultArgs> = $Result.GetResult<Prisma.$PromoPayload, S>

  type PromoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PromoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PromoCountAggregateInputType | true
    }

  export interface PromoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Promo'], meta: { name: 'Promo' } }
    /**
     * Find zero or one Promo that matches the filter.
     * @param {PromoFindUniqueArgs} args - Arguments to find a Promo
     * @example
     * // Get one Promo
     * const promo = await prisma.promo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PromoFindUniqueArgs>(args: SelectSubset<T, PromoFindUniqueArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Promo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PromoFindUniqueOrThrowArgs} args - Arguments to find a Promo
     * @example
     * // Get one Promo
     * const promo = await prisma.promo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PromoFindUniqueOrThrowArgs>(args: SelectSubset<T, PromoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Promo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoFindFirstArgs} args - Arguments to find a Promo
     * @example
     * // Get one Promo
     * const promo = await prisma.promo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PromoFindFirstArgs>(args?: SelectSubset<T, PromoFindFirstArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Promo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoFindFirstOrThrowArgs} args - Arguments to find a Promo
     * @example
     * // Get one Promo
     * const promo = await prisma.promo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PromoFindFirstOrThrowArgs>(args?: SelectSubset<T, PromoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Promos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Promos
     * const promos = await prisma.promo.findMany()
     * 
     * // Get first 10 Promos
     * const promos = await prisma.promo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const promoWithIdOnly = await prisma.promo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PromoFindManyArgs>(args?: SelectSubset<T, PromoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Promo.
     * @param {PromoCreateArgs} args - Arguments to create a Promo.
     * @example
     * // Create one Promo
     * const Promo = await prisma.promo.create({
     *   data: {
     *     // ... data to create a Promo
     *   }
     * })
     * 
     */
    create<T extends PromoCreateArgs>(args: SelectSubset<T, PromoCreateArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Promos.
     * @param {PromoCreateManyArgs} args - Arguments to create many Promos.
     * @example
     * // Create many Promos
     * const promo = await prisma.promo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PromoCreateManyArgs>(args?: SelectSubset<T, PromoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Promos and returns the data saved in the database.
     * @param {PromoCreateManyAndReturnArgs} args - Arguments to create many Promos.
     * @example
     * // Create many Promos
     * const promo = await prisma.promo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Promos and only return the `id`
     * const promoWithIdOnly = await prisma.promo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PromoCreateManyAndReturnArgs>(args?: SelectSubset<T, PromoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Promo.
     * @param {PromoDeleteArgs} args - Arguments to delete one Promo.
     * @example
     * // Delete one Promo
     * const Promo = await prisma.promo.delete({
     *   where: {
     *     // ... filter to delete one Promo
     *   }
     * })
     * 
     */
    delete<T extends PromoDeleteArgs>(args: SelectSubset<T, PromoDeleteArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Promo.
     * @param {PromoUpdateArgs} args - Arguments to update one Promo.
     * @example
     * // Update one Promo
     * const promo = await prisma.promo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PromoUpdateArgs>(args: SelectSubset<T, PromoUpdateArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Promos.
     * @param {PromoDeleteManyArgs} args - Arguments to filter Promos to delete.
     * @example
     * // Delete a few Promos
     * const { count } = await prisma.promo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PromoDeleteManyArgs>(args?: SelectSubset<T, PromoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Promos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Promos
     * const promo = await prisma.promo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PromoUpdateManyArgs>(args: SelectSubset<T, PromoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Promo.
     * @param {PromoUpsertArgs} args - Arguments to update or create a Promo.
     * @example
     * // Update or create a Promo
     * const promo = await prisma.promo.upsert({
     *   create: {
     *     // ... data to create a Promo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Promo we want to update
     *   }
     * })
     */
    upsert<T extends PromoUpsertArgs>(args: SelectSubset<T, PromoUpsertArgs<ExtArgs>>): Prisma__PromoClient<$Result.GetResult<Prisma.$PromoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Promos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoCountArgs} args - Arguments to filter Promos to count.
     * @example
     * // Count the number of Promos
     * const count = await prisma.promo.count({
     *   where: {
     *     // ... the filter for the Promos we want to count
     *   }
     * })
    **/
    count<T extends PromoCountArgs>(
      args?: Subset<T, PromoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PromoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Promo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PromoAggregateArgs>(args: Subset<T, PromoAggregateArgs>): Prisma.PrismaPromise<GetPromoAggregateType<T>>

    /**
     * Group by Promo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PromoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PromoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PromoGroupByArgs['orderBy'] }
        : { orderBy?: PromoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PromoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPromoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Promo model
   */
  readonly fields: PromoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Promo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PromoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploaded_by<T extends Promo$uploaded_byArgs<ExtArgs> = {}>(args?: Subset<T, Promo$uploaded_byArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Promo model
   */ 
  interface PromoFieldRefs {
    readonly id: FieldRef<"Promo", 'String'>
    readonly title: FieldRef<"Promo", 'String'>
    readonly description: FieldRef<"Promo", 'String'>
    readonly info: FieldRef<"Promo", 'Json'>
    readonly carousel_image: FieldRef<"Promo", 'String'>
    readonly image: FieldRef<"Promo", 'String'>
    readonly start: FieldRef<"Promo", 'DateTime'>
    readonly end: FieldRef<"Promo", 'DateTime'>
    readonly term_and_conditions: FieldRef<"Promo", 'String'>
    readonly amount: FieldRef<"Promo", 'Int'>
    readonly is_active: FieldRef<"Promo", 'Boolean'>
    readonly uploaded_by_id: FieldRef<"Promo", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Promo findUnique
   */
  export type PromoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter, which Promo to fetch.
     */
    where: PromoWhereUniqueInput
  }

  /**
   * Promo findUniqueOrThrow
   */
  export type PromoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter, which Promo to fetch.
     */
    where: PromoWhereUniqueInput
  }

  /**
   * Promo findFirst
   */
  export type PromoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter, which Promo to fetch.
     */
    where?: PromoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promos to fetch.
     */
    orderBy?: PromoOrderByWithRelationInput | PromoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promos.
     */
    cursor?: PromoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promos.
     */
    distinct?: PromoScalarFieldEnum | PromoScalarFieldEnum[]
  }

  /**
   * Promo findFirstOrThrow
   */
  export type PromoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter, which Promo to fetch.
     */
    where?: PromoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promos to fetch.
     */
    orderBy?: PromoOrderByWithRelationInput | PromoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Promos.
     */
    cursor?: PromoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Promos.
     */
    distinct?: PromoScalarFieldEnum | PromoScalarFieldEnum[]
  }

  /**
   * Promo findMany
   */
  export type PromoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter, which Promos to fetch.
     */
    where?: PromoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Promos to fetch.
     */
    orderBy?: PromoOrderByWithRelationInput | PromoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Promos.
     */
    cursor?: PromoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Promos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Promos.
     */
    skip?: number
    distinct?: PromoScalarFieldEnum | PromoScalarFieldEnum[]
  }

  /**
   * Promo create
   */
  export type PromoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * The data needed to create a Promo.
     */
    data: XOR<PromoCreateInput, PromoUncheckedCreateInput>
  }

  /**
   * Promo createMany
   */
  export type PromoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Promos.
     */
    data: PromoCreateManyInput | PromoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Promo createManyAndReturn
   */
  export type PromoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Promos.
     */
    data: PromoCreateManyInput | PromoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Promo update
   */
  export type PromoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * The data needed to update a Promo.
     */
    data: XOR<PromoUpdateInput, PromoUncheckedUpdateInput>
    /**
     * Choose, which Promo to update.
     */
    where: PromoWhereUniqueInput
  }

  /**
   * Promo updateMany
   */
  export type PromoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Promos.
     */
    data: XOR<PromoUpdateManyMutationInput, PromoUncheckedUpdateManyInput>
    /**
     * Filter which Promos to update
     */
    where?: PromoWhereInput
  }

  /**
   * Promo upsert
   */
  export type PromoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * The filter to search for the Promo to update in case it exists.
     */
    where: PromoWhereUniqueInput
    /**
     * In case the Promo found by the `where` argument doesn't exist, create a new Promo with this data.
     */
    create: XOR<PromoCreateInput, PromoUncheckedCreateInput>
    /**
     * In case the Promo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PromoUpdateInput, PromoUncheckedUpdateInput>
  }

  /**
   * Promo delete
   */
  export type PromoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
    /**
     * Filter which Promo to delete.
     */
    where: PromoWhereUniqueInput
  }

  /**
   * Promo deleteMany
   */
  export type PromoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Promos to delete
     */
    where?: PromoWhereInput
  }

  /**
   * Promo.uploaded_by
   */
  export type Promo$uploaded_byArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Promo without action
   */
  export type PromoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Promo
     */
    select?: PromoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PromoInclude<ExtArgs> | null
  }


  /**
   * Model CreditLog
   */

  export type AggregateCreditLog = {
    _count: CreditLogCountAggregateOutputType | null
    _avg: CreditLogAvgAggregateOutputType | null
    _sum: CreditLogSumAggregateOutputType | null
    _min: CreditLogMinAggregateOutputType | null
    _max: CreditLogMaxAggregateOutputType | null
  }

  export type CreditLogAvgAggregateOutputType = {
    amount: number | null
  }

  export type CreditLogSumAggregateOutputType = {
    amount: number | null
  }

  export type CreditLogMinAggregateOutputType = {
    id: string | null
    playerId: string | null
    msisdn: string | null
    amount: number | null
    subject: string | null
    description: string | null
    status: $Enums.ProcessingStatus | null
    smsStatus: string | null
    errorMessage: string | null
    creditedAt: Date | null
    creditedById: string | null
  }

  export type CreditLogMaxAggregateOutputType = {
    id: string | null
    playerId: string | null
    msisdn: string | null
    amount: number | null
    subject: string | null
    description: string | null
    status: $Enums.ProcessingStatus | null
    smsStatus: string | null
    errorMessage: string | null
    creditedAt: Date | null
    creditedById: string | null
  }

  export type CreditLogCountAggregateOutputType = {
    id: number
    playerId: number
    msisdn: number
    amount: number
    subject: number
    description: number
    status: number
    creditResponse: number
    smsStatus: number
    errorMessage: number
    creditedAt: number
    creditedById: number
    _all: number
  }


  export type CreditLogAvgAggregateInputType = {
    amount?: true
  }

  export type CreditLogSumAggregateInputType = {
    amount?: true
  }

  export type CreditLogMinAggregateInputType = {
    id?: true
    playerId?: true
    msisdn?: true
    amount?: true
    subject?: true
    description?: true
    status?: true
    smsStatus?: true
    errorMessage?: true
    creditedAt?: true
    creditedById?: true
  }

  export type CreditLogMaxAggregateInputType = {
    id?: true
    playerId?: true
    msisdn?: true
    amount?: true
    subject?: true
    description?: true
    status?: true
    smsStatus?: true
    errorMessage?: true
    creditedAt?: true
    creditedById?: true
  }

  export type CreditLogCountAggregateInputType = {
    id?: true
    playerId?: true
    msisdn?: true
    amount?: true
    subject?: true
    description?: true
    status?: true
    creditResponse?: true
    smsStatus?: true
    errorMessage?: true
    creditedAt?: true
    creditedById?: true
    _all?: true
  }

  export type CreditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditLog to aggregate.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned CreditLogs
    **/
    _count?: true | CreditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CreditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CreditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CreditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CreditLogMaxAggregateInputType
  }

  export type GetCreditLogAggregateType<T extends CreditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateCreditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCreditLog[P]>
      : GetScalarType<T[P], AggregateCreditLog[P]>
  }




  export type CreditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CreditLogWhereInput
    orderBy?: CreditLogOrderByWithAggregationInput | CreditLogOrderByWithAggregationInput[]
    by: CreditLogScalarFieldEnum[] | CreditLogScalarFieldEnum
    having?: CreditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CreditLogCountAggregateInputType | true
    _avg?: CreditLogAvgAggregateInputType
    _sum?: CreditLogSumAggregateInputType
    _min?: CreditLogMinAggregateInputType
    _max?: CreditLogMaxAggregateInputType
  }

  export type CreditLogGroupByOutputType = {
    id: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description: string | null
    status: $Enums.ProcessingStatus
    creditResponse: JsonValue | null
    smsStatus: string | null
    errorMessage: string | null
    creditedAt: Date
    creditedById: string
    _count: CreditLogCountAggregateOutputType | null
    _avg: CreditLogAvgAggregateOutputType | null
    _sum: CreditLogSumAggregateOutputType | null
    _min: CreditLogMinAggregateOutputType | null
    _max: CreditLogMaxAggregateOutputType | null
  }

  type GetCreditLogGroupByPayload<T extends CreditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CreditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CreditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CreditLogGroupByOutputType[P]>
            : GetScalarType<T[P], CreditLogGroupByOutputType[P]>
        }
      >
    >


  export type CreditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    msisdn?: boolean
    amount?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    creditedAt?: boolean
    creditedById?: boolean
    creditedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditLog"]>

  export type CreditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    playerId?: boolean
    msisdn?: boolean
    amount?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    creditedAt?: boolean
    creditedById?: boolean
    creditedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["creditLog"]>

  export type CreditLogSelectScalar = {
    id?: boolean
    playerId?: boolean
    msisdn?: boolean
    amount?: boolean
    subject?: boolean
    description?: boolean
    status?: boolean
    creditResponse?: boolean
    smsStatus?: boolean
    errorMessage?: boolean
    creditedAt?: boolean
    creditedById?: boolean
  }

  export type CreditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creditedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type CreditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    creditedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $CreditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "CreditLog"
    objects: {
      creditedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      playerId: string
      msisdn: string
      amount: number
      subject: string
      description: string | null
      status: $Enums.ProcessingStatus
      creditResponse: Prisma.JsonValue | null
      smsStatus: string | null
      errorMessage: string | null
      creditedAt: Date
      creditedById: string
    }, ExtArgs["result"]["creditLog"]>
    composites: {}
  }

  type CreditLogGetPayload<S extends boolean | null | undefined | CreditLogDefaultArgs> = $Result.GetResult<Prisma.$CreditLogPayload, S>

  type CreditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<CreditLogFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: CreditLogCountAggregateInputType | true
    }

  export interface CreditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['CreditLog'], meta: { name: 'CreditLog' } }
    /**
     * Find zero or one CreditLog that matches the filter.
     * @param {CreditLogFindUniqueArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CreditLogFindUniqueArgs>(args: SelectSubset<T, CreditLogFindUniqueArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one CreditLog that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {CreditLogFindUniqueOrThrowArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CreditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, CreditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first CreditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindFirstArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CreditLogFindFirstArgs>(args?: SelectSubset<T, CreditLogFindFirstArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first CreditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindFirstOrThrowArgs} args - Arguments to find a CreditLog
     * @example
     * // Get one CreditLog
     * const creditLog = await prisma.creditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CreditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, CreditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more CreditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all CreditLogs
     * const creditLogs = await prisma.creditLog.findMany()
     * 
     * // Get first 10 CreditLogs
     * const creditLogs = await prisma.creditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const creditLogWithIdOnly = await prisma.creditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CreditLogFindManyArgs>(args?: SelectSubset<T, CreditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a CreditLog.
     * @param {CreditLogCreateArgs} args - Arguments to create a CreditLog.
     * @example
     * // Create one CreditLog
     * const CreditLog = await prisma.creditLog.create({
     *   data: {
     *     // ... data to create a CreditLog
     *   }
     * })
     * 
     */
    create<T extends CreditLogCreateArgs>(args: SelectSubset<T, CreditLogCreateArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many CreditLogs.
     * @param {CreditLogCreateManyArgs} args - Arguments to create many CreditLogs.
     * @example
     * // Create many CreditLogs
     * const creditLog = await prisma.creditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CreditLogCreateManyArgs>(args?: SelectSubset<T, CreditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many CreditLogs and returns the data saved in the database.
     * @param {CreditLogCreateManyAndReturnArgs} args - Arguments to create many CreditLogs.
     * @example
     * // Create many CreditLogs
     * const creditLog = await prisma.creditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many CreditLogs and only return the `id`
     * const creditLogWithIdOnly = await prisma.creditLog.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CreditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, CreditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a CreditLog.
     * @param {CreditLogDeleteArgs} args - Arguments to delete one CreditLog.
     * @example
     * // Delete one CreditLog
     * const CreditLog = await prisma.creditLog.delete({
     *   where: {
     *     // ... filter to delete one CreditLog
     *   }
     * })
     * 
     */
    delete<T extends CreditLogDeleteArgs>(args: SelectSubset<T, CreditLogDeleteArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one CreditLog.
     * @param {CreditLogUpdateArgs} args - Arguments to update one CreditLog.
     * @example
     * // Update one CreditLog
     * const creditLog = await prisma.creditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CreditLogUpdateArgs>(args: SelectSubset<T, CreditLogUpdateArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more CreditLogs.
     * @param {CreditLogDeleteManyArgs} args - Arguments to filter CreditLogs to delete.
     * @example
     * // Delete a few CreditLogs
     * const { count } = await prisma.creditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CreditLogDeleteManyArgs>(args?: SelectSubset<T, CreditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more CreditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many CreditLogs
     * const creditLog = await prisma.creditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CreditLogUpdateManyArgs>(args: SelectSubset<T, CreditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one CreditLog.
     * @param {CreditLogUpsertArgs} args - Arguments to update or create a CreditLog.
     * @example
     * // Update or create a CreditLog
     * const creditLog = await prisma.creditLog.upsert({
     *   create: {
     *     // ... data to create a CreditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the CreditLog we want to update
     *   }
     * })
     */
    upsert<T extends CreditLogUpsertArgs>(args: SelectSubset<T, CreditLogUpsertArgs<ExtArgs>>): Prisma__CreditLogClient<$Result.GetResult<Prisma.$CreditLogPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of CreditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogCountArgs} args - Arguments to filter CreditLogs to count.
     * @example
     * // Count the number of CreditLogs
     * const count = await prisma.creditLog.count({
     *   where: {
     *     // ... the filter for the CreditLogs we want to count
     *   }
     * })
    **/
    count<T extends CreditLogCountArgs>(
      args?: Subset<T, CreditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CreditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a CreditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CreditLogAggregateArgs>(args: Subset<T, CreditLogAggregateArgs>): Prisma.PrismaPromise<GetCreditLogAggregateType<T>>

    /**
     * Group by CreditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CreditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CreditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CreditLogGroupByArgs['orderBy'] }
        : { orderBy?: CreditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CreditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCreditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the CreditLog model
   */
  readonly fields: CreditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for CreditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CreditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    creditedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the CreditLog model
   */ 
  interface CreditLogFieldRefs {
    readonly id: FieldRef<"CreditLog", 'String'>
    readonly playerId: FieldRef<"CreditLog", 'String'>
    readonly msisdn: FieldRef<"CreditLog", 'String'>
    readonly amount: FieldRef<"CreditLog", 'Int'>
    readonly subject: FieldRef<"CreditLog", 'String'>
    readonly description: FieldRef<"CreditLog", 'String'>
    readonly status: FieldRef<"CreditLog", 'ProcessingStatus'>
    readonly creditResponse: FieldRef<"CreditLog", 'Json'>
    readonly smsStatus: FieldRef<"CreditLog", 'String'>
    readonly errorMessage: FieldRef<"CreditLog", 'String'>
    readonly creditedAt: FieldRef<"CreditLog", 'DateTime'>
    readonly creditedById: FieldRef<"CreditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * CreditLog findUnique
   */
  export type CreditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog findUniqueOrThrow
   */
  export type CreditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog findFirst
   */
  export type CreditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditLogs.
     */
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog findFirstOrThrow
   */
  export type CreditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLog to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of CreditLogs.
     */
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog findMany
   */
  export type CreditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter, which CreditLogs to fetch.
     */
    where?: CreditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of CreditLogs to fetch.
     */
    orderBy?: CreditLogOrderByWithRelationInput | CreditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing CreditLogs.
     */
    cursor?: CreditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` CreditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` CreditLogs.
     */
    skip?: number
    distinct?: CreditLogScalarFieldEnum | CreditLogScalarFieldEnum[]
  }

  /**
   * CreditLog create
   */
  export type CreditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a CreditLog.
     */
    data: XOR<CreditLogCreateInput, CreditLogUncheckedCreateInput>
  }

  /**
   * CreditLog createMany
   */
  export type CreditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many CreditLogs.
     */
    data: CreditLogCreateManyInput | CreditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * CreditLog createManyAndReturn
   */
  export type CreditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many CreditLogs.
     */
    data: CreditLogCreateManyInput | CreditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * CreditLog update
   */
  export type CreditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a CreditLog.
     */
    data: XOR<CreditLogUpdateInput, CreditLogUncheckedUpdateInput>
    /**
     * Choose, which CreditLog to update.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog updateMany
   */
  export type CreditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update CreditLogs.
     */
    data: XOR<CreditLogUpdateManyMutationInput, CreditLogUncheckedUpdateManyInput>
    /**
     * Filter which CreditLogs to update
     */
    where?: CreditLogWhereInput
  }

  /**
   * CreditLog upsert
   */
  export type CreditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the CreditLog to update in case it exists.
     */
    where: CreditLogWhereUniqueInput
    /**
     * In case the CreditLog found by the `where` argument doesn't exist, create a new CreditLog with this data.
     */
    create: XOR<CreditLogCreateInput, CreditLogUncheckedCreateInput>
    /**
     * In case the CreditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CreditLogUpdateInput, CreditLogUncheckedUpdateInput>
  }

  /**
   * CreditLog delete
   */
  export type CreditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
    /**
     * Filter which CreditLog to delete.
     */
    where: CreditLogWhereUniqueInput
  }

  /**
   * CreditLog deleteMany
   */
  export type CreditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which CreditLogs to delete
     */
    where?: CreditLogWhereInput
  }

  /**
   * CreditLog without action
   */
  export type CreditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CreditLog
     */
    select?: CreditLogSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CreditLogInclude<ExtArgs> | null
  }


  /**
   * Model Permissions
   */

  export type AggregatePermissions = {
    _count: PermissionsCountAggregateOutputType | null
    _min: PermissionsMinAggregateOutputType | null
    _max: PermissionsMaxAggregateOutputType | null
  }

  export type PermissionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    permission: string | null
  }

  export type PermissionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    permission: string | null
  }

  export type PermissionsCountAggregateOutputType = {
    id: number
    user_id: number
    permission: number
    _all: number
  }


  export type PermissionsMinAggregateInputType = {
    id?: true
    user_id?: true
    permission?: true
  }

  export type PermissionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    permission?: true
  }

  export type PermissionsCountAggregateInputType = {
    id?: true
    user_id?: true
    permission?: true
    _all?: true
  }

  export type PermissionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to aggregate.
     */
    where?: PermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionsOrderByWithRelationInput | PermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Permissions
    **/
    _count?: true | PermissionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermissionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermissionsMaxAggregateInputType
  }

  export type GetPermissionsAggregateType<T extends PermissionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePermissions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermissions[P]>
      : GetScalarType<T[P], AggregatePermissions[P]>
  }




  export type PermissionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermissionsWhereInput
    orderBy?: PermissionsOrderByWithAggregationInput | PermissionsOrderByWithAggregationInput[]
    by: PermissionsScalarFieldEnum[] | PermissionsScalarFieldEnum
    having?: PermissionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermissionsCountAggregateInputType | true
    _min?: PermissionsMinAggregateInputType
    _max?: PermissionsMaxAggregateInputType
  }

  export type PermissionsGroupByOutputType = {
    id: string
    user_id: string
    permission: string
    _count: PermissionsCountAggregateOutputType | null
    _min: PermissionsMinAggregateOutputType | null
    _max: PermissionsMaxAggregateOutputType | null
  }

  type GetPermissionsGroupByPayload<T extends PermissionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermissionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermissionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermissionsGroupByOutputType[P]>
            : GetScalarType<T[P], PermissionsGroupByOutputType[P]>
        }
      >
    >


  export type PermissionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    permission?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissions"]>

  export type PermissionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    permission?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permissions"]>

  export type PermissionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    permission?: boolean
  }

  export type PermissionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PermissionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PermissionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Permissions"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      permission: string
    }, ExtArgs["result"]["permissions"]>
    composites: {}
  }

  type PermissionsGetPayload<S extends boolean | null | undefined | PermissionsDefaultArgs> = $Result.GetResult<Prisma.$PermissionsPayload, S>

  type PermissionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PermissionsFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PermissionsCountAggregateInputType | true
    }

  export interface PermissionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Permissions'], meta: { name: 'Permissions' } }
    /**
     * Find zero or one Permissions that matches the filter.
     * @param {PermissionsFindUniqueArgs} args - Arguments to find a Permissions
     * @example
     * // Get one Permissions
     * const permissions = await prisma.permissions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermissionsFindUniqueArgs>(args: SelectSubset<T, PermissionsFindUniqueArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Permissions that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PermissionsFindUniqueOrThrowArgs} args - Arguments to find a Permissions
     * @example
     * // Get one Permissions
     * const permissions = await prisma.permissions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermissionsFindUniqueOrThrowArgs>(args: SelectSubset<T, PermissionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsFindFirstArgs} args - Arguments to find a Permissions
     * @example
     * // Get one Permissions
     * const permissions = await prisma.permissions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermissionsFindFirstArgs>(args?: SelectSubset<T, PermissionsFindFirstArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Permissions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsFindFirstOrThrowArgs} args - Arguments to find a Permissions
     * @example
     * // Get one Permissions
     * const permissions = await prisma.permissions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermissionsFindFirstOrThrowArgs>(args?: SelectSubset<T, PermissionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Permissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Permissions
     * const permissions = await prisma.permissions.findMany()
     * 
     * // Get first 10 Permissions
     * const permissions = await prisma.permissions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const permissionsWithIdOnly = await prisma.permissions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PermissionsFindManyArgs>(args?: SelectSubset<T, PermissionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Permissions.
     * @param {PermissionsCreateArgs} args - Arguments to create a Permissions.
     * @example
     * // Create one Permissions
     * const Permissions = await prisma.permissions.create({
     *   data: {
     *     // ... data to create a Permissions
     *   }
     * })
     * 
     */
    create<T extends PermissionsCreateArgs>(args: SelectSubset<T, PermissionsCreateArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Permissions.
     * @param {PermissionsCreateManyArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permissions = await prisma.permissions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermissionsCreateManyArgs>(args?: SelectSubset<T, PermissionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Permissions and returns the data saved in the database.
     * @param {PermissionsCreateManyAndReturnArgs} args - Arguments to create many Permissions.
     * @example
     * // Create many Permissions
     * const permissions = await prisma.permissions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Permissions and only return the `id`
     * const permissionsWithIdOnly = await prisma.permissions.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermissionsCreateManyAndReturnArgs>(args?: SelectSubset<T, PermissionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Permissions.
     * @param {PermissionsDeleteArgs} args - Arguments to delete one Permissions.
     * @example
     * // Delete one Permissions
     * const Permissions = await prisma.permissions.delete({
     *   where: {
     *     // ... filter to delete one Permissions
     *   }
     * })
     * 
     */
    delete<T extends PermissionsDeleteArgs>(args: SelectSubset<T, PermissionsDeleteArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Permissions.
     * @param {PermissionsUpdateArgs} args - Arguments to update one Permissions.
     * @example
     * // Update one Permissions
     * const permissions = await prisma.permissions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermissionsUpdateArgs>(args: SelectSubset<T, PermissionsUpdateArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Permissions.
     * @param {PermissionsDeleteManyArgs} args - Arguments to filter Permissions to delete.
     * @example
     * // Delete a few Permissions
     * const { count } = await prisma.permissions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermissionsDeleteManyArgs>(args?: SelectSubset<T, PermissionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Permissions
     * const permissions = await prisma.permissions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermissionsUpdateManyArgs>(args: SelectSubset<T, PermissionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Permissions.
     * @param {PermissionsUpsertArgs} args - Arguments to update or create a Permissions.
     * @example
     * // Update or create a Permissions
     * const permissions = await prisma.permissions.upsert({
     *   create: {
     *     // ... data to create a Permissions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Permissions we want to update
     *   }
     * })
     */
    upsert<T extends PermissionsUpsertArgs>(args: SelectSubset<T, PermissionsUpsertArgs<ExtArgs>>): Prisma__PermissionsClient<$Result.GetResult<Prisma.$PermissionsPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsCountArgs} args - Arguments to filter Permissions to count.
     * @example
     * // Count the number of Permissions
     * const count = await prisma.permissions.count({
     *   where: {
     *     // ... the filter for the Permissions we want to count
     *   }
     * })
    **/
    count<T extends PermissionsCountArgs>(
      args?: Subset<T, PermissionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermissionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PermissionsAggregateArgs>(args: Subset<T, PermissionsAggregateArgs>): Prisma.PrismaPromise<GetPermissionsAggregateType<T>>

    /**
     * Group by Permissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermissionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PermissionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermissionsGroupByArgs['orderBy'] }
        : { orderBy?: PermissionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PermissionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermissionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Permissions model
   */
  readonly fields: PermissionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Permissions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermissionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Permissions model
   */ 
  interface PermissionsFieldRefs {
    readonly id: FieldRef<"Permissions", 'String'>
    readonly user_id: FieldRef<"Permissions", 'String'>
    readonly permission: FieldRef<"Permissions", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Permissions findUnique
   */
  export type PermissionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where: PermissionsWhereUniqueInput
  }

  /**
   * Permissions findUniqueOrThrow
   */
  export type PermissionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where: PermissionsWhereUniqueInput
  }

  /**
   * Permissions findFirst
   */
  export type PermissionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionsOrderByWithRelationInput | PermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionsScalarFieldEnum | PermissionsScalarFieldEnum[]
  }

  /**
   * Permissions findFirstOrThrow
   */
  export type PermissionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionsOrderByWithRelationInput | PermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Permissions.
     */
    cursor?: PermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Permissions.
     */
    distinct?: PermissionsScalarFieldEnum | PermissionsScalarFieldEnum[]
  }

  /**
   * Permissions findMany
   */
  export type PermissionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter, which Permissions to fetch.
     */
    where?: PermissionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Permissions to fetch.
     */
    orderBy?: PermissionsOrderByWithRelationInput | PermissionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Permissions.
     */
    cursor?: PermissionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Permissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Permissions.
     */
    skip?: number
    distinct?: PermissionsScalarFieldEnum | PermissionsScalarFieldEnum[]
  }

  /**
   * Permissions create
   */
  export type PermissionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * The data needed to create a Permissions.
     */
    data: XOR<PermissionsCreateInput, PermissionsUncheckedCreateInput>
  }

  /**
   * Permissions createMany
   */
  export type PermissionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Permissions.
     */
    data: PermissionsCreateManyInput | PermissionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Permissions createManyAndReturn
   */
  export type PermissionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Permissions.
     */
    data: PermissionsCreateManyInput | PermissionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Permissions update
   */
  export type PermissionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * The data needed to update a Permissions.
     */
    data: XOR<PermissionsUpdateInput, PermissionsUncheckedUpdateInput>
    /**
     * Choose, which Permissions to update.
     */
    where: PermissionsWhereUniqueInput
  }

  /**
   * Permissions updateMany
   */
  export type PermissionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Permissions.
     */
    data: XOR<PermissionsUpdateManyMutationInput, PermissionsUncheckedUpdateManyInput>
    /**
     * Filter which Permissions to update
     */
    where?: PermissionsWhereInput
  }

  /**
   * Permissions upsert
   */
  export type PermissionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * The filter to search for the Permissions to update in case it exists.
     */
    where: PermissionsWhereUniqueInput
    /**
     * In case the Permissions found by the `where` argument doesn't exist, create a new Permissions with this data.
     */
    create: XOR<PermissionsCreateInput, PermissionsUncheckedCreateInput>
    /**
     * In case the Permissions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermissionsUpdateInput, PermissionsUncheckedUpdateInput>
  }

  /**
   * Permissions delete
   */
  export type PermissionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
    /**
     * Filter which Permissions to delete.
     */
    where: PermissionsWhereUniqueInput
  }

  /**
   * Permissions deleteMany
   */
  export type PermissionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Permissions to delete
     */
    where?: PermissionsWhereInput
  }

  /**
   * Permissions without action
   */
  export type PermissionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Permissions
     */
    select?: PermissionsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermissionsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    phoneNumber: 'phoneNumber',
    amount: 'amount',
    batchId: 'batchId'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const ProcessingLogScalarFieldEnum: {
    id: 'id',
    batchId: 'batchId',
    msisdn: 'msisdn',
    amount: 'amount',
    status: 'status',
    creditResponse: 'creditResponse',
    smsStatus: 'smsStatus',
    errorMessage: 'errorMessage',
    processedAt: 'processedAt'
  };

  export type ProcessingLogScalarFieldEnum = (typeof ProcessingLogScalarFieldEnum)[keyof typeof ProcessingLogScalarFieldEnum]


  export const BatchScalarFieldEnum: {
    id: 'id',
    batch_no: 'batch_no',
    particulars: 'particulars',
    status: 'status',
    csv: 'csv',
    total_amount: 'total_amount',
    date_initiated: 'date_initiated',
    date_approved: 'date_approved',
    approvedById: 'approvedById',
    rejectedById: 'rejectedById'
  };

  export type BatchScalarFieldEnum = (typeof BatchScalarFieldEnum)[keyof typeof BatchScalarFieldEnum]


  export const PromoScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    info: 'info',
    carousel_image: 'carousel_image',
    image: 'image',
    start: 'start',
    end: 'end',
    term_and_conditions: 'term_and_conditions',
    amount: 'amount',
    is_active: 'is_active',
    uploaded_by_id: 'uploaded_by_id'
  };

  export type PromoScalarFieldEnum = (typeof PromoScalarFieldEnum)[keyof typeof PromoScalarFieldEnum]


  export const CreditLogScalarFieldEnum: {
    id: 'id',
    playerId: 'playerId',
    msisdn: 'msisdn',
    amount: 'amount',
    subject: 'subject',
    description: 'description',
    status: 'status',
    creditResponse: 'creditResponse',
    smsStatus: 'smsStatus',
    errorMessage: 'errorMessage',
    creditedAt: 'creditedAt',
    creditedById: 'creditedById'
  };

  export type CreditLogScalarFieldEnum = (typeof CreditLogScalarFieldEnum)[keyof typeof CreditLogScalarFieldEnum]


  export const PermissionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    permission: 'permission'
  };

  export type PermissionsScalarFieldEnum = (typeof PermissionsScalarFieldEnum)[keyof typeof PermissionsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'UserRole'
   */
  export type EnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole'>
    


  /**
   * Reference to a field of type 'UserRole[]'
   */
  export type ListEnumUserRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserRole[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'ProcessingStatus'
   */
  export type EnumProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingStatus'>
    


  /**
   * Reference to a field of type 'ProcessingStatus[]'
   */
  export type ListEnumProcessingStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProcessingStatus[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'BatchStatus'
   */
  export type EnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus'>
    


  /**
   * Reference to a field of type 'BatchStatus[]'
   */
  export type ListEnumBatchStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BatchStatus[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    permissions?: PermissionsListRelationFilter
    batchesApproved?: BatchListRelationFilter
    batchesRejected?: BatchListRelationFilter
    promoUploaded?: PromoListRelationFilter
    creditsIssued?: CreditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    permissions?: PermissionsOrderByRelationAggregateInput
    batchesApproved?: BatchOrderByRelationAggregateInput
    batchesRejected?: BatchOrderByRelationAggregateInput
    promoUploaded?: PromoOrderByRelationAggregateInput
    creditsIssued?: CreditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    role?: EnumUserRoleFilter<"User"> | $Enums.UserRole
    permissions?: PermissionsListRelationFilter
    batchesApproved?: BatchListRelationFilter
    batchesRejected?: BatchListRelationFilter
    promoUploaded?: PromoListRelationFilter
    creditsIssued?: CreditLogListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phoneNumber?: StringFilter<"Customer"> | string
    amount?: IntFilter<"Customer"> | number
    batchId?: StringFilter<"Customer"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    amount?: SortOrder
    batchId?: SortOrder
    batch?: BatchOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    phoneNumber?: StringFilter<"Customer"> | string
    amount?: IntFilter<"Customer"> | number
    batchId?: StringFilter<"Customer"> | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }, "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    amount?: SortOrder
    batchId?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _avg?: CustomerAvgOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
    _sum?: CustomerSumOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    phoneNumber?: StringWithAggregatesFilter<"Customer"> | string
    amount?: IntWithAggregatesFilter<"Customer"> | number
    batchId?: StringWithAggregatesFilter<"Customer"> | string
  }

  export type ProcessingLogWhereInput = {
    AND?: ProcessingLogWhereInput | ProcessingLogWhereInput[]
    OR?: ProcessingLogWhereInput[]
    NOT?: ProcessingLogWhereInput | ProcessingLogWhereInput[]
    id?: StringFilter<"ProcessingLog"> | string
    batchId?: StringFilter<"ProcessingLog"> | string
    msisdn?: StringFilter<"ProcessingLog"> | string
    amount?: IntFilter<"ProcessingLog"> | number
    status?: EnumProcessingStatusFilter<"ProcessingLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"ProcessingLog">
    smsStatus?: StringNullableFilter<"ProcessingLog"> | string | null
    errorMessage?: StringNullableFilter<"ProcessingLog"> | string | null
    processedAt?: DateTimeFilter<"ProcessingLog"> | Date | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }

  export type ProcessingLogOrderByWithRelationInput = {
    id?: SortOrder
    batchId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    creditResponse?: SortOrderInput | SortOrder
    smsStatus?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    processedAt?: SortOrder
    batch?: BatchOrderByWithRelationInput
  }

  export type ProcessingLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ProcessingLogWhereInput | ProcessingLogWhereInput[]
    OR?: ProcessingLogWhereInput[]
    NOT?: ProcessingLogWhereInput | ProcessingLogWhereInput[]
    batchId?: StringFilter<"ProcessingLog"> | string
    msisdn?: StringFilter<"ProcessingLog"> | string
    amount?: IntFilter<"ProcessingLog"> | number
    status?: EnumProcessingStatusFilter<"ProcessingLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"ProcessingLog">
    smsStatus?: StringNullableFilter<"ProcessingLog"> | string | null
    errorMessage?: StringNullableFilter<"ProcessingLog"> | string | null
    processedAt?: DateTimeFilter<"ProcessingLog"> | Date | string
    batch?: XOR<BatchRelationFilter, BatchWhereInput>
  }, "id">

  export type ProcessingLogOrderByWithAggregationInput = {
    id?: SortOrder
    batchId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    creditResponse?: SortOrderInput | SortOrder
    smsStatus?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    processedAt?: SortOrder
    _count?: ProcessingLogCountOrderByAggregateInput
    _avg?: ProcessingLogAvgOrderByAggregateInput
    _max?: ProcessingLogMaxOrderByAggregateInput
    _min?: ProcessingLogMinOrderByAggregateInput
    _sum?: ProcessingLogSumOrderByAggregateInput
  }

  export type ProcessingLogScalarWhereWithAggregatesInput = {
    AND?: ProcessingLogScalarWhereWithAggregatesInput | ProcessingLogScalarWhereWithAggregatesInput[]
    OR?: ProcessingLogScalarWhereWithAggregatesInput[]
    NOT?: ProcessingLogScalarWhereWithAggregatesInput | ProcessingLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ProcessingLog"> | string
    batchId?: StringWithAggregatesFilter<"ProcessingLog"> | string
    msisdn?: StringWithAggregatesFilter<"ProcessingLog"> | string
    amount?: IntWithAggregatesFilter<"ProcessingLog"> | number
    status?: EnumProcessingStatusWithAggregatesFilter<"ProcessingLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableWithAggregatesFilter<"ProcessingLog">
    smsStatus?: StringNullableWithAggregatesFilter<"ProcessingLog"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"ProcessingLog"> | string | null
    processedAt?: DateTimeWithAggregatesFilter<"ProcessingLog"> | Date | string
  }

  export type BatchWhereInput = {
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    id?: StringFilter<"Batch"> | string
    batch_no?: StringFilter<"Batch"> | string
    particulars?: StringFilter<"Batch"> | string
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    csv?: StringFilter<"Batch"> | string
    total_amount?: IntFilter<"Batch"> | number
    date_initiated?: DateTimeFilter<"Batch"> | Date | string
    date_approved?: DateTimeNullableFilter<"Batch"> | Date | string | null
    approvedById?: StringNullableFilter<"Batch"> | string | null
    rejectedById?: StringNullableFilter<"Batch"> | string | null
    recipients?: CustomerListRelationFilter
    processingLogs?: ProcessingLogListRelationFilter
    approvedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    rejectedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type BatchOrderByWithRelationInput = {
    id?: SortOrder
    batch_no?: SortOrder
    particulars?: SortOrder
    status?: SortOrder
    csv?: SortOrder
    total_amount?: SortOrder
    date_initiated?: SortOrder
    date_approved?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    rejectedById?: SortOrderInput | SortOrder
    recipients?: CustomerOrderByRelationAggregateInput
    processingLogs?: ProcessingLogOrderByRelationAggregateInput
    approvedBy?: UserOrderByWithRelationInput
    rejectedBy?: UserOrderByWithRelationInput
  }

  export type BatchWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    batch_no?: string
    AND?: BatchWhereInput | BatchWhereInput[]
    OR?: BatchWhereInput[]
    NOT?: BatchWhereInput | BatchWhereInput[]
    particulars?: StringFilter<"Batch"> | string
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    csv?: StringFilter<"Batch"> | string
    total_amount?: IntFilter<"Batch"> | number
    date_initiated?: DateTimeFilter<"Batch"> | Date | string
    date_approved?: DateTimeNullableFilter<"Batch"> | Date | string | null
    approvedById?: StringNullableFilter<"Batch"> | string | null
    rejectedById?: StringNullableFilter<"Batch"> | string | null
    recipients?: CustomerListRelationFilter
    processingLogs?: ProcessingLogListRelationFilter
    approvedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    rejectedBy?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id" | "batch_no">

  export type BatchOrderByWithAggregationInput = {
    id?: SortOrder
    batch_no?: SortOrder
    particulars?: SortOrder
    status?: SortOrder
    csv?: SortOrder
    total_amount?: SortOrder
    date_initiated?: SortOrder
    date_approved?: SortOrderInput | SortOrder
    approvedById?: SortOrderInput | SortOrder
    rejectedById?: SortOrderInput | SortOrder
    _count?: BatchCountOrderByAggregateInput
    _avg?: BatchAvgOrderByAggregateInput
    _max?: BatchMaxOrderByAggregateInput
    _min?: BatchMinOrderByAggregateInput
    _sum?: BatchSumOrderByAggregateInput
  }

  export type BatchScalarWhereWithAggregatesInput = {
    AND?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    OR?: BatchScalarWhereWithAggregatesInput[]
    NOT?: BatchScalarWhereWithAggregatesInput | BatchScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Batch"> | string
    batch_no?: StringWithAggregatesFilter<"Batch"> | string
    particulars?: StringWithAggregatesFilter<"Batch"> | string
    status?: EnumBatchStatusWithAggregatesFilter<"Batch"> | $Enums.BatchStatus
    csv?: StringWithAggregatesFilter<"Batch"> | string
    total_amount?: IntWithAggregatesFilter<"Batch"> | number
    date_initiated?: DateTimeWithAggregatesFilter<"Batch"> | Date | string
    date_approved?: DateTimeNullableWithAggregatesFilter<"Batch"> | Date | string | null
    approvedById?: StringNullableWithAggregatesFilter<"Batch"> | string | null
    rejectedById?: StringNullableWithAggregatesFilter<"Batch"> | string | null
  }

  export type PromoWhereInput = {
    AND?: PromoWhereInput | PromoWhereInput[]
    OR?: PromoWhereInput[]
    NOT?: PromoWhereInput | PromoWhereInput[]
    id?: StringFilter<"Promo"> | string
    title?: StringFilter<"Promo"> | string
    description?: StringFilter<"Promo"> | string
    info?: JsonFilter<"Promo">
    carousel_image?: StringFilter<"Promo"> | string
    image?: StringFilter<"Promo"> | string
    start?: DateTimeFilter<"Promo"> | Date | string
    end?: DateTimeNullableFilter<"Promo"> | Date | string | null
    term_and_conditions?: StringNullableFilter<"Promo"> | string | null
    amount?: IntNullableFilter<"Promo"> | number | null
    is_active?: BoolFilter<"Promo"> | boolean
    uploaded_by_id?: StringNullableFilter<"Promo"> | string | null
    uploaded_by?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type PromoOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    info?: SortOrder
    carousel_image?: SortOrder
    image?: SortOrder
    start?: SortOrder
    end?: SortOrderInput | SortOrder
    term_and_conditions?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    is_active?: SortOrder
    uploaded_by_id?: SortOrderInput | SortOrder
    uploaded_by?: UserOrderByWithRelationInput
  }

  export type PromoWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PromoWhereInput | PromoWhereInput[]
    OR?: PromoWhereInput[]
    NOT?: PromoWhereInput | PromoWhereInput[]
    title?: StringFilter<"Promo"> | string
    description?: StringFilter<"Promo"> | string
    info?: JsonFilter<"Promo">
    carousel_image?: StringFilter<"Promo"> | string
    image?: StringFilter<"Promo"> | string
    start?: DateTimeFilter<"Promo"> | Date | string
    end?: DateTimeNullableFilter<"Promo"> | Date | string | null
    term_and_conditions?: StringNullableFilter<"Promo"> | string | null
    amount?: IntNullableFilter<"Promo"> | number | null
    is_active?: BoolFilter<"Promo"> | boolean
    uploaded_by_id?: StringNullableFilter<"Promo"> | string | null
    uploaded_by?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type PromoOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    info?: SortOrder
    carousel_image?: SortOrder
    image?: SortOrder
    start?: SortOrder
    end?: SortOrderInput | SortOrder
    term_and_conditions?: SortOrderInput | SortOrder
    amount?: SortOrderInput | SortOrder
    is_active?: SortOrder
    uploaded_by_id?: SortOrderInput | SortOrder
    _count?: PromoCountOrderByAggregateInput
    _avg?: PromoAvgOrderByAggregateInput
    _max?: PromoMaxOrderByAggregateInput
    _min?: PromoMinOrderByAggregateInput
    _sum?: PromoSumOrderByAggregateInput
  }

  export type PromoScalarWhereWithAggregatesInput = {
    AND?: PromoScalarWhereWithAggregatesInput | PromoScalarWhereWithAggregatesInput[]
    OR?: PromoScalarWhereWithAggregatesInput[]
    NOT?: PromoScalarWhereWithAggregatesInput | PromoScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Promo"> | string
    title?: StringWithAggregatesFilter<"Promo"> | string
    description?: StringWithAggregatesFilter<"Promo"> | string
    info?: JsonWithAggregatesFilter<"Promo">
    carousel_image?: StringWithAggregatesFilter<"Promo"> | string
    image?: StringWithAggregatesFilter<"Promo"> | string
    start?: DateTimeWithAggregatesFilter<"Promo"> | Date | string
    end?: DateTimeNullableWithAggregatesFilter<"Promo"> | Date | string | null
    term_and_conditions?: StringNullableWithAggregatesFilter<"Promo"> | string | null
    amount?: IntNullableWithAggregatesFilter<"Promo"> | number | null
    is_active?: BoolWithAggregatesFilter<"Promo"> | boolean
    uploaded_by_id?: StringNullableWithAggregatesFilter<"Promo"> | string | null
  }

  export type CreditLogWhereInput = {
    AND?: CreditLogWhereInput | CreditLogWhereInput[]
    OR?: CreditLogWhereInput[]
    NOT?: CreditLogWhereInput | CreditLogWhereInput[]
    id?: StringFilter<"CreditLog"> | string
    playerId?: StringFilter<"CreditLog"> | string
    msisdn?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    subject?: StringFilter<"CreditLog"> | string
    description?: StringNullableFilter<"CreditLog"> | string | null
    status?: EnumProcessingStatusFilter<"CreditLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"CreditLog">
    smsStatus?: StringNullableFilter<"CreditLog"> | string | null
    errorMessage?: StringNullableFilter<"CreditLog"> | string | null
    creditedAt?: DateTimeFilter<"CreditLog"> | Date | string
    creditedById?: StringFilter<"CreditLog"> | string
    creditedBy?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type CreditLogOrderByWithRelationInput = {
    id?: SortOrder
    playerId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    creditResponse?: SortOrderInput | SortOrder
    smsStatus?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    creditedAt?: SortOrder
    creditedById?: SortOrder
    creditedBy?: UserOrderByWithRelationInput
  }

  export type CreditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CreditLogWhereInput | CreditLogWhereInput[]
    OR?: CreditLogWhereInput[]
    NOT?: CreditLogWhereInput | CreditLogWhereInput[]
    playerId?: StringFilter<"CreditLog"> | string
    msisdn?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    subject?: StringFilter<"CreditLog"> | string
    description?: StringNullableFilter<"CreditLog"> | string | null
    status?: EnumProcessingStatusFilter<"CreditLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"CreditLog">
    smsStatus?: StringNullableFilter<"CreditLog"> | string | null
    errorMessage?: StringNullableFilter<"CreditLog"> | string | null
    creditedAt?: DateTimeFilter<"CreditLog"> | Date | string
    creditedById?: StringFilter<"CreditLog"> | string
    creditedBy?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type CreditLogOrderByWithAggregationInput = {
    id?: SortOrder
    playerId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    subject?: SortOrder
    description?: SortOrderInput | SortOrder
    status?: SortOrder
    creditResponse?: SortOrderInput | SortOrder
    smsStatus?: SortOrderInput | SortOrder
    errorMessage?: SortOrderInput | SortOrder
    creditedAt?: SortOrder
    creditedById?: SortOrder
    _count?: CreditLogCountOrderByAggregateInput
    _avg?: CreditLogAvgOrderByAggregateInput
    _max?: CreditLogMaxOrderByAggregateInput
    _min?: CreditLogMinOrderByAggregateInput
    _sum?: CreditLogSumOrderByAggregateInput
  }

  export type CreditLogScalarWhereWithAggregatesInput = {
    AND?: CreditLogScalarWhereWithAggregatesInput | CreditLogScalarWhereWithAggregatesInput[]
    OR?: CreditLogScalarWhereWithAggregatesInput[]
    NOT?: CreditLogScalarWhereWithAggregatesInput | CreditLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"CreditLog"> | string
    playerId?: StringWithAggregatesFilter<"CreditLog"> | string
    msisdn?: StringWithAggregatesFilter<"CreditLog"> | string
    amount?: IntWithAggregatesFilter<"CreditLog"> | number
    subject?: StringWithAggregatesFilter<"CreditLog"> | string
    description?: StringNullableWithAggregatesFilter<"CreditLog"> | string | null
    status?: EnumProcessingStatusWithAggregatesFilter<"CreditLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableWithAggregatesFilter<"CreditLog">
    smsStatus?: StringNullableWithAggregatesFilter<"CreditLog"> | string | null
    errorMessage?: StringNullableWithAggregatesFilter<"CreditLog"> | string | null
    creditedAt?: DateTimeWithAggregatesFilter<"CreditLog"> | Date | string
    creditedById?: StringWithAggregatesFilter<"CreditLog"> | string
  }

  export type PermissionsWhereInput = {
    AND?: PermissionsWhereInput | PermissionsWhereInput[]
    OR?: PermissionsWhereInput[]
    NOT?: PermissionsWhereInput | PermissionsWhereInput[]
    id?: StringFilter<"Permissions"> | string
    user_id?: StringFilter<"Permissions"> | string
    permission?: StringFilter<"Permissions"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type PermissionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    permission?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type PermissionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PermissionsWhereInput | PermissionsWhereInput[]
    OR?: PermissionsWhereInput[]
    NOT?: PermissionsWhereInput | PermissionsWhereInput[]
    user_id?: StringFilter<"Permissions"> | string
    permission?: StringFilter<"Permissions"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type PermissionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    permission?: SortOrder
    _count?: PermissionsCountOrderByAggregateInput
    _max?: PermissionsMaxOrderByAggregateInput
    _min?: PermissionsMinOrderByAggregateInput
  }

  export type PermissionsScalarWhereWithAggregatesInput = {
    AND?: PermissionsScalarWhereWithAggregatesInput | PermissionsScalarWhereWithAggregatesInput[]
    OR?: PermissionsScalarWhereWithAggregatesInput[]
    NOT?: PermissionsScalarWhereWithAggregatesInput | PermissionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Permissions"> | string
    user_id?: StringWithAggregatesFilter<"Permissions"> | string
    permission?: StringWithAggregatesFilter<"Permissions"> | string
  }

  export type UserCreateInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsCreateNestedManyWithoutUserInput
    batchesApproved?: BatchCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogCreateNestedManyWithoutCreditedByInput
  }

  export type UserUncheckedCreateInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsUncheckedCreateNestedManyWithoutUserInput
    batchesApproved?: BatchUncheckedCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchUncheckedCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoUncheckedCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogUncheckedCreateNestedManyWithoutCreditedByInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUncheckedUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUncheckedUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUncheckedUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUncheckedUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput
  }

  export type UserCreateManyInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
    batch: BatchCreateNestedOneWithoutRecipientsInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
    batchId: string
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    batch?: BatchUpdateOneRequiredWithoutRecipientsNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    batchId?: StringFieldUpdateOperationsInput | string
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
    batchId: string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    batchId?: StringFieldUpdateOperationsInput | string
  }

  export type ProcessingLogCreateInput = {
    id?: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
    batch: BatchCreateNestedOneWithoutProcessingLogsInput
  }

  export type ProcessingLogUncheckedCreateInput = {
    id?: string
    batchId: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
  }

  export type ProcessingLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    batch?: BatchUpdateOneRequiredWithoutProcessingLogsNestedInput
  }

  export type ProcessingLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingLogCreateManyInput = {
    id?: string
    batchId: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
  }

  export type ProcessingLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batchId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BatchCreateInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    recipients?: CustomerCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogCreateNestedManyWithoutBatchInput
    approvedBy?: UserCreateNestedOneWithoutBatchesApprovedInput
    rejectedBy?: UserCreateNestedOneWithoutBatchesRejectedInput
  }

  export type BatchUncheckedCreateInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
    rejectedById?: string | null
    recipients?: CustomerUncheckedCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipients?: CustomerUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUpdateManyWithoutBatchNestedInput
    approvedBy?: UserUpdateOneWithoutBatchesApprovedNestedInput
    rejectedBy?: UserUpdateOneWithoutBatchesRejectedNestedInput
  }

  export type BatchUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
    recipients?: CustomerUncheckedUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateManyInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
    rejectedById?: string | null
  }

  export type BatchUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BatchUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoCreateInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
    uploaded_by?: UserCreateNestedOneWithoutPromoUploadedInput
  }

  export type PromoUncheckedCreateInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
    uploaded_by_id?: string | null
  }

  export type PromoUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    uploaded_by?: UserUpdateOneWithoutPromoUploadedNestedInput
  }

  export type PromoUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    uploaded_by_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoCreateManyInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
    uploaded_by_id?: string | null
  }

  export type PromoUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PromoUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    uploaded_by_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CreditLogCreateInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
    creditedBy: UserCreateNestedOneWithoutCreditsIssuedInput
  }

  export type CreditLogUncheckedCreateInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
    creditedById: string
  }

  export type CreditLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditedBy?: UserUpdateOneRequiredWithoutCreditsIssuedNestedInput
  }

  export type CreditLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditedById?: StringFieldUpdateOperationsInput | string
  }

  export type CreditLogCreateManyInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
    creditedById: string
  }

  export type CreditLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    creditedById?: StringFieldUpdateOperationsInput | string
  }

  export type PermissionsCreateInput = {
    id?: string
    permission: string
    user: UserCreateNestedOneWithoutPermissionsInput
  }

  export type PermissionsUncheckedCreateInput = {
    id?: string
    user_id: string
    permission: string
  }

  export type PermissionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
    user?: UserUpdateOneRequiredWithoutPermissionsNestedInput
  }

  export type PermissionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PermissionsCreateManyInput = {
    id?: string
    user_id: string
    permission: string
  }

  export type PermissionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PermissionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type PermissionsListRelationFilter = {
    every?: PermissionsWhereInput
    some?: PermissionsWhereInput
    none?: PermissionsWhereInput
  }

  export type BatchListRelationFilter = {
    every?: BatchWhereInput
    some?: BatchWhereInput
    none?: BatchWhereInput
  }

  export type PromoListRelationFilter = {
    every?: PromoWhereInput
    some?: PromoWhereInput
    none?: PromoWhereInput
  }

  export type CreditLogListRelationFilter = {
    every?: CreditLogWhereInput
    some?: CreditLogWhereInput
    none?: CreditLogWhereInput
  }

  export type PermissionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PromoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CreditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    role?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BatchRelationFilter = {
    is?: BatchWhereInput
    isNot?: BatchWhereInput
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    amount?: SortOrder
    batchId?: SortOrder
  }

  export type CustomerAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    amount?: SortOrder
    batchId?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    phoneNumber?: SortOrder
    amount?: SortOrder
    batchId?: SortOrder
  }

  export type CustomerSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type EnumProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusFilter<$PrismaModel> | $Enums.ProcessingStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ProcessingLogCountOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    creditResponse?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessingLogAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type ProcessingLogMaxOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessingLogMinOrderByAggregateInput = {
    id?: SortOrder
    batchId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    status?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    processedAt?: SortOrder
  }

  export type ProcessingLogSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type EnumProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumProcessingStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type CustomerListRelationFilter = {
    every?: CustomerWhereInput
    some?: CustomerWhereInput
    none?: CustomerWhereInput
  }

  export type ProcessingLogListRelationFilter = {
    every?: ProcessingLogWhereInput
    some?: ProcessingLogWhereInput
    none?: ProcessingLogWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CustomerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProcessingLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BatchCountOrderByAggregateInput = {
    id?: SortOrder
    batch_no?: SortOrder
    particulars?: SortOrder
    status?: SortOrder
    csv?: SortOrder
    total_amount?: SortOrder
    date_initiated?: SortOrder
    date_approved?: SortOrder
    approvedById?: SortOrder
    rejectedById?: SortOrder
  }

  export type BatchAvgOrderByAggregateInput = {
    total_amount?: SortOrder
  }

  export type BatchMaxOrderByAggregateInput = {
    id?: SortOrder
    batch_no?: SortOrder
    particulars?: SortOrder
    status?: SortOrder
    csv?: SortOrder
    total_amount?: SortOrder
    date_initiated?: SortOrder
    date_approved?: SortOrder
    approvedById?: SortOrder
    rejectedById?: SortOrder
  }

  export type BatchMinOrderByAggregateInput = {
    id?: SortOrder
    batch_no?: SortOrder
    particulars?: SortOrder
    status?: SortOrder
    csv?: SortOrder
    total_amount?: SortOrder
    date_initiated?: SortOrder
    date_approved?: SortOrder
    approvedById?: SortOrder
    rejectedById?: SortOrder
  }

  export type BatchSumOrderByAggregateInput = {
    total_amount?: SortOrder
  }

  export type EnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PromoCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    info?: SortOrder
    carousel_image?: SortOrder
    image?: SortOrder
    start?: SortOrder
    end?: SortOrder
    term_and_conditions?: SortOrder
    amount?: SortOrder
    is_active?: SortOrder
    uploaded_by_id?: SortOrder
  }

  export type PromoAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PromoMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    carousel_image?: SortOrder
    image?: SortOrder
    start?: SortOrder
    end?: SortOrder
    term_and_conditions?: SortOrder
    amount?: SortOrder
    is_active?: SortOrder
    uploaded_by_id?: SortOrder
  }

  export type PromoMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    carousel_image?: SortOrder
    image?: SortOrder
    start?: SortOrder
    end?: SortOrder
    term_and_conditions?: SortOrder
    amount?: SortOrder
    is_active?: SortOrder
    uploaded_by_id?: SortOrder
  }

  export type PromoSumOrderByAggregateInput = {
    amount?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CreditLogCountOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    creditResponse?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    creditedAt?: SortOrder
    creditedById?: SortOrder
  }

  export type CreditLogAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type CreditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    creditedAt?: SortOrder
    creditedById?: SortOrder
  }

  export type CreditLogMinOrderByAggregateInput = {
    id?: SortOrder
    playerId?: SortOrder
    msisdn?: SortOrder
    amount?: SortOrder
    subject?: SortOrder
    description?: SortOrder
    status?: SortOrder
    smsStatus?: SortOrder
    errorMessage?: SortOrder
    creditedAt?: SortOrder
    creditedById?: SortOrder
  }

  export type CreditLogSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type PermissionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    permission?: SortOrder
  }

  export type PermissionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    permission?: SortOrder
  }

  export type PermissionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    permission?: SortOrder
  }

  export type PermissionsCreateNestedManyWithoutUserInput = {
    create?: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput> | PermissionsCreateWithoutUserInput[] | PermissionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionsCreateOrConnectWithoutUserInput | PermissionsCreateOrConnectWithoutUserInput[]
    createMany?: PermissionsCreateManyUserInputEnvelope
    connect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
  }

  export type BatchCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput> | BatchCreateWithoutApprovedByInput[] | BatchUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutApprovedByInput | BatchCreateOrConnectWithoutApprovedByInput[]
    createMany?: BatchCreateManyApprovedByInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type BatchCreateNestedManyWithoutRejectedByInput = {
    create?: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput> | BatchCreateWithoutRejectedByInput[] | BatchUncheckedCreateWithoutRejectedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutRejectedByInput | BatchCreateOrConnectWithoutRejectedByInput[]
    createMany?: BatchCreateManyRejectedByInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type PromoCreateNestedManyWithoutUploaded_byInput = {
    create?: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput> | PromoCreateWithoutUploaded_byInput[] | PromoUncheckedCreateWithoutUploaded_byInput[]
    connectOrCreate?: PromoCreateOrConnectWithoutUploaded_byInput | PromoCreateOrConnectWithoutUploaded_byInput[]
    createMany?: PromoCreateManyUploaded_byInputEnvelope
    connect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
  }

  export type CreditLogCreateNestedManyWithoutCreditedByInput = {
    create?: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput> | CreditLogCreateWithoutCreditedByInput[] | CreditLogUncheckedCreateWithoutCreditedByInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutCreditedByInput | CreditLogCreateOrConnectWithoutCreditedByInput[]
    createMany?: CreditLogCreateManyCreditedByInputEnvelope
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
  }

  export type PermissionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput> | PermissionsCreateWithoutUserInput[] | PermissionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionsCreateOrConnectWithoutUserInput | PermissionsCreateOrConnectWithoutUserInput[]
    createMany?: PermissionsCreateManyUserInputEnvelope
    connect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
  }

  export type BatchUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput> | BatchCreateWithoutApprovedByInput[] | BatchUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutApprovedByInput | BatchCreateOrConnectWithoutApprovedByInput[]
    createMany?: BatchCreateManyApprovedByInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type BatchUncheckedCreateNestedManyWithoutRejectedByInput = {
    create?: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput> | BatchCreateWithoutRejectedByInput[] | BatchUncheckedCreateWithoutRejectedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutRejectedByInput | BatchCreateOrConnectWithoutRejectedByInput[]
    createMany?: BatchCreateManyRejectedByInputEnvelope
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
  }

  export type PromoUncheckedCreateNestedManyWithoutUploaded_byInput = {
    create?: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput> | PromoCreateWithoutUploaded_byInput[] | PromoUncheckedCreateWithoutUploaded_byInput[]
    connectOrCreate?: PromoCreateOrConnectWithoutUploaded_byInput | PromoCreateOrConnectWithoutUploaded_byInput[]
    createMany?: PromoCreateManyUploaded_byInputEnvelope
    connect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
  }

  export type CreditLogUncheckedCreateNestedManyWithoutCreditedByInput = {
    create?: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput> | CreditLogCreateWithoutCreditedByInput[] | CreditLogUncheckedCreateWithoutCreditedByInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutCreditedByInput | CreditLogCreateOrConnectWithoutCreditedByInput[]
    createMany?: CreditLogCreateManyCreditedByInputEnvelope
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole
  }

  export type PermissionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput> | PermissionsCreateWithoutUserInput[] | PermissionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionsCreateOrConnectWithoutUserInput | PermissionsCreateOrConnectWithoutUserInput[]
    upsert?: PermissionsUpsertWithWhereUniqueWithoutUserInput | PermissionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PermissionsCreateManyUserInputEnvelope
    set?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    disconnect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    delete?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    connect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    update?: PermissionsUpdateWithWhereUniqueWithoutUserInput | PermissionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PermissionsUpdateManyWithWhereWithoutUserInput | PermissionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PermissionsScalarWhereInput | PermissionsScalarWhereInput[]
  }

  export type BatchUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput> | BatchCreateWithoutApprovedByInput[] | BatchUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutApprovedByInput | BatchCreateOrConnectWithoutApprovedByInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutApprovedByInput | BatchUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: BatchCreateManyApprovedByInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutApprovedByInput | BatchUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutApprovedByInput | BatchUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type BatchUpdateManyWithoutRejectedByNestedInput = {
    create?: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput> | BatchCreateWithoutRejectedByInput[] | BatchUncheckedCreateWithoutRejectedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutRejectedByInput | BatchCreateOrConnectWithoutRejectedByInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutRejectedByInput | BatchUpsertWithWhereUniqueWithoutRejectedByInput[]
    createMany?: BatchCreateManyRejectedByInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutRejectedByInput | BatchUpdateWithWhereUniqueWithoutRejectedByInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutRejectedByInput | BatchUpdateManyWithWhereWithoutRejectedByInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type PromoUpdateManyWithoutUploaded_byNestedInput = {
    create?: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput> | PromoCreateWithoutUploaded_byInput[] | PromoUncheckedCreateWithoutUploaded_byInput[]
    connectOrCreate?: PromoCreateOrConnectWithoutUploaded_byInput | PromoCreateOrConnectWithoutUploaded_byInput[]
    upsert?: PromoUpsertWithWhereUniqueWithoutUploaded_byInput | PromoUpsertWithWhereUniqueWithoutUploaded_byInput[]
    createMany?: PromoCreateManyUploaded_byInputEnvelope
    set?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    disconnect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    delete?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    connect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    update?: PromoUpdateWithWhereUniqueWithoutUploaded_byInput | PromoUpdateWithWhereUniqueWithoutUploaded_byInput[]
    updateMany?: PromoUpdateManyWithWhereWithoutUploaded_byInput | PromoUpdateManyWithWhereWithoutUploaded_byInput[]
    deleteMany?: PromoScalarWhereInput | PromoScalarWhereInput[]
  }

  export type CreditLogUpdateManyWithoutCreditedByNestedInput = {
    create?: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput> | CreditLogCreateWithoutCreditedByInput[] | CreditLogUncheckedCreateWithoutCreditedByInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutCreditedByInput | CreditLogCreateOrConnectWithoutCreditedByInput[]
    upsert?: CreditLogUpsertWithWhereUniqueWithoutCreditedByInput | CreditLogUpsertWithWhereUniqueWithoutCreditedByInput[]
    createMany?: CreditLogCreateManyCreditedByInputEnvelope
    set?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    disconnect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    delete?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    update?: CreditLogUpdateWithWhereUniqueWithoutCreditedByInput | CreditLogUpdateWithWhereUniqueWithoutCreditedByInput[]
    updateMany?: CreditLogUpdateManyWithWhereWithoutCreditedByInput | CreditLogUpdateManyWithWhereWithoutCreditedByInput[]
    deleteMany?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
  }

  export type PermissionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput> | PermissionsCreateWithoutUserInput[] | PermissionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PermissionsCreateOrConnectWithoutUserInput | PermissionsCreateOrConnectWithoutUserInput[]
    upsert?: PermissionsUpsertWithWhereUniqueWithoutUserInput | PermissionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PermissionsCreateManyUserInputEnvelope
    set?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    disconnect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    delete?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    connect?: PermissionsWhereUniqueInput | PermissionsWhereUniqueInput[]
    update?: PermissionsUpdateWithWhereUniqueWithoutUserInput | PermissionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PermissionsUpdateManyWithWhereWithoutUserInput | PermissionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PermissionsScalarWhereInput | PermissionsScalarWhereInput[]
  }

  export type BatchUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput> | BatchCreateWithoutApprovedByInput[] | BatchUncheckedCreateWithoutApprovedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutApprovedByInput | BatchCreateOrConnectWithoutApprovedByInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutApprovedByInput | BatchUpsertWithWhereUniqueWithoutApprovedByInput[]
    createMany?: BatchCreateManyApprovedByInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutApprovedByInput | BatchUpdateWithWhereUniqueWithoutApprovedByInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutApprovedByInput | BatchUpdateManyWithWhereWithoutApprovedByInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type BatchUncheckedUpdateManyWithoutRejectedByNestedInput = {
    create?: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput> | BatchCreateWithoutRejectedByInput[] | BatchUncheckedCreateWithoutRejectedByInput[]
    connectOrCreate?: BatchCreateOrConnectWithoutRejectedByInput | BatchCreateOrConnectWithoutRejectedByInput[]
    upsert?: BatchUpsertWithWhereUniqueWithoutRejectedByInput | BatchUpsertWithWhereUniqueWithoutRejectedByInput[]
    createMany?: BatchCreateManyRejectedByInputEnvelope
    set?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    disconnect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    delete?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    connect?: BatchWhereUniqueInput | BatchWhereUniqueInput[]
    update?: BatchUpdateWithWhereUniqueWithoutRejectedByInput | BatchUpdateWithWhereUniqueWithoutRejectedByInput[]
    updateMany?: BatchUpdateManyWithWhereWithoutRejectedByInput | BatchUpdateManyWithWhereWithoutRejectedByInput[]
    deleteMany?: BatchScalarWhereInput | BatchScalarWhereInput[]
  }

  export type PromoUncheckedUpdateManyWithoutUploaded_byNestedInput = {
    create?: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput> | PromoCreateWithoutUploaded_byInput[] | PromoUncheckedCreateWithoutUploaded_byInput[]
    connectOrCreate?: PromoCreateOrConnectWithoutUploaded_byInput | PromoCreateOrConnectWithoutUploaded_byInput[]
    upsert?: PromoUpsertWithWhereUniqueWithoutUploaded_byInput | PromoUpsertWithWhereUniqueWithoutUploaded_byInput[]
    createMany?: PromoCreateManyUploaded_byInputEnvelope
    set?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    disconnect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    delete?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    connect?: PromoWhereUniqueInput | PromoWhereUniqueInput[]
    update?: PromoUpdateWithWhereUniqueWithoutUploaded_byInput | PromoUpdateWithWhereUniqueWithoutUploaded_byInput[]
    updateMany?: PromoUpdateManyWithWhereWithoutUploaded_byInput | PromoUpdateManyWithWhereWithoutUploaded_byInput[]
    deleteMany?: PromoScalarWhereInput | PromoScalarWhereInput[]
  }

  export type CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput = {
    create?: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput> | CreditLogCreateWithoutCreditedByInput[] | CreditLogUncheckedCreateWithoutCreditedByInput[]
    connectOrCreate?: CreditLogCreateOrConnectWithoutCreditedByInput | CreditLogCreateOrConnectWithoutCreditedByInput[]
    upsert?: CreditLogUpsertWithWhereUniqueWithoutCreditedByInput | CreditLogUpsertWithWhereUniqueWithoutCreditedByInput[]
    createMany?: CreditLogCreateManyCreditedByInputEnvelope
    set?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    disconnect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    delete?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    connect?: CreditLogWhereUniqueInput | CreditLogWhereUniqueInput[]
    update?: CreditLogUpdateWithWhereUniqueWithoutCreditedByInput | CreditLogUpdateWithWhereUniqueWithoutCreditedByInput[]
    updateMany?: CreditLogUpdateManyWithWhereWithoutCreditedByInput | CreditLogUpdateManyWithWhereWithoutCreditedByInput[]
    deleteMany?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
  }

  export type BatchCreateNestedOneWithoutRecipientsInput = {
    create?: XOR<BatchCreateWithoutRecipientsInput, BatchUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRecipientsInput
    connect?: BatchWhereUniqueInput
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BatchUpdateOneRequiredWithoutRecipientsNestedInput = {
    create?: XOR<BatchCreateWithoutRecipientsInput, BatchUncheckedCreateWithoutRecipientsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutRecipientsInput
    upsert?: BatchUpsertWithoutRecipientsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutRecipientsInput, BatchUpdateWithoutRecipientsInput>, BatchUncheckedUpdateWithoutRecipientsInput>
  }

  export type BatchCreateNestedOneWithoutProcessingLogsInput = {
    create?: XOR<BatchCreateWithoutProcessingLogsInput, BatchUncheckedCreateWithoutProcessingLogsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutProcessingLogsInput
    connect?: BatchWhereUniqueInput
  }

  export type EnumProcessingStatusFieldUpdateOperationsInput = {
    set?: $Enums.ProcessingStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BatchUpdateOneRequiredWithoutProcessingLogsNestedInput = {
    create?: XOR<BatchCreateWithoutProcessingLogsInput, BatchUncheckedCreateWithoutProcessingLogsInput>
    connectOrCreate?: BatchCreateOrConnectWithoutProcessingLogsInput
    upsert?: BatchUpsertWithoutProcessingLogsInput
    connect?: BatchWhereUniqueInput
    update?: XOR<XOR<BatchUpdateToOneWithWhereWithoutProcessingLogsInput, BatchUpdateWithoutProcessingLogsInput>, BatchUncheckedUpdateWithoutProcessingLogsInput>
  }

  export type CustomerCreateNestedManyWithoutBatchInput = {
    create?: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput> | CustomerCreateWithoutBatchInput[] | CustomerUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutBatchInput | CustomerCreateOrConnectWithoutBatchInput[]
    createMany?: CustomerCreateManyBatchInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProcessingLogCreateNestedManyWithoutBatchInput = {
    create?: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput> | ProcessingLogCreateWithoutBatchInput[] | ProcessingLogUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ProcessingLogCreateOrConnectWithoutBatchInput | ProcessingLogCreateOrConnectWithoutBatchInput[]
    createMany?: ProcessingLogCreateManyBatchInputEnvelope
    connect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutBatchesApprovedInput = {
    create?: XOR<UserCreateWithoutBatchesApprovedInput, UserUncheckedCreateWithoutBatchesApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBatchesApprovedInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutBatchesRejectedInput = {
    create?: XOR<UserCreateWithoutBatchesRejectedInput, UserUncheckedCreateWithoutBatchesRejectedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBatchesRejectedInput
    connect?: UserWhereUniqueInput
  }

  export type CustomerUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput> | CustomerCreateWithoutBatchInput[] | CustomerUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutBatchInput | CustomerCreateOrConnectWithoutBatchInput[]
    createMany?: CustomerCreateManyBatchInputEnvelope
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
  }

  export type ProcessingLogUncheckedCreateNestedManyWithoutBatchInput = {
    create?: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput> | ProcessingLogCreateWithoutBatchInput[] | ProcessingLogUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ProcessingLogCreateOrConnectWithoutBatchInput | ProcessingLogCreateOrConnectWithoutBatchInput[]
    createMany?: ProcessingLogCreateManyBatchInputEnvelope
    connect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
  }

  export type EnumBatchStatusFieldUpdateOperationsInput = {
    set?: $Enums.BatchStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CustomerUpdateManyWithoutBatchNestedInput = {
    create?: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput> | CustomerCreateWithoutBatchInput[] | CustomerUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutBatchInput | CustomerCreateOrConnectWithoutBatchInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutBatchInput | CustomerUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: CustomerCreateManyBatchInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutBatchInput | CustomerUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutBatchInput | CustomerUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProcessingLogUpdateManyWithoutBatchNestedInput = {
    create?: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput> | ProcessingLogCreateWithoutBatchInput[] | ProcessingLogUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ProcessingLogCreateOrConnectWithoutBatchInput | ProcessingLogCreateOrConnectWithoutBatchInput[]
    upsert?: ProcessingLogUpsertWithWhereUniqueWithoutBatchInput | ProcessingLogUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: ProcessingLogCreateManyBatchInputEnvelope
    set?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    disconnect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    delete?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    connect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    update?: ProcessingLogUpdateWithWhereUniqueWithoutBatchInput | ProcessingLogUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: ProcessingLogUpdateManyWithWhereWithoutBatchInput | ProcessingLogUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: ProcessingLogScalarWhereInput | ProcessingLogScalarWhereInput[]
  }

  export type UserUpdateOneWithoutBatchesApprovedNestedInput = {
    create?: XOR<UserCreateWithoutBatchesApprovedInput, UserUncheckedCreateWithoutBatchesApprovedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBatchesApprovedInput
    upsert?: UserUpsertWithoutBatchesApprovedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBatchesApprovedInput, UserUpdateWithoutBatchesApprovedInput>, UserUncheckedUpdateWithoutBatchesApprovedInput>
  }

  export type UserUpdateOneWithoutBatchesRejectedNestedInput = {
    create?: XOR<UserCreateWithoutBatchesRejectedInput, UserUncheckedCreateWithoutBatchesRejectedInput>
    connectOrCreate?: UserCreateOrConnectWithoutBatchesRejectedInput
    upsert?: UserUpsertWithoutBatchesRejectedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutBatchesRejectedInput, UserUpdateWithoutBatchesRejectedInput>, UserUncheckedUpdateWithoutBatchesRejectedInput>
  }

  export type CustomerUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput> | CustomerCreateWithoutBatchInput[] | CustomerUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: CustomerCreateOrConnectWithoutBatchInput | CustomerCreateOrConnectWithoutBatchInput[]
    upsert?: CustomerUpsertWithWhereUniqueWithoutBatchInput | CustomerUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: CustomerCreateManyBatchInputEnvelope
    set?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    disconnect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    delete?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    connect?: CustomerWhereUniqueInput | CustomerWhereUniqueInput[]
    update?: CustomerUpdateWithWhereUniqueWithoutBatchInput | CustomerUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: CustomerUpdateManyWithWhereWithoutBatchInput | CustomerUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
  }

  export type ProcessingLogUncheckedUpdateManyWithoutBatchNestedInput = {
    create?: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput> | ProcessingLogCreateWithoutBatchInput[] | ProcessingLogUncheckedCreateWithoutBatchInput[]
    connectOrCreate?: ProcessingLogCreateOrConnectWithoutBatchInput | ProcessingLogCreateOrConnectWithoutBatchInput[]
    upsert?: ProcessingLogUpsertWithWhereUniqueWithoutBatchInput | ProcessingLogUpsertWithWhereUniqueWithoutBatchInput[]
    createMany?: ProcessingLogCreateManyBatchInputEnvelope
    set?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    disconnect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    delete?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    connect?: ProcessingLogWhereUniqueInput | ProcessingLogWhereUniqueInput[]
    update?: ProcessingLogUpdateWithWhereUniqueWithoutBatchInput | ProcessingLogUpdateWithWhereUniqueWithoutBatchInput[]
    updateMany?: ProcessingLogUpdateManyWithWhereWithoutBatchInput | ProcessingLogUpdateManyWithWhereWithoutBatchInput[]
    deleteMany?: ProcessingLogScalarWhereInput | ProcessingLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPromoUploadedInput = {
    create?: XOR<UserCreateWithoutPromoUploadedInput, UserUncheckedCreateWithoutPromoUploadedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUploadedInput
    connect?: UserWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneWithoutPromoUploadedNestedInput = {
    create?: XOR<UserCreateWithoutPromoUploadedInput, UserUncheckedCreateWithoutPromoUploadedInput>
    connectOrCreate?: UserCreateOrConnectWithoutPromoUploadedInput
    upsert?: UserUpsertWithoutPromoUploadedInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPromoUploadedInput, UserUpdateWithoutPromoUploadedInput>, UserUncheckedUpdateWithoutPromoUploadedInput>
  }

  export type UserCreateNestedOneWithoutCreditsIssuedInput = {
    create?: XOR<UserCreateWithoutCreditsIssuedInput, UserUncheckedCreateWithoutCreditsIssuedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditsIssuedInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutCreditsIssuedNestedInput = {
    create?: XOR<UserCreateWithoutCreditsIssuedInput, UserUncheckedCreateWithoutCreditsIssuedInput>
    connectOrCreate?: UserCreateOrConnectWithoutCreditsIssuedInput
    upsert?: UserUpsertWithoutCreditsIssuedInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCreditsIssuedInput, UserUpdateWithoutCreditsIssuedInput>, UserUncheckedUpdateWithoutCreditsIssuedInput>
  }

  export type UserCreateNestedOneWithoutPermissionsInput = {
    create?: XOR<UserCreateWithoutPermissionsInput, UserUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPermissionsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutPermissionsNestedInput = {
    create?: XOR<UserCreateWithoutPermissionsInput, UserUncheckedCreateWithoutPermissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPermissionsInput
    upsert?: UserUpsertWithoutPermissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPermissionsInput, UserUpdateWithoutPermissionsInput>, UserUncheckedUpdateWithoutPermissionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | EnumUserRoleFieldRefInput<$PrismaModel>
    in?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.UserRole[] | ListEnumUserRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUserRoleFilter<$PrismaModel>
    _max?: NestedEnumUserRoleFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedEnumProcessingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusFilter<$PrismaModel> | $Enums.ProcessingStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProcessingStatus | EnumProcessingStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.ProcessingStatus[] | ListEnumProcessingStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumProcessingStatusWithAggregatesFilter<$PrismaModel> | $Enums.ProcessingStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProcessingStatusFilter<$PrismaModel>
    _max?: NestedEnumProcessingStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumBatchStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusFilter<$PrismaModel> | $Enums.BatchStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BatchStatus | EnumBatchStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.BatchStatus[] | ListEnumBatchStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumBatchStatusWithAggregatesFilter<$PrismaModel> | $Enums.BatchStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBatchStatusFilter<$PrismaModel>
    _max?: NestedEnumBatchStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }
  export type NestedJsonFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type PermissionsCreateWithoutUserInput = {
    id?: string
    permission: string
  }

  export type PermissionsUncheckedCreateWithoutUserInput = {
    id?: string
    permission: string
  }

  export type PermissionsCreateOrConnectWithoutUserInput = {
    where: PermissionsWhereUniqueInput
    create: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput>
  }

  export type PermissionsCreateManyUserInputEnvelope = {
    data: PermissionsCreateManyUserInput | PermissionsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type BatchCreateWithoutApprovedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    recipients?: CustomerCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogCreateNestedManyWithoutBatchInput
    rejectedBy?: UserCreateNestedOneWithoutBatchesRejectedInput
  }

  export type BatchUncheckedCreateWithoutApprovedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    rejectedById?: string | null
    recipients?: CustomerUncheckedCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutApprovedByInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput>
  }

  export type BatchCreateManyApprovedByInputEnvelope = {
    data: BatchCreateManyApprovedByInput | BatchCreateManyApprovedByInput[]
    skipDuplicates?: boolean
  }

  export type BatchCreateWithoutRejectedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    recipients?: CustomerCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogCreateNestedManyWithoutBatchInput
    approvedBy?: UserCreateNestedOneWithoutBatchesApprovedInput
  }

  export type BatchUncheckedCreateWithoutRejectedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
    recipients?: CustomerUncheckedCreateNestedManyWithoutBatchInput
    processingLogs?: ProcessingLogUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutRejectedByInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput>
  }

  export type BatchCreateManyRejectedByInputEnvelope = {
    data: BatchCreateManyRejectedByInput | BatchCreateManyRejectedByInput[]
    skipDuplicates?: boolean
  }

  export type PromoCreateWithoutUploaded_byInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
  }

  export type PromoUncheckedCreateWithoutUploaded_byInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
  }

  export type PromoCreateOrConnectWithoutUploaded_byInput = {
    where: PromoWhereUniqueInput
    create: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput>
  }

  export type PromoCreateManyUploaded_byInputEnvelope = {
    data: PromoCreateManyUploaded_byInput | PromoCreateManyUploaded_byInput[]
    skipDuplicates?: boolean
  }

  export type CreditLogCreateWithoutCreditedByInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
  }

  export type CreditLogUncheckedCreateWithoutCreditedByInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
  }

  export type CreditLogCreateOrConnectWithoutCreditedByInput = {
    where: CreditLogWhereUniqueInput
    create: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput>
  }

  export type CreditLogCreateManyCreditedByInputEnvelope = {
    data: CreditLogCreateManyCreditedByInput | CreditLogCreateManyCreditedByInput[]
    skipDuplicates?: boolean
  }

  export type PermissionsUpsertWithWhereUniqueWithoutUserInput = {
    where: PermissionsWhereUniqueInput
    update: XOR<PermissionsUpdateWithoutUserInput, PermissionsUncheckedUpdateWithoutUserInput>
    create: XOR<PermissionsCreateWithoutUserInput, PermissionsUncheckedCreateWithoutUserInput>
  }

  export type PermissionsUpdateWithWhereUniqueWithoutUserInput = {
    where: PermissionsWhereUniqueInput
    data: XOR<PermissionsUpdateWithoutUserInput, PermissionsUncheckedUpdateWithoutUserInput>
  }

  export type PermissionsUpdateManyWithWhereWithoutUserInput = {
    where: PermissionsScalarWhereInput
    data: XOR<PermissionsUpdateManyMutationInput, PermissionsUncheckedUpdateManyWithoutUserInput>
  }

  export type PermissionsScalarWhereInput = {
    AND?: PermissionsScalarWhereInput | PermissionsScalarWhereInput[]
    OR?: PermissionsScalarWhereInput[]
    NOT?: PermissionsScalarWhereInput | PermissionsScalarWhereInput[]
    id?: StringFilter<"Permissions"> | string
    user_id?: StringFilter<"Permissions"> | string
    permission?: StringFilter<"Permissions"> | string
  }

  export type BatchUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: BatchWhereUniqueInput
    update: XOR<BatchUpdateWithoutApprovedByInput, BatchUncheckedUpdateWithoutApprovedByInput>
    create: XOR<BatchCreateWithoutApprovedByInput, BatchUncheckedCreateWithoutApprovedByInput>
  }

  export type BatchUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: BatchWhereUniqueInput
    data: XOR<BatchUpdateWithoutApprovedByInput, BatchUncheckedUpdateWithoutApprovedByInput>
  }

  export type BatchUpdateManyWithWhereWithoutApprovedByInput = {
    where: BatchScalarWhereInput
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyWithoutApprovedByInput>
  }

  export type BatchScalarWhereInput = {
    AND?: BatchScalarWhereInput | BatchScalarWhereInput[]
    OR?: BatchScalarWhereInput[]
    NOT?: BatchScalarWhereInput | BatchScalarWhereInput[]
    id?: StringFilter<"Batch"> | string
    batch_no?: StringFilter<"Batch"> | string
    particulars?: StringFilter<"Batch"> | string
    status?: EnumBatchStatusFilter<"Batch"> | $Enums.BatchStatus
    csv?: StringFilter<"Batch"> | string
    total_amount?: IntFilter<"Batch"> | number
    date_initiated?: DateTimeFilter<"Batch"> | Date | string
    date_approved?: DateTimeNullableFilter<"Batch"> | Date | string | null
    approvedById?: StringNullableFilter<"Batch"> | string | null
    rejectedById?: StringNullableFilter<"Batch"> | string | null
  }

  export type BatchUpsertWithWhereUniqueWithoutRejectedByInput = {
    where: BatchWhereUniqueInput
    update: XOR<BatchUpdateWithoutRejectedByInput, BatchUncheckedUpdateWithoutRejectedByInput>
    create: XOR<BatchCreateWithoutRejectedByInput, BatchUncheckedCreateWithoutRejectedByInput>
  }

  export type BatchUpdateWithWhereUniqueWithoutRejectedByInput = {
    where: BatchWhereUniqueInput
    data: XOR<BatchUpdateWithoutRejectedByInput, BatchUncheckedUpdateWithoutRejectedByInput>
  }

  export type BatchUpdateManyWithWhereWithoutRejectedByInput = {
    where: BatchScalarWhereInput
    data: XOR<BatchUpdateManyMutationInput, BatchUncheckedUpdateManyWithoutRejectedByInput>
  }

  export type PromoUpsertWithWhereUniqueWithoutUploaded_byInput = {
    where: PromoWhereUniqueInput
    update: XOR<PromoUpdateWithoutUploaded_byInput, PromoUncheckedUpdateWithoutUploaded_byInput>
    create: XOR<PromoCreateWithoutUploaded_byInput, PromoUncheckedCreateWithoutUploaded_byInput>
  }

  export type PromoUpdateWithWhereUniqueWithoutUploaded_byInput = {
    where: PromoWhereUniqueInput
    data: XOR<PromoUpdateWithoutUploaded_byInput, PromoUncheckedUpdateWithoutUploaded_byInput>
  }

  export type PromoUpdateManyWithWhereWithoutUploaded_byInput = {
    where: PromoScalarWhereInput
    data: XOR<PromoUpdateManyMutationInput, PromoUncheckedUpdateManyWithoutUploaded_byInput>
  }

  export type PromoScalarWhereInput = {
    AND?: PromoScalarWhereInput | PromoScalarWhereInput[]
    OR?: PromoScalarWhereInput[]
    NOT?: PromoScalarWhereInput | PromoScalarWhereInput[]
    id?: StringFilter<"Promo"> | string
    title?: StringFilter<"Promo"> | string
    description?: StringFilter<"Promo"> | string
    info?: JsonFilter<"Promo">
    carousel_image?: StringFilter<"Promo"> | string
    image?: StringFilter<"Promo"> | string
    start?: DateTimeFilter<"Promo"> | Date | string
    end?: DateTimeNullableFilter<"Promo"> | Date | string | null
    term_and_conditions?: StringNullableFilter<"Promo"> | string | null
    amount?: IntNullableFilter<"Promo"> | number | null
    is_active?: BoolFilter<"Promo"> | boolean
    uploaded_by_id?: StringNullableFilter<"Promo"> | string | null
  }

  export type CreditLogUpsertWithWhereUniqueWithoutCreditedByInput = {
    where: CreditLogWhereUniqueInput
    update: XOR<CreditLogUpdateWithoutCreditedByInput, CreditLogUncheckedUpdateWithoutCreditedByInput>
    create: XOR<CreditLogCreateWithoutCreditedByInput, CreditLogUncheckedCreateWithoutCreditedByInput>
  }

  export type CreditLogUpdateWithWhereUniqueWithoutCreditedByInput = {
    where: CreditLogWhereUniqueInput
    data: XOR<CreditLogUpdateWithoutCreditedByInput, CreditLogUncheckedUpdateWithoutCreditedByInput>
  }

  export type CreditLogUpdateManyWithWhereWithoutCreditedByInput = {
    where: CreditLogScalarWhereInput
    data: XOR<CreditLogUpdateManyMutationInput, CreditLogUncheckedUpdateManyWithoutCreditedByInput>
  }

  export type CreditLogScalarWhereInput = {
    AND?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
    OR?: CreditLogScalarWhereInput[]
    NOT?: CreditLogScalarWhereInput | CreditLogScalarWhereInput[]
    id?: StringFilter<"CreditLog"> | string
    playerId?: StringFilter<"CreditLog"> | string
    msisdn?: StringFilter<"CreditLog"> | string
    amount?: IntFilter<"CreditLog"> | number
    subject?: StringFilter<"CreditLog"> | string
    description?: StringNullableFilter<"CreditLog"> | string | null
    status?: EnumProcessingStatusFilter<"CreditLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"CreditLog">
    smsStatus?: StringNullableFilter<"CreditLog"> | string | null
    errorMessage?: StringNullableFilter<"CreditLog"> | string | null
    creditedAt?: DateTimeFilter<"CreditLog"> | Date | string
    creditedById?: StringFilter<"CreditLog"> | string
  }

  export type BatchCreateWithoutRecipientsInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    processingLogs?: ProcessingLogCreateNestedManyWithoutBatchInput
    approvedBy?: UserCreateNestedOneWithoutBatchesApprovedInput
    rejectedBy?: UserCreateNestedOneWithoutBatchesRejectedInput
  }

  export type BatchUncheckedCreateWithoutRecipientsInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
    rejectedById?: string | null
    processingLogs?: ProcessingLogUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutRecipientsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutRecipientsInput, BatchUncheckedCreateWithoutRecipientsInput>
  }

  export type BatchUpsertWithoutRecipientsInput = {
    update: XOR<BatchUpdateWithoutRecipientsInput, BatchUncheckedUpdateWithoutRecipientsInput>
    create: XOR<BatchCreateWithoutRecipientsInput, BatchUncheckedCreateWithoutRecipientsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutRecipientsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutRecipientsInput, BatchUncheckedUpdateWithoutRecipientsInput>
  }

  export type BatchUpdateWithoutRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    processingLogs?: ProcessingLogUpdateManyWithoutBatchNestedInput
    approvedBy?: UserUpdateOneWithoutBatchesApprovedNestedInput
    rejectedBy?: UserUpdateOneWithoutBatchesRejectedNestedInput
  }

  export type BatchUncheckedUpdateWithoutRecipientsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
    processingLogs?: ProcessingLogUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchCreateWithoutProcessingLogsInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    recipients?: CustomerCreateNestedManyWithoutBatchInput
    approvedBy?: UserCreateNestedOneWithoutBatchesApprovedInput
    rejectedBy?: UserCreateNestedOneWithoutBatchesRejectedInput
  }

  export type BatchUncheckedCreateWithoutProcessingLogsInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
    rejectedById?: string | null
    recipients?: CustomerUncheckedCreateNestedManyWithoutBatchInput
  }

  export type BatchCreateOrConnectWithoutProcessingLogsInput = {
    where: BatchWhereUniqueInput
    create: XOR<BatchCreateWithoutProcessingLogsInput, BatchUncheckedCreateWithoutProcessingLogsInput>
  }

  export type BatchUpsertWithoutProcessingLogsInput = {
    update: XOR<BatchUpdateWithoutProcessingLogsInput, BatchUncheckedUpdateWithoutProcessingLogsInput>
    create: XOR<BatchCreateWithoutProcessingLogsInput, BatchUncheckedCreateWithoutProcessingLogsInput>
    where?: BatchWhereInput
  }

  export type BatchUpdateToOneWithWhereWithoutProcessingLogsInput = {
    where?: BatchWhereInput
    data: XOR<BatchUpdateWithoutProcessingLogsInput, BatchUncheckedUpdateWithoutProcessingLogsInput>
  }

  export type BatchUpdateWithoutProcessingLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipients?: CustomerUpdateManyWithoutBatchNestedInput
    approvedBy?: UserUpdateOneWithoutBatchesApprovedNestedInput
    rejectedBy?: UserUpdateOneWithoutBatchesRejectedNestedInput
  }

  export type BatchUncheckedUpdateWithoutProcessingLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
    recipients?: CustomerUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type CustomerCreateWithoutBatchInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
  }

  export type CustomerUncheckedCreateWithoutBatchInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
  }

  export type CustomerCreateOrConnectWithoutBatchInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput>
  }

  export type CustomerCreateManyBatchInputEnvelope = {
    data: CustomerCreateManyBatchInput | CustomerCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type ProcessingLogCreateWithoutBatchInput = {
    id?: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
  }

  export type ProcessingLogUncheckedCreateWithoutBatchInput = {
    id?: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
  }

  export type ProcessingLogCreateOrConnectWithoutBatchInput = {
    where: ProcessingLogWhereUniqueInput
    create: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput>
  }

  export type ProcessingLogCreateManyBatchInputEnvelope = {
    data: ProcessingLogCreateManyBatchInput | ProcessingLogCreateManyBatchInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutBatchesApprovedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsCreateNestedManyWithoutUserInput
    batchesRejected?: BatchCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogCreateNestedManyWithoutCreditedByInput
  }

  export type UserUncheckedCreateWithoutBatchesApprovedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsUncheckedCreateNestedManyWithoutUserInput
    batchesRejected?: BatchUncheckedCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoUncheckedCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogUncheckedCreateNestedManyWithoutCreditedByInput
  }

  export type UserCreateOrConnectWithoutBatchesApprovedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBatchesApprovedInput, UserUncheckedCreateWithoutBatchesApprovedInput>
  }

  export type UserCreateWithoutBatchesRejectedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsCreateNestedManyWithoutUserInput
    batchesApproved?: BatchCreateNestedManyWithoutApprovedByInput
    promoUploaded?: PromoCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogCreateNestedManyWithoutCreditedByInput
  }

  export type UserUncheckedCreateWithoutBatchesRejectedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsUncheckedCreateNestedManyWithoutUserInput
    batchesApproved?: BatchUncheckedCreateNestedManyWithoutApprovedByInput
    promoUploaded?: PromoUncheckedCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogUncheckedCreateNestedManyWithoutCreditedByInput
  }

  export type UserCreateOrConnectWithoutBatchesRejectedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutBatchesRejectedInput, UserUncheckedCreateWithoutBatchesRejectedInput>
  }

  export type CustomerUpsertWithWhereUniqueWithoutBatchInput = {
    where: CustomerWhereUniqueInput
    update: XOR<CustomerUpdateWithoutBatchInput, CustomerUncheckedUpdateWithoutBatchInput>
    create: XOR<CustomerCreateWithoutBatchInput, CustomerUncheckedCreateWithoutBatchInput>
  }

  export type CustomerUpdateWithWhereUniqueWithoutBatchInput = {
    where: CustomerWhereUniqueInput
    data: XOR<CustomerUpdateWithoutBatchInput, CustomerUncheckedUpdateWithoutBatchInput>
  }

  export type CustomerUpdateManyWithWhereWithoutBatchInput = {
    where: CustomerScalarWhereInput
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyWithoutBatchInput>
  }

  export type CustomerScalarWhereInput = {
    AND?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    OR?: CustomerScalarWhereInput[]
    NOT?: CustomerScalarWhereInput | CustomerScalarWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    phoneNumber?: StringFilter<"Customer"> | string
    amount?: IntFilter<"Customer"> | number
    batchId?: StringFilter<"Customer"> | string
  }

  export type ProcessingLogUpsertWithWhereUniqueWithoutBatchInput = {
    where: ProcessingLogWhereUniqueInput
    update: XOR<ProcessingLogUpdateWithoutBatchInput, ProcessingLogUncheckedUpdateWithoutBatchInput>
    create: XOR<ProcessingLogCreateWithoutBatchInput, ProcessingLogUncheckedCreateWithoutBatchInput>
  }

  export type ProcessingLogUpdateWithWhereUniqueWithoutBatchInput = {
    where: ProcessingLogWhereUniqueInput
    data: XOR<ProcessingLogUpdateWithoutBatchInput, ProcessingLogUncheckedUpdateWithoutBatchInput>
  }

  export type ProcessingLogUpdateManyWithWhereWithoutBatchInput = {
    where: ProcessingLogScalarWhereInput
    data: XOR<ProcessingLogUpdateManyMutationInput, ProcessingLogUncheckedUpdateManyWithoutBatchInput>
  }

  export type ProcessingLogScalarWhereInput = {
    AND?: ProcessingLogScalarWhereInput | ProcessingLogScalarWhereInput[]
    OR?: ProcessingLogScalarWhereInput[]
    NOT?: ProcessingLogScalarWhereInput | ProcessingLogScalarWhereInput[]
    id?: StringFilter<"ProcessingLog"> | string
    batchId?: StringFilter<"ProcessingLog"> | string
    msisdn?: StringFilter<"ProcessingLog"> | string
    amount?: IntFilter<"ProcessingLog"> | number
    status?: EnumProcessingStatusFilter<"ProcessingLog"> | $Enums.ProcessingStatus
    creditResponse?: JsonNullableFilter<"ProcessingLog">
    smsStatus?: StringNullableFilter<"ProcessingLog"> | string | null
    errorMessage?: StringNullableFilter<"ProcessingLog"> | string | null
    processedAt?: DateTimeFilter<"ProcessingLog"> | Date | string
  }

  export type UserUpsertWithoutBatchesApprovedInput = {
    update: XOR<UserUpdateWithoutBatchesApprovedInput, UserUncheckedUpdateWithoutBatchesApprovedInput>
    create: XOR<UserCreateWithoutBatchesApprovedInput, UserUncheckedCreateWithoutBatchesApprovedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBatchesApprovedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBatchesApprovedInput, UserUncheckedUpdateWithoutBatchesApprovedInput>
  }

  export type UserUpdateWithoutBatchesApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUpdateManyWithoutUserNestedInput
    batchesRejected?: BatchUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUncheckedUpdateWithoutBatchesApprovedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUncheckedUpdateManyWithoutUserNestedInput
    batchesRejected?: BatchUncheckedUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUncheckedUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUpsertWithoutBatchesRejectedInput = {
    update: XOR<UserUpdateWithoutBatchesRejectedInput, UserUncheckedUpdateWithoutBatchesRejectedInput>
    create: XOR<UserCreateWithoutBatchesRejectedInput, UserUncheckedCreateWithoutBatchesRejectedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutBatchesRejectedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutBatchesRejectedInput, UserUncheckedUpdateWithoutBatchesRejectedInput>
  }

  export type UserUpdateWithoutBatchesRejectedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUpdateManyWithoutApprovedByNestedInput
    promoUploaded?: PromoUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUncheckedUpdateWithoutBatchesRejectedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUncheckedUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUncheckedUpdateManyWithoutApprovedByNestedInput
    promoUploaded?: PromoUncheckedUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput
  }

  export type UserCreateWithoutPromoUploadedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsCreateNestedManyWithoutUserInput
    batchesApproved?: BatchCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchCreateNestedManyWithoutRejectedByInput
    creditsIssued?: CreditLogCreateNestedManyWithoutCreditedByInput
  }

  export type UserUncheckedCreateWithoutPromoUploadedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsUncheckedCreateNestedManyWithoutUserInput
    batchesApproved?: BatchUncheckedCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchUncheckedCreateNestedManyWithoutRejectedByInput
    creditsIssued?: CreditLogUncheckedCreateNestedManyWithoutCreditedByInput
  }

  export type UserCreateOrConnectWithoutPromoUploadedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPromoUploadedInput, UserUncheckedCreateWithoutPromoUploadedInput>
  }

  export type UserUpsertWithoutPromoUploadedInput = {
    update: XOR<UserUpdateWithoutPromoUploadedInput, UserUncheckedUpdateWithoutPromoUploadedInput>
    create: XOR<UserCreateWithoutPromoUploadedInput, UserUncheckedCreateWithoutPromoUploadedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPromoUploadedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPromoUploadedInput, UserUncheckedUpdateWithoutPromoUploadedInput>
  }

  export type UserUpdateWithoutPromoUploadedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUpdateManyWithoutRejectedByNestedInput
    creditsIssued?: CreditLogUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUncheckedUpdateWithoutPromoUploadedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUncheckedUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUncheckedUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUncheckedUpdateManyWithoutRejectedByNestedInput
    creditsIssued?: CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput
  }

  export type UserCreateWithoutCreditsIssuedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsCreateNestedManyWithoutUserInput
    batchesApproved?: BatchCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoCreateNestedManyWithoutUploaded_byInput
  }

  export type UserUncheckedCreateWithoutCreditsIssuedInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    permissions?: PermissionsUncheckedCreateNestedManyWithoutUserInput
    batchesApproved?: BatchUncheckedCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchUncheckedCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoUncheckedCreateNestedManyWithoutUploaded_byInput
  }

  export type UserCreateOrConnectWithoutCreditsIssuedInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCreditsIssuedInput, UserUncheckedCreateWithoutCreditsIssuedInput>
  }

  export type UserUpsertWithoutCreditsIssuedInput = {
    update: XOR<UserUpdateWithoutCreditsIssuedInput, UserUncheckedUpdateWithoutCreditsIssuedInput>
    create: XOR<UserCreateWithoutCreditsIssuedInput, UserUncheckedCreateWithoutCreditsIssuedInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCreditsIssuedInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCreditsIssuedInput, UserUncheckedUpdateWithoutCreditsIssuedInput>
  }

  export type UserUpdateWithoutCreditsIssuedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUpdateManyWithoutUploaded_byNestedInput
  }

  export type UserUncheckedUpdateWithoutCreditsIssuedInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    permissions?: PermissionsUncheckedUpdateManyWithoutUserNestedInput
    batchesApproved?: BatchUncheckedUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUncheckedUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUncheckedUpdateManyWithoutUploaded_byNestedInput
  }

  export type UserCreateWithoutPermissionsInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    batchesApproved?: BatchCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogCreateNestedManyWithoutCreditedByInput
  }

  export type UserUncheckedCreateWithoutPermissionsInput = {
    id: string
    name: string
    email: string
    role?: $Enums.UserRole
    batchesApproved?: BatchUncheckedCreateNestedManyWithoutApprovedByInput
    batchesRejected?: BatchUncheckedCreateNestedManyWithoutRejectedByInput
    promoUploaded?: PromoUncheckedCreateNestedManyWithoutUploaded_byInput
    creditsIssued?: CreditLogUncheckedCreateNestedManyWithoutCreditedByInput
  }

  export type UserCreateOrConnectWithoutPermissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPermissionsInput, UserUncheckedCreateWithoutPermissionsInput>
  }

  export type UserUpsertWithoutPermissionsInput = {
    update: XOR<UserUpdateWithoutPermissionsInput, UserUncheckedUpdateWithoutPermissionsInput>
    create: XOR<UserCreateWithoutPermissionsInput, UserUncheckedCreateWithoutPermissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPermissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPermissionsInput, UserUncheckedUpdateWithoutPermissionsInput>
  }

  export type UserUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    batchesApproved?: BatchUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUpdateManyWithoutCreditedByNestedInput
  }

  export type UserUncheckedUpdateWithoutPermissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole
    batchesApproved?: BatchUncheckedUpdateManyWithoutApprovedByNestedInput
    batchesRejected?: BatchUncheckedUpdateManyWithoutRejectedByNestedInput
    promoUploaded?: PromoUncheckedUpdateManyWithoutUploaded_byNestedInput
    creditsIssued?: CreditLogUncheckedUpdateManyWithoutCreditedByNestedInput
  }

  export type PermissionsCreateManyUserInput = {
    id?: string
    permission: string
  }

  export type BatchCreateManyApprovedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    rejectedById?: string | null
  }

  export type BatchCreateManyRejectedByInput = {
    id?: string
    batch_no: string
    particulars: string
    status?: $Enums.BatchStatus
    csv: string
    total_amount: number
    date_initiated: Date | string
    date_approved?: Date | string | null
    approvedById?: string | null
  }

  export type PromoCreateManyUploaded_byInput = {
    id?: string
    title: string
    description: string
    info: JsonNullValueInput | InputJsonValue
    carousel_image: string
    image: string
    start: Date | string
    end?: Date | string | null
    term_and_conditions?: string | null
    amount?: number | null
    is_active: boolean
  }

  export type CreditLogCreateManyCreditedByInput = {
    id?: string
    playerId: string
    msisdn: string
    amount: number
    subject: string
    description?: string | null
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    creditedAt?: Date | string
  }

  export type PermissionsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PermissionsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type PermissionsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    permission?: StringFieldUpdateOperationsInput | string
  }

  export type BatchUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipients?: CustomerUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUpdateManyWithoutBatchNestedInput
    rejectedBy?: UserUpdateOneWithoutBatchesRejectedNestedInput
  }

  export type BatchUncheckedUpdateWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
    recipients?: CustomerUncheckedUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateManyWithoutApprovedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    rejectedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BatchUpdateWithoutRejectedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    recipients?: CustomerUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUpdateManyWithoutBatchNestedInput
    approvedBy?: UserUpdateOneWithoutBatchesApprovedNestedInput
  }

  export type BatchUncheckedUpdateWithoutRejectedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
    recipients?: CustomerUncheckedUpdateManyWithoutBatchNestedInput
    processingLogs?: ProcessingLogUncheckedUpdateManyWithoutBatchNestedInput
  }

  export type BatchUncheckedUpdateManyWithoutRejectedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    batch_no?: StringFieldUpdateOperationsInput | string
    particulars?: StringFieldUpdateOperationsInput | string
    status?: EnumBatchStatusFieldUpdateOperationsInput | $Enums.BatchStatus
    csv?: StringFieldUpdateOperationsInput | string
    total_amount?: IntFieldUpdateOperationsInput | number
    date_initiated?: DateTimeFieldUpdateOperationsInput | Date | string
    date_approved?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    approvedById?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PromoUpdateWithoutUploaded_byInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PromoUncheckedUpdateWithoutUploaded_byInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type PromoUncheckedUpdateManyWithoutUploaded_byInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    info?: JsonNullValueInput | InputJsonValue
    carousel_image?: StringFieldUpdateOperationsInput | string
    image?: StringFieldUpdateOperationsInput | string
    start?: DateTimeFieldUpdateOperationsInput | Date | string
    end?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    term_and_conditions?: NullableStringFieldUpdateOperationsInput | string | null
    amount?: NullableIntFieldUpdateOperationsInput | number | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CreditLogUpdateWithoutCreditedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateWithoutCreditedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CreditLogUncheckedUpdateManyWithoutCreditedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    playerId?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    subject?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    creditedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerCreateManyBatchInput = {
    id?: string
    name: string
    phoneNumber: string
    amount: number
  }

  export type ProcessingLogCreateManyBatchInput = {
    id?: string
    msisdn: string
    amount: number
    status: $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: string | null
    errorMessage?: string | null
    processedAt?: Date | string
  }

  export type CustomerUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type CustomerUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type CustomerUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    phoneNumber?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
  }

  export type ProcessingLogUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingLogUncheckedUpdateWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProcessingLogUncheckedUpdateManyWithoutBatchInput = {
    id?: StringFieldUpdateOperationsInput | string
    msisdn?: StringFieldUpdateOperationsInput | string
    amount?: IntFieldUpdateOperationsInput | number
    status?: EnumProcessingStatusFieldUpdateOperationsInput | $Enums.ProcessingStatus
    creditResponse?: NullableJsonNullValueInput | InputJsonValue
    smsStatus?: NullableStringFieldUpdateOperationsInput | string | null
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    processedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BatchCountOutputTypeDefaultArgs instead
     */
    export type BatchCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CustomerDefaultArgs instead
     */
    export type CustomerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CustomerDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ProcessingLogDefaultArgs instead
     */
    export type ProcessingLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ProcessingLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BatchDefaultArgs instead
     */
    export type BatchArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BatchDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PromoDefaultArgs instead
     */
    export type PromoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PromoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use CreditLogDefaultArgs instead
     */
    export type CreditLogArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = CreditLogDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PermissionsDefaultArgs instead
     */
    export type PermissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PermissionsDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}