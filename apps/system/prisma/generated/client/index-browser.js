
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  detectRuntime,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.8.1
 * Query Engine version: 23fdc5965b1e05fc54e5f26ed3de66776b93de64
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "23fdc5965b1e05fc54e5f26ed3de66776b93de64"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run ${runtimeDescription}.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.DivisionScalarFieldEnum = {
  id: 'id',
  department_id: 'department_id',
  code: 'code',
  name: 'name',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.DepartmentScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.EmployeeScalarFieldEnum = {
  id: 'id',
  firstname: 'firstname',
  middlename: 'middlename',
  lastname: 'lastname',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.ClassificationScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  role: 'role',
  username: 'username',
  password: 'password',
  status: 'status',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.UserEmployeeScalarFieldEnum = {
  id: 'id',
  user_id: 'user_id',
  employee_id: 'employee_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.UserPermissionScalarFieldEnum = {
  id: 'id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted',
  user_id: 'user_id',
  submodule_id: 'submodule_id'
};

exports.Prisma.ServiceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.FeatureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted',
  service_id: 'service_id'
};

exports.Prisma.ModuleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted',
  feature_id: 'feature_id'
};

exports.Prisma.SubModuleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted',
  module_id: 'module_id'
};

exports.Prisma.JOApproverSettingScalarFieldEnum = {
  id: 'id',
  label: 'label',
  order: 'order',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.RVApproverSettingScalarFieldEnum = {
  id: 'id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.SPRApproverSettingScalarFieldEnum = {
  id: 'id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSApproverSettingScalarFieldEnum = {
  id: 'id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.POApproverSettingScalarFieldEnum = {
  id: 'id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.RRApproverSettingScalarFieldEnum = {
  id: 'id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Role = exports.$Enums.Role = {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

exports.Prisma.ModelName = {
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
  SubModule: 'SubModule',
  JOApproverSetting: 'JOApproverSetting',
  RVApproverSetting: 'RVApproverSetting',
  SPRApproverSetting: 'SPRApproverSetting',
  MEQSApproverSetting: 'MEQSApproverSetting',
  POApproverSetting: 'POApproverSetting',
  RRApproverSetting: 'RRApproverSetting'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        const runtime = detectRuntime()
        const edgeRuntimeName = {
          'workerd': 'Cloudflare Workers',
          'deno': 'Deno and Deno Deploy',
          'netlify': 'Netlify Edge Functions',
          'edge-light': 'Vercel Edge Functions',
        }[runtime]

        let message = 'PrismaClient is unable to run in '
        if (edgeRuntimeName !== undefined) {
          message += edgeRuntimeName + '. As an alternative, try Accelerate: https://pris.ly/d/accelerate.'
        } else {
          message += 'this browser environment, or has been bundled for the browser (running in `' + runtime + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://github.com/prisma/prisma/issues`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
