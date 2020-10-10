import { DocumentData, FirestoreDataConverter } from "@google-cloud/firestore";
import { QueryDocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import Base, { IBaseData } from "./base";

/**
 * Represent firestore document that contain all itinearies for a certain user
 */
export interface IUserItineraryData extends IBaseData{
    totalItineraries: number;
}

/**
 * Model for userItinerary document
 */
export default class UserItinerary extends Base implements IUserItineraryData{

    totalItineraries:number = 0;

    constructor(id:string, totalItineraries:number){
        super(id);
        
        this.id = id;
        this.totalItineraries = totalItineraries;

        this.toFirestore = this.toFirestore.bind(this);
    }

    toFirestore():IUserItineraryData{

        const data:IUserItineraryData = {
            ...super.toFirestore(),
            totalItineraries: this.totalItineraries,
        }
        return data;
    }
    
}

export const UserItineraryConverter:FirestoreDataConverter<UserItinerary> = { 
    toFirestore(userIt:UserItinerary) : DocumentData{
        return userIt.toFirestore();
    },
    fromFirestore(snapshot:QueryDocumentSnapshot) : UserItinerary{
        const data = snapshot.data();
        return new UserItinerary(data.id, data.totalItineraries);
    }
}