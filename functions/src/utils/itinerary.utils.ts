// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');
// const moment = require('moment');

import { convertLocalToUTC, convertToServerTimestamp, getTotalDays } from './commom.utils';
import {deleteDocuments, getAllDocumentsPathUnder} from './utils';
import moment from 'moment';
import { UserItineraryConverter } from '../models/userItineraryDoc';
import Itinerary, { ItineraryConverter } from '../models/itineraryDoc';
import colNames from './firestoreColNames';
import { https } from 'firebase-functions';
import { Firestore } from '@google-cloud/firestore';


/**
 * Create a new itinerary
 * 
 * @param {*} userId user id you want to create itinerary under
 * @param {*} itineraryName name for itinerary, if null then default name will be used
 * @param {*} startDateLocal string of start date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * Given null to set it to today
 * 
 * @param {*} endDateLocal string of end date for itinerary.
 * 
 * date string formate is like 2013-02-04T10:35:24-08:00
 * 
 * The date is from client in local and it will be converted into UTC time.
 * 
 * If startDateLocal was null then this will set to 1 day after startDateLocal
 * 
 * accept transaction, batch or writebulk
 * 
 * @returns return itinerary id
 */
export async function createItinerary(
    firestore:Firestore,
    userId:string,
    itineraryName:string,
    startDateLocal:string,//e.g 2013-02-04T10:35:24-08:00
    endDateLocal:string//e.g 2013-02-04T10:35:24-08:00
    ) : Promise<string>{

    if(!userId) throw new https.HttpsError('invalid-argument','User id is required');
    if(!itineraryName) throw new https.HttpsError('invalid-argument','Itinerary name is required');

    //check if userItinerary document exists
    const userItDocRef = await firestore.collection('userItineraries').doc(userId)
    .withConverter(UserItineraryConverter);

    const userItSnapshot = await userItDocRef.get();
    if(!userItSnapshot.exists) throw new https.HttpsError('not-found',`User ${userId} do not have itinerary document created`);

    //get a new reference in firestore for itinerary
    const newItineraryDocRef = userItDocRef.collection(colNames.userItineraries.itineraries.identifier).doc();

    //////////start converting time to server timestamp//////////

    let defaultStartDateLocal = startDateLocal;
    let defaultEndDateLocal = endDateLocal;

    if(!defaultStartDateLocal){
        defaultStartDateLocal = moment.utc().format();
        defaultEndDateLocal = moment.utc().add(1, 'days').format();
    }
    else if(!defaultEndDateLocal){
        throw new https.HttpsError('failed-precondition','startDateLocal endDateLocal must co-exists');
    }

    //convert time to UTC
    let startDateUTC = convertLocalToUTC(defaultStartDateLocal);
    let endDateUTC = convertLocalToUTC(defaultEndDateLocal);

    //different days between start to end date
    const totalDays = getTotalDays(startDateUTC, endDateUTC);

    //convert to server timestamp
    const startDateUTCTS = convertToServerTimestamp(startDateUTC.toDate());
    const endDateUTCTS = convertToServerTimestamp(endDateUTC.toDate());

    //////////end converting time to server timestamp//////////

    //create new itinerary model
    const newIt = new Itinerary(newItineraryDocRef.id, itineraryName, startDateUTCTS, endDateUTCTS, totalDays);

    const batch = firestore.batch();
    batch.create(newItineraryDocRef, newIt.toFirestore());

    //add one itinerary count to user itineraries
    const userIt = userItSnapshot.data();
    if(userIt){
        userIt.totalItineraries += 1;
        batch.update(userItSnapshot.ref, userIt?.toFirestore());
    }
    
    await batch.commit();

    return newItineraryDocRef.id;
}

export interface IUpdateItineraryData{
    name?:string;
    startDate?:string;
    endDate?:string;
}

/**
 * Update itinerary data
 * @param {*} userId user id you want to create itinerary under
 * @param {*} itineraryId itinerary id
 * @param {*} dataToUpdate field of data to update. IUpdateItineraryData
 * 
 * shape:
 * {name, startDate, endDate} startDate and endDate are string in local time 
 * 
 * if any field is undifined or null will be ignored
 * 
 * 
 * @return true if nothing went wrong
 */
export async function updateItinerary(
    firestore:Firestore, userId:string, itineraryId:string, 
    dataToUpdate:IUpdateItineraryData): Promise<boolean>{

    const colPath = `${colNames.userItineraries.identifier}/${userId}/${colNames.userItineraries.itineraries.identifier}`;
    const itDocRef = await firestore.collection(colPath).doc(itineraryId).withConverter(ItineraryConverter);
    const itSnapshot = await itDocRef.get();
    const itinerary = itSnapshot.data();

    if(!itSnapshot.exists) throw new https.HttpsError('not-found', `Itinerary ${itineraryId} do not exists`);
    if(!itinerary) throw new https.HttpsError('not-found', `Itinerary ${itineraryId} snapshot data do not exist`);

    const {name, startDate, endDate} = dataToUpdate;

    //update startDate, endDate and totalDays
    let startDateUTCTS:FirebaseFirestore.Timestamp = itinerary.startDateUTC;
    let endDateUTCTS:FirebaseFirestore.Timestamp = itinerary.endDateUTC;
    let totalDays:number = itinerary.totalDays;

    if(startDate && endDate){
        //convert time to UTC
        let startDateUTC = convertLocalToUTC(startDate);
        let endDateUTC = convertLocalToUTC(endDate);

        //different days between start to end date
        totalDays = getTotalDays(startDateUTC, endDateUTC);

        //convert to server timestamp
        startDateUTCTS = convertToServerTimestamp(startDateUTC.toDate());
        endDateUTCTS = convertToServerTimestamp(endDateUTC.toDate());
    }
    else if((!startDate && endDate) || (startDate && !endDate)){
        throw new https.HttpsError('invalid-argument',
        `Itinerary ${itineraryId} startDate and endDate arguments must co-exists`)
    }

    itinerary.name = name?name:itinerary.name;
    itinerary.startDateUTC = startDateUTCTS;
    itinerary.endDateUTC = endDateUTCTS;
    itinerary.totalDays = totalDays;

    const batch = firestore.batch();
    batch.update(itSnapshot.ref, itinerary.toFirestore());
    await batch.commit();

    return true;
}

export async function deleteItinerary(
    firestore:Firestore, userId:string, itineraryId:string):Promise<boolean>{

    const colPath = `${colNames.userItineraries.identifier}/${userId}/${colNames.userItineraries.itineraries.identifier}`;
    const itDocRef = await firestore.collection(colPath).doc(itineraryId).withConverter(ItineraryConverter);
    const itSnapshot = await itDocRef.get();

    if(!itSnapshot.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);

    const allDocRefs = await getAllDocumentsPathUnder(itDocRef);
    await deleteDocuments(firestore, allDocRefs);
    return true;
}