import { Canvass, CanvassItem, Unit } from "apps/warehouse/prisma/generated/client";


export type FindOneResponse = Canvass & { 
    canvass_items: (CanvassItem & { 
        unit: Unit 
    })[] 
};