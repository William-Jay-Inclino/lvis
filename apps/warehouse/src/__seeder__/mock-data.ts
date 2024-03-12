import { faker } from "@faker-js/faker"
import { Brand, ItemType, Supplier, Unit, VAT_TYPE, Vehicle } from "../__common__/types"

export const suppliers: Supplier[] = [
    {
        id: faker.string.uuid(),
        name: 'Robinson',
        contact: '+639000000000',
        vat_type: VAT_TYPE.NONE,
        created_by: 'admin'

    },
    {
        id: faker.string.uuid(),
        name: 'SM',
        contact: '+639000000000',
        vat_type: VAT_TYPE.INC,
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Puregold',
        contact: '+639000000000',
        vat_type: VAT_TYPE.EXC,
        created_by: 'admin'
    }
]

export const itemTypes: ItemType[] = [
    {
        id: faker.string.uuid(),
        name: 'Item type 1',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Item type 2',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Item type 3',
        created_by: 'admin'
    }
]

// export const stations: Station[] = [
//     {
//         id: faker.string.uuid(),
//         name: 'Main Office',
//         address: 'Ormoc City',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Talisayan',
//         address: 'Talisayan kilid julies',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Mahayag',
//         address: 'Mahayag Eskina kanang dili ngit2',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Tabango',
//         address: 'Tabango mo tanan kay akoy pinaka isog',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Sambulawan',
//         address: 'Sambulawan Dimension',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Libongao',
//         address: 'Libongao States',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Calibuan',
//         address: 'Calibuan atbang sapa',
//     },
//     {
//         id: faker.string.uuid(),
//         name: 'Palompon',
//         address: 'Palompon atbang kalanggaman',
//     }
// ]

export const units: Unit[] = [
    {
        id: faker.string.uuid(),
        name: 'Pieces',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Cartons',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Pallets',
        created_by: 'admin'
    }
]

export const brands: Brand[] = [
    {
        id: faker.string.uuid(),
        name: 'Brand X',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Y',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Z',
        created_by: 'admin'
    }
]


export const vehicles: Vehicle[] = [
    {
        id: faker.string.uuid(),
        name: 'Vehicle 1',
        plate_number: 'ABC-123',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Vehicle 2',
        plate_number: 'ABC-456',
        created_by: 'admin'
    },
    {
        id: faker.string.uuid(),
        name: 'Vehicle 3',
        plate_number: 'ABC-789',
        created_by: 'admin'
    }
]