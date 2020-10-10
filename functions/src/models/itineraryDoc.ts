import { DocumentData } from "@google-cloud/firestore";
import { QueryDocumentSnapshot } from "firebase-functions/lib/providers/firestore";
import { convertToServerTimestamp } from "../utils/commom.utils";
import Base, { IBaseData } from "./base";

/**
 * Represent firestore itinerary document under certain user
 */
export interface IItineraryData extends IBaseData {
    name:string;
    startDateUTC:FirebaseFirestore.Timestamp;
    endDateUTC:FirebaseFirestore.Timestamp;
    totalDays:number;

}


type ServerTimeStamp = FirebaseFirestore.Timestamp;

/**
 * Model for itinerary document
 */
export default class Itinerary extends Base implements IItineraryData{

    name:string = '';
    startDateUTC:ServerTimeStamp = convertToServerTimestamp(new Date());
    endDateUTC:ServerTimeStamp = convertToServerTimestamp(new Date());
    totalDays:number = 1;

    constructor(
        id:string, name:string,
        startDateUTC:ServerTimeStamp, endDateUTC:ServerTimeStamp, totalDays:number){
            super(id);

            this.name = name;
            this.startDateUTC = startDateUTC;
            this.endDateUTC = endDateUTC;
            this.totalDays = totalDays;

            this.toFirestore = this.toFirestore.bind(this);
    }

    toFirestore():IItineraryData{
        
        const data:IItineraryData = {
            ...super.toFirestore(),
            name: this.name,
            startDateUTC: this.startDateUTC,
            endDateUTC: this.endDateUTC,
            totalDays: this.totalDays,
        }
        return data;
    }
}

export const  ItineraryConverter ={ 
    toFirestore(it:Itinerary) : DocumentData{
        return it.toFirestore();
    },
    fromFirestore(snapshot:QueryDocumentSnapshot) : Itinerary{
        const data = snapshot.data();
        return new Itinerary(data.id, data.name, data.startDateUTC, data.endDateUTC, data.totalDays);
    }
}
