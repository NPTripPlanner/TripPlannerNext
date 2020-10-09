import { DocumentData } from "@google-cloud/firestore";
import { QueryDocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import Base, { IBaseData } from "./base";

/**
 * Represent firestore user document
 */
export interface IUserData extends IBaseData {
    displayName: string;
    email:string;
}

/**
 * Model for user document
 */
export default class User extends Base implements IUserData{

    displayName:string = '';
    email:string = '';

    constructor(id:string, email:string, displayName:string){
        super(id);

        this.email = email;
        this.displayName = displayName;
    }

    toFirestore = ():IUserData => {
        const data:IUserData = {
            ...super.toFirestore(),
            displayName: this.displayName,
            email: this.email,
        };
        return data;
    }
}

export const UserConverter ={ 
    toFirestore(user:User) : DocumentData{
        return user.toFirestore();
    },
    fromFirestore(snapshot:QueryDocumentSnapshot) : User{
        const data = snapshot.data();
        return new User(data.id, data.email, data.displayName);
    }
}