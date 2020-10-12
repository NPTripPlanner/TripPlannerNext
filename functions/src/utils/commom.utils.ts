import * as admin from 'firebase-admin';

//https://momentjs.com/docs/#/use-it/typescript/
import moment = require('moment');
import { Moment } from 'moment';
import { MomentInput } from 'moment';
import { IDateTimeObject } from './types';

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
 * @param date MomentInput
 * 
 * @return js Date
 */
export const convertToUTC = (date:MomentInput) : Date =>{
    const dateUTC = moment.utc(date);
    return dateUTC.toDate();
}

/**
 * Add create date to object
 * @param object js object if null current date will provide
 * @param createDate js Date
 * 
 * @return js object with createAt as property and Firebase timestamp as value
 */
export function addCreateDateToObject <T extends IDateTimeObject>(
    object:T, createDate:Date|null = null) : T {

    let cDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(createDate){
        cDate = admin.firestore.Timestamp.fromDate(convertToUTC(createDate));
    }
    object.createAt = cDate;
    return object;
}

/**
 * Add modify date to object
 * @param object js object
 * @param modifyDate moment date if null then UTC date will be used
 * 
 * @return js object with modifyAt as property and Firebase timestamp as value
 */
export function addModifyDateToObject <T extends IDateTimeObject>(
    object:T, modifyDate:Date|null=null) : T{

    let mDate = admin.firestore.Timestamp.fromDate(getNowUTC());
    if(modifyDate){
        mDate = admin.firestore.Timestamp.fromDate(convertToUTC(modifyDate));
    }
    object.modifyAt = mDate;
    return object;
}

/**
 * Convert js Date to Firebase firstore timestamp
 * @param date js Date
 * 
 * @return FirebaseFirestore Timestamp
 */
export function convertToServerTimestamp(date:Date) : FirebaseFirestore.Timestamp{
    return admin.firestore.Timestamp.fromDate(date);
}

/**
 * Return an array of splited string from name
 * @param name string to be splited into array
 * @param splitBy separator
 * 
 * @return array of string
 */
export function getTagsfromName(name:string, splitBy:string=' ') : string[]{
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
export function convertLocalToUTC(datetime:MomentInput) : Moment{
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
export function getTotalDays(start:Moment, end:Moment) : number{
    const diffDays = end.diff(start, 'days');
    if(diffDays < 0) throw new Error('start date is after end date');
    const totalDays = diffDays + 1;

    return totalDays;
}
