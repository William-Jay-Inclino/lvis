import { faker } from "@faker-js/faker";
import { Department } from "../department/entities/department.entity";
import { Classification, DepartmentStatus, Feature, JOApproverSetting, MEQSApproverSetting, Module, POApproverSetting, RRApproverSetting, RVApproverSetting, SPRApproverSetting, Service, SubModule, UserEmployee, UserStatus } from "../__common__/types";
import { Employee } from "../employee/entities/employee.entity";
import { User } from "../user/entities/user.entity";


export const empId1 = faker.string.uuid()

export const departments: Department[] = [
    {
        id: faker.string.uuid(),
        code: 'IAD',
        name: 'Internal Audit Department',
        status: DepartmentStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        code: 'ITCS',
        name: 'Information Technology / Computer Science',
        status: 1
    },
    {
        id: faker.string.uuid(),
        code: 'HR',
        name: 'Human Resource',
        status: DepartmentStatus.ACTIVE
    }
]

export const classifications: Classification[] = [
    {
        id: faker.string.uuid(),
        name: 'Classification 1'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 2'
    },
    {
        id: faker.string.uuid(),
        name: 'Classification 3'
    }
]

export const services: Service[] = [
    {
        id: faker.string.uuid(),
        name: 'System'
    },
    {
        id: faker.string.uuid(),
        name: 'Warehouse'
    },
    {
        id: faker.string.uuid(),
        name: 'Powerserve'
    },
    {
        id: faker.string.uuid(),
        name: 'PMS & Housewiring'
    },
    {
        id: faker.string.uuid(),
        name: 'Powerbill'
    },
    {
        id: faker.string.uuid(),
        name: 'Payment'
    },
    {
        id: faker.string.uuid(),
        name: 'Accounting'
    },
]

export const features: Feature[] = [
    {
        id: faker.string.uuid(),
        name: 'Data Management',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Purchasing',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Warehousing',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Motorpool',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Project',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Reports',
        service_id: services[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Security',
        service_id: services[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'Data Management',
        service_id: services[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'Settings',
        service_id: services[0].id
    }
]

export const modules: Module[] = [
    {
        id: faker.string.uuid(),
        name: 'Canvass',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'JO',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'SPR',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'RV',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'MEQS',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'PO',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'RR',
        feature_id: features[1].id
    },
    {
        id: faker.string.uuid(),
        name: 'Item Brand',
        feature_id: features[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'Supplier',
        feature_id: features[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'Vehicle',
        feature_id: features[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'Unit',
        feature_id: features[0].id
    },
    {
        id: faker.string.uuid(),
        name: 'UAC',
        feature_id: features[6].id
    },
    {
        id: faker.string.uuid(),
        name: 'Activity log',
        feature_id: features[6].id
    },
    {
        id: faker.string.uuid(),
        name: 'Employee',
        feature_id: features[7].id
    },
    {
        id: faker.string.uuid(),
        name: 'Department',
        feature_id: features[7].id
    },
    {
        id: faker.string.uuid(),
        name: 'Division',
        feature_id: features[7].id
    },
    {
        id: faker.string.uuid(),
        name: 'Classification',
        feature_id: features[7].id
    },
    {
        id: faker.string.uuid(),
        name: 'Purchasing',
        feature_id: features[8].id
    }
]

const subModules: SubModule[] = []

const crud = ['create', 'read', 'update', 'delete']

for(let module of modules) {

    for(let i of crud) {

        const x: SubModule = {
            id: faker.string.uuid(),
            name: i,
            module_id: module.id
        }

        subModules.push(x)

    }

}

export {
    subModules
}


export const employees: Employee[] = [
    // Imd. Sup. = 0
    {
        id: faker.string.uuid(),
        firstname: 'Ana Maria',
        middlename: 'Lourdes',
        lastname: 'Pastor',
    },
    // Budget Officer = 1
    {
        id: faker.string.uuid(),
        firstname: 'Suan',
        middlename: null,
        lastname: 'Ricaflor',
    },
    // AUDIT = 2
    {
        id: faker.string.uuid(),
        firstname: 'Marlon',
        middlename: null,
        lastname: 'Sanico',
    },
    // GM / OIC = 3
    {
        id: faker.string.uuid(),
        firstname: 'Jannie Ann',
        middlename: null,
        lastname: 'Dayandayan',
    },
    // 1st CPC Member = 4
    {
        id: faker.string.uuid(),
        firstname: 'Jhun Rey',
        middlename: null,
        lastname: 'Nahine',
    },
    // 2nd CPC Member = 5
    {
        id: faker.string.uuid(),
        firstname: 'Gretchen',
        middlename: null,
        lastname: 'Tagalog',
    },
    // Witness = 6
    {
        id: faker.string.uuid(),
        firstname: 'Dionic',
        middlename: null,
        lastname: 'De La Pena',
    },
    // CPC Chairman = 7
    {
        id: faker.string.uuid(),
        firstname: 'Anthony',
        middlename: null,
        lastname: 'Cecilio',
    },
    // Finance Manager = 8
    {
        id: faker.string.uuid(),
        firstname: 'Frances Paula',
        middlename: null,
        lastname: 'Lumacang',
    },
    {
        id: faker.string.uuid(),
        firstname: 'William Jay',
        middlename: 'Intales',
        lastname: 'Inclino',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Joshua',
        middlename: 'X',
        lastname: 'Tayag',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Jessa',
        middlename: 'X',
        lastname: 'Pelones',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Joseph Ken',
        middlename: 'X',
        lastname: 'Estrera',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Jared',
        middlename: 'X',
        lastname: 'Singcol',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Hannah Grace',
        middlename: 'Bioco',
        lastname: 'Tudio',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Jessa',
        middlename: '',
        lastname: 'Valida',
    },
    {
        id: faker.string.uuid(),
        firstname: 'Roger',
        middlename: '',
        lastname: 'Laurente',
    }
]

export const users: User[] = [
    {
        id: faker.string.uuid(),
        username: 'anamaria.pastor',
        password: 'anamaria.pastor123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'suan.ricaflor',
        password: 'suan.ricaflor123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'marlon.sanico',
        password: 'marlon.sanico123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'jannieanne.dayandayan',
        password: 'jannieanne.dayandayan123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'jhunrey.nahine',
        password: 'jhunrey.nahine123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'gretchen.tagalog',
        password: 'gretchen.tagalog123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'dionic.delapena',
        password: 'dionic.delapena123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'anthony.cecilio',
        password: 'anthony.cecilio123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'francespaula.lumacang',
        password: 'francespaula.lumacang123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'williamjay.inclino',
        password: 'williamjay.inclino123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'joshua.tayag',
        password: 'joshua.tayag123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'jessa.pelones',
        password: 'jessa.pelones123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'josephken.estrera',
        password: 'josephken.estrera123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'jared.singkol',
        password: 'jared.singkol123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'hannahgrace.tudio',
        password: 'hannahgrace.tudio123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'jessa.valida',
        password: 'jessa.valida123',
        status: UserStatus.ACTIVE
    },
    {
        id: faker.string.uuid(),
        username: 'roger.laurente',
        password: 'roger.laurente123',
        status: UserStatus.ACTIVE
    }
]

export const userEmployees: UserEmployee[] = [
    {
        id: faker.string.uuid(),
        employee_id: employees[0].id,
        user_id: users[0].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[1].id,
        user_id: users[1].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[2].id,
        user_id: users[2].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[3].id,
        user_id: users[3].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[4].id,
        user_id: users[4].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[5].id,
        user_id: users[5].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[6].id,
        user_id: users[6].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[7].id,
        user_id: users[7].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[8].id,
        user_id: users[8].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[9].id,
        user_id: users[9].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[10].id,
        user_id: users[10].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[11].id,
        user_id: users[11].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[12].id,
        user_id: users[12].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[13].id,
        user_id: users[13].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[14].id,
        user_id: users[14].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[15].id,
        user_id: users[15].id
    },
    {
        id: faker.string.uuid(),
        employee_id: employees[16].id,
        user_id: users[16].id
    }
]


export const jo_default_approvers: JOApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const rv_default_approvers: RVApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const spr_default_approvers: SPRApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Officer',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audit',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const meqs_default_approvers: MEQSApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[4].id,
        label: '1st CPC Member',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[5].id,
        label: '2nd CPC Member',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[6].id,
        label: 'Witness',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[7].id,
        label: 'CPC Chairman',
        order: 4,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 5,
    },
]

export const po_default_approvers: POApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[1].id,
        label: 'Budget Approved By',
        order: 1,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[8].id,
        label: 'Checked By Finance Mngr',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audited By',
        order: 3,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'GM / OIC',
        order: 4,
    },
]

export const rr_default_approvers: RRApproverSetting[] = [
    {
        id: faker.string.uuid(),
        approver_id: employees[2].id,
        label: 'Audited By',
        order: 2,
    },
    {
        id: faker.string.uuid(),
        approver_id: employees[3].id,
        label: 'Approved By',
        order: 3,
    },
]