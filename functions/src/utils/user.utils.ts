// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');

import {firestore} from './utils';
import { WriteBatch } from '@google-cloud/firestore';
import User from '../models/userDoc';
import UserItinerary from '../models/userItineraryDoc';
import colNames from './firestoreColNames';
import { https } from 'firebase-functions';

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

    if(!userData) throw new https.HttpsError('data-loss','User data was not given');

    const {id, email, displayName} = userData;

    if(!id) throw new https.HttpsError('data-loss','user id is requried');
    if(!email) throw new https.HttpsError('data-loss','user email is required');

    const newUserDoc = new User(id, email, displayName);
    const newUserItDoc = new UserItinerary(userData.id, 0);

    const userDocRef = await firestore.collection(colNames.users.identifier).doc(userData.id);
    const userItineraryDocRef = await firestore.collection(colNames.userItineraries.identifier)
    .doc(userData.id);

    writeHandler.create(userDocRef, newUserDoc.toFirestore());
    writeHandler.create(userItineraryDocRef, newUserItDoc.toFirestore());

    return userData.id;
}

