// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');

import User from '../models/userDoc';
import UserItinerary from '../models/userItineraryDoc';
import colNames from '../models/firestoreColNames';
import { https } from 'firebase-functions';
import { Firestore } from '@google-cloud/firestore';

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
 * 
 * @return string of user id
 */
export async function createUser(firestore:Firestore, userData:ICreateUserData) : Promise<string>{

    if(!userData) throw new https.HttpsError('data-loss','User data was not given');

    const {id, email, displayName} = userData;

    if(!id) throw new https.HttpsError('invalid-argument','user id is requried');
    if(!email) throw new https.HttpsError('invalid-argument','user email is required');

    const newUserDoc = new User(id, email, displayName);
    const newUserItDoc = new UserItinerary(userData.id, 0);

    const userDocRef = await firestore.collection(colNames.users.identifier).doc(userData.id);
    const userItineraryDocRef = await firestore.collection(colNames.userItineraries.identifier)
    .doc(userData.id);

    const batch = firestore.batch();
    batch.create(userDocRef, newUserDoc.toFirestore());
    batch.create(userItineraryDocRef, newUserItDoc.toFirestore());
    await batch.commit();

    return userData.id;
}

