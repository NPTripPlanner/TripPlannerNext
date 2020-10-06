// const admin = require('firebase-admin');
// const moment = require('moment');

import * as admin from 'firebase-admin';
import moment, { Moment } from 'moment';
import { MomentInput } from 'moment';

/**
 * Get current date time in UTC
 * 
 * @return js Date
 */
export const getNowUTC = () : Date =>{

    const nowUTC = moment.utc();
    return nowUTC.toDate();
}

/**
 * Convert date to UTC 
 * @param date moment date
 * 
 * @return js Date
 */
export const convertToUTC = (date:MomentInput) : Date =>{
    const dateUTC = moment.utc(date);
    return dateUTC.toDate();
}

/**
 * Add create date to object
 * @param object js object
 * @param createDate moment date if null then UTC date will be used
 * 
 * @return js object with createAt as property and Firebase timestamp as value
 */
export const addCreateDateToObject = <T extends {}>(object:T, createDate:MomentInput=null) : T =>{
    let cDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(createDate){
        cDate = admin.firestore.Timestamp.fromDate(convertToUTC(createDate));
    }
    object['createAt'] = cDate;
    return object;
}

/**
 * Add modify date to object
 * @param object js object
 * @param modifyDate moment date if null then UTC date will be used
 * 
 * @return js object with modifyAt as property and Firebase timestamp as value
 */
export const addModifyDateToObject = <T extends {}>(object:T, modifyDate:MomentInput=null) : T =>{
    let mDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(modifyDate){
        mDate = admin.firestore.Timestamp.fromDate(convertToUTC(modifyDate));
    }
    object['modifyAt'] = mDate;
    return object;
}

/**
 * Convert js Date to Firebase firstore timestamp
 * @param date js Date
 * 
 * @return FirebaseFirestore Timestamp
 */
export const convertToServerTimestamp = (date:Date) : FirebaseFirestore.Timestamp=>{
    return admin.firestore.Timestamp.fromDate(date);
}

/**
 * Return an array of splited string from name
 * @param name string to be splited into array
 * @param splitBy separator
 * 
 * @return array of string
 */
export const getTagsfromName = (name:string, splitBy:string=' ') : string[]=>{
    if(!name) return [];
    const result = name.split(splitBy);
    return result?result:[];
}

/**
 * Convert moment date time to UTC
 * @param {*} datetime string format is like 2013-02-04T10:35:24-08:00
 * 
 * @return moment object
 */
export const convertLocalToUTC = (datetime:MomentInput) : Moment=>{
    const convertUTC = moment.utc(datetime);
    return convertUTC;
}

/**
 * Get total days from start to end 
 * @param {*} start Moment object for start date
 * @param {*} end  Moment object for end date
 * 
 * @returns total days in number
 */
export const getTotalDays = (start:Moment, end:Moment) : number=>{
    const diffDays = end.diff(start, 'days');
    if(diffDays < 0) throw new Error('start date is after end date');
    const totalDays = diffDays + 1;

    return totalDays;
}
