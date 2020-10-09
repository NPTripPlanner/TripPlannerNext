// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');

import {firestore} from './utils';
import { WriteBatch } from '@google-cloud/firestore';
import User from '../models/userDoc';
import UserItinerary from '../models/userItineraryDoc';
import colNames from './firestoreColNames';

export interface ICreateUserData {
    id:string;
    email:string;
    displayName:string;
}
/**
 * Create new user in firestore
 * 
 * This should only be used for test not production
 * 
 * In production need to automatically create user when new user account created
 * @param userData user data
 * @param writeHandler Firestore's WriteBatch
 * 
 * @return string of user id
 */
export const createUser = async (userData:ICreateUserData, writeHandler:WriteBatch) : Promise<string>=>{
    if(!userData) throw Error('User data was not given');


    const newUserDoc = new User(userData.id, userData.email, userData.displayName);
    const newUserItDoc = new UserItinerary(userData.id, 0);

    const userDocRef = await firestore.collection(colNames.users.identifier).doc(userData.id);
    const userItineraryDocRef = await firestore.collection(colNames.userItineraries.identifier)
    .doc(userData.id);

    writeHandler.create(userDocRef, newUserDoc.toFirestore());
    writeHandler.create(userItineraryDocRef, newUserItDoc.toFirestore());

    return userData.id;
}

