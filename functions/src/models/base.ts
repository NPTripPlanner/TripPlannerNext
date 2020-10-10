import { DocumentData } from "@google-cloud/firestore";

export interface IBaseData extends DocumentData{
    id:string;
}

export default class Base implements IBaseData {
    id:string = '';

    constructor(id:string){
        this.id = id;

        this.toFirestore = this.toFirestore.bind(this);
    }

    /**
     * Convert to firestore data
     * 
     * Subclass override must call super
     */
    toFirestore():IBaseData{
        
        const data:IBaseData = {
            id: this.id,
        }
        return data;
    }
}