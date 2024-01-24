import { faker } from "@faker-js/faker"
import { Brand, Supplier, Unit, Vehicle } from "../__common__/types"

export const suppliers: Supplier[] = [
    { 
        id: faker.string.uuid(),
        name: 'Robinson',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'SM',
        contact: '+639000000000',
    },
    { 
        id: faker.string.uuid(),
        name: 'Puregold',
        contact: '+639000000000',
    }
]

export const units: Unit[] = [
    {
        id: faker.string.uuid(),
        name: 'Pieces'
    },
    {
        id: faker.string.uuid(),
        name: 'Cartons'
    },
    {
        id: faker.string.uuid(),
        name: 'Pallets'
    }
]

export const brands: Brand[] = [
    {
        id: faker.string.uuid(),
        name: 'Brand X'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Y'
    },
    {
        id: faker.string.uuid(),
        name: 'Brand Z'
    } 
]


export const vehicles: Vehicle[] = [
    {
        id: faker.string.uuid(),
        name: 'Vehicle 1',
        plate_number: 'ABC-123'
    },
    {
        id: faker.string.uuid(),
        name: 'Vehicle 2',
        plate_number: 'ABC-456'
    },
    {
        id: faker.string.uuid(),
        name: 'Vehicle 3',
        plate_number: 'ABC-789'
    } 
]