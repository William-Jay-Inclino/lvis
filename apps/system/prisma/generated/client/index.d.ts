
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Division
 * 
 */
export type Division = $Result.DefaultSelection<Prisma.$DivisionPayload>
/**
 * Model Department
 * 
 */
export type Department = $Result.DefaultSelection<Prisma.$DepartmentPayload>
/**
 * Model Employee
 * 
 */
export type Employee = $Result.DefaultSelection<Prisma.$EmployeePayload>
/**
 * Model Classification
 * 
 */
export type Classification = $Result.DefaultSelection<Prisma.$ClassificationPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserEmployee
 * 
 */
export type UserEmployee = $Result.DefaultSelection<Prisma.$UserEmployeePayload>
/**
 * Model UserPermission
 * 
 */
export type UserPermission = $Result.DefaultSelection<Prisma.$UserPermissionPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Feature
 * 
 */
export type Feature = $Result.DefaultSelection<Prisma.$FeaturePayload>
/**
 * Model Module
 * 
 */
export type Module = $Result.DefaultSelection<Prisma.$ModulePayload>
/**
 * Model JOApproverSetting
 * 
 */
export type JOApproverSetting = $Result.DefaultSelection<Prisma.$JOApproverSettingPayload>
/**
 * Model RVApproverSetting
 * 
 */
export type RVApproverSetting = $Result.DefaultSelection<Prisma.$RVApproverSettingPayload>
/**
 * Model SPRApproverSetting
 * 
 */
export type SPRApproverSetting = $Result.DefaultSelection<Prisma.$SPRApproverSettingPayload>
/**
 * Model MEQSApproverSetting
 * 
 */
export type MEQSApproverSetting = $Result.DefaultSelection<Prisma.$MEQSApproverSettingPayload>
/**
 * Model POApproverSetting
 * 
 */
export type POApproverSetting = $Result.DefaultSelection<Prisma.$POApproverSettingPayload>
/**
 * Model RRApproverSetting
 * 
 */
export type RRApproverSetting = $Result.DefaultSelection<Prisma.$RRApproverSettingPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Divisions
 * const divisions = await prisma.division.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
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
   * // Fetch zero or more Divisions
   * const divisions = await prisma.division.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
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


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.division`: Exposes CRUD operations for the **Division** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Divisions
    * const divisions = await prisma.division.findMany()
    * ```
    */
  get division(): Prisma.DivisionDelegate<ExtArgs>;

  /**
   * `prisma.department`: Exposes CRUD operations for the **Department** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Departments
    * const departments = await prisma.department.findMany()
    * ```
    */
  get department(): Prisma.DepartmentDelegate<ExtArgs>;

  /**
   * `prisma.employee`: Exposes CRUD operations for the **Employee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Employees
    * const employees = await prisma.employee.findMany()
    * ```
    */
  get employee(): Prisma.EmployeeDelegate<ExtArgs>;

  /**
   * `prisma.classification`: Exposes CRUD operations for the **Classification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Classifications
    * const classifications = await prisma.classification.findMany()
    * ```
    */
  get classification(): Prisma.ClassificationDelegate<ExtArgs>;

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
   * `prisma.userEmployee`: Exposes CRUD operations for the **UserEmployee** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserEmployees
    * const userEmployees = await prisma.userEmployee.findMany()
    * ```
    */
  get userEmployee(): Prisma.UserEmployeeDelegate<ExtArgs>;

  /**
   * `prisma.userPermission`: Exposes CRUD operations for the **UserPermission** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserPermissions
    * const userPermissions = await prisma.userPermission.findMany()
    * ```
    */
  get userPermission(): Prisma.UserPermissionDelegate<ExtArgs>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs>;

  /**
   * `prisma.feature`: Exposes CRUD operations for the **Feature** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Features
    * const features = await prisma.feature.findMany()
    * ```
    */
  get feature(): Prisma.FeatureDelegate<ExtArgs>;

  /**
   * `prisma.module`: Exposes CRUD operations for the **Module** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Modules
    * const modules = await prisma.module.findMany()
    * ```
    */
  get module(): Prisma.ModuleDelegate<ExtArgs>;

  /**
   * `prisma.jOApproverSetting`: Exposes CRUD operations for the **JOApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more JOApproverSettings
    * const jOApproverSettings = await prisma.jOApproverSetting.findMany()
    * ```
    */
  get jOApproverSetting(): Prisma.JOApproverSettingDelegate<ExtArgs>;

  /**
   * `prisma.rVApproverSetting`: Exposes CRUD operations for the **RVApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RVApproverSettings
    * const rVApproverSettings = await prisma.rVApproverSetting.findMany()
    * ```
    */
  get rVApproverSetting(): Prisma.RVApproverSettingDelegate<ExtArgs>;

  /**
   * `prisma.sPRApproverSetting`: Exposes CRUD operations for the **SPRApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SPRApproverSettings
    * const sPRApproverSettings = await prisma.sPRApproverSetting.findMany()
    * ```
    */
  get sPRApproverSetting(): Prisma.SPRApproverSettingDelegate<ExtArgs>;

  /**
   * `prisma.mEQSApproverSetting`: Exposes CRUD operations for the **MEQSApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MEQSApproverSettings
    * const mEQSApproverSettings = await prisma.mEQSApproverSetting.findMany()
    * ```
    */
  get mEQSApproverSetting(): Prisma.MEQSApproverSettingDelegate<ExtArgs>;

  /**
   * `prisma.pOApproverSetting`: Exposes CRUD operations for the **POApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more POApproverSettings
    * const pOApproverSettings = await prisma.pOApproverSetting.findMany()
    * ```
    */
  get pOApproverSetting(): Prisma.POApproverSettingDelegate<ExtArgs>;

  /**
   * `prisma.rRApproverSetting`: Exposes CRUD operations for the **RRApproverSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RRApproverSettings
    * const rRApproverSettings = await prisma.rRApproverSetting.findMany()
    * ```
    */
  get rRApproverSetting(): Prisma.RRApproverSettingDelegate<ExtArgs>;
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
   * Prisma Client JS version: 5.8.1
   * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

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
    Division: 'Division',
    Department: 'Department',
    Employee: 'Employee',
    Classification: 'Classification',
    User: 'User',
    UserEmployee: 'UserEmployee',
    UserPermission: 'UserPermission',
    Service: 'Service',
    Feature: 'Feature',
    Module: 'Module',
    JOApproverSetting: 'JOApproverSetting',
    RVApproverSetting: 'RVApproverSetting',
    SPRApproverSetting: 'SPRApproverSetting',
    MEQSApproverSetting: 'MEQSApproverSetting',
    POApproverSetting: 'POApproverSetting',
    RRApproverSetting: 'RRApproverSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'division' | 'department' | 'employee' | 'classification' | 'user' | 'userEmployee' | 'userPermission' | 'service' | 'feature' | 'module' | 'jOApproverSetting' | 'rVApproverSetting' | 'sPRApproverSetting' | 'mEQSApproverSetting' | 'pOApproverSetting' | 'rRApproverSetting'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Division: {
        payload: Prisma.$DivisionPayload<ExtArgs>
        fields: Prisma.DivisionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DivisionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DivisionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findFirst: {
            args: Prisma.DivisionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DivisionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          findMany: {
            args: Prisma.DivisionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>[]
          }
          create: {
            args: Prisma.DivisionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          createMany: {
            args: Prisma.DivisionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.DivisionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          update: {
            args: Prisma.DivisionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          deleteMany: {
            args: Prisma.DivisionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DivisionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DivisionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DivisionPayload>
          }
          aggregate: {
            args: Prisma.DivisionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDivision>
          }
          groupBy: {
            args: Prisma.DivisionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DivisionGroupByOutputType>[]
          }
          count: {
            args: Prisma.DivisionCountArgs<ExtArgs>,
            result: $Utils.Optional<DivisionCountAggregateOutputType> | number
          }
        }
      }
      Department: {
        payload: Prisma.$DepartmentPayload<ExtArgs>
        fields: Prisma.DepartmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DepartmentFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DepartmentFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findFirst: {
            args: Prisma.DepartmentFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DepartmentFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          findMany: {
            args: Prisma.DepartmentFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>[]
          }
          create: {
            args: Prisma.DepartmentCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          createMany: {
            args: Prisma.DepartmentCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.DepartmentDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          update: {
            args: Prisma.DepartmentUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          deleteMany: {
            args: Prisma.DepartmentDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.DepartmentUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.DepartmentUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$DepartmentPayload>
          }
          aggregate: {
            args: Prisma.DepartmentAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateDepartment>
          }
          groupBy: {
            args: Prisma.DepartmentGroupByArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DepartmentCountArgs<ExtArgs>,
            result: $Utils.Optional<DepartmentCountAggregateOutputType> | number
          }
        }
      }
      Employee: {
        payload: Prisma.$EmployeePayload<ExtArgs>
        fields: Prisma.EmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EmployeeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EmployeeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findFirst: {
            args: Prisma.EmployeeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EmployeeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          findMany: {
            args: Prisma.EmployeeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>[]
          }
          create: {
            args: Prisma.EmployeeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          createMany: {
            args: Prisma.EmployeeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.EmployeeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          update: {
            args: Prisma.EmployeeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          deleteMany: {
            args: Prisma.EmployeeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.EmployeeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.EmployeeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$EmployeePayload>
          }
          aggregate: {
            args: Prisma.EmployeeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateEmployee>
          }
          groupBy: {
            args: Prisma.EmployeeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<EmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.EmployeeCountArgs<ExtArgs>,
            result: $Utils.Optional<EmployeeCountAggregateOutputType> | number
          }
        }
      }
      Classification: {
        payload: Prisma.$ClassificationPayload<ExtArgs>
        fields: Prisma.ClassificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClassificationFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClassificationFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          findFirst: {
            args: Prisma.ClassificationFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClassificationFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          findMany: {
            args: Prisma.ClassificationFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>[]
          }
          create: {
            args: Prisma.ClassificationCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          createMany: {
            args: Prisma.ClassificationCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ClassificationDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          update: {
            args: Prisma.ClassificationUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          deleteMany: {
            args: Prisma.ClassificationDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ClassificationUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ClassificationUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ClassificationPayload>
          }
          aggregate: {
            args: Prisma.ClassificationAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateClassification>
          }
          groupBy: {
            args: Prisma.ClassificationGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ClassificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClassificationCountArgs<ExtArgs>,
            result: $Utils.Optional<ClassificationCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserEmployee: {
        payload: Prisma.$UserEmployeePayload<ExtArgs>
        fields: Prisma.UserEmployeeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserEmployeeFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserEmployeeFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          findFirst: {
            args: Prisma.UserEmployeeFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserEmployeeFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          findMany: {
            args: Prisma.UserEmployeeFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>[]
          }
          create: {
            args: Prisma.UserEmployeeCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          createMany: {
            args: Prisma.UserEmployeeCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserEmployeeDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          update: {
            args: Prisma.UserEmployeeUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          deleteMany: {
            args: Prisma.UserEmployeeDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserEmployeeUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserEmployeeUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserEmployeePayload>
          }
          aggregate: {
            args: Prisma.UserEmployeeAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserEmployee>
          }
          groupBy: {
            args: Prisma.UserEmployeeGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserEmployeeGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserEmployeeCountArgs<ExtArgs>,
            result: $Utils.Optional<UserEmployeeCountAggregateOutputType> | number
          }
        }
      }
      UserPermission: {
        payload: Prisma.$UserPermissionPayload<ExtArgs>
        fields: Prisma.UserPermissionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserPermissionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserPermissionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          findFirst: {
            args: Prisma.UserPermissionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserPermissionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          findMany: {
            args: Prisma.UserPermissionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>[]
          }
          create: {
            args: Prisma.UserPermissionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          createMany: {
            args: Prisma.UserPermissionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserPermissionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          update: {
            args: Prisma.UserPermissionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          deleteMany: {
            args: Prisma.UserPermissionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserPermissionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserPermissionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPermissionPayload>
          }
          aggregate: {
            args: Prisma.UserPermissionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUserPermission>
          }
          groupBy: {
            args: Prisma.UserPermissionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserPermissionGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserPermissionCountArgs<ExtArgs>,
            result: $Utils.Optional<UserPermissionCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>,
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Feature: {
        payload: Prisma.$FeaturePayload<ExtArgs>
        fields: Prisma.FeatureFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FeatureFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FeatureFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          findFirst: {
            args: Prisma.FeatureFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FeatureFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          findMany: {
            args: Prisma.FeatureFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>[]
          }
          create: {
            args: Prisma.FeatureCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          createMany: {
            args: Prisma.FeatureCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.FeatureDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          update: {
            args: Prisma.FeatureUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          deleteMany: {
            args: Prisma.FeatureDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.FeatureUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.FeatureUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$FeaturePayload>
          }
          aggregate: {
            args: Prisma.FeatureAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateFeature>
          }
          groupBy: {
            args: Prisma.FeatureGroupByArgs<ExtArgs>,
            result: $Utils.Optional<FeatureGroupByOutputType>[]
          }
          count: {
            args: Prisma.FeatureCountArgs<ExtArgs>,
            result: $Utils.Optional<FeatureCountAggregateOutputType> | number
          }
        }
      }
      Module: {
        payload: Prisma.$ModulePayload<ExtArgs>
        fields: Prisma.ModuleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ModuleFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ModuleFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findFirst: {
            args: Prisma.ModuleFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ModuleFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          findMany: {
            args: Prisma.ModuleFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>[]
          }
          create: {
            args: Prisma.ModuleCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          createMany: {
            args: Prisma.ModuleCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ModuleDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          update: {
            args: Prisma.ModuleUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          deleteMany: {
            args: Prisma.ModuleDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ModuleUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ModuleUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ModulePayload>
          }
          aggregate: {
            args: Prisma.ModuleAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateModule>
          }
          groupBy: {
            args: Prisma.ModuleGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ModuleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ModuleCountArgs<ExtArgs>,
            result: $Utils.Optional<ModuleCountAggregateOutputType> | number
          }
        }
      }
      JOApproverSetting: {
        payload: Prisma.$JOApproverSettingPayload<ExtArgs>
        fields: Prisma.JOApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.JOApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.JOApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.JOApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.JOApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          findMany: {
            args: Prisma.JOApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>[]
          }
          create: {
            args: Prisma.JOApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          createMany: {
            args: Prisma.JOApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.JOApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          update: {
            args: Prisma.JOApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.JOApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.JOApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.JOApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$JOApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.JOApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateJOApproverSetting>
          }
          groupBy: {
            args: Prisma.JOApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<JOApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.JOApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<JOApproverSettingCountAggregateOutputType> | number
          }
        }
      }
      RVApproverSetting: {
        payload: Prisma.$RVApproverSettingPayload<ExtArgs>
        fields: Prisma.RVApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RVApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RVApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.RVApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RVApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          findMany: {
            args: Prisma.RVApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>[]
          }
          create: {
            args: Prisma.RVApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          createMany: {
            args: Prisma.RVApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RVApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          update: {
            args: Prisma.RVApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.RVApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RVApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RVApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RVApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.RVApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRVApproverSetting>
          }
          groupBy: {
            args: Prisma.RVApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RVApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RVApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<RVApproverSettingCountAggregateOutputType> | number
          }
        }
      }
      SPRApproverSetting: {
        payload: Prisma.$SPRApproverSettingPayload<ExtArgs>
        fields: Prisma.SPRApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SPRApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SPRApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.SPRApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SPRApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          findMany: {
            args: Prisma.SPRApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>[]
          }
          create: {
            args: Prisma.SPRApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          createMany: {
            args: Prisma.SPRApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SPRApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          update: {
            args: Prisma.SPRApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.SPRApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SPRApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SPRApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$SPRApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.SPRApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSPRApproverSetting>
          }
          groupBy: {
            args: Prisma.SPRApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SPRApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.SPRApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<SPRApproverSettingCountAggregateOutputType> | number
          }
        }
      }
      MEQSApproverSetting: {
        payload: Prisma.$MEQSApproverSettingPayload<ExtArgs>
        fields: Prisma.MEQSApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MEQSApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MEQSApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.MEQSApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MEQSApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          findMany: {
            args: Prisma.MEQSApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>[]
          }
          create: {
            args: Prisma.MEQSApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          createMany: {
            args: Prisma.MEQSApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.MEQSApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          update: {
            args: Prisma.MEQSApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.MEQSApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.MEQSApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.MEQSApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$MEQSApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.MEQSApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateMEQSApproverSetting>
          }
          groupBy: {
            args: Prisma.MEQSApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<MEQSApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.MEQSApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<MEQSApproverSettingCountAggregateOutputType> | number
          }
        }
      }
      POApproverSetting: {
        payload: Prisma.$POApproverSettingPayload<ExtArgs>
        fields: Prisma.POApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.POApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.POApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.POApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.POApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          findMany: {
            args: Prisma.POApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>[]
          }
          create: {
            args: Prisma.POApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          createMany: {
            args: Prisma.POApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.POApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          update: {
            args: Prisma.POApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.POApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.POApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.POApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$POApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.POApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregatePOApproverSetting>
          }
          groupBy: {
            args: Prisma.POApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<POApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.POApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<POApproverSettingCountAggregateOutputType> | number
          }
        }
      }
      RRApproverSetting: {
        payload: Prisma.$RRApproverSettingPayload<ExtArgs>
        fields: Prisma.RRApproverSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RRApproverSettingFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RRApproverSettingFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          findFirst: {
            args: Prisma.RRApproverSettingFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RRApproverSettingFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          findMany: {
            args: Prisma.RRApproverSettingFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>[]
          }
          create: {
            args: Prisma.RRApproverSettingCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          createMany: {
            args: Prisma.RRApproverSettingCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RRApproverSettingDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          update: {
            args: Prisma.RRApproverSettingUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          deleteMany: {
            args: Prisma.RRApproverSettingDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RRApproverSettingUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RRApproverSettingUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RRApproverSettingPayload>
          }
          aggregate: {
            args: Prisma.RRApproverSettingAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRRApproverSetting>
          }
          groupBy: {
            args: Prisma.RRApproverSettingGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RRApproverSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.RRApproverSettingCountArgs<ExtArgs>,
            result: $Utils.Optional<RRApproverSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
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
   * Count Type DepartmentCountOutputType
   */

  export type DepartmentCountOutputType = {
    Division: number
  }

  export type DepartmentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Division?: boolean | DepartmentCountOutputTypeCountDivisionArgs
  }

  // Custom InputTypes

  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DepartmentCountOutputType
     */
    select?: DepartmentCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * DepartmentCountOutputType without action
   */
  export type DepartmentCountOutputTypeCountDivisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DivisionWhereInput
  }



  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    user_permissions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_permissions?: boolean | UserCountOutputTypeCountUser_permissionsArgs
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
  export type UserCountOutputTypeCountUser_permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPermissionWhereInput
  }



  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    features: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | ServiceCountOutputTypeCountFeaturesArgs
  }

  // Custom InputTypes

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountFeaturesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureWhereInput
  }



  /**
   * Count Type FeatureCountOutputType
   */

  export type FeatureCountOutputType = {
    modules: number
  }

  export type FeatureCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    modules?: boolean | FeatureCountOutputTypeCountModulesArgs
  }

  // Custom InputTypes

  /**
   * FeatureCountOutputType without action
   */
  export type FeatureCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FeatureCountOutputType
     */
    select?: FeatureCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * FeatureCountOutputType without action
   */
  export type FeatureCountOutputTypeCountModulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleWhereInput
  }



  /**
   * Count Type ModuleCountOutputType
   */

  export type ModuleCountOutputType = {
    user_permissions: number
  }

  export type ModuleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_permissions?: boolean | ModuleCountOutputTypeCountUser_permissionsArgs
  }

  // Custom InputTypes

  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ModuleCountOutputType
     */
    select?: ModuleCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * ModuleCountOutputType without action
   */
  export type ModuleCountOutputTypeCountUser_permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPermissionWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Division
   */

  export type AggregateDivision = {
    _count: DivisionCountAggregateOutputType | null
    _avg: DivisionAvgAggregateOutputType | null
    _sum: DivisionSumAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  export type DivisionAvgAggregateOutputType = {
    status: number | null
  }

  export type DivisionSumAggregateOutputType = {
    status: number | null
  }

  export type DivisionMinAggregateOutputType = {
    id: string | null
    department_id: string | null
    code: string | null
    name: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type DivisionMaxAggregateOutputType = {
    id: string | null
    department_id: string | null
    code: string | null
    name: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type DivisionCountAggregateOutputType = {
    id: number
    department_id: number
    code: number
    name: number
    status: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type DivisionAvgAggregateInputType = {
    status?: true
  }

  export type DivisionSumAggregateInputType = {
    status?: true
  }

  export type DivisionMinAggregateInputType = {
    id?: true
    department_id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type DivisionMaxAggregateInputType = {
    id?: true
    department_id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type DivisionCountAggregateInputType = {
    id?: true
    department_id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type DivisionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Division to aggregate.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Divisions
    **/
    _count?: true | DivisionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DivisionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DivisionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DivisionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DivisionMaxAggregateInputType
  }

  export type GetDivisionAggregateType<T extends DivisionAggregateArgs> = {
        [P in keyof T & keyof AggregateDivision]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDivision[P]>
      : GetScalarType<T[P], AggregateDivision[P]>
  }




  export type DivisionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DivisionWhereInput
    orderBy?: DivisionOrderByWithAggregationInput | DivisionOrderByWithAggregationInput[]
    by: DivisionScalarFieldEnum[] | DivisionScalarFieldEnum
    having?: DivisionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DivisionCountAggregateInputType | true
    _avg?: DivisionAvgAggregateInputType
    _sum?: DivisionSumAggregateInputType
    _min?: DivisionMinAggregateInputType
    _max?: DivisionMaxAggregateInputType
  }

  export type DivisionGroupByOutputType = {
    id: string
    department_id: string
    code: string
    name: string
    status: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: DivisionCountAggregateOutputType | null
    _avg: DivisionAvgAggregateOutputType | null
    _sum: DivisionSumAggregateOutputType | null
    _min: DivisionMinAggregateOutputType | null
    _max: DivisionMaxAggregateOutputType | null
  }

  type GetDivisionGroupByPayload<T extends DivisionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DivisionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DivisionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DivisionGroupByOutputType[P]>
            : GetScalarType<T[P], DivisionGroupByOutputType[P]>
        }
      >
    >


  export type DivisionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    department_id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["division"]>

  export type DivisionSelectScalar = {
    id?: boolean
    department_id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type DivisionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    department?: boolean | DepartmentDefaultArgs<ExtArgs>
  }


  export type $DivisionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Division"
    objects: {
      department: Prisma.$DepartmentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      department_id: string
      code: string
      name: string
      status: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["division"]>
    composites: {}
  }


  type DivisionGetPayload<S extends boolean | null | undefined | DivisionDefaultArgs> = $Result.GetResult<Prisma.$DivisionPayload, S>

  type DivisionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DivisionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DivisionCountAggregateInputType | true
    }

  export interface DivisionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Division'], meta: { name: 'Division' } }
    /**
     * Find zero or one Division that matches the filter.
     * @param {DivisionFindUniqueArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DivisionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionFindUniqueArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Division that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DivisionFindUniqueOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DivisionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Division that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DivisionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionFindFirstArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Division that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindFirstOrThrowArgs} args - Arguments to find a Division
     * @example
     * // Get one Division
     * const division = await prisma.division.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DivisionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Divisions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Divisions
     * const divisions = await prisma.division.findMany()
     * 
     * // Get first 10 Divisions
     * const divisions = await prisma.division.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const divisionWithIdOnly = await prisma.division.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DivisionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Division.
     * @param {DivisionCreateArgs} args - Arguments to create a Division.
     * @example
     * // Create one Division
     * const Division = await prisma.division.create({
     *   data: {
     *     // ... data to create a Division
     *   }
     * })
     * 
    **/
    create<T extends DivisionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionCreateArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Divisions.
     *     @param {DivisionCreateManyArgs} args - Arguments to create many Divisions.
     *     @example
     *     // Create many Divisions
     *     const division = await prisma.division.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DivisionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Division.
     * @param {DivisionDeleteArgs} args - Arguments to delete one Division.
     * @example
     * // Delete one Division
     * const Division = await prisma.division.delete({
     *   where: {
     *     // ... filter to delete one Division
     *   }
     * })
     * 
    **/
    delete<T extends DivisionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionDeleteArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Division.
     * @param {DivisionUpdateArgs} args - Arguments to update one Division.
     * @example
     * // Update one Division
     * const division = await prisma.division.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DivisionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionUpdateArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Divisions.
     * @param {DivisionDeleteManyArgs} args - Arguments to filter Divisions to delete.
     * @example
     * // Delete a few Divisions
     * const { count } = await prisma.division.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DivisionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DivisionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Divisions
     * const division = await prisma.division.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DivisionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Division.
     * @param {DivisionUpsertArgs} args - Arguments to update or create a Division.
     * @example
     * // Update or create a Division
     * const division = await prisma.division.upsert({
     *   create: {
     *     // ... data to create a Division
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Division we want to update
     *   }
     * })
    **/
    upsert<T extends DivisionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DivisionUpsertArgs<ExtArgs>>
    ): Prisma__DivisionClient<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Divisions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionCountArgs} args - Arguments to filter Divisions to count.
     * @example
     * // Count the number of Divisions
     * const count = await prisma.division.count({
     *   where: {
     *     // ... the filter for the Divisions we want to count
     *   }
     * })
    **/
    count<T extends DivisionCountArgs>(
      args?: Subset<T, DivisionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DivisionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DivisionAggregateArgs>(args: Subset<T, DivisionAggregateArgs>): Prisma.PrismaPromise<GetDivisionAggregateType<T>>

    /**
     * Group by Division.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DivisionGroupByArgs} args - Group by arguments.
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
      T extends DivisionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DivisionGroupByArgs['orderBy'] }
        : { orderBy?: DivisionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DivisionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDivisionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Division model
   */
  readonly fields: DivisionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Division.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DivisionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    department<T extends DepartmentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DepartmentDefaultArgs<ExtArgs>>): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Division model
   */ 
  interface DivisionFieldRefs {
    readonly id: FieldRef<"Division", 'String'>
    readonly department_id: FieldRef<"Division", 'String'>
    readonly code: FieldRef<"Division", 'String'>
    readonly name: FieldRef<"Division", 'String'>
    readonly status: FieldRef<"Division", 'Int'>
    readonly created_at: FieldRef<"Division", 'DateTime'>
    readonly updated_at: FieldRef<"Division", 'DateTime'>
    readonly is_deleted: FieldRef<"Division", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Division findUnique
   */
  export type DivisionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }


  /**
   * Division findUniqueOrThrow
   */
  export type DivisionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where: DivisionWhereUniqueInput
  }


  /**
   * Division findFirst
   */
  export type DivisionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }


  /**
   * Division findFirstOrThrow
   */
  export type DivisionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Division to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Divisions.
     */
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }


  /**
   * Division findMany
   */
  export type DivisionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter, which Divisions to fetch.
     */
    where?: DivisionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Divisions to fetch.
     */
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Divisions.
     */
    cursor?: DivisionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Divisions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Divisions.
     */
    skip?: number
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }


  /**
   * Division create
   */
  export type DivisionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The data needed to create a Division.
     */
    data: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
  }


  /**
   * Division createMany
   */
  export type DivisionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Divisions.
     */
    data: DivisionCreateManyInput | DivisionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Division update
   */
  export type DivisionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The data needed to update a Division.
     */
    data: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
    /**
     * Choose, which Division to update.
     */
    where: DivisionWhereUniqueInput
  }


  /**
   * Division updateMany
   */
  export type DivisionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Divisions.
     */
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyInput>
    /**
     * Filter which Divisions to update
     */
    where?: DivisionWhereInput
  }


  /**
   * Division upsert
   */
  export type DivisionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * The filter to search for the Division to update in case it exists.
     */
    where: DivisionWhereUniqueInput
    /**
     * In case the Division found by the `where` argument doesn't exist, create a new Division with this data.
     */
    create: XOR<DivisionCreateInput, DivisionUncheckedCreateInput>
    /**
     * In case the Division was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DivisionUpdateInput, DivisionUncheckedUpdateInput>
  }


  /**
   * Division delete
   */
  export type DivisionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    /**
     * Filter which Division to delete.
     */
    where: DivisionWhereUniqueInput
  }


  /**
   * Division deleteMany
   */
  export type DivisionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Divisions to delete
     */
    where?: DivisionWhereInput
  }


  /**
   * Division without action
   */
  export type DivisionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
  }



  /**
   * Model Department
   */

  export type AggregateDepartment = {
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  export type DepartmentAvgAggregateOutputType = {
    status: number | null
  }

  export type DepartmentSumAggregateOutputType = {
    status: number | null
  }

  export type DepartmentMinAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type DepartmentMaxAggregateOutputType = {
    id: string | null
    code: string | null
    name: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type DepartmentCountAggregateOutputType = {
    id: number
    code: number
    name: number
    status: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type DepartmentAvgAggregateInputType = {
    status?: true
  }

  export type DepartmentSumAggregateInputType = {
    status?: true
  }

  export type DepartmentMinAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type DepartmentMaxAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type DepartmentCountAggregateInputType = {
    id?: true
    code?: true
    name?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type DepartmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Department to aggregate.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Departments
    **/
    _count?: true | DepartmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DepartmentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DepartmentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DepartmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DepartmentMaxAggregateInputType
  }

  export type GetDepartmentAggregateType<T extends DepartmentAggregateArgs> = {
        [P in keyof T & keyof AggregateDepartment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDepartment[P]>
      : GetScalarType<T[P], AggregateDepartment[P]>
  }




  export type DepartmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DepartmentWhereInput
    orderBy?: DepartmentOrderByWithAggregationInput | DepartmentOrderByWithAggregationInput[]
    by: DepartmentScalarFieldEnum[] | DepartmentScalarFieldEnum
    having?: DepartmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DepartmentCountAggregateInputType | true
    _avg?: DepartmentAvgAggregateInputType
    _sum?: DepartmentSumAggregateInputType
    _min?: DepartmentMinAggregateInputType
    _max?: DepartmentMaxAggregateInputType
  }

  export type DepartmentGroupByOutputType = {
    id: string
    code: string
    name: string
    status: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: DepartmentCountAggregateOutputType | null
    _avg: DepartmentAvgAggregateOutputType | null
    _sum: DepartmentSumAggregateOutputType | null
    _min: DepartmentMinAggregateOutputType | null
    _max: DepartmentMaxAggregateOutputType | null
  }

  type GetDepartmentGroupByPayload<T extends DepartmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DepartmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DepartmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
            : GetScalarType<T[P], DepartmentGroupByOutputType[P]>
        }
      >
    >


  export type DepartmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    Division?: boolean | Department$DivisionArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["department"]>

  export type DepartmentSelectScalar = {
    id?: boolean
    code?: boolean
    name?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type DepartmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Division?: boolean | Department$DivisionArgs<ExtArgs>
    _count?: boolean | DepartmentCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $DepartmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Department"
    objects: {
      Division: Prisma.$DivisionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      code: string
      name: string
      status: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["department"]>
    composites: {}
  }


  type DepartmentGetPayload<S extends boolean | null | undefined | DepartmentDefaultArgs> = $Result.GetResult<Prisma.$DepartmentPayload, S>

  type DepartmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DepartmentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DepartmentCountAggregateInputType | true
    }

  export interface DepartmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Department'], meta: { name: 'Department' } }
    /**
     * Find zero or one Department that matches the filter.
     * @param {DepartmentFindUniqueArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends DepartmentFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentFindUniqueArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Department that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {DepartmentFindUniqueOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends DepartmentFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Department that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends DepartmentFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindFirstArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Department that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindFirstOrThrowArgs} args - Arguments to find a Department
     * @example
     * // Get one Department
     * const department = await prisma.department.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends DepartmentFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Departments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Departments
     * const departments = await prisma.department.findMany()
     * 
     * // Get first 10 Departments
     * const departments = await prisma.department.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const departmentWithIdOnly = await prisma.department.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends DepartmentFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Department.
     * @param {DepartmentCreateArgs} args - Arguments to create a Department.
     * @example
     * // Create one Department
     * const Department = await prisma.department.create({
     *   data: {
     *     // ... data to create a Department
     *   }
     * })
     * 
    **/
    create<T extends DepartmentCreateArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentCreateArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Departments.
     *     @param {DepartmentCreateManyArgs} args - Arguments to create many Departments.
     *     @example
     *     // Create many Departments
     *     const department = await prisma.department.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends DepartmentCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Department.
     * @param {DepartmentDeleteArgs} args - Arguments to delete one Department.
     * @example
     * // Delete one Department
     * const Department = await prisma.department.delete({
     *   where: {
     *     // ... filter to delete one Department
     *   }
     * })
     * 
    **/
    delete<T extends DepartmentDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentDeleteArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Department.
     * @param {DepartmentUpdateArgs} args - Arguments to update one Department.
     * @example
     * // Update one Department
     * const department = await prisma.department.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends DepartmentUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpdateArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Departments.
     * @param {DepartmentDeleteManyArgs} args - Arguments to filter Departments to delete.
     * @example
     * // Delete a few Departments
     * const { count } = await prisma.department.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends DepartmentDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, DepartmentDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Departments
     * const department = await prisma.department.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends DepartmentUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Department.
     * @param {DepartmentUpsertArgs} args - Arguments to update or create a Department.
     * @example
     * // Update or create a Department
     * const department = await prisma.department.upsert({
     *   create: {
     *     // ... data to create a Department
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Department we want to update
     *   }
     * })
    **/
    upsert<T extends DepartmentUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, DepartmentUpsertArgs<ExtArgs>>
    ): Prisma__DepartmentClient<$Result.GetResult<Prisma.$DepartmentPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Departments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentCountArgs} args - Arguments to filter Departments to count.
     * @example
     * // Count the number of Departments
     * const count = await prisma.department.count({
     *   where: {
     *     // ... the filter for the Departments we want to count
     *   }
     * })
    **/
    count<T extends DepartmentCountArgs>(
      args?: Subset<T, DepartmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DepartmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DepartmentAggregateArgs>(args: Subset<T, DepartmentAggregateArgs>): Prisma.PrismaPromise<GetDepartmentAggregateType<T>>

    /**
     * Group by Department.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DepartmentGroupByArgs} args - Group by arguments.
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
      T extends DepartmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DepartmentGroupByArgs['orderBy'] }
        : { orderBy?: DepartmentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DepartmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDepartmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Department model
   */
  readonly fields: DepartmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Department.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DepartmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    Division<T extends Department$DivisionArgs<ExtArgs> = {}>(args?: Subset<T, Department$DivisionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DivisionPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Department model
   */ 
  interface DepartmentFieldRefs {
    readonly id: FieldRef<"Department", 'String'>
    readonly code: FieldRef<"Department", 'String'>
    readonly name: FieldRef<"Department", 'String'>
    readonly status: FieldRef<"Department", 'Int'>
    readonly created_at: FieldRef<"Department", 'DateTime'>
    readonly updated_at: FieldRef<"Department", 'DateTime'>
    readonly is_deleted: FieldRef<"Department", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Department findUnique
   */
  export type DepartmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department findUniqueOrThrow
   */
  export type DepartmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department findFirst
   */
  export type DepartmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }


  /**
   * Department findFirstOrThrow
   */
  export type DepartmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Department to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Departments.
     */
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }


  /**
   * Department findMany
   */
  export type DepartmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter, which Departments to fetch.
     */
    where?: DepartmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Departments to fetch.
     */
    orderBy?: DepartmentOrderByWithRelationInput | DepartmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Departments.
     */
    cursor?: DepartmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Departments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Departments.
     */
    skip?: number
    distinct?: DepartmentScalarFieldEnum | DepartmentScalarFieldEnum[]
  }


  /**
   * Department create
   */
  export type DepartmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Department.
     */
    data: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
  }


  /**
   * Department createMany
   */
  export type DepartmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Departments.
     */
    data: DepartmentCreateManyInput | DepartmentCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Department update
   */
  export type DepartmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Department.
     */
    data: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
    /**
     * Choose, which Department to update.
     */
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department updateMany
   */
  export type DepartmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Departments.
     */
    data: XOR<DepartmentUpdateManyMutationInput, DepartmentUncheckedUpdateManyInput>
    /**
     * Filter which Departments to update
     */
    where?: DepartmentWhereInput
  }


  /**
   * Department upsert
   */
  export type DepartmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Department to update in case it exists.
     */
    where: DepartmentWhereUniqueInput
    /**
     * In case the Department found by the `where` argument doesn't exist, create a new Department with this data.
     */
    create: XOR<DepartmentCreateInput, DepartmentUncheckedCreateInput>
    /**
     * In case the Department was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DepartmentUpdateInput, DepartmentUncheckedUpdateInput>
  }


  /**
   * Department delete
   */
  export type DepartmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
    /**
     * Filter which Department to delete.
     */
    where: DepartmentWhereUniqueInput
  }


  /**
   * Department deleteMany
   */
  export type DepartmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Departments to delete
     */
    where?: DepartmentWhereInput
  }


  /**
   * Department.Division
   */
  export type Department$DivisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Division
     */
    select?: DivisionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DivisionInclude<ExtArgs> | null
    where?: DivisionWhereInput
    orderBy?: DivisionOrderByWithRelationInput | DivisionOrderByWithRelationInput[]
    cursor?: DivisionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DivisionScalarFieldEnum | DivisionScalarFieldEnum[]
  }


  /**
   * Department without action
   */
  export type DepartmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Department
     */
    select?: DepartmentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: DepartmentInclude<ExtArgs> | null
  }



  /**
   * Model Employee
   */

  export type AggregateEmployee = {
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  export type EmployeeMinAggregateOutputType = {
    id: string | null
    firstname: string | null
    middlename: string | null
    lastname: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type EmployeeMaxAggregateOutputType = {
    id: string | null
    firstname: string | null
    middlename: string | null
    lastname: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type EmployeeCountAggregateOutputType = {
    id: number
    firstname: number
    middlename: number
    lastname: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type EmployeeMinAggregateInputType = {
    id?: true
    firstname?: true
    middlename?: true
    lastname?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type EmployeeMaxAggregateInputType = {
    id?: true
    firstname?: true
    middlename?: true
    lastname?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type EmployeeCountAggregateInputType = {
    id?: true
    firstname?: true
    middlename?: true
    lastname?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type EmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employee to aggregate.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Employees
    **/
    _count?: true | EmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EmployeeMaxAggregateInputType
  }

  export type GetEmployeeAggregateType<T extends EmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEmployee[P]>
      : GetScalarType<T[P], AggregateEmployee[P]>
  }




  export type EmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EmployeeWhereInput
    orderBy?: EmployeeOrderByWithAggregationInput | EmployeeOrderByWithAggregationInput[]
    by: EmployeeScalarFieldEnum[] | EmployeeScalarFieldEnum
    having?: EmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EmployeeCountAggregateInputType | true
    _min?: EmployeeMinAggregateInputType
    _max?: EmployeeMaxAggregateInputType
  }

  export type EmployeeGroupByOutputType = {
    id: string
    firstname: string
    middlename: string | null
    lastname: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: EmployeeCountAggregateOutputType | null
    _min: EmployeeMinAggregateOutputType | null
    _max: EmployeeMaxAggregateOutputType | null
  }

  type GetEmployeeGroupByPayload<T extends EmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], EmployeeGroupByOutputType[P]>
        }
      >
    >


  export type EmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstname?: boolean
    middlename?: boolean
    lastname?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    jo_approver_setting?: boolean | Employee$jo_approver_settingArgs<ExtArgs>
    meqs_approver_setting?: boolean | Employee$meqs_approver_settingArgs<ExtArgs>
    po_approver_setting?: boolean | Employee$po_approver_settingArgs<ExtArgs>
    rv_approver_setting?: boolean | Employee$rv_approver_settingArgs<ExtArgs>
    spr_approver_setting?: boolean | Employee$spr_approver_settingArgs<ExtArgs>
    rr_approver_setting?: boolean | Employee$rr_approver_settingArgs<ExtArgs>
    jo_approver_proxy_setting?: boolean | Employee$jo_approver_proxy_settingArgs<ExtArgs>
    meqs_approver_proxy_setting?: boolean | Employee$meqs_approver_proxy_settingArgs<ExtArgs>
    po_approver_proxy_setting?: boolean | Employee$po_approver_proxy_settingArgs<ExtArgs>
    rv_approver_proxy_setting?: boolean | Employee$rv_approver_proxy_settingArgs<ExtArgs>
    spr_approver_proxy_setting?: boolean | Employee$spr_approver_proxy_settingArgs<ExtArgs>
    rr_approver_proxy_setting?: boolean | Employee$rr_approver_proxy_settingArgs<ExtArgs>
    user_employee?: boolean | Employee$user_employeeArgs<ExtArgs>
  }, ExtArgs["result"]["employee"]>

  export type EmployeeSelectScalar = {
    id?: boolean
    firstname?: boolean
    middlename?: boolean
    lastname?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type EmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    jo_approver_setting?: boolean | Employee$jo_approver_settingArgs<ExtArgs>
    meqs_approver_setting?: boolean | Employee$meqs_approver_settingArgs<ExtArgs>
    po_approver_setting?: boolean | Employee$po_approver_settingArgs<ExtArgs>
    rv_approver_setting?: boolean | Employee$rv_approver_settingArgs<ExtArgs>
    spr_approver_setting?: boolean | Employee$spr_approver_settingArgs<ExtArgs>
    rr_approver_setting?: boolean | Employee$rr_approver_settingArgs<ExtArgs>
    jo_approver_proxy_setting?: boolean | Employee$jo_approver_proxy_settingArgs<ExtArgs>
    meqs_approver_proxy_setting?: boolean | Employee$meqs_approver_proxy_settingArgs<ExtArgs>
    po_approver_proxy_setting?: boolean | Employee$po_approver_proxy_settingArgs<ExtArgs>
    rv_approver_proxy_setting?: boolean | Employee$rv_approver_proxy_settingArgs<ExtArgs>
    spr_approver_proxy_setting?: boolean | Employee$spr_approver_proxy_settingArgs<ExtArgs>
    rr_approver_proxy_setting?: boolean | Employee$rr_approver_proxy_settingArgs<ExtArgs>
    user_employee?: boolean | Employee$user_employeeArgs<ExtArgs>
  }


  export type $EmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Employee"
    objects: {
      jo_approver_setting: Prisma.$JOApproverSettingPayload<ExtArgs> | null
      meqs_approver_setting: Prisma.$MEQSApproverSettingPayload<ExtArgs> | null
      po_approver_setting: Prisma.$POApproverSettingPayload<ExtArgs> | null
      rv_approver_setting: Prisma.$RVApproverSettingPayload<ExtArgs> | null
      spr_approver_setting: Prisma.$SPRApproverSettingPayload<ExtArgs> | null
      rr_approver_setting: Prisma.$RRApproverSettingPayload<ExtArgs> | null
      jo_approver_proxy_setting: Prisma.$JOApproverSettingPayload<ExtArgs> | null
      meqs_approver_proxy_setting: Prisma.$MEQSApproverSettingPayload<ExtArgs> | null
      po_approver_proxy_setting: Prisma.$POApproverSettingPayload<ExtArgs> | null
      rv_approver_proxy_setting: Prisma.$RVApproverSettingPayload<ExtArgs> | null
      spr_approver_proxy_setting: Prisma.$SPRApproverSettingPayload<ExtArgs> | null
      rr_approver_proxy_setting: Prisma.$RRApproverSettingPayload<ExtArgs> | null
      user_employee: Prisma.$UserEmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstname: string
      middlename: string | null
      lastname: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["employee"]>
    composites: {}
  }


  type EmployeeGetPayload<S extends boolean | null | undefined | EmployeeDefaultArgs> = $Result.GetResult<Prisma.$EmployeePayload, S>

  type EmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EmployeeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EmployeeCountAggregateInputType | true
    }

  export interface EmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Employee'], meta: { name: 'Employee' } }
    /**
     * Find zero or one Employee that matches the filter.
     * @param {EmployeeFindUniqueArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EmployeeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeFindUniqueArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Employee that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {EmployeeFindUniqueOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends EmployeeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Employee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EmployeeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeFindFirstArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Employee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindFirstOrThrowArgs} args - Arguments to find a Employee
     * @example
     * // Get one Employee
     * const employee = await prisma.employee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends EmployeeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Employees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Employees
     * const employees = await prisma.employee.findMany()
     * 
     * // Get first 10 Employees
     * const employees = await prisma.employee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const employeeWithIdOnly = await prisma.employee.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EmployeeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Employee.
     * @param {EmployeeCreateArgs} args - Arguments to create a Employee.
     * @example
     * // Create one Employee
     * const Employee = await prisma.employee.create({
     *   data: {
     *     // ... data to create a Employee
     *   }
     * })
     * 
    **/
    create<T extends EmployeeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeCreateArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Employees.
     *     @param {EmployeeCreateManyArgs} args - Arguments to create many Employees.
     *     @example
     *     // Create many Employees
     *     const employee = await prisma.employee.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EmployeeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Employee.
     * @param {EmployeeDeleteArgs} args - Arguments to delete one Employee.
     * @example
     * // Delete one Employee
     * const Employee = await prisma.employee.delete({
     *   where: {
     *     // ... filter to delete one Employee
     *   }
     * })
     * 
    **/
    delete<T extends EmployeeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeDeleteArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Employee.
     * @param {EmployeeUpdateArgs} args - Arguments to update one Employee.
     * @example
     * // Update one Employee
     * const employee = await prisma.employee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EmployeeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeUpdateArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Employees.
     * @param {EmployeeDeleteManyArgs} args - Arguments to filter Employees to delete.
     * @example
     * // Delete a few Employees
     * const { count } = await prisma.employee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EmployeeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, EmployeeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Employees
     * const employee = await prisma.employee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EmployeeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Employee.
     * @param {EmployeeUpsertArgs} args - Arguments to update or create a Employee.
     * @example
     * // Update or create a Employee
     * const employee = await prisma.employee.upsert({
     *   create: {
     *     // ... data to create a Employee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Employee we want to update
     *   }
     * })
    **/
    upsert<T extends EmployeeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, EmployeeUpsertArgs<ExtArgs>>
    ): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Employees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeCountArgs} args - Arguments to filter Employees to count.
     * @example
     * // Count the number of Employees
     * const count = await prisma.employee.count({
     *   where: {
     *     // ... the filter for the Employees we want to count
     *   }
     * })
    **/
    count<T extends EmployeeCountArgs>(
      args?: Subset<T, EmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EmployeeAggregateArgs>(args: Subset<T, EmployeeAggregateArgs>): Prisma.PrismaPromise<GetEmployeeAggregateType<T>>

    /**
     * Group by Employee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EmployeeGroupByArgs} args - Group by arguments.
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
      T extends EmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EmployeeGroupByArgs['orderBy'] }
        : { orderBy?: EmployeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, EmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Employee model
   */
  readonly fields: EmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Employee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    jo_approver_setting<T extends Employee$jo_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$jo_approver_settingArgs<ExtArgs>>): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    meqs_approver_setting<T extends Employee$meqs_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$meqs_approver_settingArgs<ExtArgs>>): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    po_approver_setting<T extends Employee$po_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$po_approver_settingArgs<ExtArgs>>): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    rv_approver_setting<T extends Employee$rv_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$rv_approver_settingArgs<ExtArgs>>): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    spr_approver_setting<T extends Employee$spr_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$spr_approver_settingArgs<ExtArgs>>): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    rr_approver_setting<T extends Employee$rr_approver_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$rr_approver_settingArgs<ExtArgs>>): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    jo_approver_proxy_setting<T extends Employee$jo_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$jo_approver_proxy_settingArgs<ExtArgs>>): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    meqs_approver_proxy_setting<T extends Employee$meqs_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$meqs_approver_proxy_settingArgs<ExtArgs>>): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    po_approver_proxy_setting<T extends Employee$po_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$po_approver_proxy_settingArgs<ExtArgs>>): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    rv_approver_proxy_setting<T extends Employee$rv_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$rv_approver_proxy_settingArgs<ExtArgs>>): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    spr_approver_proxy_setting<T extends Employee$spr_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$spr_approver_proxy_settingArgs<ExtArgs>>): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    rr_approver_proxy_setting<T extends Employee$rr_approver_proxy_settingArgs<ExtArgs> = {}>(args?: Subset<T, Employee$rr_approver_proxy_settingArgs<ExtArgs>>): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    user_employee<T extends Employee$user_employeeArgs<ExtArgs> = {}>(args?: Subset<T, Employee$user_employeeArgs<ExtArgs>>): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Employee model
   */ 
  interface EmployeeFieldRefs {
    readonly id: FieldRef<"Employee", 'String'>
    readonly firstname: FieldRef<"Employee", 'String'>
    readonly middlename: FieldRef<"Employee", 'String'>
    readonly lastname: FieldRef<"Employee", 'String'>
    readonly created_at: FieldRef<"Employee", 'DateTime'>
    readonly updated_at: FieldRef<"Employee", 'DateTime'>
    readonly is_deleted: FieldRef<"Employee", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Employee findUnique
   */
  export type EmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee findUniqueOrThrow
   */
  export type EmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee findFirst
   */
  export type EmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }


  /**
   * Employee findFirstOrThrow
   */
  export type EmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employee to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Employees.
     */
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }


  /**
   * Employee findMany
   */
  export type EmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter, which Employees to fetch.
     */
    where?: EmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Employees to fetch.
     */
    orderBy?: EmployeeOrderByWithRelationInput | EmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Employees.
     */
    cursor?: EmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Employees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Employees.
     */
    skip?: number
    distinct?: EmployeeScalarFieldEnum | EmployeeScalarFieldEnum[]
  }


  /**
   * Employee create
   */
  export type EmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a Employee.
     */
    data: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
  }


  /**
   * Employee createMany
   */
  export type EmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Employees.
     */
    data: EmployeeCreateManyInput | EmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Employee update
   */
  export type EmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a Employee.
     */
    data: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
    /**
     * Choose, which Employee to update.
     */
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee updateMany
   */
  export type EmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Employees.
     */
    data: XOR<EmployeeUpdateManyMutationInput, EmployeeUncheckedUpdateManyInput>
    /**
     * Filter which Employees to update
     */
    where?: EmployeeWhereInput
  }


  /**
   * Employee upsert
   */
  export type EmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the Employee to update in case it exists.
     */
    where: EmployeeWhereUniqueInput
    /**
     * In case the Employee found by the `where` argument doesn't exist, create a new Employee with this data.
     */
    create: XOR<EmployeeCreateInput, EmployeeUncheckedCreateInput>
    /**
     * In case the Employee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EmployeeUpdateInput, EmployeeUncheckedUpdateInput>
  }


  /**
   * Employee delete
   */
  export type EmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    /**
     * Filter which Employee to delete.
     */
    where: EmployeeWhereUniqueInput
  }


  /**
   * Employee deleteMany
   */
  export type EmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Employees to delete
     */
    where?: EmployeeWhereInput
  }


  /**
   * Employee.jo_approver_setting
   */
  export type Employee$jo_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    where?: JOApproverSettingWhereInput
  }


  /**
   * Employee.meqs_approver_setting
   */
  export type Employee$meqs_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    where?: MEQSApproverSettingWhereInput
  }


  /**
   * Employee.po_approver_setting
   */
  export type Employee$po_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    where?: POApproverSettingWhereInput
  }


  /**
   * Employee.rv_approver_setting
   */
  export type Employee$rv_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    where?: RVApproverSettingWhereInput
  }


  /**
   * Employee.spr_approver_setting
   */
  export type Employee$spr_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    where?: SPRApproverSettingWhereInput
  }


  /**
   * Employee.rr_approver_setting
   */
  export type Employee$rr_approver_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    where?: RRApproverSettingWhereInput
  }


  /**
   * Employee.jo_approver_proxy_setting
   */
  export type Employee$jo_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    where?: JOApproverSettingWhereInput
  }


  /**
   * Employee.meqs_approver_proxy_setting
   */
  export type Employee$meqs_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    where?: MEQSApproverSettingWhereInput
  }


  /**
   * Employee.po_approver_proxy_setting
   */
  export type Employee$po_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    where?: POApproverSettingWhereInput
  }


  /**
   * Employee.rv_approver_proxy_setting
   */
  export type Employee$rv_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    where?: RVApproverSettingWhereInput
  }


  /**
   * Employee.spr_approver_proxy_setting
   */
  export type Employee$spr_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    where?: SPRApproverSettingWhereInput
  }


  /**
   * Employee.rr_approver_proxy_setting
   */
  export type Employee$rr_approver_proxy_settingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    where?: RRApproverSettingWhereInput
  }


  /**
   * Employee.user_employee
   */
  export type Employee$user_employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    where?: UserEmployeeWhereInput
  }


  /**
   * Employee without action
   */
  export type EmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
  }



  /**
   * Model Classification
   */

  export type AggregateClassification = {
    _count: ClassificationCountAggregateOutputType | null
    _min: ClassificationMinAggregateOutputType | null
    _max: ClassificationMaxAggregateOutputType | null
  }

  export type ClassificationMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type ClassificationMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type ClassificationCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type ClassificationMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type ClassificationMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type ClassificationCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type ClassificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classification to aggregate.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Classifications
    **/
    _count?: true | ClassificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClassificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClassificationMaxAggregateInputType
  }

  export type GetClassificationAggregateType<T extends ClassificationAggregateArgs> = {
        [P in keyof T & keyof AggregateClassification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClassification[P]>
      : GetScalarType<T[P], AggregateClassification[P]>
  }




  export type ClassificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClassificationWhereInput
    orderBy?: ClassificationOrderByWithAggregationInput | ClassificationOrderByWithAggregationInput[]
    by: ClassificationScalarFieldEnum[] | ClassificationScalarFieldEnum
    having?: ClassificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClassificationCountAggregateInputType | true
    _min?: ClassificationMinAggregateInputType
    _max?: ClassificationMaxAggregateInputType
  }

  export type ClassificationGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: ClassificationCountAggregateOutputType | null
    _min: ClassificationMinAggregateOutputType | null
    _max: ClassificationMaxAggregateOutputType | null
  }

  type GetClassificationGroupByPayload<T extends ClassificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClassificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClassificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClassificationGroupByOutputType[P]>
            : GetScalarType<T[P], ClassificationGroupByOutputType[P]>
        }
      >
    >


  export type ClassificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }, ExtArgs["result"]["classification"]>

  export type ClassificationSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }


  export type $ClassificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Classification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["classification"]>
    composites: {}
  }


  type ClassificationGetPayload<S extends boolean | null | undefined | ClassificationDefaultArgs> = $Result.GetResult<Prisma.$ClassificationPayload, S>

  type ClassificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ClassificationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ClassificationCountAggregateInputType | true
    }

  export interface ClassificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Classification'], meta: { name: 'Classification' } }
    /**
     * Find zero or one Classification that matches the filter.
     * @param {ClassificationFindUniqueArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ClassificationFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationFindUniqueArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Classification that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ClassificationFindUniqueOrThrowArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ClassificationFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Classification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindFirstArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ClassificationFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationFindFirstArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Classification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindFirstOrThrowArgs} args - Arguments to find a Classification
     * @example
     * // Get one Classification
     * const classification = await prisma.classification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ClassificationFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Classifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Classifications
     * const classifications = await prisma.classification.findMany()
     * 
     * // Get first 10 Classifications
     * const classifications = await prisma.classification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const classificationWithIdOnly = await prisma.classification.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ClassificationFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Classification.
     * @param {ClassificationCreateArgs} args - Arguments to create a Classification.
     * @example
     * // Create one Classification
     * const Classification = await prisma.classification.create({
     *   data: {
     *     // ... data to create a Classification
     *   }
     * })
     * 
    **/
    create<T extends ClassificationCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationCreateArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Classifications.
     *     @param {ClassificationCreateManyArgs} args - Arguments to create many Classifications.
     *     @example
     *     // Create many Classifications
     *     const classification = await prisma.classification.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ClassificationCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Classification.
     * @param {ClassificationDeleteArgs} args - Arguments to delete one Classification.
     * @example
     * // Delete one Classification
     * const Classification = await prisma.classification.delete({
     *   where: {
     *     // ... filter to delete one Classification
     *   }
     * })
     * 
    **/
    delete<T extends ClassificationDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationDeleteArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Classification.
     * @param {ClassificationUpdateArgs} args - Arguments to update one Classification.
     * @example
     * // Update one Classification
     * const classification = await prisma.classification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ClassificationUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationUpdateArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Classifications.
     * @param {ClassificationDeleteManyArgs} args - Arguments to filter Classifications to delete.
     * @example
     * // Delete a few Classifications
     * const { count } = await prisma.classification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ClassificationDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ClassificationDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Classifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Classifications
     * const classification = await prisma.classification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ClassificationUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Classification.
     * @param {ClassificationUpsertArgs} args - Arguments to update or create a Classification.
     * @example
     * // Update or create a Classification
     * const classification = await prisma.classification.upsert({
     *   create: {
     *     // ... data to create a Classification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Classification we want to update
     *   }
     * })
    **/
    upsert<T extends ClassificationUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ClassificationUpsertArgs<ExtArgs>>
    ): Prisma__ClassificationClient<$Result.GetResult<Prisma.$ClassificationPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Classifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationCountArgs} args - Arguments to filter Classifications to count.
     * @example
     * // Count the number of Classifications
     * const count = await prisma.classification.count({
     *   where: {
     *     // ... the filter for the Classifications we want to count
     *   }
     * })
    **/
    count<T extends ClassificationCountArgs>(
      args?: Subset<T, ClassificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClassificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Classification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ClassificationAggregateArgs>(args: Subset<T, ClassificationAggregateArgs>): Prisma.PrismaPromise<GetClassificationAggregateType<T>>

    /**
     * Group by Classification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClassificationGroupByArgs} args - Group by arguments.
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
      T extends ClassificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClassificationGroupByArgs['orderBy'] }
        : { orderBy?: ClassificationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ClassificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClassificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Classification model
   */
  readonly fields: ClassificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Classification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClassificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';


    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Classification model
   */ 
  interface ClassificationFieldRefs {
    readonly id: FieldRef<"Classification", 'String'>
    readonly name: FieldRef<"Classification", 'String'>
    readonly created_at: FieldRef<"Classification", 'DateTime'>
    readonly updated_at: FieldRef<"Classification", 'DateTime'>
    readonly is_deleted: FieldRef<"Classification", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Classification findUnique
   */
  export type ClassificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where: ClassificationWhereUniqueInput
  }


  /**
   * Classification findUniqueOrThrow
   */
  export type ClassificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where: ClassificationWhereUniqueInput
  }


  /**
   * Classification findFirst
   */
  export type ClassificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classifications.
     */
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }


  /**
   * Classification findFirstOrThrow
   */
  export type ClassificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classification to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Classifications.
     */
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }


  /**
   * Classification findMany
   */
  export type ClassificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter, which Classifications to fetch.
     */
    where?: ClassificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Classifications to fetch.
     */
    orderBy?: ClassificationOrderByWithRelationInput | ClassificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Classifications.
     */
    cursor?: ClassificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Classifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Classifications.
     */
    skip?: number
    distinct?: ClassificationScalarFieldEnum | ClassificationScalarFieldEnum[]
  }


  /**
   * Classification create
   */
  export type ClassificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The data needed to create a Classification.
     */
    data: XOR<ClassificationCreateInput, ClassificationUncheckedCreateInput>
  }


  /**
   * Classification createMany
   */
  export type ClassificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Classifications.
     */
    data: ClassificationCreateManyInput | ClassificationCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Classification update
   */
  export type ClassificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The data needed to update a Classification.
     */
    data: XOR<ClassificationUpdateInput, ClassificationUncheckedUpdateInput>
    /**
     * Choose, which Classification to update.
     */
    where: ClassificationWhereUniqueInput
  }


  /**
   * Classification updateMany
   */
  export type ClassificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Classifications.
     */
    data: XOR<ClassificationUpdateManyMutationInput, ClassificationUncheckedUpdateManyInput>
    /**
     * Filter which Classifications to update
     */
    where?: ClassificationWhereInput
  }


  /**
   * Classification upsert
   */
  export type ClassificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * The filter to search for the Classification to update in case it exists.
     */
    where: ClassificationWhereUniqueInput
    /**
     * In case the Classification found by the `where` argument doesn't exist, create a new Classification with this data.
     */
    create: XOR<ClassificationCreateInput, ClassificationUncheckedCreateInput>
    /**
     * In case the Classification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClassificationUpdateInput, ClassificationUncheckedUpdateInput>
  }


  /**
   * Classification delete
   */
  export type ClassificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
    /**
     * Filter which Classification to delete.
     */
    where: ClassificationWhereUniqueInput
  }


  /**
   * Classification deleteMany
   */
  export type ClassificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Classifications to delete
     */
    where?: ClassificationWhereInput
  }


  /**
   * Classification without action
   */
  export type ClassificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Classification
     */
    select?: ClassificationSelect<ExtArgs> | null
  }



  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    status: number | null
  }

  export type UserSumAggregateOutputType = {
    status: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    username: string | null
    password: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    role: $Enums.Role | null
    username: string | null
    password: string | null
    status: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    role: number
    username: number
    password: number
    status: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    status?: true
  }

  export type UserSumAggregateInputType = {
    status?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    role?: true
    username?: true
    password?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    role?: true
    username?: true
    password?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    role?: true
    username?: true
    password?: true
    status?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
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
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
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
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    role: $Enums.Role
    username: string
    password: string
    status: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
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
    role?: boolean
    username?: boolean
    password?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    user_permissions?: boolean | User$user_permissionsArgs<ExtArgs>
    user_employee?: boolean | User$user_employeeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    role?: boolean
    username?: boolean
    password?: boolean
    status?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_permissions?: boolean | User$user_permissionsArgs<ExtArgs>
    user_employee?: boolean | User$user_employeeArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      user_permissions: Prisma.$UserPermissionPayload<ExtArgs>[]
      user_employee: Prisma.$UserEmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      role: $Enums.Role
      username: string
      password: string
      status: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
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
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

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
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

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
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
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
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

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
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

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
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

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
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

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
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

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
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user_permissions<T extends User$user_permissionsArgs<ExtArgs> = {}>(args?: Subset<T, User$user_permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findMany'> | Null>;

    user_employee<T extends User$user_employeeArgs<ExtArgs> = {}>(args?: Subset<T, User$user_employeeArgs<ExtArgs>>): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly status: FieldRef<"User", 'Int'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly updated_at: FieldRef<"User", 'DateTime'>
    readonly is_deleted: FieldRef<"User", 'Boolean'>
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
     * Choose, which related nodes to fetch as well.
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
   * User.user_permissions
   */
  export type User$user_permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    where?: UserPermissionWhereInput
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    cursor?: UserPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPermissionScalarFieldEnum | UserPermissionScalarFieldEnum[]
  }


  /**
   * User.user_employee
   */
  export type User$user_employeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    where?: UserEmployeeWhereInput
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
     * Choose, which related nodes to fetch as well.
     */
    include?: UserInclude<ExtArgs> | null
  }



  /**
   * Model UserEmployee
   */

  export type AggregateUserEmployee = {
    _count: UserEmployeeCountAggregateOutputType | null
    _min: UserEmployeeMinAggregateOutputType | null
    _max: UserEmployeeMaxAggregateOutputType | null
  }

  export type UserEmployeeMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    employee_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type UserEmployeeMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    employee_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type UserEmployeeCountAggregateOutputType = {
    id: number
    user_id: number
    employee_id: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type UserEmployeeMinAggregateInputType = {
    id?: true
    user_id?: true
    employee_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type UserEmployeeMaxAggregateInputType = {
    id?: true
    user_id?: true
    employee_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type UserEmployeeCountAggregateInputType = {
    id?: true
    user_id?: true
    employee_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type UserEmployeeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEmployee to aggregate.
     */
    where?: UserEmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmployees to fetch.
     */
    orderBy?: UserEmployeeOrderByWithRelationInput | UserEmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserEmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmployees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmployees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserEmployees
    **/
    _count?: true | UserEmployeeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserEmployeeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserEmployeeMaxAggregateInputType
  }

  export type GetUserEmployeeAggregateType<T extends UserEmployeeAggregateArgs> = {
        [P in keyof T & keyof AggregateUserEmployee]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserEmployee[P]>
      : GetScalarType<T[P], AggregateUserEmployee[P]>
  }




  export type UserEmployeeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserEmployeeWhereInput
    orderBy?: UserEmployeeOrderByWithAggregationInput | UserEmployeeOrderByWithAggregationInput[]
    by: UserEmployeeScalarFieldEnum[] | UserEmployeeScalarFieldEnum
    having?: UserEmployeeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserEmployeeCountAggregateInputType | true
    _min?: UserEmployeeMinAggregateInputType
    _max?: UserEmployeeMaxAggregateInputType
  }

  export type UserEmployeeGroupByOutputType = {
    id: string
    user_id: string
    employee_id: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: UserEmployeeCountAggregateOutputType | null
    _min: UserEmployeeMinAggregateOutputType | null
    _max: UserEmployeeMaxAggregateOutputType | null
  }

  type GetUserEmployeeGroupByPayload<T extends UserEmployeeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserEmployeeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserEmployeeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserEmployeeGroupByOutputType[P]>
            : GetScalarType<T[P], UserEmployeeGroupByOutputType[P]>
        }
      >
    >


  export type UserEmployeeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    employee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userEmployee"]>

  export type UserEmployeeSelectScalar = {
    id?: boolean
    user_id?: boolean
    employee_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type UserEmployeeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    employee?: boolean | EmployeeDefaultArgs<ExtArgs>
  }


  export type $UserEmployeePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserEmployee"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      employee: Prisma.$EmployeePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      employee_id: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["userEmployee"]>
    composites: {}
  }


  type UserEmployeeGetPayload<S extends boolean | null | undefined | UserEmployeeDefaultArgs> = $Result.GetResult<Prisma.$UserEmployeePayload, S>

  type UserEmployeeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserEmployeeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserEmployeeCountAggregateInputType | true
    }

  export interface UserEmployeeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserEmployee'], meta: { name: 'UserEmployee' } }
    /**
     * Find zero or one UserEmployee that matches the filter.
     * @param {UserEmployeeFindUniqueArgs} args - Arguments to find a UserEmployee
     * @example
     * // Get one UserEmployee
     * const userEmployee = await prisma.userEmployee.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserEmployeeFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeFindUniqueArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserEmployee that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserEmployeeFindUniqueOrThrowArgs} args - Arguments to find a UserEmployee
     * @example
     * // Get one UserEmployee
     * const userEmployee = await prisma.userEmployee.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserEmployeeFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserEmployee that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeFindFirstArgs} args - Arguments to find a UserEmployee
     * @example
     * // Get one UserEmployee
     * const userEmployee = await prisma.userEmployee.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserEmployeeFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeFindFirstArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserEmployee that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeFindFirstOrThrowArgs} args - Arguments to find a UserEmployee
     * @example
     * // Get one UserEmployee
     * const userEmployee = await prisma.userEmployee.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserEmployeeFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserEmployees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserEmployees
     * const userEmployees = await prisma.userEmployee.findMany()
     * 
     * // Get first 10 UserEmployees
     * const userEmployees = await prisma.userEmployee.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userEmployeeWithIdOnly = await prisma.userEmployee.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserEmployeeFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserEmployee.
     * @param {UserEmployeeCreateArgs} args - Arguments to create a UserEmployee.
     * @example
     * // Create one UserEmployee
     * const UserEmployee = await prisma.userEmployee.create({
     *   data: {
     *     // ... data to create a UserEmployee
     *   }
     * })
     * 
    **/
    create<T extends UserEmployeeCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeCreateArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserEmployees.
     *     @param {UserEmployeeCreateManyArgs} args - Arguments to create many UserEmployees.
     *     @example
     *     // Create many UserEmployees
     *     const userEmployee = await prisma.userEmployee.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserEmployeeCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserEmployee.
     * @param {UserEmployeeDeleteArgs} args - Arguments to delete one UserEmployee.
     * @example
     * // Delete one UserEmployee
     * const UserEmployee = await prisma.userEmployee.delete({
     *   where: {
     *     // ... filter to delete one UserEmployee
     *   }
     * })
     * 
    **/
    delete<T extends UserEmployeeDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeDeleteArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserEmployee.
     * @param {UserEmployeeUpdateArgs} args - Arguments to update one UserEmployee.
     * @example
     * // Update one UserEmployee
     * const userEmployee = await prisma.userEmployee.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserEmployeeUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeUpdateArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserEmployees.
     * @param {UserEmployeeDeleteManyArgs} args - Arguments to filter UserEmployees to delete.
     * @example
     * // Delete a few UserEmployees
     * const { count } = await prisma.userEmployee.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserEmployeeDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserEmployeeDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserEmployees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserEmployees
     * const userEmployee = await prisma.userEmployee.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserEmployeeUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserEmployee.
     * @param {UserEmployeeUpsertArgs} args - Arguments to update or create a UserEmployee.
     * @example
     * // Update or create a UserEmployee
     * const userEmployee = await prisma.userEmployee.upsert({
     *   create: {
     *     // ... data to create a UserEmployee
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserEmployee we want to update
     *   }
     * })
    **/
    upsert<T extends UserEmployeeUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserEmployeeUpsertArgs<ExtArgs>>
    ): Prisma__UserEmployeeClient<$Result.GetResult<Prisma.$UserEmployeePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserEmployees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeCountArgs} args - Arguments to filter UserEmployees to count.
     * @example
     * // Count the number of UserEmployees
     * const count = await prisma.userEmployee.count({
     *   where: {
     *     // ... the filter for the UserEmployees we want to count
     *   }
     * })
    **/
    count<T extends UserEmployeeCountArgs>(
      args?: Subset<T, UserEmployeeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserEmployeeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserEmployee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserEmployeeAggregateArgs>(args: Subset<T, UserEmployeeAggregateArgs>): Prisma.PrismaPromise<GetUserEmployeeAggregateType<T>>

    /**
     * Group by UserEmployee.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserEmployeeGroupByArgs} args - Group by arguments.
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
      T extends UserEmployeeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserEmployeeGroupByArgs['orderBy'] }
        : { orderBy?: UserEmployeeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserEmployeeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserEmployeeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserEmployee model
   */
  readonly fields: UserEmployeeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserEmployee.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserEmployeeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    employee<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserEmployee model
   */ 
  interface UserEmployeeFieldRefs {
    readonly id: FieldRef<"UserEmployee", 'String'>
    readonly user_id: FieldRef<"UserEmployee", 'String'>
    readonly employee_id: FieldRef<"UserEmployee", 'String'>
    readonly created_at: FieldRef<"UserEmployee", 'DateTime'>
    readonly updated_at: FieldRef<"UserEmployee", 'DateTime'>
    readonly is_deleted: FieldRef<"UserEmployee", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * UserEmployee findUnique
   */
  export type UserEmployeeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter, which UserEmployee to fetch.
     */
    where: UserEmployeeWhereUniqueInput
  }


  /**
   * UserEmployee findUniqueOrThrow
   */
  export type UserEmployeeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter, which UserEmployee to fetch.
     */
    where: UserEmployeeWhereUniqueInput
  }


  /**
   * UserEmployee findFirst
   */
  export type UserEmployeeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter, which UserEmployee to fetch.
     */
    where?: UserEmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmployees to fetch.
     */
    orderBy?: UserEmployeeOrderByWithRelationInput | UserEmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEmployees.
     */
    cursor?: UserEmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmployees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmployees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEmployees.
     */
    distinct?: UserEmployeeScalarFieldEnum | UserEmployeeScalarFieldEnum[]
  }


  /**
   * UserEmployee findFirstOrThrow
   */
  export type UserEmployeeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter, which UserEmployee to fetch.
     */
    where?: UserEmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmployees to fetch.
     */
    orderBy?: UserEmployeeOrderByWithRelationInput | UserEmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserEmployees.
     */
    cursor?: UserEmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmployees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmployees.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserEmployees.
     */
    distinct?: UserEmployeeScalarFieldEnum | UserEmployeeScalarFieldEnum[]
  }


  /**
   * UserEmployee findMany
   */
  export type UserEmployeeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter, which UserEmployees to fetch.
     */
    where?: UserEmployeeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserEmployees to fetch.
     */
    orderBy?: UserEmployeeOrderByWithRelationInput | UserEmployeeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserEmployees.
     */
    cursor?: UserEmployeeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserEmployees from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserEmployees.
     */
    skip?: number
    distinct?: UserEmployeeScalarFieldEnum | UserEmployeeScalarFieldEnum[]
  }


  /**
   * UserEmployee create
   */
  export type UserEmployeeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * The data needed to create a UserEmployee.
     */
    data: XOR<UserEmployeeCreateInput, UserEmployeeUncheckedCreateInput>
  }


  /**
   * UserEmployee createMany
   */
  export type UserEmployeeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserEmployees.
     */
    data: UserEmployeeCreateManyInput | UserEmployeeCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserEmployee update
   */
  export type UserEmployeeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * The data needed to update a UserEmployee.
     */
    data: XOR<UserEmployeeUpdateInput, UserEmployeeUncheckedUpdateInput>
    /**
     * Choose, which UserEmployee to update.
     */
    where: UserEmployeeWhereUniqueInput
  }


  /**
   * UserEmployee updateMany
   */
  export type UserEmployeeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserEmployees.
     */
    data: XOR<UserEmployeeUpdateManyMutationInput, UserEmployeeUncheckedUpdateManyInput>
    /**
     * Filter which UserEmployees to update
     */
    where?: UserEmployeeWhereInput
  }


  /**
   * UserEmployee upsert
   */
  export type UserEmployeeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * The filter to search for the UserEmployee to update in case it exists.
     */
    where: UserEmployeeWhereUniqueInput
    /**
     * In case the UserEmployee found by the `where` argument doesn't exist, create a new UserEmployee with this data.
     */
    create: XOR<UserEmployeeCreateInput, UserEmployeeUncheckedCreateInput>
    /**
     * In case the UserEmployee was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserEmployeeUpdateInput, UserEmployeeUncheckedUpdateInput>
  }


  /**
   * UserEmployee delete
   */
  export type UserEmployeeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
    /**
     * Filter which UserEmployee to delete.
     */
    where: UserEmployeeWhereUniqueInput
  }


  /**
   * UserEmployee deleteMany
   */
  export type UserEmployeeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserEmployees to delete
     */
    where?: UserEmployeeWhereInput
  }


  /**
   * UserEmployee without action
   */
  export type UserEmployeeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserEmployee
     */
    select?: UserEmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserEmployeeInclude<ExtArgs> | null
  }



  /**
   * Model UserPermission
   */

  export type AggregateUserPermission = {
    _count: UserPermissionCountAggregateOutputType | null
    _min: UserPermissionMinAggregateOutputType | null
    _max: UserPermissionMaxAggregateOutputType | null
  }

  export type UserPermissionMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    user_id: string | null
    module_id: string | null
  }

  export type UserPermissionMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    user_id: string | null
    module_id: string | null
  }

  export type UserPermissionCountAggregateOutputType = {
    id: number
    created_at: number
    updated_at: number
    is_deleted: number
    user_id: number
    module_id: number
    _all: number
  }


  export type UserPermissionMinAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    user_id?: true
    module_id?: true
  }

  export type UserPermissionMaxAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    user_id?: true
    module_id?: true
  }

  export type UserPermissionCountAggregateInputType = {
    id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    user_id?: true
    module_id?: true
    _all?: true
  }

  export type UserPermissionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPermission to aggregate.
     */
    where?: UserPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPermissions to fetch.
     */
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserPermissions
    **/
    _count?: true | UserPermissionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserPermissionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserPermissionMaxAggregateInputType
  }

  export type GetUserPermissionAggregateType<T extends UserPermissionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserPermission]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserPermission[P]>
      : GetScalarType<T[P], AggregateUserPermission[P]>
  }




  export type UserPermissionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserPermissionWhereInput
    orderBy?: UserPermissionOrderByWithAggregationInput | UserPermissionOrderByWithAggregationInput[]
    by: UserPermissionScalarFieldEnum[] | UserPermissionScalarFieldEnum
    having?: UserPermissionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserPermissionCountAggregateInputType | true
    _min?: UserPermissionMinAggregateInputType
    _max?: UserPermissionMaxAggregateInputType
  }

  export type UserPermissionGroupByOutputType = {
    id: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    user_id: string
    module_id: string
    _count: UserPermissionCountAggregateOutputType | null
    _min: UserPermissionMinAggregateOutputType | null
    _max: UserPermissionMaxAggregateOutputType | null
  }

  type GetUserPermissionGroupByPayload<T extends UserPermissionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserPermissionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserPermissionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserPermissionGroupByOutputType[P]>
            : GetScalarType<T[P], UserPermissionGroupByOutputType[P]>
        }
      >
    >


  export type UserPermissionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    user_id?: boolean
    module_id?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    module?: boolean | ModuleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userPermission"]>

  export type UserPermissionSelectScalar = {
    id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    user_id?: boolean
    module_id?: boolean
  }

  export type UserPermissionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    module?: boolean | ModuleDefaultArgs<ExtArgs>
  }


  export type $UserPermissionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserPermission"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      module: Prisma.$ModulePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
      user_id: string
      module_id: string
    }, ExtArgs["result"]["userPermission"]>
    composites: {}
  }


  type UserPermissionGetPayload<S extends boolean | null | undefined | UserPermissionDefaultArgs> = $Result.GetResult<Prisma.$UserPermissionPayload, S>

  type UserPermissionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserPermissionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserPermissionCountAggregateInputType | true
    }

  export interface UserPermissionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserPermission'], meta: { name: 'UserPermission' } }
    /**
     * Find zero or one UserPermission that matches the filter.
     * @param {UserPermissionFindUniqueArgs} args - Arguments to find a UserPermission
     * @example
     * // Get one UserPermission
     * const userPermission = await prisma.userPermission.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserPermissionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionFindUniqueArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one UserPermission that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserPermissionFindUniqueOrThrowArgs} args - Arguments to find a UserPermission
     * @example
     * // Get one UserPermission
     * const userPermission = await prisma.userPermission.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserPermissionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first UserPermission that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionFindFirstArgs} args - Arguments to find a UserPermission
     * @example
     * // Get one UserPermission
     * const userPermission = await prisma.userPermission.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserPermissionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionFindFirstArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first UserPermission that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionFindFirstOrThrowArgs} args - Arguments to find a UserPermission
     * @example
     * // Get one UserPermission
     * const userPermission = await prisma.userPermission.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserPermissionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more UserPermissions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserPermissions
     * const userPermissions = await prisma.userPermission.findMany()
     * 
     * // Get first 10 UserPermissions
     * const userPermissions = await prisma.userPermission.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userPermissionWithIdOnly = await prisma.userPermission.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserPermissionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a UserPermission.
     * @param {UserPermissionCreateArgs} args - Arguments to create a UserPermission.
     * @example
     * // Create one UserPermission
     * const UserPermission = await prisma.userPermission.create({
     *   data: {
     *     // ... data to create a UserPermission
     *   }
     * })
     * 
    **/
    create<T extends UserPermissionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionCreateArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many UserPermissions.
     *     @param {UserPermissionCreateManyArgs} args - Arguments to create many UserPermissions.
     *     @example
     *     // Create many UserPermissions
     *     const userPermission = await prisma.userPermission.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserPermissionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserPermission.
     * @param {UserPermissionDeleteArgs} args - Arguments to delete one UserPermission.
     * @example
     * // Delete one UserPermission
     * const UserPermission = await prisma.userPermission.delete({
     *   where: {
     *     // ... filter to delete one UserPermission
     *   }
     * })
     * 
    **/
    delete<T extends UserPermissionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionDeleteArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one UserPermission.
     * @param {UserPermissionUpdateArgs} args - Arguments to update one UserPermission.
     * @example
     * // Update one UserPermission
     * const userPermission = await prisma.userPermission.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserPermissionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionUpdateArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more UserPermissions.
     * @param {UserPermissionDeleteManyArgs} args - Arguments to filter UserPermissions to delete.
     * @example
     * // Delete a few UserPermissions
     * const { count } = await prisma.userPermission.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserPermissionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserPermissionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserPermissions
     * const userPermission = await prisma.userPermission.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserPermissionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserPermission.
     * @param {UserPermissionUpsertArgs} args - Arguments to update or create a UserPermission.
     * @example
     * // Update or create a UserPermission
     * const userPermission = await prisma.userPermission.upsert({
     *   create: {
     *     // ... data to create a UserPermission
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserPermission we want to update
     *   }
     * })
    **/
    upsert<T extends UserPermissionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserPermissionUpsertArgs<ExtArgs>>
    ): Prisma__UserPermissionClient<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of UserPermissions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionCountArgs} args - Arguments to filter UserPermissions to count.
     * @example
     * // Count the number of UserPermissions
     * const count = await prisma.userPermission.count({
     *   where: {
     *     // ... the filter for the UserPermissions we want to count
     *   }
     * })
    **/
    count<T extends UserPermissionCountArgs>(
      args?: Subset<T, UserPermissionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserPermissionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserPermissionAggregateArgs>(args: Subset<T, UserPermissionAggregateArgs>): Prisma.PrismaPromise<GetUserPermissionAggregateType<T>>

    /**
     * Group by UserPermission.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserPermissionGroupByArgs} args - Group by arguments.
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
      T extends UserPermissionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserPermissionGroupByArgs['orderBy'] }
        : { orderBy?: UserPermissionGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserPermissionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserPermissionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserPermission model
   */
  readonly fields: UserPermissionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserPermission.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserPermissionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    module<T extends ModuleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ModuleDefaultArgs<ExtArgs>>): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the UserPermission model
   */ 
  interface UserPermissionFieldRefs {
    readonly id: FieldRef<"UserPermission", 'String'>
    readonly created_at: FieldRef<"UserPermission", 'DateTime'>
    readonly updated_at: FieldRef<"UserPermission", 'DateTime'>
    readonly is_deleted: FieldRef<"UserPermission", 'Boolean'>
    readonly user_id: FieldRef<"UserPermission", 'String'>
    readonly module_id: FieldRef<"UserPermission", 'String'>
  }
    

  // Custom InputTypes

  /**
   * UserPermission findUnique
   */
  export type UserPermissionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter, which UserPermission to fetch.
     */
    where: UserPermissionWhereUniqueInput
  }


  /**
   * UserPermission findUniqueOrThrow
   */
  export type UserPermissionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter, which UserPermission to fetch.
     */
    where: UserPermissionWhereUniqueInput
  }


  /**
   * UserPermission findFirst
   */
  export type UserPermissionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter, which UserPermission to fetch.
     */
    where?: UserPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPermissions to fetch.
     */
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPermissions.
     */
    cursor?: UserPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPermissions.
     */
    distinct?: UserPermissionScalarFieldEnum | UserPermissionScalarFieldEnum[]
  }


  /**
   * UserPermission findFirstOrThrow
   */
  export type UserPermissionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter, which UserPermission to fetch.
     */
    where?: UserPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPermissions to fetch.
     */
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserPermissions.
     */
    cursor?: UserPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPermissions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserPermissions.
     */
    distinct?: UserPermissionScalarFieldEnum | UserPermissionScalarFieldEnum[]
  }


  /**
   * UserPermission findMany
   */
  export type UserPermissionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter, which UserPermissions to fetch.
     */
    where?: UserPermissionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserPermissions to fetch.
     */
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserPermissions.
     */
    cursor?: UserPermissionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserPermissions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserPermissions.
     */
    skip?: number
    distinct?: UserPermissionScalarFieldEnum | UserPermissionScalarFieldEnum[]
  }


  /**
   * UserPermission create
   */
  export type UserPermissionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * The data needed to create a UserPermission.
     */
    data: XOR<UserPermissionCreateInput, UserPermissionUncheckedCreateInput>
  }


  /**
   * UserPermission createMany
   */
  export type UserPermissionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserPermissions.
     */
    data: UserPermissionCreateManyInput | UserPermissionCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * UserPermission update
   */
  export type UserPermissionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * The data needed to update a UserPermission.
     */
    data: XOR<UserPermissionUpdateInput, UserPermissionUncheckedUpdateInput>
    /**
     * Choose, which UserPermission to update.
     */
    where: UserPermissionWhereUniqueInput
  }


  /**
   * UserPermission updateMany
   */
  export type UserPermissionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserPermissions.
     */
    data: XOR<UserPermissionUpdateManyMutationInput, UserPermissionUncheckedUpdateManyInput>
    /**
     * Filter which UserPermissions to update
     */
    where?: UserPermissionWhereInput
  }


  /**
   * UserPermission upsert
   */
  export type UserPermissionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * The filter to search for the UserPermission to update in case it exists.
     */
    where: UserPermissionWhereUniqueInput
    /**
     * In case the UserPermission found by the `where` argument doesn't exist, create a new UserPermission with this data.
     */
    create: XOR<UserPermissionCreateInput, UserPermissionUncheckedCreateInput>
    /**
     * In case the UserPermission was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserPermissionUpdateInput, UserPermissionUncheckedUpdateInput>
  }


  /**
   * UserPermission delete
   */
  export type UserPermissionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    /**
     * Filter which UserPermission to delete.
     */
    where: UserPermissionWhereUniqueInput
  }


  /**
   * UserPermission deleteMany
   */
  export type UserPermissionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserPermissions to delete
     */
    where?: UserPermissionWhereInput
  }


  /**
   * UserPermission without action
   */
  export type UserPermissionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
  }



  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: ServiceCountAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    features?: boolean | Service$featuresArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    features?: boolean | Service$featuresArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      features: Prisma.$FeaturePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["service"]>
    composites: {}
  }


  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ServiceFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Service that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ServiceFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ServiceFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
    **/
    create<T extends ServiceCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Services.
     *     @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     *     @example
     *     // Create many Services
     *     const service = await prisma.service.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ServiceCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
    **/
    delete<T extends ServiceDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ServiceUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ServiceDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ServiceUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
    **/
    upsert<T extends ServiceUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>
    ): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
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
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    features<T extends Service$featuresArgs<ExtArgs> = {}>(args?: Subset<T, Service$featuresArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Service model
   */ 
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly created_at: FieldRef<"Service", 'DateTime'>
    readonly updated_at: FieldRef<"Service", 'DateTime'>
    readonly is_deleted: FieldRef<"Service", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }


  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }


  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
  }


  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }


  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }


  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
  }


  /**
   * Service.features
   */
  export type Service$featuresArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    where?: FeatureWhereInput
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    cursor?: FeatureWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }


  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ServiceInclude<ExtArgs> | null
  }



  /**
   * Model Feature
   */

  export type AggregateFeature = {
    _count: FeatureCountAggregateOutputType | null
    _min: FeatureMinAggregateOutputType | null
    _max: FeatureMaxAggregateOutputType | null
  }

  export type FeatureMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    service_id: string | null
  }

  export type FeatureMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    service_id: string | null
  }

  export type FeatureCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    is_deleted: number
    service_id: number
    _all: number
  }


  export type FeatureMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    service_id?: true
  }

  export type FeatureMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    service_id?: true
  }

  export type FeatureCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    service_id?: true
    _all?: true
  }

  export type FeatureAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Feature to aggregate.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Features
    **/
    _count?: true | FeatureCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FeatureMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FeatureMaxAggregateInputType
  }

  export type GetFeatureAggregateType<T extends FeatureAggregateArgs> = {
        [P in keyof T & keyof AggregateFeature]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFeature[P]>
      : GetScalarType<T[P], AggregateFeature[P]>
  }




  export type FeatureGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FeatureWhereInput
    orderBy?: FeatureOrderByWithAggregationInput | FeatureOrderByWithAggregationInput[]
    by: FeatureScalarFieldEnum[] | FeatureScalarFieldEnum
    having?: FeatureScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FeatureCountAggregateInputType | true
    _min?: FeatureMinAggregateInputType
    _max?: FeatureMaxAggregateInputType
  }

  export type FeatureGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    service_id: string
    _count: FeatureCountAggregateOutputType | null
    _min: FeatureMinAggregateOutputType | null
    _max: FeatureMaxAggregateOutputType | null
  }

  type GetFeatureGroupByPayload<T extends FeatureGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FeatureGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FeatureGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FeatureGroupByOutputType[P]>
            : GetScalarType<T[P], FeatureGroupByOutputType[P]>
        }
      >
    >


  export type FeatureSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    service_id?: boolean
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    modules?: boolean | Feature$modulesArgs<ExtArgs>
    _count?: boolean | FeatureCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["feature"]>

  export type FeatureSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    service_id?: boolean
  }

  export type FeatureInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    service?: boolean | ServiceDefaultArgs<ExtArgs>
    modules?: boolean | Feature$modulesArgs<ExtArgs>
    _count?: boolean | FeatureCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $FeaturePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Feature"
    objects: {
      service: Prisma.$ServicePayload<ExtArgs>
      modules: Prisma.$ModulePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
      service_id: string
    }, ExtArgs["result"]["feature"]>
    composites: {}
  }


  type FeatureGetPayload<S extends boolean | null | undefined | FeatureDefaultArgs> = $Result.GetResult<Prisma.$FeaturePayload, S>

  type FeatureCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<FeatureFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: FeatureCountAggregateInputType | true
    }

  export interface FeatureDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Feature'], meta: { name: 'Feature' } }
    /**
     * Find zero or one Feature that matches the filter.
     * @param {FeatureFindUniqueArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FeatureFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureFindUniqueArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Feature that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FeatureFindUniqueOrThrowArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FeatureFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Feature that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindFirstArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FeatureFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureFindFirstArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Feature that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindFirstOrThrowArgs} args - Arguments to find a Feature
     * @example
     * // Get one Feature
     * const feature = await prisma.feature.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FeatureFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Features that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Features
     * const features = await prisma.feature.findMany()
     * 
     * // Get first 10 Features
     * const features = await prisma.feature.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const featureWithIdOnly = await prisma.feature.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FeatureFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Feature.
     * @param {FeatureCreateArgs} args - Arguments to create a Feature.
     * @example
     * // Create one Feature
     * const Feature = await prisma.feature.create({
     *   data: {
     *     // ... data to create a Feature
     *   }
     * })
     * 
    **/
    create<T extends FeatureCreateArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureCreateArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Features.
     *     @param {FeatureCreateManyArgs} args - Arguments to create many Features.
     *     @example
     *     // Create many Features
     *     const feature = await prisma.feature.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends FeatureCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Feature.
     * @param {FeatureDeleteArgs} args - Arguments to delete one Feature.
     * @example
     * // Delete one Feature
     * const Feature = await prisma.feature.delete({
     *   where: {
     *     // ... filter to delete one Feature
     *   }
     * })
     * 
    **/
    delete<T extends FeatureDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureDeleteArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Feature.
     * @param {FeatureUpdateArgs} args - Arguments to update one Feature.
     * @example
     * // Update one Feature
     * const feature = await prisma.feature.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FeatureUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUpdateArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Features.
     * @param {FeatureDeleteManyArgs} args - Arguments to filter Features to delete.
     * @example
     * // Delete a few Features
     * const { count } = await prisma.feature.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FeatureDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, FeatureDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Features.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Features
     * const feature = await prisma.feature.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FeatureUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Feature.
     * @param {FeatureUpsertArgs} args - Arguments to update or create a Feature.
     * @example
     * // Update or create a Feature
     * const feature = await prisma.feature.upsert({
     *   create: {
     *     // ... data to create a Feature
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Feature we want to update
     *   }
     * })
    **/
    upsert<T extends FeatureUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, FeatureUpsertArgs<ExtArgs>>
    ): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Features.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureCountArgs} args - Arguments to filter Features to count.
     * @example
     * // Count the number of Features
     * const count = await prisma.feature.count({
     *   where: {
     *     // ... the filter for the Features we want to count
     *   }
     * })
    **/
    count<T extends FeatureCountArgs>(
      args?: Subset<T, FeatureCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FeatureCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Feature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends FeatureAggregateArgs>(args: Subset<T, FeatureAggregateArgs>): Prisma.PrismaPromise<GetFeatureAggregateType<T>>

    /**
     * Group by Feature.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FeatureGroupByArgs} args - Group by arguments.
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
      T extends FeatureGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FeatureGroupByArgs['orderBy'] }
        : { orderBy?: FeatureGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, FeatureGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFeatureGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Feature model
   */
  readonly fields: FeatureFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Feature.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FeatureClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    modules<T extends Feature$modulesArgs<ExtArgs> = {}>(args?: Subset<T, Feature$modulesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Feature model
   */ 
  interface FeatureFieldRefs {
    readonly id: FieldRef<"Feature", 'String'>
    readonly name: FieldRef<"Feature", 'String'>
    readonly created_at: FieldRef<"Feature", 'DateTime'>
    readonly updated_at: FieldRef<"Feature", 'DateTime'>
    readonly is_deleted: FieldRef<"Feature", 'Boolean'>
    readonly service_id: FieldRef<"Feature", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Feature findUnique
   */
  export type FeatureFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where: FeatureWhereUniqueInput
  }


  /**
   * Feature findUniqueOrThrow
   */
  export type FeatureFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where: FeatureWhereUniqueInput
  }


  /**
   * Feature findFirst
   */
  export type FeatureFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Features.
     */
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }


  /**
   * Feature findFirstOrThrow
   */
  export type FeatureFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Feature to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Features.
     */
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }


  /**
   * Feature findMany
   */
  export type FeatureFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter, which Features to fetch.
     */
    where?: FeatureWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Features to fetch.
     */
    orderBy?: FeatureOrderByWithRelationInput | FeatureOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Features.
     */
    cursor?: FeatureWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Features from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Features.
     */
    skip?: number
    distinct?: FeatureScalarFieldEnum | FeatureScalarFieldEnum[]
  }


  /**
   * Feature create
   */
  export type FeatureCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The data needed to create a Feature.
     */
    data: XOR<FeatureCreateInput, FeatureUncheckedCreateInput>
  }


  /**
   * Feature createMany
   */
  export type FeatureCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Features.
     */
    data: FeatureCreateManyInput | FeatureCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Feature update
   */
  export type FeatureUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The data needed to update a Feature.
     */
    data: XOR<FeatureUpdateInput, FeatureUncheckedUpdateInput>
    /**
     * Choose, which Feature to update.
     */
    where: FeatureWhereUniqueInput
  }


  /**
   * Feature updateMany
   */
  export type FeatureUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Features.
     */
    data: XOR<FeatureUpdateManyMutationInput, FeatureUncheckedUpdateManyInput>
    /**
     * Filter which Features to update
     */
    where?: FeatureWhereInput
  }


  /**
   * Feature upsert
   */
  export type FeatureUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * The filter to search for the Feature to update in case it exists.
     */
    where: FeatureWhereUniqueInput
    /**
     * In case the Feature found by the `where` argument doesn't exist, create a new Feature with this data.
     */
    create: XOR<FeatureCreateInput, FeatureUncheckedCreateInput>
    /**
     * In case the Feature was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FeatureUpdateInput, FeatureUncheckedUpdateInput>
  }


  /**
   * Feature delete
   */
  export type FeatureDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
    /**
     * Filter which Feature to delete.
     */
    where: FeatureWhereUniqueInput
  }


  /**
   * Feature deleteMany
   */
  export type FeatureDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Features to delete
     */
    where?: FeatureWhereInput
  }


  /**
   * Feature.modules
   */
  export type Feature$modulesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    where?: ModuleWhereInput
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    cursor?: ModuleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }


  /**
   * Feature without action
   */
  export type FeatureDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Feature
     */
    select?: FeatureSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: FeatureInclude<ExtArgs> | null
  }



  /**
   * Model Module
   */

  export type AggregateModule = {
    _count: ModuleCountAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  export type ModuleMinAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    feature_id: string | null
  }

  export type ModuleMaxAggregateOutputType = {
    id: string | null
    name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
    feature_id: string | null
  }

  export type ModuleCountAggregateOutputType = {
    id: number
    name: number
    created_at: number
    updated_at: number
    is_deleted: number
    feature_id: number
    _all: number
  }


  export type ModuleMinAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    feature_id?: true
  }

  export type ModuleMaxAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    feature_id?: true
  }

  export type ModuleCountAggregateInputType = {
    id?: true
    name?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    feature_id?: true
    _all?: true
  }

  export type ModuleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Module to aggregate.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Modules
    **/
    _count?: true | ModuleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ModuleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ModuleMaxAggregateInputType
  }

  export type GetModuleAggregateType<T extends ModuleAggregateArgs> = {
        [P in keyof T & keyof AggregateModule]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateModule[P]>
      : GetScalarType<T[P], AggregateModule[P]>
  }




  export type ModuleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ModuleWhereInput
    orderBy?: ModuleOrderByWithAggregationInput | ModuleOrderByWithAggregationInput[]
    by: ModuleScalarFieldEnum[] | ModuleScalarFieldEnum
    having?: ModuleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ModuleCountAggregateInputType | true
    _min?: ModuleMinAggregateInputType
    _max?: ModuleMaxAggregateInputType
  }

  export type ModuleGroupByOutputType = {
    id: string
    name: string
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    feature_id: string
    _count: ModuleCountAggregateOutputType | null
    _min: ModuleMinAggregateOutputType | null
    _max: ModuleMaxAggregateOutputType | null
  }

  type GetModuleGroupByPayload<T extends ModuleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ModuleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ModuleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ModuleGroupByOutputType[P]>
            : GetScalarType<T[P], ModuleGroupByOutputType[P]>
        }
      >
    >


  export type ModuleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    feature_id?: boolean
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
    user_permissions?: boolean | Module$user_permissionsArgs<ExtArgs>
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["module"]>

  export type ModuleSelectScalar = {
    id?: boolean
    name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    feature_id?: boolean
  }

  export type ModuleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    feature?: boolean | FeatureDefaultArgs<ExtArgs>
    user_permissions?: boolean | Module$user_permissionsArgs<ExtArgs>
    _count?: boolean | ModuleCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $ModulePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Module"
    objects: {
      feature: Prisma.$FeaturePayload<ExtArgs>
      user_permissions: Prisma.$UserPermissionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      created_at: Date
      updated_at: Date
      is_deleted: boolean
      feature_id: string
    }, ExtArgs["result"]["module"]>
    composites: {}
  }


  type ModuleGetPayload<S extends boolean | null | undefined | ModuleDefaultArgs> = $Result.GetResult<Prisma.$ModulePayload, S>

  type ModuleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ModuleFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ModuleCountAggregateInputType | true
    }

  export interface ModuleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Module'], meta: { name: 'Module' } }
    /**
     * Find zero or one Module that matches the filter.
     * @param {ModuleFindUniqueArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ModuleFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleFindUniqueArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Module that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ModuleFindUniqueOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ModuleFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Module that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ModuleFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleFindFirstArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Module that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindFirstOrThrowArgs} args - Arguments to find a Module
     * @example
     * // Get one Module
     * const module = await prisma.module.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ModuleFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Modules that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Modules
     * const modules = await prisma.module.findMany()
     * 
     * // Get first 10 Modules
     * const modules = await prisma.module.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moduleWithIdOnly = await prisma.module.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ModuleFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Module.
     * @param {ModuleCreateArgs} args - Arguments to create a Module.
     * @example
     * // Create one Module
     * const Module = await prisma.module.create({
     *   data: {
     *     // ... data to create a Module
     *   }
     * })
     * 
    **/
    create<T extends ModuleCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleCreateArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Modules.
     *     @param {ModuleCreateManyArgs} args - Arguments to create many Modules.
     *     @example
     *     // Create many Modules
     *     const module = await prisma.module.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ModuleCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Module.
     * @param {ModuleDeleteArgs} args - Arguments to delete one Module.
     * @example
     * // Delete one Module
     * const Module = await prisma.module.delete({
     *   where: {
     *     // ... filter to delete one Module
     *   }
     * })
     * 
    **/
    delete<T extends ModuleDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleDeleteArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Module.
     * @param {ModuleUpdateArgs} args - Arguments to update one Module.
     * @example
     * // Update one Module
     * const module = await prisma.module.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ModuleUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleUpdateArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Modules.
     * @param {ModuleDeleteManyArgs} args - Arguments to filter Modules to delete.
     * @example
     * // Delete a few Modules
     * const { count } = await prisma.module.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ModuleDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ModuleDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Modules
     * const module = await prisma.module.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ModuleUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Module.
     * @param {ModuleUpsertArgs} args - Arguments to update or create a Module.
     * @example
     * // Update or create a Module
     * const module = await prisma.module.upsert({
     *   create: {
     *     // ... data to create a Module
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Module we want to update
     *   }
     * })
    **/
    upsert<T extends ModuleUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ModuleUpsertArgs<ExtArgs>>
    ): Prisma__ModuleClient<$Result.GetResult<Prisma.$ModulePayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Modules.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleCountArgs} args - Arguments to filter Modules to count.
     * @example
     * // Count the number of Modules
     * const count = await prisma.module.count({
     *   where: {
     *     // ... the filter for the Modules we want to count
     *   }
     * })
    **/
    count<T extends ModuleCountArgs>(
      args?: Subset<T, ModuleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ModuleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ModuleAggregateArgs>(args: Subset<T, ModuleAggregateArgs>): Prisma.PrismaPromise<GetModuleAggregateType<T>>

    /**
     * Group by Module.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ModuleGroupByArgs} args - Group by arguments.
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
      T extends ModuleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ModuleGroupByArgs['orderBy'] }
        : { orderBy?: ModuleGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ModuleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetModuleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Module model
   */
  readonly fields: ModuleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Module.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ModuleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    feature<T extends FeatureDefaultArgs<ExtArgs> = {}>(args?: Subset<T, FeatureDefaultArgs<ExtArgs>>): Prisma__FeatureClient<$Result.GetResult<Prisma.$FeaturePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user_permissions<T extends Module$user_permissionsArgs<ExtArgs> = {}>(args?: Subset<T, Module$user_permissionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPermissionPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Module model
   */ 
  interface ModuleFieldRefs {
    readonly id: FieldRef<"Module", 'String'>
    readonly name: FieldRef<"Module", 'String'>
    readonly created_at: FieldRef<"Module", 'DateTime'>
    readonly updated_at: FieldRef<"Module", 'DateTime'>
    readonly is_deleted: FieldRef<"Module", 'Boolean'>
    readonly feature_id: FieldRef<"Module", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Module findUnique
   */
  export type ModuleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }


  /**
   * Module findUniqueOrThrow
   */
  export type ModuleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where: ModuleWhereUniqueInput
  }


  /**
   * Module findFirst
   */
  export type ModuleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }


  /**
   * Module findFirstOrThrow
   */
  export type ModuleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Module to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Modules.
     */
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }


  /**
   * Module findMany
   */
  export type ModuleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter, which Modules to fetch.
     */
    where?: ModuleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Modules to fetch.
     */
    orderBy?: ModuleOrderByWithRelationInput | ModuleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Modules.
     */
    cursor?: ModuleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Modules from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Modules.
     */
    skip?: number
    distinct?: ModuleScalarFieldEnum | ModuleScalarFieldEnum[]
  }


  /**
   * Module create
   */
  export type ModuleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to create a Module.
     */
    data: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
  }


  /**
   * Module createMany
   */
  export type ModuleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Modules.
     */
    data: ModuleCreateManyInput | ModuleCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Module update
   */
  export type ModuleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The data needed to update a Module.
     */
    data: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
    /**
     * Choose, which Module to update.
     */
    where: ModuleWhereUniqueInput
  }


  /**
   * Module updateMany
   */
  export type ModuleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Modules.
     */
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyInput>
    /**
     * Filter which Modules to update
     */
    where?: ModuleWhereInput
  }


  /**
   * Module upsert
   */
  export type ModuleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * The filter to search for the Module to update in case it exists.
     */
    where: ModuleWhereUniqueInput
    /**
     * In case the Module found by the `where` argument doesn't exist, create a new Module with this data.
     */
    create: XOR<ModuleCreateInput, ModuleUncheckedCreateInput>
    /**
     * In case the Module was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ModuleUpdateInput, ModuleUncheckedUpdateInput>
  }


  /**
   * Module delete
   */
  export type ModuleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
    /**
     * Filter which Module to delete.
     */
    where: ModuleWhereUniqueInput
  }


  /**
   * Module deleteMany
   */
  export type ModuleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Modules to delete
     */
    where?: ModuleWhereInput
  }


  /**
   * Module.user_permissions
   */
  export type Module$user_permissionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserPermission
     */
    select?: UserPermissionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: UserPermissionInclude<ExtArgs> | null
    where?: UserPermissionWhereInput
    orderBy?: UserPermissionOrderByWithRelationInput | UserPermissionOrderByWithRelationInput[]
    cursor?: UserPermissionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserPermissionScalarFieldEnum | UserPermissionScalarFieldEnum[]
  }


  /**
   * Module without action
   */
  export type ModuleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Module
     */
    select?: ModuleSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: ModuleInclude<ExtArgs> | null
  }



  /**
   * Model JOApproverSetting
   */

  export type AggregateJOApproverSetting = {
    _count: JOApproverSettingCountAggregateOutputType | null
    _avg: JOApproverSettingAvgAggregateOutputType | null
    _sum: JOApproverSettingSumAggregateOutputType | null
    _min: JOApproverSettingMinAggregateOutputType | null
    _max: JOApproverSettingMaxAggregateOutputType | null
  }

  export type JOApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type JOApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type JOApproverSettingMinAggregateOutputType = {
    id: string | null
    label: string | null
    order: number | null
    approver_id: string | null
    approver_proxy_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type JOApproverSettingMaxAggregateOutputType = {
    id: string | null
    label: string | null
    order: number | null
    approver_id: string | null
    approver_proxy_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type JOApproverSettingCountAggregateOutputType = {
    id: number
    label: number
    order: number
    approver_id: number
    approver_proxy_id: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type JOApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type JOApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type JOApproverSettingMinAggregateInputType = {
    id?: true
    label?: true
    order?: true
    approver_id?: true
    approver_proxy_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type JOApproverSettingMaxAggregateInputType = {
    id?: true
    label?: true
    order?: true
    approver_id?: true
    approver_proxy_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type JOApproverSettingCountAggregateInputType = {
    id?: true
    label?: true
    order?: true
    approver_id?: true
    approver_proxy_id?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type JOApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JOApproverSetting to aggregate.
     */
    where?: JOApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JOApproverSettings to fetch.
     */
    orderBy?: JOApproverSettingOrderByWithRelationInput | JOApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: JOApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JOApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JOApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned JOApproverSettings
    **/
    _count?: true | JOApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: JOApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: JOApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: JOApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: JOApproverSettingMaxAggregateInputType
  }

  export type GetJOApproverSettingAggregateType<T extends JOApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateJOApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateJOApproverSetting[P]>
      : GetScalarType<T[P], AggregateJOApproverSetting[P]>
  }




  export type JOApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: JOApproverSettingWhereInput
    orderBy?: JOApproverSettingOrderByWithAggregationInput | JOApproverSettingOrderByWithAggregationInput[]
    by: JOApproverSettingScalarFieldEnum[] | JOApproverSettingScalarFieldEnum
    having?: JOApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: JOApproverSettingCountAggregateInputType | true
    _avg?: JOApproverSettingAvgAggregateInputType
    _sum?: JOApproverSettingSumAggregateInputType
    _min?: JOApproverSettingMinAggregateInputType
    _max?: JOApproverSettingMaxAggregateInputType
  }

  export type JOApproverSettingGroupByOutputType = {
    id: string
    label: string
    order: number
    approver_id: string
    approver_proxy_id: string | null
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: JOApproverSettingCountAggregateOutputType | null
    _avg: JOApproverSettingAvgAggregateOutputType | null
    _sum: JOApproverSettingSumAggregateOutputType | null
    _min: JOApproverSettingMinAggregateOutputType | null
    _max: JOApproverSettingMaxAggregateOutputType | null
  }

  type GetJOApproverSettingGroupByPayload<T extends JOApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<JOApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof JOApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], JOApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], JOApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type JOApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    label?: boolean
    order?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | JOApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["jOApproverSetting"]>

  export type JOApproverSettingSelectScalar = {
    id?: boolean
    label?: boolean
    order?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type JOApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | JOApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $JOApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "JOApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      label: string
      order: number
      approver_id: string
      approver_proxy_id: string | null
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["jOApproverSetting"]>
    composites: {}
  }


  type JOApproverSettingGetPayload<S extends boolean | null | undefined | JOApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$JOApproverSettingPayload, S>

  type JOApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<JOApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: JOApproverSettingCountAggregateInputType | true
    }

  export interface JOApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['JOApproverSetting'], meta: { name: 'JOApproverSetting' } }
    /**
     * Find zero or one JOApproverSetting that matches the filter.
     * @param {JOApproverSettingFindUniqueArgs} args - Arguments to find a JOApproverSetting
     * @example
     * // Get one JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends JOApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one JOApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {JOApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a JOApproverSetting
     * @example
     * // Get one JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends JOApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first JOApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingFindFirstArgs} args - Arguments to find a JOApproverSetting
     * @example
     * // Get one JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends JOApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first JOApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingFindFirstOrThrowArgs} args - Arguments to find a JOApproverSetting
     * @example
     * // Get one JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends JOApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more JOApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all JOApproverSettings
     * const jOApproverSettings = await prisma.jOApproverSetting.findMany()
     * 
     * // Get first 10 JOApproverSettings
     * const jOApproverSettings = await prisma.jOApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const jOApproverSettingWithIdOnly = await prisma.jOApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends JOApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a JOApproverSetting.
     * @param {JOApproverSettingCreateArgs} args - Arguments to create a JOApproverSetting.
     * @example
     * // Create one JOApproverSetting
     * const JOApproverSetting = await prisma.jOApproverSetting.create({
     *   data: {
     *     // ... data to create a JOApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends JOApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many JOApproverSettings.
     *     @param {JOApproverSettingCreateManyArgs} args - Arguments to create many JOApproverSettings.
     *     @example
     *     // Create many JOApproverSettings
     *     const jOApproverSetting = await prisma.jOApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends JOApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a JOApproverSetting.
     * @param {JOApproverSettingDeleteArgs} args - Arguments to delete one JOApproverSetting.
     * @example
     * // Delete one JOApproverSetting
     * const JOApproverSetting = await prisma.jOApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one JOApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends JOApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one JOApproverSetting.
     * @param {JOApproverSettingUpdateArgs} args - Arguments to update one JOApproverSetting.
     * @example
     * // Update one JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends JOApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more JOApproverSettings.
     * @param {JOApproverSettingDeleteManyArgs} args - Arguments to filter JOApproverSettings to delete.
     * @example
     * // Delete a few JOApproverSettings
     * const { count } = await prisma.jOApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends JOApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, JOApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more JOApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many JOApproverSettings
     * const jOApproverSetting = await prisma.jOApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends JOApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one JOApproverSetting.
     * @param {JOApproverSettingUpsertArgs} args - Arguments to update or create a JOApproverSetting.
     * @example
     * // Update or create a JOApproverSetting
     * const jOApproverSetting = await prisma.jOApproverSetting.upsert({
     *   create: {
     *     // ... data to create a JOApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the JOApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends JOApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, JOApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__JOApproverSettingClient<$Result.GetResult<Prisma.$JOApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of JOApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingCountArgs} args - Arguments to filter JOApproverSettings to count.
     * @example
     * // Count the number of JOApproverSettings
     * const count = await prisma.jOApproverSetting.count({
     *   where: {
     *     // ... the filter for the JOApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends JOApproverSettingCountArgs>(
      args?: Subset<T, JOApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], JOApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a JOApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends JOApproverSettingAggregateArgs>(args: Subset<T, JOApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetJOApproverSettingAggregateType<T>>

    /**
     * Group by JOApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {JOApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends JOApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: JOApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: JOApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, JOApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetJOApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the JOApproverSetting model
   */
  readonly fields: JOApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for JOApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__JOApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends JOApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, JOApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the JOApproverSetting model
   */ 
  interface JOApproverSettingFieldRefs {
    readonly id: FieldRef<"JOApproverSetting", 'String'>
    readonly label: FieldRef<"JOApproverSetting", 'String'>
    readonly order: FieldRef<"JOApproverSetting", 'Int'>
    readonly approver_id: FieldRef<"JOApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"JOApproverSetting", 'String'>
    readonly created_at: FieldRef<"JOApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"JOApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"JOApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * JOApproverSetting findUnique
   */
  export type JOApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which JOApproverSetting to fetch.
     */
    where: JOApproverSettingWhereUniqueInput
  }


  /**
   * JOApproverSetting findUniqueOrThrow
   */
  export type JOApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which JOApproverSetting to fetch.
     */
    where: JOApproverSettingWhereUniqueInput
  }


  /**
   * JOApproverSetting findFirst
   */
  export type JOApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which JOApproverSetting to fetch.
     */
    where?: JOApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JOApproverSettings to fetch.
     */
    orderBy?: JOApproverSettingOrderByWithRelationInput | JOApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JOApproverSettings.
     */
    cursor?: JOApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JOApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JOApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JOApproverSettings.
     */
    distinct?: JOApproverSettingScalarFieldEnum | JOApproverSettingScalarFieldEnum[]
  }


  /**
   * JOApproverSetting findFirstOrThrow
   */
  export type JOApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which JOApproverSetting to fetch.
     */
    where?: JOApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JOApproverSettings to fetch.
     */
    orderBy?: JOApproverSettingOrderByWithRelationInput | JOApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for JOApproverSettings.
     */
    cursor?: JOApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JOApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JOApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of JOApproverSettings.
     */
    distinct?: JOApproverSettingScalarFieldEnum | JOApproverSettingScalarFieldEnum[]
  }


  /**
   * JOApproverSetting findMany
   */
  export type JOApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which JOApproverSettings to fetch.
     */
    where?: JOApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of JOApproverSettings to fetch.
     */
    orderBy?: JOApproverSettingOrderByWithRelationInput | JOApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing JOApproverSettings.
     */
    cursor?: JOApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` JOApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` JOApproverSettings.
     */
    skip?: number
    distinct?: JOApproverSettingScalarFieldEnum | JOApproverSettingScalarFieldEnum[]
  }


  /**
   * JOApproverSetting create
   */
  export type JOApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a JOApproverSetting.
     */
    data: XOR<JOApproverSettingCreateInput, JOApproverSettingUncheckedCreateInput>
  }


  /**
   * JOApproverSetting createMany
   */
  export type JOApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many JOApproverSettings.
     */
    data: JOApproverSettingCreateManyInput | JOApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * JOApproverSetting update
   */
  export type JOApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a JOApproverSetting.
     */
    data: XOR<JOApproverSettingUpdateInput, JOApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which JOApproverSetting to update.
     */
    where: JOApproverSettingWhereUniqueInput
  }


  /**
   * JOApproverSetting updateMany
   */
  export type JOApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update JOApproverSettings.
     */
    data: XOR<JOApproverSettingUpdateManyMutationInput, JOApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which JOApproverSettings to update
     */
    where?: JOApproverSettingWhereInput
  }


  /**
   * JOApproverSetting upsert
   */
  export type JOApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the JOApproverSetting to update in case it exists.
     */
    where: JOApproverSettingWhereUniqueInput
    /**
     * In case the JOApproverSetting found by the `where` argument doesn't exist, create a new JOApproverSetting with this data.
     */
    create: XOR<JOApproverSettingCreateInput, JOApproverSettingUncheckedCreateInput>
    /**
     * In case the JOApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<JOApproverSettingUpdateInput, JOApproverSettingUncheckedUpdateInput>
  }


  /**
   * JOApproverSetting delete
   */
  export type JOApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which JOApproverSetting to delete.
     */
    where: JOApproverSettingWhereUniqueInput
  }


  /**
   * JOApproverSetting deleteMany
   */
  export type JOApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which JOApproverSettings to delete
     */
    where?: JOApproverSettingWhereInput
  }


  /**
   * JOApproverSetting.approver_proxy
   */
  export type JOApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * JOApproverSetting without action
   */
  export type JOApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the JOApproverSetting
     */
    select?: JOApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: JOApproverSettingInclude<ExtArgs> | null
  }



  /**
   * Model RVApproverSetting
   */

  export type AggregateRVApproverSetting = {
    _count: RVApproverSettingCountAggregateOutputType | null
    _avg: RVApproverSettingAvgAggregateOutputType | null
    _sum: RVApproverSettingSumAggregateOutputType | null
    _min: RVApproverSettingMinAggregateOutputType | null
    _max: RVApproverSettingMaxAggregateOutputType | null
  }

  export type RVApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type RVApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type RVApproverSettingMinAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type RVApproverSettingMaxAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type RVApproverSettingCountAggregateOutputType = {
    id: number
    approver_id: number
    approver_proxy_id: number
    label: number
    order: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type RVApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type RVApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type RVApproverSettingMinAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type RVApproverSettingMaxAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type RVApproverSettingCountAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type RVApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RVApproverSetting to aggregate.
     */
    where?: RVApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RVApproverSettings to fetch.
     */
    orderBy?: RVApproverSettingOrderByWithRelationInput | RVApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RVApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RVApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RVApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RVApproverSettings
    **/
    _count?: true | RVApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RVApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RVApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RVApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RVApproverSettingMaxAggregateInputType
  }

  export type GetRVApproverSettingAggregateType<T extends RVApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateRVApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRVApproverSetting[P]>
      : GetScalarType<T[P], AggregateRVApproverSetting[P]>
  }




  export type RVApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RVApproverSettingWhereInput
    orderBy?: RVApproverSettingOrderByWithAggregationInput | RVApproverSettingOrderByWithAggregationInput[]
    by: RVApproverSettingScalarFieldEnum[] | RVApproverSettingScalarFieldEnum
    having?: RVApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RVApproverSettingCountAggregateInputType | true
    _avg?: RVApproverSettingAvgAggregateInputType
    _sum?: RVApproverSettingSumAggregateInputType
    _min?: RVApproverSettingMinAggregateInputType
    _max?: RVApproverSettingMaxAggregateInputType
  }

  export type RVApproverSettingGroupByOutputType = {
    id: string
    approver_id: string
    approver_proxy_id: string | null
    label: string
    order: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: RVApproverSettingCountAggregateOutputType | null
    _avg: RVApproverSettingAvgAggregateOutputType | null
    _sum: RVApproverSettingSumAggregateOutputType | null
    _min: RVApproverSettingMinAggregateOutputType | null
    _max: RVApproverSettingMaxAggregateOutputType | null
  }

  type GetRVApproverSettingGroupByPayload<T extends RVApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RVApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RVApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RVApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], RVApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type RVApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | RVApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["rVApproverSetting"]>

  export type RVApproverSettingSelectScalar = {
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type RVApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | RVApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $RVApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RVApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approver_id: string
      approver_proxy_id: string | null
      label: string
      order: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["rVApproverSetting"]>
    composites: {}
  }


  type RVApproverSettingGetPayload<S extends boolean | null | undefined | RVApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$RVApproverSettingPayload, S>

  type RVApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RVApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RVApproverSettingCountAggregateInputType | true
    }

  export interface RVApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RVApproverSetting'], meta: { name: 'RVApproverSetting' } }
    /**
     * Find zero or one RVApproverSetting that matches the filter.
     * @param {RVApproverSettingFindUniqueArgs} args - Arguments to find a RVApproverSetting
     * @example
     * // Get one RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RVApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RVApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RVApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a RVApproverSetting
     * @example
     * // Get one RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RVApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RVApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingFindFirstArgs} args - Arguments to find a RVApproverSetting
     * @example
     * // Get one RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RVApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RVApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingFindFirstOrThrowArgs} args - Arguments to find a RVApproverSetting
     * @example
     * // Get one RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RVApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RVApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RVApproverSettings
     * const rVApproverSettings = await prisma.rVApproverSetting.findMany()
     * 
     * // Get first 10 RVApproverSettings
     * const rVApproverSettings = await prisma.rVApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rVApproverSettingWithIdOnly = await prisma.rVApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RVApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RVApproverSetting.
     * @param {RVApproverSettingCreateArgs} args - Arguments to create a RVApproverSetting.
     * @example
     * // Create one RVApproverSetting
     * const RVApproverSetting = await prisma.rVApproverSetting.create({
     *   data: {
     *     // ... data to create a RVApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends RVApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many RVApproverSettings.
     *     @param {RVApproverSettingCreateManyArgs} args - Arguments to create many RVApproverSettings.
     *     @example
     *     // Create many RVApproverSettings
     *     const rVApproverSetting = await prisma.rVApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RVApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RVApproverSetting.
     * @param {RVApproverSettingDeleteArgs} args - Arguments to delete one RVApproverSetting.
     * @example
     * // Delete one RVApproverSetting
     * const RVApproverSetting = await prisma.rVApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one RVApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends RVApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RVApproverSetting.
     * @param {RVApproverSettingUpdateArgs} args - Arguments to update one RVApproverSetting.
     * @example
     * // Update one RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RVApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RVApproverSettings.
     * @param {RVApproverSettingDeleteManyArgs} args - Arguments to filter RVApproverSettings to delete.
     * @example
     * // Delete a few RVApproverSettings
     * const { count } = await prisma.rVApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RVApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RVApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RVApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RVApproverSettings
     * const rVApproverSetting = await prisma.rVApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RVApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RVApproverSetting.
     * @param {RVApproverSettingUpsertArgs} args - Arguments to update or create a RVApproverSetting.
     * @example
     * // Update or create a RVApproverSetting
     * const rVApproverSetting = await prisma.rVApproverSetting.upsert({
     *   create: {
     *     // ... data to create a RVApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RVApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends RVApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RVApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__RVApproverSettingClient<$Result.GetResult<Prisma.$RVApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RVApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingCountArgs} args - Arguments to filter RVApproverSettings to count.
     * @example
     * // Count the number of RVApproverSettings
     * const count = await prisma.rVApproverSetting.count({
     *   where: {
     *     // ... the filter for the RVApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends RVApproverSettingCountArgs>(
      args?: Subset<T, RVApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RVApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RVApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RVApproverSettingAggregateArgs>(args: Subset<T, RVApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetRVApproverSettingAggregateType<T>>

    /**
     * Group by RVApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RVApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends RVApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RVApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: RVApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RVApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRVApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RVApproverSetting model
   */
  readonly fields: RVApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RVApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RVApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends RVApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, RVApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RVApproverSetting model
   */ 
  interface RVApproverSettingFieldRefs {
    readonly id: FieldRef<"RVApproverSetting", 'String'>
    readonly approver_id: FieldRef<"RVApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"RVApproverSetting", 'String'>
    readonly label: FieldRef<"RVApproverSetting", 'String'>
    readonly order: FieldRef<"RVApproverSetting", 'Int'>
    readonly created_at: FieldRef<"RVApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"RVApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"RVApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * RVApproverSetting findUnique
   */
  export type RVApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RVApproverSetting to fetch.
     */
    where: RVApproverSettingWhereUniqueInput
  }


  /**
   * RVApproverSetting findUniqueOrThrow
   */
  export type RVApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RVApproverSetting to fetch.
     */
    where: RVApproverSettingWhereUniqueInput
  }


  /**
   * RVApproverSetting findFirst
   */
  export type RVApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RVApproverSetting to fetch.
     */
    where?: RVApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RVApproverSettings to fetch.
     */
    orderBy?: RVApproverSettingOrderByWithRelationInput | RVApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RVApproverSettings.
     */
    cursor?: RVApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RVApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RVApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RVApproverSettings.
     */
    distinct?: RVApproverSettingScalarFieldEnum | RVApproverSettingScalarFieldEnum[]
  }


  /**
   * RVApproverSetting findFirstOrThrow
   */
  export type RVApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RVApproverSetting to fetch.
     */
    where?: RVApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RVApproverSettings to fetch.
     */
    orderBy?: RVApproverSettingOrderByWithRelationInput | RVApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RVApproverSettings.
     */
    cursor?: RVApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RVApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RVApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RVApproverSettings.
     */
    distinct?: RVApproverSettingScalarFieldEnum | RVApproverSettingScalarFieldEnum[]
  }


  /**
   * RVApproverSetting findMany
   */
  export type RVApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RVApproverSettings to fetch.
     */
    where?: RVApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RVApproverSettings to fetch.
     */
    orderBy?: RVApproverSettingOrderByWithRelationInput | RVApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RVApproverSettings.
     */
    cursor?: RVApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RVApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RVApproverSettings.
     */
    skip?: number
    distinct?: RVApproverSettingScalarFieldEnum | RVApproverSettingScalarFieldEnum[]
  }


  /**
   * RVApproverSetting create
   */
  export type RVApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a RVApproverSetting.
     */
    data: XOR<RVApproverSettingCreateInput, RVApproverSettingUncheckedCreateInput>
  }


  /**
   * RVApproverSetting createMany
   */
  export type RVApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RVApproverSettings.
     */
    data: RVApproverSettingCreateManyInput | RVApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * RVApproverSetting update
   */
  export type RVApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a RVApproverSetting.
     */
    data: XOR<RVApproverSettingUpdateInput, RVApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which RVApproverSetting to update.
     */
    where: RVApproverSettingWhereUniqueInput
  }


  /**
   * RVApproverSetting updateMany
   */
  export type RVApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RVApproverSettings.
     */
    data: XOR<RVApproverSettingUpdateManyMutationInput, RVApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which RVApproverSettings to update
     */
    where?: RVApproverSettingWhereInput
  }


  /**
   * RVApproverSetting upsert
   */
  export type RVApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the RVApproverSetting to update in case it exists.
     */
    where: RVApproverSettingWhereUniqueInput
    /**
     * In case the RVApproverSetting found by the `where` argument doesn't exist, create a new RVApproverSetting with this data.
     */
    create: XOR<RVApproverSettingCreateInput, RVApproverSettingUncheckedCreateInput>
    /**
     * In case the RVApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RVApproverSettingUpdateInput, RVApproverSettingUncheckedUpdateInput>
  }


  /**
   * RVApproverSetting delete
   */
  export type RVApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which RVApproverSetting to delete.
     */
    where: RVApproverSettingWhereUniqueInput
  }


  /**
   * RVApproverSetting deleteMany
   */
  export type RVApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RVApproverSettings to delete
     */
    where?: RVApproverSettingWhereInput
  }


  /**
   * RVApproverSetting.approver_proxy
   */
  export type RVApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * RVApproverSetting without action
   */
  export type RVApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RVApproverSetting
     */
    select?: RVApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RVApproverSettingInclude<ExtArgs> | null
  }



  /**
   * Model SPRApproverSetting
   */

  export type AggregateSPRApproverSetting = {
    _count: SPRApproverSettingCountAggregateOutputType | null
    _avg: SPRApproverSettingAvgAggregateOutputType | null
    _sum: SPRApproverSettingSumAggregateOutputType | null
    _min: SPRApproverSettingMinAggregateOutputType | null
    _max: SPRApproverSettingMaxAggregateOutputType | null
  }

  export type SPRApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type SPRApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type SPRApproverSettingMinAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type SPRApproverSettingMaxAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type SPRApproverSettingCountAggregateOutputType = {
    id: number
    approver_id: number
    approver_proxy_id: number
    label: number
    order: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type SPRApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type SPRApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type SPRApproverSettingMinAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type SPRApproverSettingMaxAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type SPRApproverSettingCountAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type SPRApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SPRApproverSetting to aggregate.
     */
    where?: SPRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPRApproverSettings to fetch.
     */
    orderBy?: SPRApproverSettingOrderByWithRelationInput | SPRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SPRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SPRApproverSettings
    **/
    _count?: true | SPRApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SPRApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SPRApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SPRApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SPRApproverSettingMaxAggregateInputType
  }

  export type GetSPRApproverSettingAggregateType<T extends SPRApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateSPRApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSPRApproverSetting[P]>
      : GetScalarType<T[P], AggregateSPRApproverSetting[P]>
  }




  export type SPRApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SPRApproverSettingWhereInput
    orderBy?: SPRApproverSettingOrderByWithAggregationInput | SPRApproverSettingOrderByWithAggregationInput[]
    by: SPRApproverSettingScalarFieldEnum[] | SPRApproverSettingScalarFieldEnum
    having?: SPRApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SPRApproverSettingCountAggregateInputType | true
    _avg?: SPRApproverSettingAvgAggregateInputType
    _sum?: SPRApproverSettingSumAggregateInputType
    _min?: SPRApproverSettingMinAggregateInputType
    _max?: SPRApproverSettingMaxAggregateInputType
  }

  export type SPRApproverSettingGroupByOutputType = {
    id: string
    approver_id: string
    approver_proxy_id: string | null
    label: string
    order: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: SPRApproverSettingCountAggregateOutputType | null
    _avg: SPRApproverSettingAvgAggregateOutputType | null
    _sum: SPRApproverSettingSumAggregateOutputType | null
    _min: SPRApproverSettingMinAggregateOutputType | null
    _max: SPRApproverSettingMaxAggregateOutputType | null
  }

  type GetSPRApproverSettingGroupByPayload<T extends SPRApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SPRApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SPRApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SPRApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], SPRApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type SPRApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | SPRApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["sPRApproverSetting"]>

  export type SPRApproverSettingSelectScalar = {
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type SPRApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | SPRApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $SPRApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SPRApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approver_id: string
      approver_proxy_id: string | null
      label: string
      order: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["sPRApproverSetting"]>
    composites: {}
  }


  type SPRApproverSettingGetPayload<S extends boolean | null | undefined | SPRApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$SPRApproverSettingPayload, S>

  type SPRApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<SPRApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: SPRApproverSettingCountAggregateInputType | true
    }

  export interface SPRApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SPRApproverSetting'], meta: { name: 'SPRApproverSetting' } }
    /**
     * Find zero or one SPRApproverSetting that matches the filter.
     * @param {SPRApproverSettingFindUniqueArgs} args - Arguments to find a SPRApproverSetting
     * @example
     * // Get one SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SPRApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SPRApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SPRApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a SPRApproverSetting
     * @example
     * // Get one SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SPRApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SPRApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingFindFirstArgs} args - Arguments to find a SPRApproverSetting
     * @example
     * // Get one SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SPRApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SPRApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingFindFirstOrThrowArgs} args - Arguments to find a SPRApproverSetting
     * @example
     * // Get one SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SPRApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SPRApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SPRApproverSettings
     * const sPRApproverSettings = await prisma.sPRApproverSetting.findMany()
     * 
     * // Get first 10 SPRApproverSettings
     * const sPRApproverSettings = await prisma.sPRApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sPRApproverSettingWithIdOnly = await prisma.sPRApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SPRApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SPRApproverSetting.
     * @param {SPRApproverSettingCreateArgs} args - Arguments to create a SPRApproverSetting.
     * @example
     * // Create one SPRApproverSetting
     * const SPRApproverSetting = await prisma.sPRApproverSetting.create({
     *   data: {
     *     // ... data to create a SPRApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends SPRApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SPRApproverSettings.
     *     @param {SPRApproverSettingCreateManyArgs} args - Arguments to create many SPRApproverSettings.
     *     @example
     *     // Create many SPRApproverSettings
     *     const sPRApproverSetting = await prisma.sPRApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SPRApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SPRApproverSetting.
     * @param {SPRApproverSettingDeleteArgs} args - Arguments to delete one SPRApproverSetting.
     * @example
     * // Delete one SPRApproverSetting
     * const SPRApproverSetting = await prisma.sPRApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one SPRApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends SPRApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SPRApproverSetting.
     * @param {SPRApproverSettingUpdateArgs} args - Arguments to update one SPRApproverSetting.
     * @example
     * // Update one SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SPRApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SPRApproverSettings.
     * @param {SPRApproverSettingDeleteManyArgs} args - Arguments to filter SPRApproverSettings to delete.
     * @example
     * // Delete a few SPRApproverSettings
     * const { count } = await prisma.sPRApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SPRApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SPRApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SPRApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SPRApproverSettings
     * const sPRApproverSetting = await prisma.sPRApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SPRApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SPRApproverSetting.
     * @param {SPRApproverSettingUpsertArgs} args - Arguments to update or create a SPRApproverSetting.
     * @example
     * // Update or create a SPRApproverSetting
     * const sPRApproverSetting = await prisma.sPRApproverSetting.upsert({
     *   create: {
     *     // ... data to create a SPRApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SPRApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends SPRApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SPRApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__SPRApproverSettingClient<$Result.GetResult<Prisma.$SPRApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SPRApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingCountArgs} args - Arguments to filter SPRApproverSettings to count.
     * @example
     * // Count the number of SPRApproverSettings
     * const count = await prisma.sPRApproverSetting.count({
     *   where: {
     *     // ... the filter for the SPRApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends SPRApproverSettingCountArgs>(
      args?: Subset<T, SPRApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SPRApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SPRApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SPRApproverSettingAggregateArgs>(args: Subset<T, SPRApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetSPRApproverSettingAggregateType<T>>

    /**
     * Group by SPRApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SPRApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends SPRApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SPRApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: SPRApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, SPRApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSPRApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SPRApproverSetting model
   */
  readonly fields: SPRApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SPRApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SPRApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends SPRApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, SPRApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the SPRApproverSetting model
   */ 
  interface SPRApproverSettingFieldRefs {
    readonly id: FieldRef<"SPRApproverSetting", 'String'>
    readonly approver_id: FieldRef<"SPRApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"SPRApproverSetting", 'String'>
    readonly label: FieldRef<"SPRApproverSetting", 'String'>
    readonly order: FieldRef<"SPRApproverSetting", 'Int'>
    readonly created_at: FieldRef<"SPRApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"SPRApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"SPRApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * SPRApproverSetting findUnique
   */
  export type SPRApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which SPRApproverSetting to fetch.
     */
    where: SPRApproverSettingWhereUniqueInput
  }


  /**
   * SPRApproverSetting findUniqueOrThrow
   */
  export type SPRApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which SPRApproverSetting to fetch.
     */
    where: SPRApproverSettingWhereUniqueInput
  }


  /**
   * SPRApproverSetting findFirst
   */
  export type SPRApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which SPRApproverSetting to fetch.
     */
    where?: SPRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPRApproverSettings to fetch.
     */
    orderBy?: SPRApproverSettingOrderByWithRelationInput | SPRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SPRApproverSettings.
     */
    cursor?: SPRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SPRApproverSettings.
     */
    distinct?: SPRApproverSettingScalarFieldEnum | SPRApproverSettingScalarFieldEnum[]
  }


  /**
   * SPRApproverSetting findFirstOrThrow
   */
  export type SPRApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which SPRApproverSetting to fetch.
     */
    where?: SPRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPRApproverSettings to fetch.
     */
    orderBy?: SPRApproverSettingOrderByWithRelationInput | SPRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SPRApproverSettings.
     */
    cursor?: SPRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SPRApproverSettings.
     */
    distinct?: SPRApproverSettingScalarFieldEnum | SPRApproverSettingScalarFieldEnum[]
  }


  /**
   * SPRApproverSetting findMany
   */
  export type SPRApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which SPRApproverSettings to fetch.
     */
    where?: SPRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SPRApproverSettings to fetch.
     */
    orderBy?: SPRApproverSettingOrderByWithRelationInput | SPRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SPRApproverSettings.
     */
    cursor?: SPRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SPRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SPRApproverSettings.
     */
    skip?: number
    distinct?: SPRApproverSettingScalarFieldEnum | SPRApproverSettingScalarFieldEnum[]
  }


  /**
   * SPRApproverSetting create
   */
  export type SPRApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a SPRApproverSetting.
     */
    data: XOR<SPRApproverSettingCreateInput, SPRApproverSettingUncheckedCreateInput>
  }


  /**
   * SPRApproverSetting createMany
   */
  export type SPRApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SPRApproverSettings.
     */
    data: SPRApproverSettingCreateManyInput | SPRApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * SPRApproverSetting update
   */
  export type SPRApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a SPRApproverSetting.
     */
    data: XOR<SPRApproverSettingUpdateInput, SPRApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which SPRApproverSetting to update.
     */
    where: SPRApproverSettingWhereUniqueInput
  }


  /**
   * SPRApproverSetting updateMany
   */
  export type SPRApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SPRApproverSettings.
     */
    data: XOR<SPRApproverSettingUpdateManyMutationInput, SPRApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which SPRApproverSettings to update
     */
    where?: SPRApproverSettingWhereInput
  }


  /**
   * SPRApproverSetting upsert
   */
  export type SPRApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the SPRApproverSetting to update in case it exists.
     */
    where: SPRApproverSettingWhereUniqueInput
    /**
     * In case the SPRApproverSetting found by the `where` argument doesn't exist, create a new SPRApproverSetting with this data.
     */
    create: XOR<SPRApproverSettingCreateInput, SPRApproverSettingUncheckedCreateInput>
    /**
     * In case the SPRApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SPRApproverSettingUpdateInput, SPRApproverSettingUncheckedUpdateInput>
  }


  /**
   * SPRApproverSetting delete
   */
  export type SPRApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which SPRApproverSetting to delete.
     */
    where: SPRApproverSettingWhereUniqueInput
  }


  /**
   * SPRApproverSetting deleteMany
   */
  export type SPRApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SPRApproverSettings to delete
     */
    where?: SPRApproverSettingWhereInput
  }


  /**
   * SPRApproverSetting.approver_proxy
   */
  export type SPRApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * SPRApproverSetting without action
   */
  export type SPRApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SPRApproverSetting
     */
    select?: SPRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SPRApproverSettingInclude<ExtArgs> | null
  }



  /**
   * Model MEQSApproverSetting
   */

  export type AggregateMEQSApproverSetting = {
    _count: MEQSApproverSettingCountAggregateOutputType | null
    _avg: MEQSApproverSettingAvgAggregateOutputType | null
    _sum: MEQSApproverSettingSumAggregateOutputType | null
    _min: MEQSApproverSettingMinAggregateOutputType | null
    _max: MEQSApproverSettingMaxAggregateOutputType | null
  }

  export type MEQSApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type MEQSApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type MEQSApproverSettingMinAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type MEQSApproverSettingMaxAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type MEQSApproverSettingCountAggregateOutputType = {
    id: number
    approver_id: number
    approver_proxy_id: number
    label: number
    order: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type MEQSApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type MEQSApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type MEQSApproverSettingMinAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type MEQSApproverSettingMaxAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type MEQSApproverSettingCountAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type MEQSApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MEQSApproverSetting to aggregate.
     */
    where?: MEQSApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MEQSApproverSettings to fetch.
     */
    orderBy?: MEQSApproverSettingOrderByWithRelationInput | MEQSApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MEQSApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MEQSApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MEQSApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MEQSApproverSettings
    **/
    _count?: true | MEQSApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MEQSApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MEQSApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MEQSApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MEQSApproverSettingMaxAggregateInputType
  }

  export type GetMEQSApproverSettingAggregateType<T extends MEQSApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateMEQSApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMEQSApproverSetting[P]>
      : GetScalarType<T[P], AggregateMEQSApproverSetting[P]>
  }




  export type MEQSApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MEQSApproverSettingWhereInput
    orderBy?: MEQSApproverSettingOrderByWithAggregationInput | MEQSApproverSettingOrderByWithAggregationInput[]
    by: MEQSApproverSettingScalarFieldEnum[] | MEQSApproverSettingScalarFieldEnum
    having?: MEQSApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MEQSApproverSettingCountAggregateInputType | true
    _avg?: MEQSApproverSettingAvgAggregateInputType
    _sum?: MEQSApproverSettingSumAggregateInputType
    _min?: MEQSApproverSettingMinAggregateInputType
    _max?: MEQSApproverSettingMaxAggregateInputType
  }

  export type MEQSApproverSettingGroupByOutputType = {
    id: string
    approver_id: string
    approver_proxy_id: string | null
    label: string
    order: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: MEQSApproverSettingCountAggregateOutputType | null
    _avg: MEQSApproverSettingAvgAggregateOutputType | null
    _sum: MEQSApproverSettingSumAggregateOutputType | null
    _min: MEQSApproverSettingMinAggregateOutputType | null
    _max: MEQSApproverSettingMaxAggregateOutputType | null
  }

  type GetMEQSApproverSettingGroupByPayload<T extends MEQSApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MEQSApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MEQSApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MEQSApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], MEQSApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type MEQSApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | MEQSApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["mEQSApproverSetting"]>

  export type MEQSApproverSettingSelectScalar = {
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type MEQSApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | MEQSApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $MEQSApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MEQSApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approver_id: string
      approver_proxy_id: string | null
      label: string
      order: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["mEQSApproverSetting"]>
    composites: {}
  }


  type MEQSApproverSettingGetPayload<S extends boolean | null | undefined | MEQSApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$MEQSApproverSettingPayload, S>

  type MEQSApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<MEQSApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: MEQSApproverSettingCountAggregateInputType | true
    }

  export interface MEQSApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MEQSApproverSetting'], meta: { name: 'MEQSApproverSetting' } }
    /**
     * Find zero or one MEQSApproverSetting that matches the filter.
     * @param {MEQSApproverSettingFindUniqueArgs} args - Arguments to find a MEQSApproverSetting
     * @example
     * // Get one MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends MEQSApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one MEQSApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {MEQSApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a MEQSApproverSetting
     * @example
     * // Get one MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends MEQSApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first MEQSApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingFindFirstArgs} args - Arguments to find a MEQSApproverSetting
     * @example
     * // Get one MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends MEQSApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first MEQSApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingFindFirstOrThrowArgs} args - Arguments to find a MEQSApproverSetting
     * @example
     * // Get one MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends MEQSApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more MEQSApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MEQSApproverSettings
     * const mEQSApproverSettings = await prisma.mEQSApproverSetting.findMany()
     * 
     * // Get first 10 MEQSApproverSettings
     * const mEQSApproverSettings = await prisma.mEQSApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mEQSApproverSettingWithIdOnly = await prisma.mEQSApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends MEQSApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a MEQSApproverSetting.
     * @param {MEQSApproverSettingCreateArgs} args - Arguments to create a MEQSApproverSetting.
     * @example
     * // Create one MEQSApproverSetting
     * const MEQSApproverSetting = await prisma.mEQSApproverSetting.create({
     *   data: {
     *     // ... data to create a MEQSApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends MEQSApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many MEQSApproverSettings.
     *     @param {MEQSApproverSettingCreateManyArgs} args - Arguments to create many MEQSApproverSettings.
     *     @example
     *     // Create many MEQSApproverSettings
     *     const mEQSApproverSetting = await prisma.mEQSApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends MEQSApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a MEQSApproverSetting.
     * @param {MEQSApproverSettingDeleteArgs} args - Arguments to delete one MEQSApproverSetting.
     * @example
     * // Delete one MEQSApproverSetting
     * const MEQSApproverSetting = await prisma.mEQSApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one MEQSApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends MEQSApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one MEQSApproverSetting.
     * @param {MEQSApproverSettingUpdateArgs} args - Arguments to update one MEQSApproverSetting.
     * @example
     * // Update one MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends MEQSApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more MEQSApproverSettings.
     * @param {MEQSApproverSettingDeleteManyArgs} args - Arguments to filter MEQSApproverSettings to delete.
     * @example
     * // Delete a few MEQSApproverSettings
     * const { count } = await prisma.mEQSApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends MEQSApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, MEQSApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MEQSApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MEQSApproverSettings
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends MEQSApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one MEQSApproverSetting.
     * @param {MEQSApproverSettingUpsertArgs} args - Arguments to update or create a MEQSApproverSetting.
     * @example
     * // Update or create a MEQSApproverSetting
     * const mEQSApproverSetting = await prisma.mEQSApproverSetting.upsert({
     *   create: {
     *     // ... data to create a MEQSApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MEQSApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends MEQSApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, MEQSApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__MEQSApproverSettingClient<$Result.GetResult<Prisma.$MEQSApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of MEQSApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingCountArgs} args - Arguments to filter MEQSApproverSettings to count.
     * @example
     * // Count the number of MEQSApproverSettings
     * const count = await prisma.mEQSApproverSetting.count({
     *   where: {
     *     // ... the filter for the MEQSApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends MEQSApproverSettingCountArgs>(
      args?: Subset<T, MEQSApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MEQSApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MEQSApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MEQSApproverSettingAggregateArgs>(args: Subset<T, MEQSApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetMEQSApproverSettingAggregateType<T>>

    /**
     * Group by MEQSApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MEQSApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends MEQSApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MEQSApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: MEQSApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MEQSApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMEQSApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MEQSApproverSetting model
   */
  readonly fields: MEQSApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MEQSApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MEQSApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends MEQSApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, MEQSApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the MEQSApproverSetting model
   */ 
  interface MEQSApproverSettingFieldRefs {
    readonly id: FieldRef<"MEQSApproverSetting", 'String'>
    readonly approver_id: FieldRef<"MEQSApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"MEQSApproverSetting", 'String'>
    readonly label: FieldRef<"MEQSApproverSetting", 'String'>
    readonly order: FieldRef<"MEQSApproverSetting", 'Int'>
    readonly created_at: FieldRef<"MEQSApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"MEQSApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"MEQSApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * MEQSApproverSetting findUnique
   */
  export type MEQSApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which MEQSApproverSetting to fetch.
     */
    where: MEQSApproverSettingWhereUniqueInput
  }


  /**
   * MEQSApproverSetting findUniqueOrThrow
   */
  export type MEQSApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which MEQSApproverSetting to fetch.
     */
    where: MEQSApproverSettingWhereUniqueInput
  }


  /**
   * MEQSApproverSetting findFirst
   */
  export type MEQSApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which MEQSApproverSetting to fetch.
     */
    where?: MEQSApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MEQSApproverSettings to fetch.
     */
    orderBy?: MEQSApproverSettingOrderByWithRelationInput | MEQSApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MEQSApproverSettings.
     */
    cursor?: MEQSApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MEQSApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MEQSApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MEQSApproverSettings.
     */
    distinct?: MEQSApproverSettingScalarFieldEnum | MEQSApproverSettingScalarFieldEnum[]
  }


  /**
   * MEQSApproverSetting findFirstOrThrow
   */
  export type MEQSApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which MEQSApproverSetting to fetch.
     */
    where?: MEQSApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MEQSApproverSettings to fetch.
     */
    orderBy?: MEQSApproverSettingOrderByWithRelationInput | MEQSApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MEQSApproverSettings.
     */
    cursor?: MEQSApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MEQSApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MEQSApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MEQSApproverSettings.
     */
    distinct?: MEQSApproverSettingScalarFieldEnum | MEQSApproverSettingScalarFieldEnum[]
  }


  /**
   * MEQSApproverSetting findMany
   */
  export type MEQSApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which MEQSApproverSettings to fetch.
     */
    where?: MEQSApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MEQSApproverSettings to fetch.
     */
    orderBy?: MEQSApproverSettingOrderByWithRelationInput | MEQSApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MEQSApproverSettings.
     */
    cursor?: MEQSApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MEQSApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MEQSApproverSettings.
     */
    skip?: number
    distinct?: MEQSApproverSettingScalarFieldEnum | MEQSApproverSettingScalarFieldEnum[]
  }


  /**
   * MEQSApproverSetting create
   */
  export type MEQSApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a MEQSApproverSetting.
     */
    data: XOR<MEQSApproverSettingCreateInput, MEQSApproverSettingUncheckedCreateInput>
  }


  /**
   * MEQSApproverSetting createMany
   */
  export type MEQSApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MEQSApproverSettings.
     */
    data: MEQSApproverSettingCreateManyInput | MEQSApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * MEQSApproverSetting update
   */
  export type MEQSApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a MEQSApproverSetting.
     */
    data: XOR<MEQSApproverSettingUpdateInput, MEQSApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which MEQSApproverSetting to update.
     */
    where: MEQSApproverSettingWhereUniqueInput
  }


  /**
   * MEQSApproverSetting updateMany
   */
  export type MEQSApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MEQSApproverSettings.
     */
    data: XOR<MEQSApproverSettingUpdateManyMutationInput, MEQSApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which MEQSApproverSettings to update
     */
    where?: MEQSApproverSettingWhereInput
  }


  /**
   * MEQSApproverSetting upsert
   */
  export type MEQSApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the MEQSApproverSetting to update in case it exists.
     */
    where: MEQSApproverSettingWhereUniqueInput
    /**
     * In case the MEQSApproverSetting found by the `where` argument doesn't exist, create a new MEQSApproverSetting with this data.
     */
    create: XOR<MEQSApproverSettingCreateInput, MEQSApproverSettingUncheckedCreateInput>
    /**
     * In case the MEQSApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MEQSApproverSettingUpdateInput, MEQSApproverSettingUncheckedUpdateInput>
  }


  /**
   * MEQSApproverSetting delete
   */
  export type MEQSApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which MEQSApproverSetting to delete.
     */
    where: MEQSApproverSettingWhereUniqueInput
  }


  /**
   * MEQSApproverSetting deleteMany
   */
  export type MEQSApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MEQSApproverSettings to delete
     */
    where?: MEQSApproverSettingWhereInput
  }


  /**
   * MEQSApproverSetting.approver_proxy
   */
  export type MEQSApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * MEQSApproverSetting without action
   */
  export type MEQSApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MEQSApproverSetting
     */
    select?: MEQSApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: MEQSApproverSettingInclude<ExtArgs> | null
  }



  /**
   * Model POApproverSetting
   */

  export type AggregatePOApproverSetting = {
    _count: POApproverSettingCountAggregateOutputType | null
    _avg: POApproverSettingAvgAggregateOutputType | null
    _sum: POApproverSettingSumAggregateOutputType | null
    _min: POApproverSettingMinAggregateOutputType | null
    _max: POApproverSettingMaxAggregateOutputType | null
  }

  export type POApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type POApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type POApproverSettingMinAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type POApproverSettingMaxAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type POApproverSettingCountAggregateOutputType = {
    id: number
    approver_id: number
    approver_proxy_id: number
    label: number
    order: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type POApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type POApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type POApproverSettingMinAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type POApproverSettingMaxAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type POApproverSettingCountAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type POApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which POApproverSetting to aggregate.
     */
    where?: POApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of POApproverSettings to fetch.
     */
    orderBy?: POApproverSettingOrderByWithRelationInput | POApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: POApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` POApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` POApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned POApproverSettings
    **/
    _count?: true | POApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: POApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: POApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: POApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: POApproverSettingMaxAggregateInputType
  }

  export type GetPOApproverSettingAggregateType<T extends POApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregatePOApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePOApproverSetting[P]>
      : GetScalarType<T[P], AggregatePOApproverSetting[P]>
  }




  export type POApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: POApproverSettingWhereInput
    orderBy?: POApproverSettingOrderByWithAggregationInput | POApproverSettingOrderByWithAggregationInput[]
    by: POApproverSettingScalarFieldEnum[] | POApproverSettingScalarFieldEnum
    having?: POApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: POApproverSettingCountAggregateInputType | true
    _avg?: POApproverSettingAvgAggregateInputType
    _sum?: POApproverSettingSumAggregateInputType
    _min?: POApproverSettingMinAggregateInputType
    _max?: POApproverSettingMaxAggregateInputType
  }

  export type POApproverSettingGroupByOutputType = {
    id: string
    approver_id: string
    approver_proxy_id: string | null
    label: string
    order: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: POApproverSettingCountAggregateOutputType | null
    _avg: POApproverSettingAvgAggregateOutputType | null
    _sum: POApproverSettingSumAggregateOutputType | null
    _min: POApproverSettingMinAggregateOutputType | null
    _max: POApproverSettingMaxAggregateOutputType | null
  }

  type GetPOApproverSettingGroupByPayload<T extends POApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<POApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof POApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], POApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], POApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type POApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | POApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["pOApproverSetting"]>

  export type POApproverSettingSelectScalar = {
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type POApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | POApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $POApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "POApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approver_id: string
      approver_proxy_id: string | null
      label: string
      order: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["pOApproverSetting"]>
    composites: {}
  }


  type POApproverSettingGetPayload<S extends boolean | null | undefined | POApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$POApproverSettingPayload, S>

  type POApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<POApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: POApproverSettingCountAggregateInputType | true
    }

  export interface POApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['POApproverSetting'], meta: { name: 'POApproverSetting' } }
    /**
     * Find zero or one POApproverSetting that matches the filter.
     * @param {POApproverSettingFindUniqueArgs} args - Arguments to find a POApproverSetting
     * @example
     * // Get one POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends POApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one POApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {POApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a POApproverSetting
     * @example
     * // Get one POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends POApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first POApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingFindFirstArgs} args - Arguments to find a POApproverSetting
     * @example
     * // Get one POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends POApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first POApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingFindFirstOrThrowArgs} args - Arguments to find a POApproverSetting
     * @example
     * // Get one POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends POApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more POApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all POApproverSettings
     * const pOApproverSettings = await prisma.pOApproverSetting.findMany()
     * 
     * // Get first 10 POApproverSettings
     * const pOApproverSettings = await prisma.pOApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pOApproverSettingWithIdOnly = await prisma.pOApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends POApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a POApproverSetting.
     * @param {POApproverSettingCreateArgs} args - Arguments to create a POApproverSetting.
     * @example
     * // Create one POApproverSetting
     * const POApproverSetting = await prisma.pOApproverSetting.create({
     *   data: {
     *     // ... data to create a POApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends POApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many POApproverSettings.
     *     @param {POApproverSettingCreateManyArgs} args - Arguments to create many POApproverSettings.
     *     @example
     *     // Create many POApproverSettings
     *     const pOApproverSetting = await prisma.pOApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends POApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a POApproverSetting.
     * @param {POApproverSettingDeleteArgs} args - Arguments to delete one POApproverSetting.
     * @example
     * // Delete one POApproverSetting
     * const POApproverSetting = await prisma.pOApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one POApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends POApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one POApproverSetting.
     * @param {POApproverSettingUpdateArgs} args - Arguments to update one POApproverSetting.
     * @example
     * // Update one POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends POApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more POApproverSettings.
     * @param {POApproverSettingDeleteManyArgs} args - Arguments to filter POApproverSettings to delete.
     * @example
     * // Delete a few POApproverSettings
     * const { count } = await prisma.pOApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends POApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, POApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more POApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many POApproverSettings
     * const pOApproverSetting = await prisma.pOApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends POApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one POApproverSetting.
     * @param {POApproverSettingUpsertArgs} args - Arguments to update or create a POApproverSetting.
     * @example
     * // Update or create a POApproverSetting
     * const pOApproverSetting = await prisma.pOApproverSetting.upsert({
     *   create: {
     *     // ... data to create a POApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the POApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends POApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, POApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__POApproverSettingClient<$Result.GetResult<Prisma.$POApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of POApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingCountArgs} args - Arguments to filter POApproverSettings to count.
     * @example
     * // Count the number of POApproverSettings
     * const count = await prisma.pOApproverSetting.count({
     *   where: {
     *     // ... the filter for the POApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends POApproverSettingCountArgs>(
      args?: Subset<T, POApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], POApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a POApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends POApproverSettingAggregateArgs>(args: Subset<T, POApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetPOApproverSettingAggregateType<T>>

    /**
     * Group by POApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {POApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends POApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: POApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: POApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, POApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPOApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the POApproverSetting model
   */
  readonly fields: POApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for POApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__POApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends POApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, POApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the POApproverSetting model
   */ 
  interface POApproverSettingFieldRefs {
    readonly id: FieldRef<"POApproverSetting", 'String'>
    readonly approver_id: FieldRef<"POApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"POApproverSetting", 'String'>
    readonly label: FieldRef<"POApproverSetting", 'String'>
    readonly order: FieldRef<"POApproverSetting", 'Int'>
    readonly created_at: FieldRef<"POApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"POApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"POApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * POApproverSetting findUnique
   */
  export type POApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which POApproverSetting to fetch.
     */
    where: POApproverSettingWhereUniqueInput
  }


  /**
   * POApproverSetting findUniqueOrThrow
   */
  export type POApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which POApproverSetting to fetch.
     */
    where: POApproverSettingWhereUniqueInput
  }


  /**
   * POApproverSetting findFirst
   */
  export type POApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which POApproverSetting to fetch.
     */
    where?: POApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of POApproverSettings to fetch.
     */
    orderBy?: POApproverSettingOrderByWithRelationInput | POApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for POApproverSettings.
     */
    cursor?: POApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` POApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` POApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of POApproverSettings.
     */
    distinct?: POApproverSettingScalarFieldEnum | POApproverSettingScalarFieldEnum[]
  }


  /**
   * POApproverSetting findFirstOrThrow
   */
  export type POApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which POApproverSetting to fetch.
     */
    where?: POApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of POApproverSettings to fetch.
     */
    orderBy?: POApproverSettingOrderByWithRelationInput | POApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for POApproverSettings.
     */
    cursor?: POApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` POApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` POApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of POApproverSettings.
     */
    distinct?: POApproverSettingScalarFieldEnum | POApproverSettingScalarFieldEnum[]
  }


  /**
   * POApproverSetting findMany
   */
  export type POApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which POApproverSettings to fetch.
     */
    where?: POApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of POApproverSettings to fetch.
     */
    orderBy?: POApproverSettingOrderByWithRelationInput | POApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing POApproverSettings.
     */
    cursor?: POApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` POApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` POApproverSettings.
     */
    skip?: number
    distinct?: POApproverSettingScalarFieldEnum | POApproverSettingScalarFieldEnum[]
  }


  /**
   * POApproverSetting create
   */
  export type POApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a POApproverSetting.
     */
    data: XOR<POApproverSettingCreateInput, POApproverSettingUncheckedCreateInput>
  }


  /**
   * POApproverSetting createMany
   */
  export type POApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many POApproverSettings.
     */
    data: POApproverSettingCreateManyInput | POApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * POApproverSetting update
   */
  export type POApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a POApproverSetting.
     */
    data: XOR<POApproverSettingUpdateInput, POApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which POApproverSetting to update.
     */
    where: POApproverSettingWhereUniqueInput
  }


  /**
   * POApproverSetting updateMany
   */
  export type POApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update POApproverSettings.
     */
    data: XOR<POApproverSettingUpdateManyMutationInput, POApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which POApproverSettings to update
     */
    where?: POApproverSettingWhereInput
  }


  /**
   * POApproverSetting upsert
   */
  export type POApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the POApproverSetting to update in case it exists.
     */
    where: POApproverSettingWhereUniqueInput
    /**
     * In case the POApproverSetting found by the `where` argument doesn't exist, create a new POApproverSetting with this data.
     */
    create: XOR<POApproverSettingCreateInput, POApproverSettingUncheckedCreateInput>
    /**
     * In case the POApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<POApproverSettingUpdateInput, POApproverSettingUncheckedUpdateInput>
  }


  /**
   * POApproverSetting delete
   */
  export type POApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which POApproverSetting to delete.
     */
    where: POApproverSettingWhereUniqueInput
  }


  /**
   * POApproverSetting deleteMany
   */
  export type POApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which POApproverSettings to delete
     */
    where?: POApproverSettingWhereInput
  }


  /**
   * POApproverSetting.approver_proxy
   */
  export type POApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * POApproverSetting without action
   */
  export type POApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the POApproverSetting
     */
    select?: POApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: POApproverSettingInclude<ExtArgs> | null
  }



  /**
   * Model RRApproverSetting
   */

  export type AggregateRRApproverSetting = {
    _count: RRApproverSettingCountAggregateOutputType | null
    _avg: RRApproverSettingAvgAggregateOutputType | null
    _sum: RRApproverSettingSumAggregateOutputType | null
    _min: RRApproverSettingMinAggregateOutputType | null
    _max: RRApproverSettingMaxAggregateOutputType | null
  }

  export type RRApproverSettingAvgAggregateOutputType = {
    order: number | null
  }

  export type RRApproverSettingSumAggregateOutputType = {
    order: number | null
  }

  export type RRApproverSettingMinAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type RRApproverSettingMaxAggregateOutputType = {
    id: string | null
    approver_id: string | null
    approver_proxy_id: string | null
    label: string | null
    order: number | null
    created_at: Date | null
    updated_at: Date | null
    is_deleted: boolean | null
  }

  export type RRApproverSettingCountAggregateOutputType = {
    id: number
    approver_id: number
    approver_proxy_id: number
    label: number
    order: number
    created_at: number
    updated_at: number
    is_deleted: number
    _all: number
  }


  export type RRApproverSettingAvgAggregateInputType = {
    order?: true
  }

  export type RRApproverSettingSumAggregateInputType = {
    order?: true
  }

  export type RRApproverSettingMinAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type RRApproverSettingMaxAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
  }

  export type RRApproverSettingCountAggregateInputType = {
    id?: true
    approver_id?: true
    approver_proxy_id?: true
    label?: true
    order?: true
    created_at?: true
    updated_at?: true
    is_deleted?: true
    _all?: true
  }

  export type RRApproverSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RRApproverSetting to aggregate.
     */
    where?: RRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RRApproverSettings to fetch.
     */
    orderBy?: RRApproverSettingOrderByWithRelationInput | RRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RRApproverSettings
    **/
    _count?: true | RRApproverSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RRApproverSettingAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RRApproverSettingSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RRApproverSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RRApproverSettingMaxAggregateInputType
  }

  export type GetRRApproverSettingAggregateType<T extends RRApproverSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateRRApproverSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRRApproverSetting[P]>
      : GetScalarType<T[P], AggregateRRApproverSetting[P]>
  }




  export type RRApproverSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RRApproverSettingWhereInput
    orderBy?: RRApproverSettingOrderByWithAggregationInput | RRApproverSettingOrderByWithAggregationInput[]
    by: RRApproverSettingScalarFieldEnum[] | RRApproverSettingScalarFieldEnum
    having?: RRApproverSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RRApproverSettingCountAggregateInputType | true
    _avg?: RRApproverSettingAvgAggregateInputType
    _sum?: RRApproverSettingSumAggregateInputType
    _min?: RRApproverSettingMinAggregateInputType
    _max?: RRApproverSettingMaxAggregateInputType
  }

  export type RRApproverSettingGroupByOutputType = {
    id: string
    approver_id: string
    approver_proxy_id: string | null
    label: string
    order: number
    created_at: Date
    updated_at: Date
    is_deleted: boolean
    _count: RRApproverSettingCountAggregateOutputType | null
    _avg: RRApproverSettingAvgAggregateOutputType | null
    _sum: RRApproverSettingSumAggregateOutputType | null
    _min: RRApproverSettingMinAggregateOutputType | null
    _max: RRApproverSettingMaxAggregateOutputType | null
  }

  type GetRRApproverSettingGroupByPayload<T extends RRApproverSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RRApproverSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RRApproverSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RRApproverSettingGroupByOutputType[P]>
            : GetScalarType<T[P], RRApproverSettingGroupByOutputType[P]>
        }
      >
    >


  export type RRApproverSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | RRApproverSetting$approver_proxyArgs<ExtArgs>
  }, ExtArgs["result"]["rRApproverSetting"]>

  export type RRApproverSettingSelectScalar = {
    id?: boolean
    approver_id?: boolean
    approver_proxy_id?: boolean
    label?: boolean
    order?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_deleted?: boolean
  }

  export type RRApproverSettingInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    approver?: boolean | EmployeeDefaultArgs<ExtArgs>
    approver_proxy?: boolean | RRApproverSetting$approver_proxyArgs<ExtArgs>
  }


  export type $RRApproverSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RRApproverSetting"
    objects: {
      approver: Prisma.$EmployeePayload<ExtArgs>
      approver_proxy: Prisma.$EmployeePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      approver_id: string
      approver_proxy_id: string | null
      label: string
      order: number
      created_at: Date
      updated_at: Date
      is_deleted: boolean
    }, ExtArgs["result"]["rRApproverSetting"]>
    composites: {}
  }


  type RRApproverSettingGetPayload<S extends boolean | null | undefined | RRApproverSettingDefaultArgs> = $Result.GetResult<Prisma.$RRApproverSettingPayload, S>

  type RRApproverSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RRApproverSettingFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RRApproverSettingCountAggregateInputType | true
    }

  export interface RRApproverSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RRApproverSetting'], meta: { name: 'RRApproverSetting' } }
    /**
     * Find zero or one RRApproverSetting that matches the filter.
     * @param {RRApproverSettingFindUniqueArgs} args - Arguments to find a RRApproverSetting
     * @example
     * // Get one RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RRApproverSettingFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingFindUniqueArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one RRApproverSetting that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RRApproverSettingFindUniqueOrThrowArgs} args - Arguments to find a RRApproverSetting
     * @example
     * // Get one RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RRApproverSettingFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first RRApproverSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingFindFirstArgs} args - Arguments to find a RRApproverSetting
     * @example
     * // Get one RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RRApproverSettingFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingFindFirstArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first RRApproverSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingFindFirstOrThrowArgs} args - Arguments to find a RRApproverSetting
     * @example
     * // Get one RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RRApproverSettingFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more RRApproverSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RRApproverSettings
     * const rRApproverSettings = await prisma.rRApproverSetting.findMany()
     * 
     * // Get first 10 RRApproverSettings
     * const rRApproverSettings = await prisma.rRApproverSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rRApproverSettingWithIdOnly = await prisma.rRApproverSetting.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RRApproverSettingFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a RRApproverSetting.
     * @param {RRApproverSettingCreateArgs} args - Arguments to create a RRApproverSetting.
     * @example
     * // Create one RRApproverSetting
     * const RRApproverSetting = await prisma.rRApproverSetting.create({
     *   data: {
     *     // ... data to create a RRApproverSetting
     *   }
     * })
     * 
    **/
    create<T extends RRApproverSettingCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingCreateArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many RRApproverSettings.
     *     @param {RRApproverSettingCreateManyArgs} args - Arguments to create many RRApproverSettings.
     *     @example
     *     // Create many RRApproverSettings
     *     const rRApproverSetting = await prisma.rRApproverSetting.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RRApproverSettingCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a RRApproverSetting.
     * @param {RRApproverSettingDeleteArgs} args - Arguments to delete one RRApproverSetting.
     * @example
     * // Delete one RRApproverSetting
     * const RRApproverSetting = await prisma.rRApproverSetting.delete({
     *   where: {
     *     // ... filter to delete one RRApproverSetting
     *   }
     * })
     * 
    **/
    delete<T extends RRApproverSettingDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingDeleteArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one RRApproverSetting.
     * @param {RRApproverSettingUpdateArgs} args - Arguments to update one RRApproverSetting.
     * @example
     * // Update one RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RRApproverSettingUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingUpdateArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more RRApproverSettings.
     * @param {RRApproverSettingDeleteManyArgs} args - Arguments to filter RRApproverSettings to delete.
     * @example
     * // Delete a few RRApproverSettings
     * const { count } = await prisma.rRApproverSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RRApproverSettingDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RRApproverSettingDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RRApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RRApproverSettings
     * const rRApproverSetting = await prisma.rRApproverSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RRApproverSettingUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one RRApproverSetting.
     * @param {RRApproverSettingUpsertArgs} args - Arguments to update or create a RRApproverSetting.
     * @example
     * // Update or create a RRApproverSetting
     * const rRApproverSetting = await prisma.rRApproverSetting.upsert({
     *   create: {
     *     // ... data to create a RRApproverSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RRApproverSetting we want to update
     *   }
     * })
    **/
    upsert<T extends RRApproverSettingUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RRApproverSettingUpsertArgs<ExtArgs>>
    ): Prisma__RRApproverSettingClient<$Result.GetResult<Prisma.$RRApproverSettingPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of RRApproverSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingCountArgs} args - Arguments to filter RRApproverSettings to count.
     * @example
     * // Count the number of RRApproverSettings
     * const count = await prisma.rRApproverSetting.count({
     *   where: {
     *     // ... the filter for the RRApproverSettings we want to count
     *   }
     * })
    **/
    count<T extends RRApproverSettingCountArgs>(
      args?: Subset<T, RRApproverSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RRApproverSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RRApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends RRApproverSettingAggregateArgs>(args: Subset<T, RRApproverSettingAggregateArgs>): Prisma.PrismaPromise<GetRRApproverSettingAggregateType<T>>

    /**
     * Group by RRApproverSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RRApproverSettingGroupByArgs} args - Group by arguments.
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
      T extends RRApproverSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RRApproverSettingGroupByArgs['orderBy'] }
        : { orderBy?: RRApproverSettingGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, RRApproverSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRRApproverSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RRApproverSetting model
   */
  readonly fields: RRApproverSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RRApproverSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RRApproverSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    approver<T extends EmployeeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EmployeeDefaultArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    approver_proxy<T extends RRApproverSetting$approver_proxyArgs<ExtArgs> = {}>(args?: Subset<T, RRApproverSetting$approver_proxyArgs<ExtArgs>>): Prisma__EmployeeClient<$Result.GetResult<Prisma.$EmployeePayload<ExtArgs>, T, 'findUniqueOrThrow'> | null, null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the RRApproverSetting model
   */ 
  interface RRApproverSettingFieldRefs {
    readonly id: FieldRef<"RRApproverSetting", 'String'>
    readonly approver_id: FieldRef<"RRApproverSetting", 'String'>
    readonly approver_proxy_id: FieldRef<"RRApproverSetting", 'String'>
    readonly label: FieldRef<"RRApproverSetting", 'String'>
    readonly order: FieldRef<"RRApproverSetting", 'Int'>
    readonly created_at: FieldRef<"RRApproverSetting", 'DateTime'>
    readonly updated_at: FieldRef<"RRApproverSetting", 'DateTime'>
    readonly is_deleted: FieldRef<"RRApproverSetting", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * RRApproverSetting findUnique
   */
  export type RRApproverSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RRApproverSetting to fetch.
     */
    where: RRApproverSettingWhereUniqueInput
  }


  /**
   * RRApproverSetting findUniqueOrThrow
   */
  export type RRApproverSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RRApproverSetting to fetch.
     */
    where: RRApproverSettingWhereUniqueInput
  }


  /**
   * RRApproverSetting findFirst
   */
  export type RRApproverSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RRApproverSetting to fetch.
     */
    where?: RRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RRApproverSettings to fetch.
     */
    orderBy?: RRApproverSettingOrderByWithRelationInput | RRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RRApproverSettings.
     */
    cursor?: RRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RRApproverSettings.
     */
    distinct?: RRApproverSettingScalarFieldEnum | RRApproverSettingScalarFieldEnum[]
  }


  /**
   * RRApproverSetting findFirstOrThrow
   */
  export type RRApproverSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RRApproverSetting to fetch.
     */
    where?: RRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RRApproverSettings to fetch.
     */
    orderBy?: RRApproverSettingOrderByWithRelationInput | RRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RRApproverSettings.
     */
    cursor?: RRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RRApproverSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RRApproverSettings.
     */
    distinct?: RRApproverSettingScalarFieldEnum | RRApproverSettingScalarFieldEnum[]
  }


  /**
   * RRApproverSetting findMany
   */
  export type RRApproverSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter, which RRApproverSettings to fetch.
     */
    where?: RRApproverSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RRApproverSettings to fetch.
     */
    orderBy?: RRApproverSettingOrderByWithRelationInput | RRApproverSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RRApproverSettings.
     */
    cursor?: RRApproverSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RRApproverSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RRApproverSettings.
     */
    skip?: number
    distinct?: RRApproverSettingScalarFieldEnum | RRApproverSettingScalarFieldEnum[]
  }


  /**
   * RRApproverSetting create
   */
  export type RRApproverSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to create a RRApproverSetting.
     */
    data: XOR<RRApproverSettingCreateInput, RRApproverSettingUncheckedCreateInput>
  }


  /**
   * RRApproverSetting createMany
   */
  export type RRApproverSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RRApproverSettings.
     */
    data: RRApproverSettingCreateManyInput | RRApproverSettingCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * RRApproverSetting update
   */
  export type RRApproverSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * The data needed to update a RRApproverSetting.
     */
    data: XOR<RRApproverSettingUpdateInput, RRApproverSettingUncheckedUpdateInput>
    /**
     * Choose, which RRApproverSetting to update.
     */
    where: RRApproverSettingWhereUniqueInput
  }


  /**
   * RRApproverSetting updateMany
   */
  export type RRApproverSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RRApproverSettings.
     */
    data: XOR<RRApproverSettingUpdateManyMutationInput, RRApproverSettingUncheckedUpdateManyInput>
    /**
     * Filter which RRApproverSettings to update
     */
    where?: RRApproverSettingWhereInput
  }


  /**
   * RRApproverSetting upsert
   */
  export type RRApproverSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * The filter to search for the RRApproverSetting to update in case it exists.
     */
    where: RRApproverSettingWhereUniqueInput
    /**
     * In case the RRApproverSetting found by the `where` argument doesn't exist, create a new RRApproverSetting with this data.
     */
    create: XOR<RRApproverSettingCreateInput, RRApproverSettingUncheckedCreateInput>
    /**
     * In case the RRApproverSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RRApproverSettingUpdateInput, RRApproverSettingUncheckedUpdateInput>
  }


  /**
   * RRApproverSetting delete
   */
  export type RRApproverSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
    /**
     * Filter which RRApproverSetting to delete.
     */
    where: RRApproverSettingWhereUniqueInput
  }


  /**
   * RRApproverSetting deleteMany
   */
  export type RRApproverSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RRApproverSettings to delete
     */
    where?: RRApproverSettingWhereInput
  }


  /**
   * RRApproverSetting.approver_proxy
   */
  export type RRApproverSetting$approver_proxyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Employee
     */
    select?: EmployeeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: EmployeeInclude<ExtArgs> | null
    where?: EmployeeWhereInput
  }


  /**
   * RRApproverSetting without action
   */
  export type RRApproverSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RRApproverSetting
     */
    select?: RRApproverSettingSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RRApproverSettingInclude<ExtArgs> | null
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


  export const DivisionScalarFieldEnum: {
    id: 'id',
    department_id: 'department_id',
    code: 'code',
    name: 'name',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type DivisionScalarFieldEnum = (typeof DivisionScalarFieldEnum)[keyof typeof DivisionScalarFieldEnum]


  export const DepartmentScalarFieldEnum: {
    id: 'id',
    code: 'code',
    name: 'name',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type DepartmentScalarFieldEnum = (typeof DepartmentScalarFieldEnum)[keyof typeof DepartmentScalarFieldEnum]


  export const EmployeeScalarFieldEnum: {
    id: 'id',
    firstname: 'firstname',
    middlename: 'middlename',
    lastname: 'lastname',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type EmployeeScalarFieldEnum = (typeof EmployeeScalarFieldEnum)[keyof typeof EmployeeScalarFieldEnum]


  export const ClassificationScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type ClassificationScalarFieldEnum = (typeof ClassificationScalarFieldEnum)[keyof typeof ClassificationScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    role: 'role',
    username: 'username',
    password: 'password',
    status: 'status',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserEmployeeScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    employee_id: 'employee_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type UserEmployeeScalarFieldEnum = (typeof UserEmployeeScalarFieldEnum)[keyof typeof UserEmployeeScalarFieldEnum]


  export const UserPermissionScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted',
    user_id: 'user_id',
    module_id: 'module_id'
  };

  export type UserPermissionScalarFieldEnum = (typeof UserPermissionScalarFieldEnum)[keyof typeof UserPermissionScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const FeatureScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted',
    service_id: 'service_id'
  };

  export type FeatureScalarFieldEnum = (typeof FeatureScalarFieldEnum)[keyof typeof FeatureScalarFieldEnum]


  export const ModuleScalarFieldEnum: {
    id: 'id',
    name: 'name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted',
    feature_id: 'feature_id'
  };

  export type ModuleScalarFieldEnum = (typeof ModuleScalarFieldEnum)[keyof typeof ModuleScalarFieldEnum]


  export const JOApproverSettingScalarFieldEnum: {
    id: 'id',
    label: 'label',
    order: 'order',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type JOApproverSettingScalarFieldEnum = (typeof JOApproverSettingScalarFieldEnum)[keyof typeof JOApproverSettingScalarFieldEnum]


  export const RVApproverSettingScalarFieldEnum: {
    id: 'id',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    label: 'label',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type RVApproverSettingScalarFieldEnum = (typeof RVApproverSettingScalarFieldEnum)[keyof typeof RVApproverSettingScalarFieldEnum]


  export const SPRApproverSettingScalarFieldEnum: {
    id: 'id',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    label: 'label',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type SPRApproverSettingScalarFieldEnum = (typeof SPRApproverSettingScalarFieldEnum)[keyof typeof SPRApproverSettingScalarFieldEnum]


  export const MEQSApproverSettingScalarFieldEnum: {
    id: 'id',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    label: 'label',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type MEQSApproverSettingScalarFieldEnum = (typeof MEQSApproverSettingScalarFieldEnum)[keyof typeof MEQSApproverSettingScalarFieldEnum]


  export const POApproverSettingScalarFieldEnum: {
    id: 'id',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    label: 'label',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type POApproverSettingScalarFieldEnum = (typeof POApproverSettingScalarFieldEnum)[keyof typeof POApproverSettingScalarFieldEnum]


  export const RRApproverSettingScalarFieldEnum: {
    id: 'id',
    approver_id: 'approver_id',
    approver_proxy_id: 'approver_proxy_id',
    label: 'label',
    order: 'order',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_deleted: 'is_deleted'
  };

  export type RRApproverSettingScalarFieldEnum = (typeof RRApproverSettingScalarFieldEnum)[keyof typeof RRApproverSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


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


  export type DivisionWhereInput = {
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
    id?: StringFilter<"Division"> | string
    department_id?: StringFilter<"Division"> | string
    code?: StringFilter<"Division"> | string
    name?: StringFilter<"Division"> | string
    status?: IntFilter<"Division"> | number
    created_at?: DateTimeFilter<"Division"> | Date | string
    updated_at?: DateTimeFilter<"Division"> | Date | string
    is_deleted?: BoolFilter<"Division"> | boolean
    department?: XOR<DepartmentRelationFilter, DepartmentWhereInput>
  }

  export type DivisionOrderByWithRelationInput = {
    id?: SortOrder
    department_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    department?: DepartmentOrderByWithRelationInput
  }

  export type DivisionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: DivisionWhereInput | DivisionWhereInput[]
    OR?: DivisionWhereInput[]
    NOT?: DivisionWhereInput | DivisionWhereInput[]
    department_id?: StringFilter<"Division"> | string
    name?: StringFilter<"Division"> | string
    status?: IntFilter<"Division"> | number
    created_at?: DateTimeFilter<"Division"> | Date | string
    updated_at?: DateTimeFilter<"Division"> | Date | string
    is_deleted?: BoolFilter<"Division"> | boolean
    department?: XOR<DepartmentRelationFilter, DepartmentWhereInput>
  }, "id" | "code">

  export type DivisionOrderByWithAggregationInput = {
    id?: SortOrder
    department_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: DivisionCountOrderByAggregateInput
    _avg?: DivisionAvgOrderByAggregateInput
    _max?: DivisionMaxOrderByAggregateInput
    _min?: DivisionMinOrderByAggregateInput
    _sum?: DivisionSumOrderByAggregateInput
  }

  export type DivisionScalarWhereWithAggregatesInput = {
    AND?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    OR?: DivisionScalarWhereWithAggregatesInput[]
    NOT?: DivisionScalarWhereWithAggregatesInput | DivisionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Division"> | string
    department_id?: StringWithAggregatesFilter<"Division"> | string
    code?: StringWithAggregatesFilter<"Division"> | string
    name?: StringWithAggregatesFilter<"Division"> | string
    status?: IntWithAggregatesFilter<"Division"> | number
    created_at?: DateTimeWithAggregatesFilter<"Division"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Division"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Division"> | boolean
  }

  export type DepartmentWhereInput = {
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    id?: StringFilter<"Department"> | string
    code?: StringFilter<"Department"> | string
    name?: StringFilter<"Department"> | string
    status?: IntFilter<"Department"> | number
    created_at?: DateTimeFilter<"Department"> | Date | string
    updated_at?: DateTimeFilter<"Department"> | Date | string
    is_deleted?: BoolFilter<"Department"> | boolean
    Division?: DivisionListRelationFilter
  }

  export type DepartmentOrderByWithRelationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    Division?: DivisionOrderByRelationAggregateInput
  }

  export type DepartmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: DepartmentWhereInput | DepartmentWhereInput[]
    OR?: DepartmentWhereInput[]
    NOT?: DepartmentWhereInput | DepartmentWhereInput[]
    name?: StringFilter<"Department"> | string
    status?: IntFilter<"Department"> | number
    created_at?: DateTimeFilter<"Department"> | Date | string
    updated_at?: DateTimeFilter<"Department"> | Date | string
    is_deleted?: BoolFilter<"Department"> | boolean
    Division?: DivisionListRelationFilter
  }, "id" | "code">

  export type DepartmentOrderByWithAggregationInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: DepartmentCountOrderByAggregateInput
    _avg?: DepartmentAvgOrderByAggregateInput
    _max?: DepartmentMaxOrderByAggregateInput
    _min?: DepartmentMinOrderByAggregateInput
    _sum?: DepartmentSumOrderByAggregateInput
  }

  export type DepartmentScalarWhereWithAggregatesInput = {
    AND?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    OR?: DepartmentScalarWhereWithAggregatesInput[]
    NOT?: DepartmentScalarWhereWithAggregatesInput | DepartmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Department"> | string
    code?: StringWithAggregatesFilter<"Department"> | string
    name?: StringWithAggregatesFilter<"Department"> | string
    status?: IntWithAggregatesFilter<"Department"> | number
    created_at?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Department"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Department"> | boolean
  }

  export type EmployeeWhereInput = {
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    id?: StringFilter<"Employee"> | string
    firstname?: StringFilter<"Employee"> | string
    middlename?: StringNullableFilter<"Employee"> | string | null
    lastname?: StringFilter<"Employee"> | string
    created_at?: DateTimeFilter<"Employee"> | Date | string
    updated_at?: DateTimeFilter<"Employee"> | Date | string
    is_deleted?: BoolFilter<"Employee"> | boolean
    jo_approver_setting?: XOR<JOApproverSettingNullableRelationFilter, JOApproverSettingWhereInput> | null
    meqs_approver_setting?: XOR<MEQSApproverSettingNullableRelationFilter, MEQSApproverSettingWhereInput> | null
    po_approver_setting?: XOR<POApproverSettingNullableRelationFilter, POApproverSettingWhereInput> | null
    rv_approver_setting?: XOR<RVApproverSettingNullableRelationFilter, RVApproverSettingWhereInput> | null
    spr_approver_setting?: XOR<SPRApproverSettingNullableRelationFilter, SPRApproverSettingWhereInput> | null
    rr_approver_setting?: XOR<RRApproverSettingNullableRelationFilter, RRApproverSettingWhereInput> | null
    jo_approver_proxy_setting?: XOR<JOApproverSettingNullableRelationFilter, JOApproverSettingWhereInput> | null
    meqs_approver_proxy_setting?: XOR<MEQSApproverSettingNullableRelationFilter, MEQSApproverSettingWhereInput> | null
    po_approver_proxy_setting?: XOR<POApproverSettingNullableRelationFilter, POApproverSettingWhereInput> | null
    rv_approver_proxy_setting?: XOR<RVApproverSettingNullableRelationFilter, RVApproverSettingWhereInput> | null
    spr_approver_proxy_setting?: XOR<SPRApproverSettingNullableRelationFilter, SPRApproverSettingWhereInput> | null
    rr_approver_proxy_setting?: XOR<RRApproverSettingNullableRelationFilter, RRApproverSettingWhereInput> | null
    user_employee?: XOR<UserEmployeeNullableRelationFilter, UserEmployeeWhereInput> | null
  }

  export type EmployeeOrderByWithRelationInput = {
    id?: SortOrder
    firstname?: SortOrder
    middlename?: SortOrderInput | SortOrder
    lastname?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    jo_approver_setting?: JOApproverSettingOrderByWithRelationInput
    meqs_approver_setting?: MEQSApproverSettingOrderByWithRelationInput
    po_approver_setting?: POApproverSettingOrderByWithRelationInput
    rv_approver_setting?: RVApproverSettingOrderByWithRelationInput
    spr_approver_setting?: SPRApproverSettingOrderByWithRelationInput
    rr_approver_setting?: RRApproverSettingOrderByWithRelationInput
    jo_approver_proxy_setting?: JOApproverSettingOrderByWithRelationInput
    meqs_approver_proxy_setting?: MEQSApproverSettingOrderByWithRelationInput
    po_approver_proxy_setting?: POApproverSettingOrderByWithRelationInput
    rv_approver_proxy_setting?: RVApproverSettingOrderByWithRelationInput
    spr_approver_proxy_setting?: SPRApproverSettingOrderByWithRelationInput
    rr_approver_proxy_setting?: RRApproverSettingOrderByWithRelationInput
    user_employee?: UserEmployeeOrderByWithRelationInput
  }

  export type EmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: EmployeeWhereInput | EmployeeWhereInput[]
    OR?: EmployeeWhereInput[]
    NOT?: EmployeeWhereInput | EmployeeWhereInput[]
    firstname?: StringFilter<"Employee"> | string
    middlename?: StringNullableFilter<"Employee"> | string | null
    lastname?: StringFilter<"Employee"> | string
    created_at?: DateTimeFilter<"Employee"> | Date | string
    updated_at?: DateTimeFilter<"Employee"> | Date | string
    is_deleted?: BoolFilter<"Employee"> | boolean
    jo_approver_setting?: XOR<JOApproverSettingNullableRelationFilter, JOApproverSettingWhereInput> | null
    meqs_approver_setting?: XOR<MEQSApproverSettingNullableRelationFilter, MEQSApproverSettingWhereInput> | null
    po_approver_setting?: XOR<POApproverSettingNullableRelationFilter, POApproverSettingWhereInput> | null
    rv_approver_setting?: XOR<RVApproverSettingNullableRelationFilter, RVApproverSettingWhereInput> | null
    spr_approver_setting?: XOR<SPRApproverSettingNullableRelationFilter, SPRApproverSettingWhereInput> | null
    rr_approver_setting?: XOR<RRApproverSettingNullableRelationFilter, RRApproverSettingWhereInput> | null
    jo_approver_proxy_setting?: XOR<JOApproverSettingNullableRelationFilter, JOApproverSettingWhereInput> | null
    meqs_approver_proxy_setting?: XOR<MEQSApproverSettingNullableRelationFilter, MEQSApproverSettingWhereInput> | null
    po_approver_proxy_setting?: XOR<POApproverSettingNullableRelationFilter, POApproverSettingWhereInput> | null
    rv_approver_proxy_setting?: XOR<RVApproverSettingNullableRelationFilter, RVApproverSettingWhereInput> | null
    spr_approver_proxy_setting?: XOR<SPRApproverSettingNullableRelationFilter, SPRApproverSettingWhereInput> | null
    rr_approver_proxy_setting?: XOR<RRApproverSettingNullableRelationFilter, RRApproverSettingWhereInput> | null
    user_employee?: XOR<UserEmployeeNullableRelationFilter, UserEmployeeWhereInput> | null
  }, "id">

  export type EmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    firstname?: SortOrder
    middlename?: SortOrderInput | SortOrder
    lastname?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: EmployeeCountOrderByAggregateInput
    _max?: EmployeeMaxOrderByAggregateInput
    _min?: EmployeeMinOrderByAggregateInput
  }

  export type EmployeeScalarWhereWithAggregatesInput = {
    AND?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    OR?: EmployeeScalarWhereWithAggregatesInput[]
    NOT?: EmployeeScalarWhereWithAggregatesInput | EmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Employee"> | string
    firstname?: StringWithAggregatesFilter<"Employee"> | string
    middlename?: StringNullableWithAggregatesFilter<"Employee"> | string | null
    lastname?: StringWithAggregatesFilter<"Employee"> | string
    created_at?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Employee"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Employee"> | boolean
  }

  export type ClassificationWhereInput = {
    AND?: ClassificationWhereInput | ClassificationWhereInput[]
    OR?: ClassificationWhereInput[]
    NOT?: ClassificationWhereInput | ClassificationWhereInput[]
    id?: StringFilter<"Classification"> | string
    name?: StringFilter<"Classification"> | string
    created_at?: DateTimeFilter<"Classification"> | Date | string
    updated_at?: DateTimeFilter<"Classification"> | Date | string
    is_deleted?: BoolFilter<"Classification"> | boolean
  }

  export type ClassificationOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ClassificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ClassificationWhereInput | ClassificationWhereInput[]
    OR?: ClassificationWhereInput[]
    NOT?: ClassificationWhereInput | ClassificationWhereInput[]
    name?: StringFilter<"Classification"> | string
    created_at?: DateTimeFilter<"Classification"> | Date | string
    updated_at?: DateTimeFilter<"Classification"> | Date | string
    is_deleted?: BoolFilter<"Classification"> | boolean
  }, "id">

  export type ClassificationOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: ClassificationCountOrderByAggregateInput
    _max?: ClassificationMaxOrderByAggregateInput
    _min?: ClassificationMinOrderByAggregateInput
  }

  export type ClassificationScalarWhereWithAggregatesInput = {
    AND?: ClassificationScalarWhereWithAggregatesInput | ClassificationScalarWhereWithAggregatesInput[]
    OR?: ClassificationScalarWhereWithAggregatesInput[]
    NOT?: ClassificationScalarWhereWithAggregatesInput | ClassificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Classification"> | string
    name?: StringWithAggregatesFilter<"Classification"> | string
    created_at?: DateTimeWithAggregatesFilter<"Classification"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Classification"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Classification"> | boolean
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    status?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    is_deleted?: BoolFilter<"User"> | boolean
    user_permissions?: UserPermissionListRelationFilter
    user_employee?: XOR<UserEmployeeNullableRelationFilter, UserEmployeeWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_permissions?: UserPermissionOrderByRelationAggregateInput
    user_employee?: UserEmployeeOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    role?: EnumRoleFilter<"User"> | $Enums.Role
    password?: StringFilter<"User"> | string
    status?: IntFilter<"User"> | number
    created_at?: DateTimeFilter<"User"> | Date | string
    updated_at?: DateTimeFilter<"User"> | Date | string
    is_deleted?: BoolFilter<"User"> | boolean
    user_permissions?: UserPermissionListRelationFilter
    user_employee?: XOR<UserEmployeeNullableRelationFilter, UserEmployeeWhereInput> | null
  }, "id" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    status?: IntWithAggregatesFilter<"User"> | number
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type UserEmployeeWhereInput = {
    AND?: UserEmployeeWhereInput | UserEmployeeWhereInput[]
    OR?: UserEmployeeWhereInput[]
    NOT?: UserEmployeeWhereInput | UserEmployeeWhereInput[]
    id?: StringFilter<"UserEmployee"> | string
    user_id?: StringFilter<"UserEmployee"> | string
    employee_id?: StringFilter<"UserEmployee"> | string
    created_at?: DateTimeFilter<"UserEmployee"> | Date | string
    updated_at?: DateTimeFilter<"UserEmployee"> | Date | string
    is_deleted?: BoolFilter<"UserEmployee"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }

  export type UserEmployeeOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    employee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user?: UserOrderByWithRelationInput
    employee?: EmployeeOrderByWithRelationInput
  }

  export type UserEmployeeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id?: string
    employee_id?: string
    AND?: UserEmployeeWhereInput | UserEmployeeWhereInput[]
    OR?: UserEmployeeWhereInput[]
    NOT?: UserEmployeeWhereInput | UserEmployeeWhereInput[]
    created_at?: DateTimeFilter<"UserEmployee"> | Date | string
    updated_at?: DateTimeFilter<"UserEmployee"> | Date | string
    is_deleted?: BoolFilter<"UserEmployee"> | boolean
    user?: XOR<UserRelationFilter, UserWhereInput>
    employee?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
  }, "id" | "user_id" | "employee_id">

  export type UserEmployeeOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    employee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: UserEmployeeCountOrderByAggregateInput
    _max?: UserEmployeeMaxOrderByAggregateInput
    _min?: UserEmployeeMinOrderByAggregateInput
  }

  export type UserEmployeeScalarWhereWithAggregatesInput = {
    AND?: UserEmployeeScalarWhereWithAggregatesInput | UserEmployeeScalarWhereWithAggregatesInput[]
    OR?: UserEmployeeScalarWhereWithAggregatesInput[]
    NOT?: UserEmployeeScalarWhereWithAggregatesInput | UserEmployeeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserEmployee"> | string
    user_id?: StringWithAggregatesFilter<"UserEmployee"> | string
    employee_id?: StringWithAggregatesFilter<"UserEmployee"> | string
    created_at?: DateTimeWithAggregatesFilter<"UserEmployee"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserEmployee"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"UserEmployee"> | boolean
  }

  export type UserPermissionWhereInput = {
    AND?: UserPermissionWhereInput | UserPermissionWhereInput[]
    OR?: UserPermissionWhereInput[]
    NOT?: UserPermissionWhereInput | UserPermissionWhereInput[]
    id?: StringFilter<"UserPermission"> | string
    created_at?: DateTimeFilter<"UserPermission"> | Date | string
    updated_at?: DateTimeFilter<"UserPermission"> | Date | string
    is_deleted?: BoolFilter<"UserPermission"> | boolean
    user_id?: StringFilter<"UserPermission"> | string
    module_id?: StringFilter<"UserPermission"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    module?: XOR<ModuleRelationFilter, ModuleWhereInput>
  }

  export type UserPermissionOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
    module_id?: SortOrder
    user?: UserOrderByWithRelationInput
    module?: ModuleOrderByWithRelationInput
  }

  export type UserPermissionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserPermissionWhereInput | UserPermissionWhereInput[]
    OR?: UserPermissionWhereInput[]
    NOT?: UserPermissionWhereInput | UserPermissionWhereInput[]
    created_at?: DateTimeFilter<"UserPermission"> | Date | string
    updated_at?: DateTimeFilter<"UserPermission"> | Date | string
    is_deleted?: BoolFilter<"UserPermission"> | boolean
    user_id?: StringFilter<"UserPermission"> | string
    module_id?: StringFilter<"UserPermission"> | string
    user?: XOR<UserRelationFilter, UserWhereInput>
    module?: XOR<ModuleRelationFilter, ModuleWhereInput>
  }, "id">

  export type UserPermissionOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
    module_id?: SortOrder
    _count?: UserPermissionCountOrderByAggregateInput
    _max?: UserPermissionMaxOrderByAggregateInput
    _min?: UserPermissionMinOrderByAggregateInput
  }

  export type UserPermissionScalarWhereWithAggregatesInput = {
    AND?: UserPermissionScalarWhereWithAggregatesInput | UserPermissionScalarWhereWithAggregatesInput[]
    OR?: UserPermissionScalarWhereWithAggregatesInput[]
    NOT?: UserPermissionScalarWhereWithAggregatesInput | UserPermissionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserPermission"> | string
    created_at?: DateTimeWithAggregatesFilter<"UserPermission"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"UserPermission"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"UserPermission"> | boolean
    user_id?: StringWithAggregatesFilter<"UserPermission"> | string
    module_id?: StringWithAggregatesFilter<"UserPermission"> | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    created_at?: DateTimeFilter<"Service"> | Date | string
    updated_at?: DateTimeFilter<"Service"> | Date | string
    is_deleted?: BoolFilter<"Service"> | boolean
    features?: FeatureListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    features?: FeatureOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    created_at?: DateTimeFilter<"Service"> | Date | string
    updated_at?: DateTimeFilter<"Service"> | Date | string
    is_deleted?: BoolFilter<"Service"> | boolean
    features?: FeatureListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    created_at?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Service"> | boolean
  }

  export type FeatureWhereInput = {
    AND?: FeatureWhereInput | FeatureWhereInput[]
    OR?: FeatureWhereInput[]
    NOT?: FeatureWhereInput | FeatureWhereInput[]
    id?: StringFilter<"Feature"> | string
    name?: StringFilter<"Feature"> | string
    created_at?: DateTimeFilter<"Feature"> | Date | string
    updated_at?: DateTimeFilter<"Feature"> | Date | string
    is_deleted?: BoolFilter<"Feature"> | boolean
    service_id?: StringFilter<"Feature"> | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    modules?: ModuleListRelationFilter
  }

  export type FeatureOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    service_id?: SortOrder
    service?: ServiceOrderByWithRelationInput
    modules?: ModuleOrderByRelationAggregateInput
  }

  export type FeatureWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: FeatureWhereInput | FeatureWhereInput[]
    OR?: FeatureWhereInput[]
    NOT?: FeatureWhereInput | FeatureWhereInput[]
    name?: StringFilter<"Feature"> | string
    created_at?: DateTimeFilter<"Feature"> | Date | string
    updated_at?: DateTimeFilter<"Feature"> | Date | string
    is_deleted?: BoolFilter<"Feature"> | boolean
    service_id?: StringFilter<"Feature"> | string
    service?: XOR<ServiceRelationFilter, ServiceWhereInput>
    modules?: ModuleListRelationFilter
  }, "id">

  export type FeatureOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    service_id?: SortOrder
    _count?: FeatureCountOrderByAggregateInput
    _max?: FeatureMaxOrderByAggregateInput
    _min?: FeatureMinOrderByAggregateInput
  }

  export type FeatureScalarWhereWithAggregatesInput = {
    AND?: FeatureScalarWhereWithAggregatesInput | FeatureScalarWhereWithAggregatesInput[]
    OR?: FeatureScalarWhereWithAggregatesInput[]
    NOT?: FeatureScalarWhereWithAggregatesInput | FeatureScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Feature"> | string
    name?: StringWithAggregatesFilter<"Feature"> | string
    created_at?: DateTimeWithAggregatesFilter<"Feature"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Feature"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Feature"> | boolean
    service_id?: StringWithAggregatesFilter<"Feature"> | string
  }

  export type ModuleWhereInput = {
    AND?: ModuleWhereInput | ModuleWhereInput[]
    OR?: ModuleWhereInput[]
    NOT?: ModuleWhereInput | ModuleWhereInput[]
    id?: StringFilter<"Module"> | string
    name?: StringFilter<"Module"> | string
    created_at?: DateTimeFilter<"Module"> | Date | string
    updated_at?: DateTimeFilter<"Module"> | Date | string
    is_deleted?: BoolFilter<"Module"> | boolean
    feature_id?: StringFilter<"Module"> | string
    feature?: XOR<FeatureRelationFilter, FeatureWhereInput>
    user_permissions?: UserPermissionListRelationFilter
  }

  export type ModuleOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    feature_id?: SortOrder
    feature?: FeatureOrderByWithRelationInput
    user_permissions?: UserPermissionOrderByRelationAggregateInput
  }

  export type ModuleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ModuleWhereInput | ModuleWhereInput[]
    OR?: ModuleWhereInput[]
    NOT?: ModuleWhereInput | ModuleWhereInput[]
    name?: StringFilter<"Module"> | string
    created_at?: DateTimeFilter<"Module"> | Date | string
    updated_at?: DateTimeFilter<"Module"> | Date | string
    is_deleted?: BoolFilter<"Module"> | boolean
    feature_id?: StringFilter<"Module"> | string
    feature?: XOR<FeatureRelationFilter, FeatureWhereInput>
    user_permissions?: UserPermissionListRelationFilter
  }, "id">

  export type ModuleOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    feature_id?: SortOrder
    _count?: ModuleCountOrderByAggregateInput
    _max?: ModuleMaxOrderByAggregateInput
    _min?: ModuleMinOrderByAggregateInput
  }

  export type ModuleScalarWhereWithAggregatesInput = {
    AND?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[]
    OR?: ModuleScalarWhereWithAggregatesInput[]
    NOT?: ModuleScalarWhereWithAggregatesInput | ModuleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Module"> | string
    name?: StringWithAggregatesFilter<"Module"> | string
    created_at?: DateTimeWithAggregatesFilter<"Module"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"Module"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"Module"> | boolean
    feature_id?: StringWithAggregatesFilter<"Module"> | string
  }

  export type JOApproverSettingWhereInput = {
    AND?: JOApproverSettingWhereInput | JOApproverSettingWhereInput[]
    OR?: JOApproverSettingWhereInput[]
    NOT?: JOApproverSettingWhereInput | JOApproverSettingWhereInput[]
    id?: StringFilter<"JOApproverSetting"> | string
    label?: StringFilter<"JOApproverSetting"> | string
    order?: IntFilter<"JOApproverSetting"> | number
    approver_id?: StringFilter<"JOApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"JOApproverSetting"> | string | null
    created_at?: DateTimeFilter<"JOApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"JOApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"JOApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type JOApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type JOApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    order?: number
    approver_id?: string
    approver_proxy_id?: string
    AND?: JOApproverSettingWhereInput | JOApproverSettingWhereInput[]
    OR?: JOApproverSettingWhereInput[]
    NOT?: JOApproverSettingWhereInput | JOApproverSettingWhereInput[]
    label?: StringFilter<"JOApproverSetting"> | string
    created_at?: DateTimeFilter<"JOApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"JOApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"JOApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "order" | "approver_id" | "approver_proxy_id">

  export type JOApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: JOApproverSettingCountOrderByAggregateInput
    _avg?: JOApproverSettingAvgOrderByAggregateInput
    _max?: JOApproverSettingMaxOrderByAggregateInput
    _min?: JOApproverSettingMinOrderByAggregateInput
    _sum?: JOApproverSettingSumOrderByAggregateInput
  }

  export type JOApproverSettingScalarWhereWithAggregatesInput = {
    AND?: JOApproverSettingScalarWhereWithAggregatesInput | JOApproverSettingScalarWhereWithAggregatesInput[]
    OR?: JOApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: JOApproverSettingScalarWhereWithAggregatesInput | JOApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"JOApproverSetting"> | string
    label?: StringWithAggregatesFilter<"JOApproverSetting"> | string
    order?: IntWithAggregatesFilter<"JOApproverSetting"> | number
    approver_id?: StringWithAggregatesFilter<"JOApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"JOApproverSetting"> | string | null
    created_at?: DateTimeWithAggregatesFilter<"JOApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"JOApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"JOApproverSetting"> | boolean
  }

  export type RVApproverSettingWhereInput = {
    AND?: RVApproverSettingWhereInput | RVApproverSettingWhereInput[]
    OR?: RVApproverSettingWhereInput[]
    NOT?: RVApproverSettingWhereInput | RVApproverSettingWhereInput[]
    id?: StringFilter<"RVApproverSetting"> | string
    approver_id?: StringFilter<"RVApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"RVApproverSetting"> | string | null
    label?: StringFilter<"RVApproverSetting"> | string
    order?: IntFilter<"RVApproverSetting"> | number
    created_at?: DateTimeFilter<"RVApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"RVApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"RVApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type RVApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type RVApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approver_id?: string
    approver_proxy_id?: string
    order?: number
    AND?: RVApproverSettingWhereInput | RVApproverSettingWhereInput[]
    OR?: RVApproverSettingWhereInput[]
    NOT?: RVApproverSettingWhereInput | RVApproverSettingWhereInput[]
    label?: StringFilter<"RVApproverSetting"> | string
    created_at?: DateTimeFilter<"RVApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"RVApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"RVApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "approver_id" | "approver_proxy_id" | "order">

  export type RVApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: RVApproverSettingCountOrderByAggregateInput
    _avg?: RVApproverSettingAvgOrderByAggregateInput
    _max?: RVApproverSettingMaxOrderByAggregateInput
    _min?: RVApproverSettingMinOrderByAggregateInput
    _sum?: RVApproverSettingSumOrderByAggregateInput
  }

  export type RVApproverSettingScalarWhereWithAggregatesInput = {
    AND?: RVApproverSettingScalarWhereWithAggregatesInput | RVApproverSettingScalarWhereWithAggregatesInput[]
    OR?: RVApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: RVApproverSettingScalarWhereWithAggregatesInput | RVApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RVApproverSetting"> | string
    approver_id?: StringWithAggregatesFilter<"RVApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"RVApproverSetting"> | string | null
    label?: StringWithAggregatesFilter<"RVApproverSetting"> | string
    order?: IntWithAggregatesFilter<"RVApproverSetting"> | number
    created_at?: DateTimeWithAggregatesFilter<"RVApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"RVApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"RVApproverSetting"> | boolean
  }

  export type SPRApproverSettingWhereInput = {
    AND?: SPRApproverSettingWhereInput | SPRApproverSettingWhereInput[]
    OR?: SPRApproverSettingWhereInput[]
    NOT?: SPRApproverSettingWhereInput | SPRApproverSettingWhereInput[]
    id?: StringFilter<"SPRApproverSetting"> | string
    approver_id?: StringFilter<"SPRApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"SPRApproverSetting"> | string | null
    label?: StringFilter<"SPRApproverSetting"> | string
    order?: IntFilter<"SPRApproverSetting"> | number
    created_at?: DateTimeFilter<"SPRApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"SPRApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"SPRApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type SPRApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type SPRApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approver_id?: string
    approver_proxy_id?: string
    order?: number
    AND?: SPRApproverSettingWhereInput | SPRApproverSettingWhereInput[]
    OR?: SPRApproverSettingWhereInput[]
    NOT?: SPRApproverSettingWhereInput | SPRApproverSettingWhereInput[]
    label?: StringFilter<"SPRApproverSetting"> | string
    created_at?: DateTimeFilter<"SPRApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"SPRApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"SPRApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "approver_id" | "approver_proxy_id" | "order">

  export type SPRApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: SPRApproverSettingCountOrderByAggregateInput
    _avg?: SPRApproverSettingAvgOrderByAggregateInput
    _max?: SPRApproverSettingMaxOrderByAggregateInput
    _min?: SPRApproverSettingMinOrderByAggregateInput
    _sum?: SPRApproverSettingSumOrderByAggregateInput
  }

  export type SPRApproverSettingScalarWhereWithAggregatesInput = {
    AND?: SPRApproverSettingScalarWhereWithAggregatesInput | SPRApproverSettingScalarWhereWithAggregatesInput[]
    OR?: SPRApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: SPRApproverSettingScalarWhereWithAggregatesInput | SPRApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SPRApproverSetting"> | string
    approver_id?: StringWithAggregatesFilter<"SPRApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"SPRApproverSetting"> | string | null
    label?: StringWithAggregatesFilter<"SPRApproverSetting"> | string
    order?: IntWithAggregatesFilter<"SPRApproverSetting"> | number
    created_at?: DateTimeWithAggregatesFilter<"SPRApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"SPRApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"SPRApproverSetting"> | boolean
  }

  export type MEQSApproverSettingWhereInput = {
    AND?: MEQSApproverSettingWhereInput | MEQSApproverSettingWhereInput[]
    OR?: MEQSApproverSettingWhereInput[]
    NOT?: MEQSApproverSettingWhereInput | MEQSApproverSettingWhereInput[]
    id?: StringFilter<"MEQSApproverSetting"> | string
    approver_id?: StringFilter<"MEQSApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"MEQSApproverSetting"> | string | null
    label?: StringFilter<"MEQSApproverSetting"> | string
    order?: IntFilter<"MEQSApproverSetting"> | number
    created_at?: DateTimeFilter<"MEQSApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"MEQSApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"MEQSApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type MEQSApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type MEQSApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approver_id?: string
    approver_proxy_id?: string
    order?: number
    AND?: MEQSApproverSettingWhereInput | MEQSApproverSettingWhereInput[]
    OR?: MEQSApproverSettingWhereInput[]
    NOT?: MEQSApproverSettingWhereInput | MEQSApproverSettingWhereInput[]
    label?: StringFilter<"MEQSApproverSetting"> | string
    created_at?: DateTimeFilter<"MEQSApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"MEQSApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"MEQSApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "approver_id" | "approver_proxy_id" | "order">

  export type MEQSApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: MEQSApproverSettingCountOrderByAggregateInput
    _avg?: MEQSApproverSettingAvgOrderByAggregateInput
    _max?: MEQSApproverSettingMaxOrderByAggregateInput
    _min?: MEQSApproverSettingMinOrderByAggregateInput
    _sum?: MEQSApproverSettingSumOrderByAggregateInput
  }

  export type MEQSApproverSettingScalarWhereWithAggregatesInput = {
    AND?: MEQSApproverSettingScalarWhereWithAggregatesInput | MEQSApproverSettingScalarWhereWithAggregatesInput[]
    OR?: MEQSApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: MEQSApproverSettingScalarWhereWithAggregatesInput | MEQSApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"MEQSApproverSetting"> | string
    approver_id?: StringWithAggregatesFilter<"MEQSApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"MEQSApproverSetting"> | string | null
    label?: StringWithAggregatesFilter<"MEQSApproverSetting"> | string
    order?: IntWithAggregatesFilter<"MEQSApproverSetting"> | number
    created_at?: DateTimeWithAggregatesFilter<"MEQSApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"MEQSApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"MEQSApproverSetting"> | boolean
  }

  export type POApproverSettingWhereInput = {
    AND?: POApproverSettingWhereInput | POApproverSettingWhereInput[]
    OR?: POApproverSettingWhereInput[]
    NOT?: POApproverSettingWhereInput | POApproverSettingWhereInput[]
    id?: StringFilter<"POApproverSetting"> | string
    approver_id?: StringFilter<"POApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"POApproverSetting"> | string | null
    label?: StringFilter<"POApproverSetting"> | string
    order?: IntFilter<"POApproverSetting"> | number
    created_at?: DateTimeFilter<"POApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"POApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"POApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type POApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type POApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approver_id?: string
    approver_proxy_id?: string
    order?: number
    AND?: POApproverSettingWhereInput | POApproverSettingWhereInput[]
    OR?: POApproverSettingWhereInput[]
    NOT?: POApproverSettingWhereInput | POApproverSettingWhereInput[]
    label?: StringFilter<"POApproverSetting"> | string
    created_at?: DateTimeFilter<"POApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"POApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"POApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "approver_id" | "approver_proxy_id" | "order">

  export type POApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: POApproverSettingCountOrderByAggregateInput
    _avg?: POApproverSettingAvgOrderByAggregateInput
    _max?: POApproverSettingMaxOrderByAggregateInput
    _min?: POApproverSettingMinOrderByAggregateInput
    _sum?: POApproverSettingSumOrderByAggregateInput
  }

  export type POApproverSettingScalarWhereWithAggregatesInput = {
    AND?: POApproverSettingScalarWhereWithAggregatesInput | POApproverSettingScalarWhereWithAggregatesInput[]
    OR?: POApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: POApproverSettingScalarWhereWithAggregatesInput | POApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"POApproverSetting"> | string
    approver_id?: StringWithAggregatesFilter<"POApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"POApproverSetting"> | string | null
    label?: StringWithAggregatesFilter<"POApproverSetting"> | string
    order?: IntWithAggregatesFilter<"POApproverSetting"> | number
    created_at?: DateTimeWithAggregatesFilter<"POApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"POApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"POApproverSetting"> | boolean
  }

  export type RRApproverSettingWhereInput = {
    AND?: RRApproverSettingWhereInput | RRApproverSettingWhereInput[]
    OR?: RRApproverSettingWhereInput[]
    NOT?: RRApproverSettingWhereInput | RRApproverSettingWhereInput[]
    id?: StringFilter<"RRApproverSetting"> | string
    approver_id?: StringFilter<"RRApproverSetting"> | string
    approver_proxy_id?: StringNullableFilter<"RRApproverSetting"> | string | null
    label?: StringFilter<"RRApproverSetting"> | string
    order?: IntFilter<"RRApproverSetting"> | number
    created_at?: DateTimeFilter<"RRApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"RRApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"RRApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }

  export type RRApproverSettingOrderByWithRelationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    approver?: EmployeeOrderByWithRelationInput
    approver_proxy?: EmployeeOrderByWithRelationInput
  }

  export type RRApproverSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    approver_id?: string
    approver_proxy_id?: string
    order?: number
    AND?: RRApproverSettingWhereInput | RRApproverSettingWhereInput[]
    OR?: RRApproverSettingWhereInput[]
    NOT?: RRApproverSettingWhereInput | RRApproverSettingWhereInput[]
    label?: StringFilter<"RRApproverSetting"> | string
    created_at?: DateTimeFilter<"RRApproverSetting"> | Date | string
    updated_at?: DateTimeFilter<"RRApproverSetting"> | Date | string
    is_deleted?: BoolFilter<"RRApproverSetting"> | boolean
    approver?: XOR<EmployeeRelationFilter, EmployeeWhereInput>
    approver_proxy?: XOR<EmployeeNullableRelationFilter, EmployeeWhereInput> | null
  }, "id" | "approver_id" | "approver_proxy_id" | "order">

  export type RRApproverSettingOrderByWithAggregationInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrderInput | SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    _count?: RRApproverSettingCountOrderByAggregateInput
    _avg?: RRApproverSettingAvgOrderByAggregateInput
    _max?: RRApproverSettingMaxOrderByAggregateInput
    _min?: RRApproverSettingMinOrderByAggregateInput
    _sum?: RRApproverSettingSumOrderByAggregateInput
  }

  export type RRApproverSettingScalarWhereWithAggregatesInput = {
    AND?: RRApproverSettingScalarWhereWithAggregatesInput | RRApproverSettingScalarWhereWithAggregatesInput[]
    OR?: RRApproverSettingScalarWhereWithAggregatesInput[]
    NOT?: RRApproverSettingScalarWhereWithAggregatesInput | RRApproverSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RRApproverSetting"> | string
    approver_id?: StringWithAggregatesFilter<"RRApproverSetting"> | string
    approver_proxy_id?: StringNullableWithAggregatesFilter<"RRApproverSetting"> | string | null
    label?: StringWithAggregatesFilter<"RRApproverSetting"> | string
    order?: IntWithAggregatesFilter<"RRApproverSetting"> | number
    created_at?: DateTimeWithAggregatesFilter<"RRApproverSetting"> | Date | string
    updated_at?: DateTimeWithAggregatesFilter<"RRApproverSetting"> | Date | string
    is_deleted?: BoolWithAggregatesFilter<"RRApproverSetting"> | boolean
  }

  export type DivisionCreateInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    department: DepartmentCreateNestedOneWithoutDivisionInput
  }

  export type DivisionUncheckedCreateInput = {
    id?: string
    department_id: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DivisionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    department?: DepartmentUpdateOneRequiredWithoutDivisionNestedInput
  }

  export type DivisionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    department_id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DivisionCreateManyInput = {
    id?: string
    department_id: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DivisionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DivisionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    department_id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DepartmentCreateInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    Division?: DivisionCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUncheckedCreateInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    Division?: DivisionUncheckedCreateNestedManyWithoutDepartmentInput
  }

  export type DepartmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    Division?: DivisionUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    Division?: DivisionUncheckedUpdateManyWithoutDepartmentNestedInput
  }

  export type DepartmentCreateManyInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DepartmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DepartmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeCreateInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateManyInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type EmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClassificationCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ClassificationUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ClassificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClassificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClassificationCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ClassificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ClassificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionCreateNestedManyWithoutUserInput
    user_employee?: UserEmployeeCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionUncheckedCreateNestedManyWithoutUserInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUpdateManyWithoutUserNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUncheckedUpdateManyWithoutUserNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserEmployeeCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user: UserCreateNestedOneWithoutUser_employeeInput
    employee: EmployeeCreateNestedOneWithoutUser_employeeInput
  }

  export type UserEmployeeUncheckedCreateInput = {
    id?: string
    user_id: string
    employee_id: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type UserEmployeeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutUser_employeeNestedInput
    employee?: EmployeeUpdateOneRequiredWithoutUser_employeeNestedInput
  }

  export type UserEmployeeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserEmployeeCreateManyInput = {
    id?: string
    user_id: string
    employee_id: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type UserEmployeeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserEmployeeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserPermissionCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user: UserCreateNestedOneWithoutUser_permissionsInput
    module: ModuleCreateNestedOneWithoutUser_permissionsInput
  }

  export type UserPermissionUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_id: string
    module_id: string
  }

  export type UserPermissionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutUser_permissionsNestedInput
    module?: ModuleUpdateOneRequiredWithoutUser_permissionsNestedInput
  }

  export type UserPermissionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
  }

  export type UserPermissionCreateManyInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_id: string
    module_id: string
  }

  export type UserPermissionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserPermissionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
    module_id?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    features?: FeatureCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    features?: FeatureUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    features?: FeatureUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    features?: FeatureUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FeatureCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    service: ServiceCreateNestedOneWithoutFeaturesInput
    modules?: ModuleCreateNestedManyWithoutFeatureInput
  }

  export type FeatureUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    service_id: string
    modules?: ModuleUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type FeatureUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    service?: ServiceUpdateOneRequiredWithoutFeaturesNestedInput
    modules?: ModuleUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    service_id?: StringFieldUpdateOperationsInput | string
    modules?: ModuleUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    service_id: string
  }

  export type FeatureUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type FeatureUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    service_id?: StringFieldUpdateOperationsInput | string
  }

  export type ModuleCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    feature: FeatureCreateNestedOneWithoutModulesInput
    user_permissions?: UserPermissionCreateNestedManyWithoutModuleInput
  }

  export type ModuleUncheckedCreateInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    feature_id: string
    user_permissions?: UserPermissionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type ModuleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    feature?: FeatureUpdateOneRequiredWithoutModulesNestedInput
    user_permissions?: UserPermissionUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    feature_id?: StringFieldUpdateOperationsInput | string
    user_permissions?: UserPermissionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type ModuleCreateManyInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    feature_id: string
  }

  export type ModuleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    feature_id?: StringFieldUpdateOperationsInput | string
  }

  export type JOApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutJo_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutJo_approver_proxy_settingInput
  }

  export type JOApproverSettingUncheckedCreateInput = {
    id?: string
    label: string
    order: number
    approver_id: string
    approver_proxy_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type JOApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutJo_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutJo_approver_proxy_settingNestedInput
  }

  export type JOApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JOApproverSettingCreateManyInput = {
    id?: string
    label: string
    order: number
    approver_id: string
    approver_proxy_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type JOApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JOApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RVApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutRv_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutRv_approver_proxy_settingInput
  }

  export type RVApproverSettingUncheckedCreateInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RVApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutRv_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutRv_approver_proxy_settingNestedInput
  }

  export type RVApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RVApproverSettingCreateManyInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RVApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RVApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SPRApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutSpr_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutSpr_approver_proxy_settingInput
  }

  export type SPRApproverSettingUncheckedCreateInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type SPRApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutSpr_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutSpr_approver_proxy_settingNestedInput
  }

  export type SPRApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SPRApproverSettingCreateManyInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type SPRApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SPRApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MEQSApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutMeqs_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutMeqs_approver_proxy_settingInput
  }

  export type MEQSApproverSettingUncheckedCreateInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type MEQSApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutMeqs_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutMeqs_approver_proxy_settingNestedInput
  }

  export type MEQSApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MEQSApproverSettingCreateManyInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type MEQSApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MEQSApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type POApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutPo_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutPo_approver_proxy_settingInput
  }

  export type POApproverSettingUncheckedCreateInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type POApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutPo_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutPo_approver_proxy_settingNestedInput
  }

  export type POApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type POApproverSettingCreateManyInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type POApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type POApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RRApproverSettingCreateInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutRr_approver_settingInput
    approver_proxy?: EmployeeCreateNestedOneWithoutRr_approver_proxy_settingInput
  }

  export type RRApproverSettingUncheckedCreateInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RRApproverSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutRr_approver_settingNestedInput
    approver_proxy?: EmployeeUpdateOneWithoutRr_approver_proxy_settingNestedInput
  }

  export type RRApproverSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RRApproverSettingCreateManyInput = {
    id?: string
    approver_id: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RRApproverSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RRApproverSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
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

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DepartmentRelationFilter = {
    is?: DepartmentWhereInput
    isNot?: DepartmentWhereInput
  }

  export type DivisionCountOrderByAggregateInput = {
    id?: SortOrder
    department_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DivisionAvgOrderByAggregateInput = {
    status?: SortOrder
  }

  export type DivisionMaxOrderByAggregateInput = {
    id?: SortOrder
    department_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DivisionMinOrderByAggregateInput = {
    id?: SortOrder
    department_id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DivisionSumOrderByAggregateInput = {
    status?: SortOrder
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

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DivisionListRelationFilter = {
    every?: DivisionWhereInput
    some?: DivisionWhereInput
    none?: DivisionWhereInput
  }

  export type DivisionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DepartmentCountOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DepartmentAvgOrderByAggregateInput = {
    status?: SortOrder
  }

  export type DepartmentMaxOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DepartmentMinOrderByAggregateInput = {
    id?: SortOrder
    code?: SortOrder
    name?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type DepartmentSumOrderByAggregateInput = {
    status?: SortOrder
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

  export type JOApproverSettingNullableRelationFilter = {
    is?: JOApproverSettingWhereInput | null
    isNot?: JOApproverSettingWhereInput | null
  }

  export type MEQSApproverSettingNullableRelationFilter = {
    is?: MEQSApproverSettingWhereInput | null
    isNot?: MEQSApproverSettingWhereInput | null
  }

  export type POApproverSettingNullableRelationFilter = {
    is?: POApproverSettingWhereInput | null
    isNot?: POApproverSettingWhereInput | null
  }

  export type RVApproverSettingNullableRelationFilter = {
    is?: RVApproverSettingWhereInput | null
    isNot?: RVApproverSettingWhereInput | null
  }

  export type SPRApproverSettingNullableRelationFilter = {
    is?: SPRApproverSettingWhereInput | null
    isNot?: SPRApproverSettingWhereInput | null
  }

  export type RRApproverSettingNullableRelationFilter = {
    is?: RRApproverSettingWhereInput | null
    isNot?: RRApproverSettingWhereInput | null
  }

  export type UserEmployeeNullableRelationFilter = {
    is?: UserEmployeeWhereInput | null
    isNot?: UserEmployeeWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    middlename?: SortOrder
    lastname?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type EmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    middlename?: SortOrder
    lastname?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type EmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    firstname?: SortOrder
    middlename?: SortOrder
    lastname?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
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

  export type ClassificationCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ClassificationMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ClassificationMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type UserPermissionListRelationFilter = {
    every?: UserPermissionWhereInput
    some?: UserPermissionWhereInput
    none?: UserPermissionWhereInput
  }

  export type UserPermissionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    status?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    role?: SortOrder
    username?: SortOrder
    password?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    status?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EmployeeRelationFilter = {
    is?: EmployeeWhereInput
    isNot?: EmployeeWhereInput
  }

  export type UserEmployeeCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    employee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type UserEmployeeMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    employee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type UserEmployeeMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    employee_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ModuleRelationFilter = {
    is?: ModuleWhereInput
    isNot?: ModuleWhereInput
  }

  export type UserPermissionCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
    module_id?: SortOrder
  }

  export type UserPermissionMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
    module_id?: SortOrder
  }

  export type UserPermissionMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    user_id?: SortOrder
    module_id?: SortOrder
  }

  export type FeatureListRelationFilter = {
    every?: FeatureWhereInput
    some?: FeatureWhereInput
    none?: FeatureWhereInput
  }

  export type FeatureOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type ServiceRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type ModuleListRelationFilter = {
    every?: ModuleWhereInput
    some?: ModuleWhereInput
    none?: ModuleWhereInput
  }

  export type ModuleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type FeatureCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    service_id?: SortOrder
  }

  export type FeatureMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    service_id?: SortOrder
  }

  export type FeatureMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    service_id?: SortOrder
  }

  export type FeatureRelationFilter = {
    is?: FeatureWhereInput
    isNot?: FeatureWhereInput
  }

  export type ModuleCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    feature_id?: SortOrder
  }

  export type ModuleMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    feature_id?: SortOrder
  }

  export type ModuleMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
    feature_id?: SortOrder
  }

  export type EmployeeNullableRelationFilter = {
    is?: EmployeeWhereInput | null
    isNot?: EmployeeWhereInput | null
  }

  export type JOApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type JOApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type JOApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type JOApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type JOApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RVApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RVApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RVApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RVApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RVApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SPRApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type SPRApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type SPRApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type SPRApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type SPRApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MEQSApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type MEQSApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type MEQSApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type MEQSApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type MEQSApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type POApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type POApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type POApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type POApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type POApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RRApproverSettingCountOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RRApproverSettingAvgOrderByAggregateInput = {
    order?: SortOrder
  }

  export type RRApproverSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RRApproverSettingMinOrderByAggregateInput = {
    id?: SortOrder
    approver_id?: SortOrder
    approver_proxy_id?: SortOrder
    label?: SortOrder
    order?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_deleted?: SortOrder
  }

  export type RRApproverSettingSumOrderByAggregateInput = {
    order?: SortOrder
  }

  export type DepartmentCreateNestedOneWithoutDivisionInput = {
    create?: XOR<DepartmentCreateWithoutDivisionInput, DepartmentUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutDivisionInput
    connect?: DepartmentWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DepartmentUpdateOneRequiredWithoutDivisionNestedInput = {
    create?: XOR<DepartmentCreateWithoutDivisionInput, DepartmentUncheckedCreateWithoutDivisionInput>
    connectOrCreate?: DepartmentCreateOrConnectWithoutDivisionInput
    upsert?: DepartmentUpsertWithoutDivisionInput
    connect?: DepartmentWhereUniqueInput
    update?: XOR<XOR<DepartmentUpdateToOneWithWhereWithoutDivisionInput, DepartmentUpdateWithoutDivisionInput>, DepartmentUncheckedUpdateWithoutDivisionInput>
  }

  export type DivisionCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput> | DivisionCreateWithoutDepartmentInput[] | DivisionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DivisionCreateOrConnectWithoutDepartmentInput | DivisionCreateOrConnectWithoutDepartmentInput[]
    createMany?: DivisionCreateManyDepartmentInputEnvelope
    connect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
  }

  export type DivisionUncheckedCreateNestedManyWithoutDepartmentInput = {
    create?: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput> | DivisionCreateWithoutDepartmentInput[] | DivisionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DivisionCreateOrConnectWithoutDepartmentInput | DivisionCreateOrConnectWithoutDepartmentInput[]
    createMany?: DivisionCreateManyDepartmentInputEnvelope
    connect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
  }

  export type DivisionUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput> | DivisionCreateWithoutDepartmentInput[] | DivisionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DivisionCreateOrConnectWithoutDepartmentInput | DivisionCreateOrConnectWithoutDepartmentInput[]
    upsert?: DivisionUpsertWithWhereUniqueWithoutDepartmentInput | DivisionUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: DivisionCreateManyDepartmentInputEnvelope
    set?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    disconnect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    delete?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    connect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    update?: DivisionUpdateWithWhereUniqueWithoutDepartmentInput | DivisionUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: DivisionUpdateManyWithWhereWithoutDepartmentInput | DivisionUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: DivisionScalarWhereInput | DivisionScalarWhereInput[]
  }

  export type DivisionUncheckedUpdateManyWithoutDepartmentNestedInput = {
    create?: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput> | DivisionCreateWithoutDepartmentInput[] | DivisionUncheckedCreateWithoutDepartmentInput[]
    connectOrCreate?: DivisionCreateOrConnectWithoutDepartmentInput | DivisionCreateOrConnectWithoutDepartmentInput[]
    upsert?: DivisionUpsertWithWhereUniqueWithoutDepartmentInput | DivisionUpsertWithWhereUniqueWithoutDepartmentInput[]
    createMany?: DivisionCreateManyDepartmentInputEnvelope
    set?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    disconnect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    delete?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    connect?: DivisionWhereUniqueInput | DivisionWhereUniqueInput[]
    update?: DivisionUpdateWithWhereUniqueWithoutDepartmentInput | DivisionUpdateWithWhereUniqueWithoutDepartmentInput[]
    updateMany?: DivisionUpdateManyWithWhereWithoutDepartmentInput | DivisionUpdateManyWithWhereWithoutDepartmentInput[]
    deleteMany?: DivisionScalarWhereInput | DivisionScalarWhereInput[]
  }

  export type JOApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApproverInput
    connect?: JOApproverSettingWhereUniqueInput
  }

  export type MEQSApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApproverInput
    connect?: MEQSApproverSettingWhereUniqueInput
  }

  export type POApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApproverInput
    connect?: POApproverSettingWhereUniqueInput
  }

  export type RVApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApproverInput
    connect?: RVApproverSettingWhereUniqueInput
  }

  export type SPRApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApproverInput
    connect?: SPRApproverSettingWhereUniqueInput
  }

  export type RRApproverSettingCreateNestedOneWithoutApproverInput = {
    create?: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApproverInput
    connect?: RRApproverSettingWhereUniqueInput
  }

  export type JOApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: JOApproverSettingWhereUniqueInput
  }

  export type MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: MEQSApproverSettingWhereUniqueInput
  }

  export type POApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: POApproverSettingWhereUniqueInput
  }

  export type RVApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: RVApproverSettingWhereUniqueInput
  }

  export type SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: SPRApproverSettingWhereUniqueInput
  }

  export type RRApproverSettingCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: RRApproverSettingWhereUniqueInput
  }

  export type UserEmployeeCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutEmployeeInput
    connect?: UserEmployeeWhereUniqueInput
  }

  export type JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApproverInput
    connect?: JOApproverSettingWhereUniqueInput
  }

  export type MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApproverInput
    connect?: MEQSApproverSettingWhereUniqueInput
  }

  export type POApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApproverInput
    connect?: POApproverSettingWhereUniqueInput
  }

  export type RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApproverInput
    connect?: RVApproverSettingWhereUniqueInput
  }

  export type SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApproverInput
    connect?: SPRApproverSettingWhereUniqueInput
  }

  export type RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput = {
    create?: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApproverInput
    connect?: RRApproverSettingWhereUniqueInput
  }

  export type JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: JOApproverSettingWhereUniqueInput
  }

  export type MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: MEQSApproverSettingWhereUniqueInput
  }

  export type POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: POApproverSettingWhereUniqueInput
  }

  export type RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: RVApproverSettingWhereUniqueInput
  }

  export type SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: SPRApproverSettingWhereUniqueInput
  }

  export type RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput = {
    create?: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    connect?: RRApproverSettingWhereUniqueInput
  }

  export type UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput = {
    create?: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutEmployeeInput
    connect?: UserEmployeeWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type JOApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: JOApproverSettingUpsertWithoutApproverInput
    disconnect?: JOApproverSettingWhereInput | boolean
    delete?: JOApproverSettingWhereInput | boolean
    connect?: JOApproverSettingWhereUniqueInput
    update?: XOR<XOR<JOApproverSettingUpdateToOneWithWhereWithoutApproverInput, JOApproverSettingUpdateWithoutApproverInput>, JOApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type MEQSApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: MEQSApproverSettingUpsertWithoutApproverInput
    disconnect?: MEQSApproverSettingWhereInput | boolean
    delete?: MEQSApproverSettingWhereInput | boolean
    connect?: MEQSApproverSettingWhereUniqueInput
    update?: XOR<XOR<MEQSApproverSettingUpdateToOneWithWhereWithoutApproverInput, MEQSApproverSettingUpdateWithoutApproverInput>, MEQSApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type POApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: POApproverSettingUpsertWithoutApproverInput
    disconnect?: POApproverSettingWhereInput | boolean
    delete?: POApproverSettingWhereInput | boolean
    connect?: POApproverSettingWhereUniqueInput
    update?: XOR<XOR<POApproverSettingUpdateToOneWithWhereWithoutApproverInput, POApproverSettingUpdateWithoutApproverInput>, POApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RVApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: RVApproverSettingUpsertWithoutApproverInput
    disconnect?: RVApproverSettingWhereInput | boolean
    delete?: RVApproverSettingWhereInput | boolean
    connect?: RVApproverSettingWhereUniqueInput
    update?: XOR<XOR<RVApproverSettingUpdateToOneWithWhereWithoutApproverInput, RVApproverSettingUpdateWithoutApproverInput>, RVApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type SPRApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: SPRApproverSettingUpsertWithoutApproverInput
    disconnect?: SPRApproverSettingWhereInput | boolean
    delete?: SPRApproverSettingWhereInput | boolean
    connect?: SPRApproverSettingWhereUniqueInput
    update?: XOR<XOR<SPRApproverSettingUpdateToOneWithWhereWithoutApproverInput, SPRApproverSettingUpdateWithoutApproverInput>, SPRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RRApproverSettingUpdateOneWithoutApproverNestedInput = {
    create?: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: RRApproverSettingUpsertWithoutApproverInput
    disconnect?: RRApproverSettingWhereInput | boolean
    delete?: RRApproverSettingWhereInput | boolean
    connect?: RRApproverSettingWhereUniqueInput
    update?: XOR<XOR<RRApproverSettingUpdateToOneWithWhereWithoutApproverInput, RRApproverSettingUpdateWithoutApproverInput>, RRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: JOApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: JOApproverSettingWhereInput | boolean
    delete?: JOApproverSettingWhereInput | boolean
    connect?: JOApproverSettingWhereUniqueInput
    update?: XOR<XOR<JOApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, JOApproverSettingUpdateWithoutApprover_proxyInput>, JOApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: MEQSApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: MEQSApproverSettingWhereInput | boolean
    delete?: MEQSApproverSettingWhereInput | boolean
    connect?: MEQSApproverSettingWhereUniqueInput
    update?: XOR<XOR<MEQSApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, MEQSApproverSettingUpdateWithoutApprover_proxyInput>, MEQSApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type POApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: POApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: POApproverSettingWhereInput | boolean
    delete?: POApproverSettingWhereInput | boolean
    connect?: POApproverSettingWhereUniqueInput
    update?: XOR<XOR<POApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, POApproverSettingUpdateWithoutApprover_proxyInput>, POApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: RVApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: RVApproverSettingWhereInput | boolean
    delete?: RVApproverSettingWhereInput | boolean
    connect?: RVApproverSettingWhereUniqueInput
    update?: XOR<XOR<RVApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, RVApproverSettingUpdateWithoutApprover_proxyInput>, RVApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: SPRApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: SPRApproverSettingWhereInput | boolean
    delete?: SPRApproverSettingWhereInput | boolean
    connect?: SPRApproverSettingWhereUniqueInput
    update?: XOR<XOR<SPRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, SPRApproverSettingUpdateWithoutApprover_proxyInput>, SPRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: RRApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: RRApproverSettingWhereInput | boolean
    delete?: RRApproverSettingWhereInput | boolean
    connect?: RRApproverSettingWhereUniqueInput
    update?: XOR<XOR<RRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, RRApproverSettingUpdateWithoutApprover_proxyInput>, RRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type UserEmployeeUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutEmployeeInput
    upsert?: UserEmployeeUpsertWithoutEmployeeInput
    disconnect?: UserEmployeeWhereInput | boolean
    delete?: UserEmployeeWhereInput | boolean
    connect?: UserEmployeeWhereUniqueInput
    update?: XOR<XOR<UserEmployeeUpdateToOneWithWhereWithoutEmployeeInput, UserEmployeeUpdateWithoutEmployeeInput>, UserEmployeeUncheckedUpdateWithoutEmployeeInput>
  }

  export type JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: JOApproverSettingUpsertWithoutApproverInput
    disconnect?: JOApproverSettingWhereInput | boolean
    delete?: JOApproverSettingWhereInput | boolean
    connect?: JOApproverSettingWhereUniqueInput
    update?: XOR<XOR<JOApproverSettingUpdateToOneWithWhereWithoutApproverInput, JOApproverSettingUpdateWithoutApproverInput>, JOApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: MEQSApproverSettingUpsertWithoutApproverInput
    disconnect?: MEQSApproverSettingWhereInput | boolean
    delete?: MEQSApproverSettingWhereInput | boolean
    connect?: MEQSApproverSettingWhereUniqueInput
    update?: XOR<XOR<MEQSApproverSettingUpdateToOneWithWhereWithoutApproverInput, MEQSApproverSettingUpdateWithoutApproverInput>, MEQSApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: POApproverSettingUpsertWithoutApproverInput
    disconnect?: POApproverSettingWhereInput | boolean
    delete?: POApproverSettingWhereInput | boolean
    connect?: POApproverSettingWhereUniqueInput
    update?: XOR<XOR<POApproverSettingUpdateToOneWithWhereWithoutApproverInput, POApproverSettingUpdateWithoutApproverInput>, POApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: RVApproverSettingUpsertWithoutApproverInput
    disconnect?: RVApproverSettingWhereInput | boolean
    delete?: RVApproverSettingWhereInput | boolean
    connect?: RVApproverSettingWhereUniqueInput
    update?: XOR<XOR<RVApproverSettingUpdateToOneWithWhereWithoutApproverInput, RVApproverSettingUpdateWithoutApproverInput>, RVApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: SPRApproverSettingUpsertWithoutApproverInput
    disconnect?: SPRApproverSettingWhereInput | boolean
    delete?: SPRApproverSettingWhereInput | boolean
    connect?: SPRApproverSettingWhereUniqueInput
    update?: XOR<XOR<SPRApproverSettingUpdateToOneWithWhereWithoutApproverInput, SPRApproverSettingUpdateWithoutApproverInput>, SPRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput = {
    create?: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApproverInput
    upsert?: RRApproverSettingUpsertWithoutApproverInput
    disconnect?: RRApproverSettingWhereInput | boolean
    delete?: RRApproverSettingWhereInput | boolean
    connect?: RRApproverSettingWhereUniqueInput
    update?: XOR<XOR<RRApproverSettingUpdateToOneWithWhereWithoutApproverInput, RRApproverSettingUpdateWithoutApproverInput>, RRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: JOApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: JOApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: JOApproverSettingWhereInput | boolean
    delete?: JOApproverSettingWhereInput | boolean
    connect?: JOApproverSettingWhereUniqueInput
    update?: XOR<XOR<JOApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, JOApproverSettingUpdateWithoutApprover_proxyInput>, JOApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: MEQSApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: MEQSApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: MEQSApproverSettingWhereInput | boolean
    delete?: MEQSApproverSettingWhereInput | boolean
    connect?: MEQSApproverSettingWhereUniqueInput
    update?: XOR<XOR<MEQSApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, MEQSApproverSettingUpdateWithoutApprover_proxyInput>, MEQSApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: POApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: POApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: POApproverSettingWhereInput | boolean
    delete?: POApproverSettingWhereInput | boolean
    connect?: POApproverSettingWhereUniqueInput
    update?: XOR<XOR<POApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, POApproverSettingUpdateWithoutApprover_proxyInput>, POApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RVApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: RVApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: RVApproverSettingWhereInput | boolean
    delete?: RVApproverSettingWhereInput | boolean
    connect?: RVApproverSettingWhereUniqueInput
    update?: XOR<XOR<RVApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, RVApproverSettingUpdateWithoutApprover_proxyInput>, RVApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: SPRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: SPRApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: SPRApproverSettingWhereInput | boolean
    delete?: SPRApproverSettingWhereInput | boolean
    connect?: SPRApproverSettingWhereUniqueInput
    update?: XOR<XOR<SPRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, SPRApproverSettingUpdateWithoutApprover_proxyInput>, SPRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput = {
    create?: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    connectOrCreate?: RRApproverSettingCreateOrConnectWithoutApprover_proxyInput
    upsert?: RRApproverSettingUpsertWithoutApprover_proxyInput
    disconnect?: RRApproverSettingWhereInput | boolean
    delete?: RRApproverSettingWhereInput | boolean
    connect?: RRApproverSettingWhereUniqueInput
    update?: XOR<XOR<RRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput, RRApproverSettingUpdateWithoutApprover_proxyInput>, RRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput = {
    create?: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutEmployeeInput
    upsert?: UserEmployeeUpsertWithoutEmployeeInput
    disconnect?: UserEmployeeWhereInput | boolean
    delete?: UserEmployeeWhereInput | boolean
    connect?: UserEmployeeWhereUniqueInput
    update?: XOR<XOR<UserEmployeeUpdateToOneWithWhereWithoutEmployeeInput, UserEmployeeUpdateWithoutEmployeeInput>, UserEmployeeUncheckedUpdateWithoutEmployeeInput>
  }

  export type UserPermissionCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput> | UserPermissionCreateWithoutUserInput[] | UserPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutUserInput | UserPermissionCreateOrConnectWithoutUserInput[]
    createMany?: UserPermissionCreateManyUserInputEnvelope
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
  }

  export type UserEmployeeCreateNestedOneWithoutUserInput = {
    create?: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutUserInput
    connect?: UserEmployeeWhereUniqueInput
  }

  export type UserPermissionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput> | UserPermissionCreateWithoutUserInput[] | UserPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutUserInput | UserPermissionCreateOrConnectWithoutUserInput[]
    createMany?: UserPermissionCreateManyUserInputEnvelope
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
  }

  export type UserEmployeeUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutUserInput
    connect?: UserEmployeeWhereUniqueInput
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type UserPermissionUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput> | UserPermissionCreateWithoutUserInput[] | UserPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutUserInput | UserPermissionCreateOrConnectWithoutUserInput[]
    upsert?: UserPermissionUpsertWithWhereUniqueWithoutUserInput | UserPermissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPermissionCreateManyUserInputEnvelope
    set?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    disconnect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    delete?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    update?: UserPermissionUpdateWithWhereUniqueWithoutUserInput | UserPermissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPermissionUpdateManyWithWhereWithoutUserInput | UserPermissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
  }

  export type UserEmployeeUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutUserInput
    upsert?: UserEmployeeUpsertWithoutUserInput
    disconnect?: UserEmployeeWhereInput | boolean
    delete?: UserEmployeeWhereInput | boolean
    connect?: UserEmployeeWhereUniqueInput
    update?: XOR<XOR<UserEmployeeUpdateToOneWithWhereWithoutUserInput, UserEmployeeUpdateWithoutUserInput>, UserEmployeeUncheckedUpdateWithoutUserInput>
  }

  export type UserPermissionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput> | UserPermissionCreateWithoutUserInput[] | UserPermissionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutUserInput | UserPermissionCreateOrConnectWithoutUserInput[]
    upsert?: UserPermissionUpsertWithWhereUniqueWithoutUserInput | UserPermissionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UserPermissionCreateManyUserInputEnvelope
    set?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    disconnect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    delete?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    update?: UserPermissionUpdateWithWhereUniqueWithoutUserInput | UserPermissionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UserPermissionUpdateManyWithWhereWithoutUserInput | UserPermissionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
  }

  export type UserEmployeeUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserEmployeeCreateOrConnectWithoutUserInput
    upsert?: UserEmployeeUpsertWithoutUserInput
    disconnect?: UserEmployeeWhereInput | boolean
    delete?: UserEmployeeWhereInput | boolean
    connect?: UserEmployeeWhereUniqueInput
    update?: XOR<XOR<UserEmployeeUpdateToOneWithWhereWithoutUserInput, UserEmployeeUpdateWithoutUserInput>, UserEmployeeUncheckedUpdateWithoutUserInput>
  }

  export type UserCreateNestedOneWithoutUser_employeeInput = {
    create?: XOR<UserCreateWithoutUser_employeeInput, UserUncheckedCreateWithoutUser_employeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_employeeInput
    connect?: UserWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutUser_employeeInput = {
    create?: XOR<EmployeeCreateWithoutUser_employeeInput, EmployeeUncheckedCreateWithoutUser_employeeInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUser_employeeInput
    connect?: EmployeeWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUser_employeeNestedInput = {
    create?: XOR<UserCreateWithoutUser_employeeInput, UserUncheckedCreateWithoutUser_employeeInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_employeeInput
    upsert?: UserUpsertWithoutUser_employeeInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUser_employeeInput, UserUpdateWithoutUser_employeeInput>, UserUncheckedUpdateWithoutUser_employeeInput>
  }

  export type EmployeeUpdateOneRequiredWithoutUser_employeeNestedInput = {
    create?: XOR<EmployeeCreateWithoutUser_employeeInput, EmployeeUncheckedCreateWithoutUser_employeeInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutUser_employeeInput
    upsert?: EmployeeUpsertWithoutUser_employeeInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutUser_employeeInput, EmployeeUpdateWithoutUser_employeeInput>, EmployeeUncheckedUpdateWithoutUser_employeeInput>
  }

  export type UserCreateNestedOneWithoutUser_permissionsInput = {
    create?: XOR<UserCreateWithoutUser_permissionsInput, UserUncheckedCreateWithoutUser_permissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_permissionsInput
    connect?: UserWhereUniqueInput
  }

  export type ModuleCreateNestedOneWithoutUser_permissionsInput = {
    create?: XOR<ModuleCreateWithoutUser_permissionsInput, ModuleUncheckedCreateWithoutUser_permissionsInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutUser_permissionsInput
    connect?: ModuleWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutUser_permissionsNestedInput = {
    create?: XOR<UserCreateWithoutUser_permissionsInput, UserUncheckedCreateWithoutUser_permissionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUser_permissionsInput
    upsert?: UserUpsertWithoutUser_permissionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUser_permissionsInput, UserUpdateWithoutUser_permissionsInput>, UserUncheckedUpdateWithoutUser_permissionsInput>
  }

  export type ModuleUpdateOneRequiredWithoutUser_permissionsNestedInput = {
    create?: XOR<ModuleCreateWithoutUser_permissionsInput, ModuleUncheckedCreateWithoutUser_permissionsInput>
    connectOrCreate?: ModuleCreateOrConnectWithoutUser_permissionsInput
    upsert?: ModuleUpsertWithoutUser_permissionsInput
    connect?: ModuleWhereUniqueInput
    update?: XOR<XOR<ModuleUpdateToOneWithWhereWithoutUser_permissionsInput, ModuleUpdateWithoutUser_permissionsInput>, ModuleUncheckedUpdateWithoutUser_permissionsInput>
  }

  export type FeatureCreateNestedManyWithoutServiceInput = {
    create?: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput> | FeatureCreateWithoutServiceInput[] | FeatureUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FeatureCreateOrConnectWithoutServiceInput | FeatureCreateOrConnectWithoutServiceInput[]
    createMany?: FeatureCreateManyServiceInputEnvelope
    connect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
  }

  export type FeatureUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput> | FeatureCreateWithoutServiceInput[] | FeatureUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FeatureCreateOrConnectWithoutServiceInput | FeatureCreateOrConnectWithoutServiceInput[]
    createMany?: FeatureCreateManyServiceInputEnvelope
    connect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
  }

  export type FeatureUpdateManyWithoutServiceNestedInput = {
    create?: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput> | FeatureCreateWithoutServiceInput[] | FeatureUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FeatureCreateOrConnectWithoutServiceInput | FeatureCreateOrConnectWithoutServiceInput[]
    upsert?: FeatureUpsertWithWhereUniqueWithoutServiceInput | FeatureUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: FeatureCreateManyServiceInputEnvelope
    set?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    disconnect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    delete?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    connect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    update?: FeatureUpdateWithWhereUniqueWithoutServiceInput | FeatureUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: FeatureUpdateManyWithWhereWithoutServiceInput | FeatureUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: FeatureScalarWhereInput | FeatureScalarWhereInput[]
  }

  export type FeatureUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput> | FeatureCreateWithoutServiceInput[] | FeatureUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: FeatureCreateOrConnectWithoutServiceInput | FeatureCreateOrConnectWithoutServiceInput[]
    upsert?: FeatureUpsertWithWhereUniqueWithoutServiceInput | FeatureUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: FeatureCreateManyServiceInputEnvelope
    set?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    disconnect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    delete?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    connect?: FeatureWhereUniqueInput | FeatureWhereUniqueInput[]
    update?: FeatureUpdateWithWhereUniqueWithoutServiceInput | FeatureUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: FeatureUpdateManyWithWhereWithoutServiceInput | FeatureUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: FeatureScalarWhereInput | FeatureScalarWhereInput[]
  }

  export type ServiceCreateNestedOneWithoutFeaturesInput = {
    create?: XOR<ServiceCreateWithoutFeaturesInput, ServiceUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutFeaturesInput
    connect?: ServiceWhereUniqueInput
  }

  export type ModuleCreateNestedManyWithoutFeatureInput = {
    create?: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput> | ModuleCreateWithoutFeatureInput[] | ModuleUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: ModuleCreateOrConnectWithoutFeatureInput | ModuleCreateOrConnectWithoutFeatureInput[]
    createMany?: ModuleCreateManyFeatureInputEnvelope
    connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
  }

  export type ModuleUncheckedCreateNestedManyWithoutFeatureInput = {
    create?: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput> | ModuleCreateWithoutFeatureInput[] | ModuleUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: ModuleCreateOrConnectWithoutFeatureInput | ModuleCreateOrConnectWithoutFeatureInput[]
    createMany?: ModuleCreateManyFeatureInputEnvelope
    connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
  }

  export type ServiceUpdateOneRequiredWithoutFeaturesNestedInput = {
    create?: XOR<ServiceCreateWithoutFeaturesInput, ServiceUncheckedCreateWithoutFeaturesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutFeaturesInput
    upsert?: ServiceUpsertWithoutFeaturesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutFeaturesInput, ServiceUpdateWithoutFeaturesInput>, ServiceUncheckedUpdateWithoutFeaturesInput>
  }

  export type ModuleUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput> | ModuleCreateWithoutFeatureInput[] | ModuleUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: ModuleCreateOrConnectWithoutFeatureInput | ModuleCreateOrConnectWithoutFeatureInput[]
    upsert?: ModuleUpsertWithWhereUniqueWithoutFeatureInput | ModuleUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: ModuleCreateManyFeatureInputEnvelope
    set?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    disconnect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    delete?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    update?: ModuleUpdateWithWhereUniqueWithoutFeatureInput | ModuleUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: ModuleUpdateManyWithWhereWithoutFeatureInput | ModuleUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: ModuleScalarWhereInput | ModuleScalarWhereInput[]
  }

  export type ModuleUncheckedUpdateManyWithoutFeatureNestedInput = {
    create?: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput> | ModuleCreateWithoutFeatureInput[] | ModuleUncheckedCreateWithoutFeatureInput[]
    connectOrCreate?: ModuleCreateOrConnectWithoutFeatureInput | ModuleCreateOrConnectWithoutFeatureInput[]
    upsert?: ModuleUpsertWithWhereUniqueWithoutFeatureInput | ModuleUpsertWithWhereUniqueWithoutFeatureInput[]
    createMany?: ModuleCreateManyFeatureInputEnvelope
    set?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    disconnect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    delete?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    connect?: ModuleWhereUniqueInput | ModuleWhereUniqueInput[]
    update?: ModuleUpdateWithWhereUniqueWithoutFeatureInput | ModuleUpdateWithWhereUniqueWithoutFeatureInput[]
    updateMany?: ModuleUpdateManyWithWhereWithoutFeatureInput | ModuleUpdateManyWithWhereWithoutFeatureInput[]
    deleteMany?: ModuleScalarWhereInput | ModuleScalarWhereInput[]
  }

  export type FeatureCreateNestedOneWithoutModulesInput = {
    create?: XOR<FeatureCreateWithoutModulesInput, FeatureUncheckedCreateWithoutModulesInput>
    connectOrCreate?: FeatureCreateOrConnectWithoutModulesInput
    connect?: FeatureWhereUniqueInput
  }

  export type UserPermissionCreateNestedManyWithoutModuleInput = {
    create?: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput> | UserPermissionCreateWithoutModuleInput[] | UserPermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutModuleInput | UserPermissionCreateOrConnectWithoutModuleInput[]
    createMany?: UserPermissionCreateManyModuleInputEnvelope
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
  }

  export type UserPermissionUncheckedCreateNestedManyWithoutModuleInput = {
    create?: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput> | UserPermissionCreateWithoutModuleInput[] | UserPermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutModuleInput | UserPermissionCreateOrConnectWithoutModuleInput[]
    createMany?: UserPermissionCreateManyModuleInputEnvelope
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
  }

  export type FeatureUpdateOneRequiredWithoutModulesNestedInput = {
    create?: XOR<FeatureCreateWithoutModulesInput, FeatureUncheckedCreateWithoutModulesInput>
    connectOrCreate?: FeatureCreateOrConnectWithoutModulesInput
    upsert?: FeatureUpsertWithoutModulesInput
    connect?: FeatureWhereUniqueInput
    update?: XOR<XOR<FeatureUpdateToOneWithWhereWithoutModulesInput, FeatureUpdateWithoutModulesInput>, FeatureUncheckedUpdateWithoutModulesInput>
  }

  export type UserPermissionUpdateManyWithoutModuleNestedInput = {
    create?: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput> | UserPermissionCreateWithoutModuleInput[] | UserPermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutModuleInput | UserPermissionCreateOrConnectWithoutModuleInput[]
    upsert?: UserPermissionUpsertWithWhereUniqueWithoutModuleInput | UserPermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: UserPermissionCreateManyModuleInputEnvelope
    set?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    disconnect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    delete?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    update?: UserPermissionUpdateWithWhereUniqueWithoutModuleInput | UserPermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: UserPermissionUpdateManyWithWhereWithoutModuleInput | UserPermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
  }

  export type UserPermissionUncheckedUpdateManyWithoutModuleNestedInput = {
    create?: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput> | UserPermissionCreateWithoutModuleInput[] | UserPermissionUncheckedCreateWithoutModuleInput[]
    connectOrCreate?: UserPermissionCreateOrConnectWithoutModuleInput | UserPermissionCreateOrConnectWithoutModuleInput[]
    upsert?: UserPermissionUpsertWithWhereUniqueWithoutModuleInput | UserPermissionUpsertWithWhereUniqueWithoutModuleInput[]
    createMany?: UserPermissionCreateManyModuleInputEnvelope
    set?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    disconnect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    delete?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    connect?: UserPermissionWhereUniqueInput | UserPermissionWhereUniqueInput[]
    update?: UserPermissionUpdateWithWhereUniqueWithoutModuleInput | UserPermissionUpdateWithWhereUniqueWithoutModuleInput[]
    updateMany?: UserPermissionUpdateManyWithWhereWithoutModuleInput | UserPermissionUpdateManyWithWhereWithoutModuleInput[]
    deleteMany?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
  }

  export type EmployeeCreateNestedOneWithoutJo_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutJo_approver_settingInput, EmployeeUncheckedCreateWithoutJo_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutJo_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutJo_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutJo_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutJo_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutJo_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutJo_approver_settingInput, EmployeeUncheckedCreateWithoutJo_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutJo_approver_settingInput
    upsert?: EmployeeUpsertWithoutJo_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutJo_approver_settingInput, EmployeeUpdateWithoutJo_approver_settingInput>, EmployeeUncheckedUpdateWithoutJo_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutJo_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutJo_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutJo_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutJo_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutJo_approver_proxy_settingInput, EmployeeUpdateWithoutJo_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutJo_approver_proxy_settingInput>
  }

  export type EmployeeCreateNestedOneWithoutRv_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutRv_approver_settingInput, EmployeeUncheckedCreateWithoutRv_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRv_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutRv_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRv_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRv_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutRv_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutRv_approver_settingInput, EmployeeUncheckedCreateWithoutRv_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRv_approver_settingInput
    upsert?: EmployeeUpsertWithoutRv_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRv_approver_settingInput, EmployeeUpdateWithoutRv_approver_settingInput>, EmployeeUncheckedUpdateWithoutRv_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutRv_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRv_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRv_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutRv_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRv_approver_proxy_settingInput, EmployeeUpdateWithoutRv_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutRv_approver_proxy_settingInput>
  }

  export type EmployeeCreateNestedOneWithoutSpr_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutSpr_approver_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSpr_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutSpr_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSpr_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutSpr_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutSpr_approver_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSpr_approver_settingInput
    upsert?: EmployeeUpsertWithoutSpr_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSpr_approver_settingInput, EmployeeUpdateWithoutSpr_approver_settingInput>, EmployeeUncheckedUpdateWithoutSpr_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutSpr_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutSpr_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutSpr_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutSpr_approver_proxy_settingInput, EmployeeUpdateWithoutSpr_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutSpr_approver_proxy_settingInput>
  }

  export type EmployeeCreateNestedOneWithoutMeqs_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutMeqs_approver_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutMeqs_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutMeqs_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutMeqs_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutMeqs_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutMeqs_approver_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutMeqs_approver_settingInput
    upsert?: EmployeeUpsertWithoutMeqs_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutMeqs_approver_settingInput, EmployeeUpdateWithoutMeqs_approver_settingInput>, EmployeeUncheckedUpdateWithoutMeqs_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutMeqs_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutMeqs_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutMeqs_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutMeqs_approver_proxy_settingInput, EmployeeUpdateWithoutMeqs_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutMeqs_approver_proxy_settingInput>
  }

  export type EmployeeCreateNestedOneWithoutPo_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutPo_approver_settingInput, EmployeeUncheckedCreateWithoutPo_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutPo_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutPo_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutPo_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutPo_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutPo_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutPo_approver_settingInput, EmployeeUncheckedCreateWithoutPo_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutPo_approver_settingInput
    upsert?: EmployeeUpsertWithoutPo_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutPo_approver_settingInput, EmployeeUpdateWithoutPo_approver_settingInput>, EmployeeUncheckedUpdateWithoutPo_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutPo_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutPo_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutPo_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutPo_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutPo_approver_proxy_settingInput, EmployeeUpdateWithoutPo_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutPo_approver_proxy_settingInput>
  }

  export type EmployeeCreateNestedOneWithoutRr_approver_settingInput = {
    create?: XOR<EmployeeCreateWithoutRr_approver_settingInput, EmployeeUncheckedCreateWithoutRr_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRr_approver_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeCreateNestedOneWithoutRr_approver_proxy_settingInput = {
    create?: XOR<EmployeeCreateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRr_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRr_approver_proxy_settingInput
    connect?: EmployeeWhereUniqueInput
  }

  export type EmployeeUpdateOneRequiredWithoutRr_approver_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutRr_approver_settingInput, EmployeeUncheckedCreateWithoutRr_approver_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRr_approver_settingInput
    upsert?: EmployeeUpsertWithoutRr_approver_settingInput
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRr_approver_settingInput, EmployeeUpdateWithoutRr_approver_settingInput>, EmployeeUncheckedUpdateWithoutRr_approver_settingInput>
  }

  export type EmployeeUpdateOneWithoutRr_approver_proxy_settingNestedInput = {
    create?: XOR<EmployeeCreateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRr_approver_proxy_settingInput>
    connectOrCreate?: EmployeeCreateOrConnectWithoutRr_approver_proxy_settingInput
    upsert?: EmployeeUpsertWithoutRr_approver_proxy_settingInput
    disconnect?: EmployeeWhereInput | boolean
    delete?: EmployeeWhereInput | boolean
    connect?: EmployeeWhereUniqueInput
    update?: XOR<XOR<EmployeeUpdateToOneWithWhereWithoutRr_approver_proxy_settingInput, EmployeeUpdateWithoutRr_approver_proxy_settingInput>, EmployeeUncheckedUpdateWithoutRr_approver_proxy_settingInput>
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

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
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

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
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

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DepartmentCreateWithoutDivisionInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DepartmentUncheckedCreateWithoutDivisionInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DepartmentCreateOrConnectWithoutDivisionInput = {
    where: DepartmentWhereUniqueInput
    create: XOR<DepartmentCreateWithoutDivisionInput, DepartmentUncheckedCreateWithoutDivisionInput>
  }

  export type DepartmentUpsertWithoutDivisionInput = {
    update: XOR<DepartmentUpdateWithoutDivisionInput, DepartmentUncheckedUpdateWithoutDivisionInput>
    create: XOR<DepartmentCreateWithoutDivisionInput, DepartmentUncheckedCreateWithoutDivisionInput>
    where?: DepartmentWhereInput
  }

  export type DepartmentUpdateToOneWithWhereWithoutDivisionInput = {
    where?: DepartmentWhereInput
    data: XOR<DepartmentUpdateWithoutDivisionInput, DepartmentUncheckedUpdateWithoutDivisionInput>
  }

  export type DepartmentUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DepartmentUncheckedUpdateWithoutDivisionInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DivisionCreateWithoutDepartmentInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DivisionUncheckedCreateWithoutDepartmentInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DivisionCreateOrConnectWithoutDepartmentInput = {
    where: DivisionWhereUniqueInput
    create: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput>
  }

  export type DivisionCreateManyDepartmentInputEnvelope = {
    data: DivisionCreateManyDepartmentInput | DivisionCreateManyDepartmentInput[]
    skipDuplicates?: boolean
  }

  export type DivisionUpsertWithWhereUniqueWithoutDepartmentInput = {
    where: DivisionWhereUniqueInput
    update: XOR<DivisionUpdateWithoutDepartmentInput, DivisionUncheckedUpdateWithoutDepartmentInput>
    create: XOR<DivisionCreateWithoutDepartmentInput, DivisionUncheckedCreateWithoutDepartmentInput>
  }

  export type DivisionUpdateWithWhereUniqueWithoutDepartmentInput = {
    where: DivisionWhereUniqueInput
    data: XOR<DivisionUpdateWithoutDepartmentInput, DivisionUncheckedUpdateWithoutDepartmentInput>
  }

  export type DivisionUpdateManyWithWhereWithoutDepartmentInput = {
    where: DivisionScalarWhereInput
    data: XOR<DivisionUpdateManyMutationInput, DivisionUncheckedUpdateManyWithoutDepartmentInput>
  }

  export type DivisionScalarWhereInput = {
    AND?: DivisionScalarWhereInput | DivisionScalarWhereInput[]
    OR?: DivisionScalarWhereInput[]
    NOT?: DivisionScalarWhereInput | DivisionScalarWhereInput[]
    id?: StringFilter<"Division"> | string
    department_id?: StringFilter<"Division"> | string
    code?: StringFilter<"Division"> | string
    name?: StringFilter<"Division"> | string
    status?: IntFilter<"Division"> | number
    created_at?: DateTimeFilter<"Division"> | Date | string
    updated_at?: DateTimeFilter<"Division"> | Date | string
    is_deleted?: BoolFilter<"Division"> | boolean
  }

  export type JOApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutJo_approver_proxy_settingInput
  }

  export type JOApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    approver_proxy_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type JOApproverSettingCreateOrConnectWithoutApproverInput = {
    where: JOApproverSettingWhereUniqueInput
    create: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type MEQSApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutMeqs_approver_proxy_settingInput
  }

  export type MEQSApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type MEQSApproverSettingCreateOrConnectWithoutApproverInput = {
    where: MEQSApproverSettingWhereUniqueInput
    create: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type POApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutPo_approver_proxy_settingInput
  }

  export type POApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type POApproverSettingCreateOrConnectWithoutApproverInput = {
    where: POApproverSettingWhereUniqueInput
    create: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type RVApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutRv_approver_proxy_settingInput
  }

  export type RVApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RVApproverSettingCreateOrConnectWithoutApproverInput = {
    where: RVApproverSettingWhereUniqueInput
    create: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type SPRApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutSpr_approver_proxy_settingInput
  }

  export type SPRApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type SPRApproverSettingCreateOrConnectWithoutApproverInput = {
    where: SPRApproverSettingWhereUniqueInput
    create: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type RRApproverSettingCreateWithoutApproverInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver_proxy?: EmployeeCreateNestedOneWithoutRr_approver_proxy_settingInput
  }

  export type RRApproverSettingUncheckedCreateWithoutApproverInput = {
    id?: string
    approver_proxy_id?: string | null
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RRApproverSettingCreateOrConnectWithoutApproverInput = {
    where: RRApproverSettingWhereUniqueInput
    create: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
  }

  export type JOApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutJo_approver_settingInput
  }

  export type JOApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    approver_id: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type JOApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: JOApproverSettingWhereUniqueInput
    create: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type MEQSApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutMeqs_approver_settingInput
  }

  export type MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    approver_id: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type MEQSApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: MEQSApproverSettingWhereUniqueInput
    create: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type POApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutPo_approver_settingInput
  }

  export type POApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    approver_id: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type POApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: POApproverSettingWhereUniqueInput
    create: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type RVApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutRv_approver_settingInput
  }

  export type RVApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    approver_id: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RVApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: RVApproverSettingWhereUniqueInput
    create: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type SPRApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutSpr_approver_settingInput
  }

  export type SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    approver_id: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type SPRApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: SPRApproverSettingWhereUniqueInput
    create: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type RRApproverSettingCreateWithoutApprover_proxyInput = {
    id?: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    approver: EmployeeCreateNestedOneWithoutRr_approver_settingInput
  }

  export type RRApproverSettingUncheckedCreateWithoutApprover_proxyInput = {
    id?: string
    approver_id: string
    label: string
    order: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type RRApproverSettingCreateOrConnectWithoutApprover_proxyInput = {
    where: RRApproverSettingWhereUniqueInput
    create: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
  }

  export type UserEmployeeCreateWithoutEmployeeInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user: UserCreateNestedOneWithoutUser_employeeInput
  }

  export type UserEmployeeUncheckedCreateWithoutEmployeeInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type UserEmployeeCreateOrConnectWithoutEmployeeInput = {
    where: UserEmployeeWhereUniqueInput
    create: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
  }

  export type JOApproverSettingUpsertWithoutApproverInput = {
    update: XOR<JOApproverSettingUpdateWithoutApproverInput, JOApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<JOApproverSettingCreateWithoutApproverInput, JOApproverSettingUncheckedCreateWithoutApproverInput>
    where?: JOApproverSettingWhereInput
  }

  export type JOApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: JOApproverSettingWhereInput
    data: XOR<JOApproverSettingUpdateWithoutApproverInput, JOApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type JOApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutJo_approver_proxy_settingNestedInput
  }

  export type JOApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MEQSApproverSettingUpsertWithoutApproverInput = {
    update: XOR<MEQSApproverSettingUpdateWithoutApproverInput, MEQSApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<MEQSApproverSettingCreateWithoutApproverInput, MEQSApproverSettingUncheckedCreateWithoutApproverInput>
    where?: MEQSApproverSettingWhereInput
  }

  export type MEQSApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: MEQSApproverSettingWhereInput
    data: XOR<MEQSApproverSettingUpdateWithoutApproverInput, MEQSApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type MEQSApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutMeqs_approver_proxy_settingNestedInput
  }

  export type MEQSApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type POApproverSettingUpsertWithoutApproverInput = {
    update: XOR<POApproverSettingUpdateWithoutApproverInput, POApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<POApproverSettingCreateWithoutApproverInput, POApproverSettingUncheckedCreateWithoutApproverInput>
    where?: POApproverSettingWhereInput
  }

  export type POApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: POApproverSettingWhereInput
    data: XOR<POApproverSettingUpdateWithoutApproverInput, POApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type POApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutPo_approver_proxy_settingNestedInput
  }

  export type POApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RVApproverSettingUpsertWithoutApproverInput = {
    update: XOR<RVApproverSettingUpdateWithoutApproverInput, RVApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<RVApproverSettingCreateWithoutApproverInput, RVApproverSettingUncheckedCreateWithoutApproverInput>
    where?: RVApproverSettingWhereInput
  }

  export type RVApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: RVApproverSettingWhereInput
    data: XOR<RVApproverSettingUpdateWithoutApproverInput, RVApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RVApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutRv_approver_proxy_settingNestedInput
  }

  export type RVApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SPRApproverSettingUpsertWithoutApproverInput = {
    update: XOR<SPRApproverSettingUpdateWithoutApproverInput, SPRApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<SPRApproverSettingCreateWithoutApproverInput, SPRApproverSettingUncheckedCreateWithoutApproverInput>
    where?: SPRApproverSettingWhereInput
  }

  export type SPRApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: SPRApproverSettingWhereInput
    data: XOR<SPRApproverSettingUpdateWithoutApproverInput, SPRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type SPRApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutSpr_approver_proxy_settingNestedInput
  }

  export type SPRApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RRApproverSettingUpsertWithoutApproverInput = {
    update: XOR<RRApproverSettingUpdateWithoutApproverInput, RRApproverSettingUncheckedUpdateWithoutApproverInput>
    create: XOR<RRApproverSettingCreateWithoutApproverInput, RRApproverSettingUncheckedCreateWithoutApproverInput>
    where?: RRApproverSettingWhereInput
  }

  export type RRApproverSettingUpdateToOneWithWhereWithoutApproverInput = {
    where?: RRApproverSettingWhereInput
    data: XOR<RRApproverSettingUpdateWithoutApproverInput, RRApproverSettingUncheckedUpdateWithoutApproverInput>
  }

  export type RRApproverSettingUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver_proxy?: EmployeeUpdateOneWithoutRr_approver_proxy_settingNestedInput
  }

  export type RRApproverSettingUncheckedUpdateWithoutApproverInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_proxy_id?: NullableStringFieldUpdateOperationsInput | string | null
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type JOApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<JOApproverSettingUpdateWithoutApprover_proxyInput, JOApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<JOApproverSettingCreateWithoutApprover_proxyInput, JOApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: JOApproverSettingWhereInput
  }

  export type JOApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: JOApproverSettingWhereInput
    data: XOR<JOApproverSettingUpdateWithoutApprover_proxyInput, JOApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type JOApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutJo_approver_settingNestedInput
  }

  export type JOApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    approver_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MEQSApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<MEQSApproverSettingUpdateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<MEQSApproverSettingCreateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: MEQSApproverSettingWhereInput
  }

  export type MEQSApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: MEQSApproverSettingWhereInput
    data: XOR<MEQSApproverSettingUpdateWithoutApprover_proxyInput, MEQSApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type MEQSApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutMeqs_approver_settingNestedInput
  }

  export type MEQSApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type POApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<POApproverSettingUpdateWithoutApprover_proxyInput, POApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<POApproverSettingCreateWithoutApprover_proxyInput, POApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: POApproverSettingWhereInput
  }

  export type POApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: POApproverSettingWhereInput
    data: XOR<POApproverSettingUpdateWithoutApprover_proxyInput, POApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type POApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutPo_approver_settingNestedInput
  }

  export type POApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RVApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<RVApproverSettingUpdateWithoutApprover_proxyInput, RVApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<RVApproverSettingCreateWithoutApprover_proxyInput, RVApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: RVApproverSettingWhereInput
  }

  export type RVApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: RVApproverSettingWhereInput
    data: XOR<RVApproverSettingUpdateWithoutApprover_proxyInput, RVApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RVApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutRv_approver_settingNestedInput
  }

  export type RVApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SPRApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<SPRApproverSettingUpdateWithoutApprover_proxyInput, SPRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<SPRApproverSettingCreateWithoutApprover_proxyInput, SPRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: SPRApproverSettingWhereInput
  }

  export type SPRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: SPRApproverSettingWhereInput
    data: XOR<SPRApproverSettingUpdateWithoutApprover_proxyInput, SPRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type SPRApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutSpr_approver_settingNestedInput
  }

  export type SPRApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RRApproverSettingUpsertWithoutApprover_proxyInput = {
    update: XOR<RRApproverSettingUpdateWithoutApprover_proxyInput, RRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
    create: XOR<RRApproverSettingCreateWithoutApprover_proxyInput, RRApproverSettingUncheckedCreateWithoutApprover_proxyInput>
    where?: RRApproverSettingWhereInput
  }

  export type RRApproverSettingUpdateToOneWithWhereWithoutApprover_proxyInput = {
    where?: RRApproverSettingWhereInput
    data: XOR<RRApproverSettingUpdateWithoutApprover_proxyInput, RRApproverSettingUncheckedUpdateWithoutApprover_proxyInput>
  }

  export type RRApproverSettingUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    approver?: EmployeeUpdateOneRequiredWithoutRr_approver_settingNestedInput
  }

  export type RRApproverSettingUncheckedUpdateWithoutApprover_proxyInput = {
    id?: StringFieldUpdateOperationsInput | string
    approver_id?: StringFieldUpdateOperationsInput | string
    label?: StringFieldUpdateOperationsInput | string
    order?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserEmployeeUpsertWithoutEmployeeInput = {
    update: XOR<UserEmployeeUpdateWithoutEmployeeInput, UserEmployeeUncheckedUpdateWithoutEmployeeInput>
    create: XOR<UserEmployeeCreateWithoutEmployeeInput, UserEmployeeUncheckedCreateWithoutEmployeeInput>
    where?: UserEmployeeWhereInput
  }

  export type UserEmployeeUpdateToOneWithWhereWithoutEmployeeInput = {
    where?: UserEmployeeWhereInput
    data: XOR<UserEmployeeUpdateWithoutEmployeeInput, UserEmployeeUncheckedUpdateWithoutEmployeeInput>
  }

  export type UserEmployeeUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutUser_employeeNestedInput
  }

  export type UserEmployeeUncheckedUpdateWithoutEmployeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserPermissionCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    module: ModuleCreateNestedOneWithoutUser_permissionsInput
  }

  export type UserPermissionUncheckedCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    module_id: string
  }

  export type UserPermissionCreateOrConnectWithoutUserInput = {
    where: UserPermissionWhereUniqueInput
    create: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput>
  }

  export type UserPermissionCreateManyUserInputEnvelope = {
    data: UserPermissionCreateManyUserInput | UserPermissionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type UserEmployeeCreateWithoutUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    employee: EmployeeCreateNestedOneWithoutUser_employeeInput
  }

  export type UserEmployeeUncheckedCreateWithoutUserInput = {
    id?: string
    employee_id: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type UserEmployeeCreateOrConnectWithoutUserInput = {
    where: UserEmployeeWhereUniqueInput
    create: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
  }

  export type UserPermissionUpsertWithWhereUniqueWithoutUserInput = {
    where: UserPermissionWhereUniqueInput
    update: XOR<UserPermissionUpdateWithoutUserInput, UserPermissionUncheckedUpdateWithoutUserInput>
    create: XOR<UserPermissionCreateWithoutUserInput, UserPermissionUncheckedCreateWithoutUserInput>
  }

  export type UserPermissionUpdateWithWhereUniqueWithoutUserInput = {
    where: UserPermissionWhereUniqueInput
    data: XOR<UserPermissionUpdateWithoutUserInput, UserPermissionUncheckedUpdateWithoutUserInput>
  }

  export type UserPermissionUpdateManyWithWhereWithoutUserInput = {
    where: UserPermissionScalarWhereInput
    data: XOR<UserPermissionUpdateManyMutationInput, UserPermissionUncheckedUpdateManyWithoutUserInput>
  }

  export type UserPermissionScalarWhereInput = {
    AND?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
    OR?: UserPermissionScalarWhereInput[]
    NOT?: UserPermissionScalarWhereInput | UserPermissionScalarWhereInput[]
    id?: StringFilter<"UserPermission"> | string
    created_at?: DateTimeFilter<"UserPermission"> | Date | string
    updated_at?: DateTimeFilter<"UserPermission"> | Date | string
    is_deleted?: BoolFilter<"UserPermission"> | boolean
    user_id?: StringFilter<"UserPermission"> | string
    module_id?: StringFilter<"UserPermission"> | string
  }

  export type UserEmployeeUpsertWithoutUserInput = {
    update: XOR<UserEmployeeUpdateWithoutUserInput, UserEmployeeUncheckedUpdateWithoutUserInput>
    create: XOR<UserEmployeeCreateWithoutUserInput, UserEmployeeUncheckedCreateWithoutUserInput>
    where?: UserEmployeeWhereInput
  }

  export type UserEmployeeUpdateToOneWithWhereWithoutUserInput = {
    where?: UserEmployeeWhereInput
    data: XOR<UserEmployeeUpdateWithoutUserInput, UserEmployeeUncheckedUpdateWithoutUserInput>
  }

  export type UserEmployeeUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    employee?: EmployeeUpdateOneRequiredWithoutUser_employeeNestedInput
  }

  export type UserEmployeeUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    employee_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateWithoutUser_employeeInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUser_employeeInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUser_employeeInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUser_employeeInput, UserUncheckedCreateWithoutUser_employeeInput>
  }

  export type EmployeeCreateWithoutUser_employeeInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
  }

  export type EmployeeUncheckedCreateWithoutUser_employeeInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
  }

  export type EmployeeCreateOrConnectWithoutUser_employeeInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutUser_employeeInput, EmployeeUncheckedCreateWithoutUser_employeeInput>
  }

  export type UserUpsertWithoutUser_employeeInput = {
    update: XOR<UserUpdateWithoutUser_employeeInput, UserUncheckedUpdateWithoutUser_employeeInput>
    create: XOR<UserCreateWithoutUser_employeeInput, UserUncheckedCreateWithoutUser_employeeInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUser_employeeInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUser_employeeInput, UserUncheckedUpdateWithoutUser_employeeInput>
  }

  export type UserUpdateWithoutUser_employeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUser_employeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type EmployeeUpsertWithoutUser_employeeInput = {
    update: XOR<EmployeeUpdateWithoutUser_employeeInput, EmployeeUncheckedUpdateWithoutUser_employeeInput>
    create: XOR<EmployeeCreateWithoutUser_employeeInput, EmployeeUncheckedCreateWithoutUser_employeeInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutUser_employeeInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutUser_employeeInput, EmployeeUncheckedUpdateWithoutUser_employeeInput>
  }

  export type EmployeeUpdateWithoutUser_employeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutUser_employeeInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
  }

  export type UserCreateWithoutUser_permissionsInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_employee?: UserEmployeeCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUser_permissionsInput = {
    id?: string
    role?: $Enums.Role
    username: string
    password: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUser_permissionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUser_permissionsInput, UserUncheckedCreateWithoutUser_permissionsInput>
  }

  export type ModuleCreateWithoutUser_permissionsInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    feature: FeatureCreateNestedOneWithoutModulesInput
  }

  export type ModuleUncheckedCreateWithoutUser_permissionsInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    feature_id: string
  }

  export type ModuleCreateOrConnectWithoutUser_permissionsInput = {
    where: ModuleWhereUniqueInput
    create: XOR<ModuleCreateWithoutUser_permissionsInput, ModuleUncheckedCreateWithoutUser_permissionsInput>
  }

  export type UserUpsertWithoutUser_permissionsInput = {
    update: XOR<UserUpdateWithoutUser_permissionsInput, UserUncheckedUpdateWithoutUser_permissionsInput>
    create: XOR<UserCreateWithoutUser_permissionsInput, UserUncheckedCreateWithoutUser_permissionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUser_permissionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUser_permissionsInput, UserUncheckedUpdateWithoutUser_permissionsInput>
  }

  export type UserUpdateWithoutUser_permissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_employee?: UserEmployeeUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUser_permissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutUserNestedInput
  }

  export type ModuleUpsertWithoutUser_permissionsInput = {
    update: XOR<ModuleUpdateWithoutUser_permissionsInput, ModuleUncheckedUpdateWithoutUser_permissionsInput>
    create: XOR<ModuleCreateWithoutUser_permissionsInput, ModuleUncheckedCreateWithoutUser_permissionsInput>
    where?: ModuleWhereInput
  }

  export type ModuleUpdateToOneWithWhereWithoutUser_permissionsInput = {
    where?: ModuleWhereInput
    data: XOR<ModuleUpdateWithoutUser_permissionsInput, ModuleUncheckedUpdateWithoutUser_permissionsInput>
  }

  export type ModuleUpdateWithoutUser_permissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    feature?: FeatureUpdateOneRequiredWithoutModulesNestedInput
  }

  export type ModuleUncheckedUpdateWithoutUser_permissionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    feature_id?: StringFieldUpdateOperationsInput | string
  }

  export type FeatureCreateWithoutServiceInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    modules?: ModuleCreateNestedManyWithoutFeatureInput
  }

  export type FeatureUncheckedCreateWithoutServiceInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    modules?: ModuleUncheckedCreateNestedManyWithoutFeatureInput
  }

  export type FeatureCreateOrConnectWithoutServiceInput = {
    where: FeatureWhereUniqueInput
    create: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput>
  }

  export type FeatureCreateManyServiceInputEnvelope = {
    data: FeatureCreateManyServiceInput | FeatureCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type FeatureUpsertWithWhereUniqueWithoutServiceInput = {
    where: FeatureWhereUniqueInput
    update: XOR<FeatureUpdateWithoutServiceInput, FeatureUncheckedUpdateWithoutServiceInput>
    create: XOR<FeatureCreateWithoutServiceInput, FeatureUncheckedCreateWithoutServiceInput>
  }

  export type FeatureUpdateWithWhereUniqueWithoutServiceInput = {
    where: FeatureWhereUniqueInput
    data: XOR<FeatureUpdateWithoutServiceInput, FeatureUncheckedUpdateWithoutServiceInput>
  }

  export type FeatureUpdateManyWithWhereWithoutServiceInput = {
    where: FeatureScalarWhereInput
    data: XOR<FeatureUpdateManyMutationInput, FeatureUncheckedUpdateManyWithoutServiceInput>
  }

  export type FeatureScalarWhereInput = {
    AND?: FeatureScalarWhereInput | FeatureScalarWhereInput[]
    OR?: FeatureScalarWhereInput[]
    NOT?: FeatureScalarWhereInput | FeatureScalarWhereInput[]
    id?: StringFilter<"Feature"> | string
    name?: StringFilter<"Feature"> | string
    created_at?: DateTimeFilter<"Feature"> | Date | string
    updated_at?: DateTimeFilter<"Feature"> | Date | string
    is_deleted?: BoolFilter<"Feature"> | boolean
    service_id?: StringFilter<"Feature"> | string
  }

  export type ServiceCreateWithoutFeaturesInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ServiceUncheckedCreateWithoutFeaturesInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ServiceCreateOrConnectWithoutFeaturesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutFeaturesInput, ServiceUncheckedCreateWithoutFeaturesInput>
  }

  export type ModuleCreateWithoutFeatureInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionCreateNestedManyWithoutModuleInput
  }

  export type ModuleUncheckedCreateWithoutFeatureInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_permissions?: UserPermissionUncheckedCreateNestedManyWithoutModuleInput
  }

  export type ModuleCreateOrConnectWithoutFeatureInput = {
    where: ModuleWhereUniqueInput
    create: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput>
  }

  export type ModuleCreateManyFeatureInputEnvelope = {
    data: ModuleCreateManyFeatureInput | ModuleCreateManyFeatureInput[]
    skipDuplicates?: boolean
  }

  export type ServiceUpsertWithoutFeaturesInput = {
    update: XOR<ServiceUpdateWithoutFeaturesInput, ServiceUncheckedUpdateWithoutFeaturesInput>
    create: XOR<ServiceCreateWithoutFeaturesInput, ServiceUncheckedCreateWithoutFeaturesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutFeaturesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutFeaturesInput, ServiceUncheckedUpdateWithoutFeaturesInput>
  }

  export type ServiceUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ServiceUncheckedUpdateWithoutFeaturesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuleUpsertWithWhereUniqueWithoutFeatureInput = {
    where: ModuleWhereUniqueInput
    update: XOR<ModuleUpdateWithoutFeatureInput, ModuleUncheckedUpdateWithoutFeatureInput>
    create: XOR<ModuleCreateWithoutFeatureInput, ModuleUncheckedCreateWithoutFeatureInput>
  }

  export type ModuleUpdateWithWhereUniqueWithoutFeatureInput = {
    where: ModuleWhereUniqueInput
    data: XOR<ModuleUpdateWithoutFeatureInput, ModuleUncheckedUpdateWithoutFeatureInput>
  }

  export type ModuleUpdateManyWithWhereWithoutFeatureInput = {
    where: ModuleScalarWhereInput
    data: XOR<ModuleUpdateManyMutationInput, ModuleUncheckedUpdateManyWithoutFeatureInput>
  }

  export type ModuleScalarWhereInput = {
    AND?: ModuleScalarWhereInput | ModuleScalarWhereInput[]
    OR?: ModuleScalarWhereInput[]
    NOT?: ModuleScalarWhereInput | ModuleScalarWhereInput[]
    id?: StringFilter<"Module"> | string
    name?: StringFilter<"Module"> | string
    created_at?: DateTimeFilter<"Module"> | Date | string
    updated_at?: DateTimeFilter<"Module"> | Date | string
    is_deleted?: BoolFilter<"Module"> | boolean
    feature_id?: StringFilter<"Module"> | string
  }

  export type FeatureCreateWithoutModulesInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    service: ServiceCreateNestedOneWithoutFeaturesInput
  }

  export type FeatureUncheckedCreateWithoutModulesInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    service_id: string
  }

  export type FeatureCreateOrConnectWithoutModulesInput = {
    where: FeatureWhereUniqueInput
    create: XOR<FeatureCreateWithoutModulesInput, FeatureUncheckedCreateWithoutModulesInput>
  }

  export type UserPermissionCreateWithoutModuleInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user: UserCreateNestedOneWithoutUser_permissionsInput
  }

  export type UserPermissionUncheckedCreateWithoutModuleInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_id: string
  }

  export type UserPermissionCreateOrConnectWithoutModuleInput = {
    where: UserPermissionWhereUniqueInput
    create: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput>
  }

  export type UserPermissionCreateManyModuleInputEnvelope = {
    data: UserPermissionCreateManyModuleInput | UserPermissionCreateManyModuleInput[]
    skipDuplicates?: boolean
  }

  export type FeatureUpsertWithoutModulesInput = {
    update: XOR<FeatureUpdateWithoutModulesInput, FeatureUncheckedUpdateWithoutModulesInput>
    create: XOR<FeatureCreateWithoutModulesInput, FeatureUncheckedCreateWithoutModulesInput>
    where?: FeatureWhereInput
  }

  export type FeatureUpdateToOneWithWhereWithoutModulesInput = {
    where?: FeatureWhereInput
    data: XOR<FeatureUpdateWithoutModulesInput, FeatureUncheckedUpdateWithoutModulesInput>
  }

  export type FeatureUpdateWithoutModulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    service?: ServiceUpdateOneRequiredWithoutFeaturesNestedInput
  }

  export type FeatureUncheckedUpdateWithoutModulesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    service_id?: StringFieldUpdateOperationsInput | string
  }

  export type UserPermissionUpsertWithWhereUniqueWithoutModuleInput = {
    where: UserPermissionWhereUniqueInput
    update: XOR<UserPermissionUpdateWithoutModuleInput, UserPermissionUncheckedUpdateWithoutModuleInput>
    create: XOR<UserPermissionCreateWithoutModuleInput, UserPermissionUncheckedCreateWithoutModuleInput>
  }

  export type UserPermissionUpdateWithWhereUniqueWithoutModuleInput = {
    where: UserPermissionWhereUniqueInput
    data: XOR<UserPermissionUpdateWithoutModuleInput, UserPermissionUncheckedUpdateWithoutModuleInput>
  }

  export type UserPermissionUpdateManyWithWhereWithoutModuleInput = {
    where: UserPermissionScalarWhereInput
    data: XOR<UserPermissionUpdateManyMutationInput, UserPermissionUncheckedUpdateManyWithoutModuleInput>
  }

  export type EmployeeCreateWithoutJo_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutJo_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutJo_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutJo_approver_settingInput, EmployeeUncheckedCreateWithoutJo_approver_settingInput>
  }

  export type EmployeeCreateWithoutJo_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutJo_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutJo_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutJo_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutJo_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutJo_approver_settingInput, EmployeeUncheckedUpdateWithoutJo_approver_settingInput>
    create: XOR<EmployeeCreateWithoutJo_approver_settingInput, EmployeeUncheckedCreateWithoutJo_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutJo_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutJo_approver_settingInput, EmployeeUncheckedUpdateWithoutJo_approver_settingInput>
  }

  export type EmployeeUpdateWithoutJo_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutJo_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutJo_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutJo_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutJo_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutJo_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutJo_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutJo_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutJo_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutJo_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutRv_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRv_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRv_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRv_approver_settingInput, EmployeeUncheckedCreateWithoutRv_approver_settingInput>
  }

  export type EmployeeCreateWithoutRv_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRv_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRv_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRv_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutRv_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutRv_approver_settingInput, EmployeeUncheckedUpdateWithoutRv_approver_settingInput>
    create: XOR<EmployeeCreateWithoutRv_approver_settingInput, EmployeeUncheckedCreateWithoutRv_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRv_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRv_approver_settingInput, EmployeeUncheckedUpdateWithoutRv_approver_settingInput>
  }

  export type EmployeeUpdateWithoutRv_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRv_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutRv_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutRv_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRv_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRv_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRv_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutRv_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutRv_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRv_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutSpr_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSpr_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSpr_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSpr_approver_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_settingInput>
  }

  export type EmployeeCreateWithoutSpr_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutSpr_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutSpr_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutSpr_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutSpr_approver_settingInput, EmployeeUncheckedUpdateWithoutSpr_approver_settingInput>
    create: XOR<EmployeeCreateWithoutSpr_approver_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSpr_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSpr_approver_settingInput, EmployeeUncheckedUpdateWithoutSpr_approver_settingInput>
  }

  export type EmployeeUpdateWithoutSpr_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSpr_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutSpr_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutSpr_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutSpr_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutSpr_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutSpr_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutSpr_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutSpr_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutSpr_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutMeqs_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutMeqs_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutMeqs_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutMeqs_approver_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_settingInput>
  }

  export type EmployeeCreateWithoutMeqs_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutMeqs_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutMeqs_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutMeqs_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutMeqs_approver_settingInput, EmployeeUncheckedUpdateWithoutMeqs_approver_settingInput>
    create: XOR<EmployeeCreateWithoutMeqs_approver_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutMeqs_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutMeqs_approver_settingInput, EmployeeUncheckedUpdateWithoutMeqs_approver_settingInput>
  }

  export type EmployeeUpdateWithoutMeqs_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutMeqs_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutMeqs_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutMeqs_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutMeqs_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutMeqs_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutMeqs_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutMeqs_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutMeqs_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutMeqs_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutPo_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutPo_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutPo_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutPo_approver_settingInput, EmployeeUncheckedCreateWithoutPo_approver_settingInput>
  }

  export type EmployeeCreateWithoutPo_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutPo_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutPo_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutPo_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutPo_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutPo_approver_settingInput, EmployeeUncheckedUpdateWithoutPo_approver_settingInput>
    create: XOR<EmployeeCreateWithoutPo_approver_settingInput, EmployeeUncheckedCreateWithoutPo_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutPo_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutPo_approver_settingInput, EmployeeUncheckedUpdateWithoutPo_approver_settingInput>
  }

  export type EmployeeUpdateWithoutPo_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutPo_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutPo_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutPo_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutPo_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutPo_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutPo_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutPo_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutPo_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutPo_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeCreateWithoutRr_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRr_approver_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRr_approver_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRr_approver_settingInput, EmployeeUncheckedCreateWithoutRr_approver_settingInput>
  }

  export type EmployeeCreateWithoutRr_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeUncheckedCreateWithoutRr_approver_proxy_settingInput = {
    id?: string
    firstname: string
    middlename?: string | null
    lastname: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    jo_approver_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    po_approver_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rv_approver_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    spr_approver_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    rr_approver_setting?: RRApproverSettingUncheckedCreateNestedOneWithoutApproverInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    po_approver_proxy_setting?: POApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedCreateNestedOneWithoutApprover_proxyInput
    user_employee?: UserEmployeeUncheckedCreateNestedOneWithoutEmployeeInput
  }

  export type EmployeeCreateOrConnectWithoutRr_approver_proxy_settingInput = {
    where: EmployeeWhereUniqueInput
    create: XOR<EmployeeCreateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRr_approver_proxy_settingInput>
  }

  export type EmployeeUpsertWithoutRr_approver_settingInput = {
    update: XOR<EmployeeUpdateWithoutRr_approver_settingInput, EmployeeUncheckedUpdateWithoutRr_approver_settingInput>
    create: XOR<EmployeeCreateWithoutRr_approver_settingInput, EmployeeUncheckedCreateWithoutRr_approver_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRr_approver_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRr_approver_settingInput, EmployeeUncheckedUpdateWithoutRr_approver_settingInput>
  }

  export type EmployeeUpdateWithoutRr_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRr_approver_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rr_approver_proxy_setting?: RRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUpsertWithoutRr_approver_proxy_settingInput = {
    update: XOR<EmployeeUpdateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutRr_approver_proxy_settingInput>
    create: XOR<EmployeeCreateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedCreateWithoutRr_approver_proxy_settingInput>
    where?: EmployeeWhereInput
  }

  export type EmployeeUpdateToOneWithWhereWithoutRr_approver_proxy_settingInput = {
    where?: EmployeeWhereInput
    data: XOR<EmployeeUpdateWithoutRr_approver_proxy_settingInput, EmployeeUncheckedUpdateWithoutRr_approver_proxy_settingInput>
  }

  export type EmployeeUpdateWithoutRr_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUpdateOneWithoutEmployeeNestedInput
  }

  export type EmployeeUncheckedUpdateWithoutRr_approver_proxy_settingInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstname?: StringFieldUpdateOperationsInput | string
    middlename?: NullableStringFieldUpdateOperationsInput | string | null
    lastname?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    jo_approver_setting?: JOApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    meqs_approver_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    po_approver_setting?: POApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rv_approver_setting?: RVApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    spr_approver_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    rr_approver_setting?: RRApproverSettingUncheckedUpdateOneWithoutApproverNestedInput
    jo_approver_proxy_setting?: JOApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    meqs_approver_proxy_setting?: MEQSApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    po_approver_proxy_setting?: POApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    rv_approver_proxy_setting?: RVApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    spr_approver_proxy_setting?: SPRApproverSettingUncheckedUpdateOneWithoutApprover_proxyNestedInput
    user_employee?: UserEmployeeUncheckedUpdateOneWithoutEmployeeNestedInput
  }

  export type DivisionCreateManyDepartmentInput = {
    id?: string
    code: string
    name: string
    status?: number
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type DivisionUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DivisionUncheckedUpdateWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type DivisionUncheckedUpdateManyWithoutDepartmentInput = {
    id?: StringFieldUpdateOperationsInput | string
    code?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    status?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserPermissionCreateManyUserInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    module_id: string
  }

  export type UserPermissionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    module?: ModuleUpdateOneRequiredWithoutUser_permissionsNestedInput
  }

  export type UserPermissionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    module_id?: StringFieldUpdateOperationsInput | string
  }

  export type UserPermissionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    module_id?: StringFieldUpdateOperationsInput | string
  }

  export type FeatureCreateManyServiceInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type FeatureUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    modules?: ModuleUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    modules?: ModuleUncheckedUpdateManyWithoutFeatureNestedInput
  }

  export type FeatureUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ModuleCreateManyFeatureInput = {
    id?: string
    name: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
  }

  export type ModuleUpdateWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_permissions?: UserPermissionUncheckedUpdateManyWithoutModuleNestedInput
  }

  export type ModuleUncheckedUpdateManyWithoutFeatureInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserPermissionCreateManyModuleInput = {
    id?: string
    created_at?: Date | string
    updated_at?: Date | string
    is_deleted?: boolean
    user_id: string
  }

  export type UserPermissionUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutUser_permissionsNestedInput
  }

  export type UserPermissionUncheckedUpdateWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type UserPermissionUncheckedUpdateManyWithoutModuleInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    user_id?: StringFieldUpdateOperationsInput | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use DepartmentCountOutputTypeDefaultArgs instead
     */
    export type DepartmentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceCountOutputTypeDefaultArgs instead
     */
    export type ServiceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeatureCountOutputTypeDefaultArgs instead
     */
    export type FeatureCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeatureCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModuleCountOutputTypeDefaultArgs instead
     */
    export type ModuleCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ModuleCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DivisionDefaultArgs instead
     */
    export type DivisionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DivisionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DepartmentDefaultArgs instead
     */
    export type DepartmentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DepartmentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EmployeeDefaultArgs instead
     */
    export type EmployeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EmployeeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ClassificationDefaultArgs instead
     */
    export type ClassificationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ClassificationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserEmployeeDefaultArgs instead
     */
    export type UserEmployeeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserEmployeeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserPermissionDefaultArgs instead
     */
    export type UserPermissionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserPermissionDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ServiceDefaultArgs instead
     */
    export type ServiceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ServiceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use FeatureDefaultArgs instead
     */
    export type FeatureArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = FeatureDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ModuleDefaultArgs instead
     */
    export type ModuleArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ModuleDefaultArgs<ExtArgs>
    /**
     * @deprecated Use JOApproverSettingDefaultArgs instead
     */
    export type JOApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = JOApproverSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RVApproverSettingDefaultArgs instead
     */
    export type RVApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RVApproverSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use SPRApproverSettingDefaultArgs instead
     */
    export type SPRApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = SPRApproverSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use MEQSApproverSettingDefaultArgs instead
     */
    export type MEQSApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = MEQSApproverSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use POApproverSettingDefaultArgs instead
     */
    export type POApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = POApproverSettingDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RRApproverSettingDefaultArgs instead
     */
    export type RRApproverSettingArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RRApproverSettingDefaultArgs<ExtArgs>

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