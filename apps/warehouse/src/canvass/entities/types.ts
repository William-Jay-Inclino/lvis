import { Brand, Canvass, CanvassItem, Unit } from "apps/warehouse/prisma/generated/client";


export type FindOneResponse = Canvass & { 
    canvass_items: (CanvassItem & { 
        brand: Brand, 
        unit: Unit 
    })[] 
};