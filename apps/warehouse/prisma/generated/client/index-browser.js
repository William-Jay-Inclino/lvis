
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
 * Query Engine version: 78caf6feeaed953168c64e15a249c3e9a033ebe2
 */
Prisma.prismaVersion = {
  client: "5.8.1",
  engine: "78caf6feeaed953168c64e15a249c3e9a033ebe2"
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

exports.Prisma.SupplierScalarFieldEnum = {
  id: 'id',
  name: 'name',
  contact: 'contact',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.UnitScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.BrandScalarFieldEnum = {
  id: 'id',
  name: 'name',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.VehicleScalarFieldEnum = {
  id: 'id',
  name: 'name',
  plate_number: 'plate_number',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.CanvassItemScalarFieldEnum = {
  id: 'id',
  canvass_id: 'canvass_id',
  description: 'description',
  brand_id: 'brand_id',
  unit_id: 'unit_id',
  quantity: 'quantity',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.CanvassScalarFieldEnum = {
  id: 'id',
  rc_number: 'rc_number',
  date_requested: 'date_requested',
  purpose: 'purpose',
  notes: 'notes',
  requested_by_id: 'requested_by_id',
  is_referenced: 'is_referenced',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.JOScalarFieldEnum = {
  id: 'id',
  jo_number: 'jo_number',
  date_requested: 'date_requested',
  canvass_id: 'canvass_id',
  equipment: 'equipment',
  classification_id: 'classification_id',
  department_id: 'department_id',
  supervisor_id: 'supervisor_id',
  status: 'status',
  canceller_id: 'canceller_id',
  is_referenced: 'is_referenced',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.JOApproverScalarFieldEnum = {
  id: 'id',
  jo_id: 'jo_id',
  approver_proxy_id: 'approver_proxy_id',
  date_approval: 'date_approval',
  notes: 'notes',
  status: 'status',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.RVScalarFieldEnum = {
  id: 'id',
  canvass_id: 'canvass_id',
  classification_id: 'classification_id',
  supervisor_id: 'supervisor_id',
  canceller_id: 'canceller_id',
  rv_number: 'rv_number',
  date_requested: 'date_requested',
  work_order_no: 'work_order_no',
  work_order_date: 'work_order_date',
  status: 'status',
  is_referenced: 'is_referenced',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.RVApproverScalarFieldEnum = {
  id: 'id',
  rv_id: 'rv_id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  date_approval: 'date_approval',
  notes: 'notes',
  status: 'status',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.SPRScalarFieldEnum = {
  id: 'id',
  spr_number: 'spr_number',
  date_requested: 'date_requested',
  canvass_id: 'canvass_id',
  vehicle_id: 'vehicle_id',
  classification_id: 'classification_id',
  supervisor_id: 'supervisor_id',
  status: 'status',
  canceller_id: 'canceller_id',
  is_referenced: 'is_referenced',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.SPRApproverScalarFieldEnum = {
  id: 'id',
  spr_id: 'spr_id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  date_approval: 'date_approval',
  notes: 'notes',
  status: 'status',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSScalarFieldEnum = {
  id: 'id',
  jo_id: 'jo_id',
  rv_id: 'rv_id',
  spr_id: 'spr_id',
  meqs_number: 'meqs_number',
  request_type: 'request_type',
  meqs_date: 'meqs_date',
  status: 'status',
  canceller_id: 'canceller_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSSupplierScalarFieldEnum = {
  id: 'id',
  meqs_id: 'meqs_id',
  supplier_id: 'supplier_id',
  payment_terms: 'payment_terms',
  is_referenced: 'is_referenced',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSSupplierItemScalarFieldEnum = {
  id: 'id',
  canvass_item_id: 'canvass_item_id',
  meqs_supplier_id: 'meqs_supplier_id',
  price: 'price',
  is_awarded: 'is_awarded',
  notes: 'notes',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSSupplierAttachmentScalarFieldEnum = {
  id: 'id',
  meqs_supplier_id: 'meqs_supplier_id',
  src: 'src',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.MEQSApproverScalarFieldEnum = {
  id: 'id',
  meqs_id: 'meqs_id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  date_approval: 'date_approval',
  notes: 'notes',
  status: 'status',
  label: 'label',
  order: 'order',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.POScalarFieldEnum = {
  id: 'id',
  meqs_supplier_id: 'meqs_supplier_id',
  po_number: 'po_number',
  po_date: 'po_date',
  status: 'status',
  canceller_id: 'canceller_id',
  created_at: 'created_at',
  updated_at: 'updated_at',
  is_deleted: 'is_deleted'
};

exports.Prisma.POApproverScalarFieldEnum = {
  id: 'id',
  po_id: 'po_id',
  approver_id: 'approver_id',
  approver_proxy_id: 'approver_proxy_id',
  date_approval: 'date_approval',
  notes: 'notes',
  status: 'status',
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


exports.Prisma.ModelName = {
  Supplier: 'Supplier',
  Unit: 'Unit',
  Brand: 'Brand',
  Vehicle: 'Vehicle',
  CanvassItem: 'CanvassItem',
  Canvass: 'Canvass',
  JO: 'JO',
  JOApprover: 'JOApprover',
  RV: 'RV',
  RVApprover: 'RVApprover',
  SPR: 'SPR',
  SPRApprover: 'SPRApprover',
  MEQS: 'MEQS',
  MEQSSupplier: 'MEQSSupplier',
  MEQSSupplierItem: 'MEQSSupplierItem',
  MEQSSupplierAttachment: 'MEQSSupplierAttachment',
  MEQSApprover: 'MEQSApprover',
  PO: 'PO',
  POApprover: 'POApprover'
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
