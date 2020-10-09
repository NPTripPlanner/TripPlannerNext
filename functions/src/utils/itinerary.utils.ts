// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');
// const moment = require('moment');

import { convertLocalToUTC, convertToServerTimestamp, getTotalDays } from './commom.utils';
import {deleteDocuments, firestore, getAllDocumentsPathUnder} from './utils';
import moment from 'moment';
import { WriteBatch } from '@google-cloud/firestore';
import { UserItineraryConverter } from '../models/userItineraryDoc';
import Itinerary, { ItineraryConverter } from '../models/itineraryDoc';
import colNames from './firestoreColNames';


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
 * @param {*} writeHandler Firestore WriteBatch. 
 * 
 * accept transaction, batch or writebulk
 * 
 * @returns return itinerary id
 */
export const createItinerary = async (
    userId:string,
    itineraryName:string,
    startDateLocal:string,//e.g 2013-02-04T10:35:24-08:00
    endDateLocal:string,//e.g 2013-02-04T10:35:24-08:00
    writeHandler:WriteBatch
    ) : Promise<string> =>{

    if(!userId) throw Error('User id is required');
    if(!itineraryName) throw Error('Itinerary name is required');

    //check if userItinerary document exists
    const userItDocRef = await firestore.collection(colNames.userItineraries.identifier).doc(userId)
    .withConverter(UserItineraryConverter);

    const userItSnapshot = await userItDocRef.get();
    if(!userItSnapshot.exists) throw new Error(`User ${userId} do not have itinerary document created`);

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
        throw new Error('startDateLocal was given but endDateLocal was not');
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

    writeHandler.create(newItineraryDocRef, newIt.toFirestore());
    //TODO: update userItinerary totalItineraries

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
 * @param {*} writeHandler WriteBatch
 * 
 * @return true if nothing went wrong
 */
export const updateItinerary = async (
    userId:string, itineraryId:string, 
    dataToUpdate:IUpdateItineraryData, writeHandler:WriteBatch): Promise<boolean>=>{

    const colPath = `${colNames.userItineraries.identifier}/${userId}/${colNames.userItineraries.itineraries.identifier}`;
    const itDocRef = await firestore.collection(colPath).doc(itineraryId).withConverter(ItineraryConverter);
    const itSnapshot = await itDocRef.get();

    if(!itSnapshot.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);

    const {name, startDate, endDate} = dataToUpdate;

    let data : FirebaseFirestore.UpdateData = {};

    if(name) data = {...data, name};

    //update startDate, endDate and totalDays
    if(startDate && endDate){
        //convert time to UTC
        let startDateUTC = convertLocalToUTC(startDate);
        let endDateUTC = convertLocalToUTC(endDate);

        //different days between start to end date
        const totalDays = getTotalDays(startDateUTC, endDateUTC);

        //convert to server timestamp
        const startDateUTCTS = convertToServerTimestamp(startDateUTC.toDate());
        const endDateUTCTS = convertToServerTimestamp(endDateUTC.toDate());

        data = {...data, startDateUTCTS, endDateUTCTS, totalDays};
    }

    writeHandler.update(itSnapshot.ref, data);

    return true;
}

export const deleteItinerary = async (userId:string, itineraryId:string)=>{

    const colPath = `${colNames.userItineraries.identifier}/${userId}/${colNames.userItineraries.itineraries.identifier}`;
    const itDocRef = await firestore.collection(colPath).doc(itineraryId).withConverter(ItineraryConverter);
    const itSnapshot = await itDocRef.get();

    if(!itSnapshot.exists) throw new Error(`Itinerary ${itineraryId} do not exists`);

    const allDocRefs = await getAllDocumentsPathUnder(itDocRef);
    await deleteDocuments(allDocRefs);
    return true;
}