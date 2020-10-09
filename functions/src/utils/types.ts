export interface IDocumentObject {

}

export interface IDateTimeObject extends IDocumentObject {
    createAt?: FirebaseFirestore.Timestamp;
    modifyAt?: FirebaseFirestore.Timestamp;
}

/**
 * Represent firestore itinerary document under certain user
 */
export interface IItineraryData extends IDateTimeObject{
    id:string;
    name:string;
    startDateUTC:FirebaseFirestore.Timestamp;
    endDateUTC:FirebaseFirestore.Timestamp;
    totalDays:number;

}

/**
 * Represent firestore user document
 */
export interface IUserData extends IDateTimeObject{
    id: string;
    displayName: string;
    email:string;
}
 
/**
 * Represent firestore document that contain all itinearies for a certain user
 */
export interface IUserItinerary extends IDateTimeObject{
    id?: string;
    totalItineraries: number;
}