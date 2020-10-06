// const firestore = require('./utils').firestore();
// const commonUtils = require('./commom.utils');

import {firestore} from './utils';
import {addCreateDateToObject, addModifyDateToObject} from './commom.utils';
import { WriteBatch } from '@google-cloud/firestore';


export interface IUserData{
   id: string;
   displayName: string;
   email:string;
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
export const createUserWith = async (userData:IUserData, writeHandler:WriteBatch) : Promise<string>=>{
    if(!userData) throw Error('User data was not given');

    let user : IUserData = {
        id: userData.id,
        displayName: userData.displayName,
        email: userData.email,
    };
    user = addCreateDateToObject(user);
    user = addModifyDateToObject(user);

    const userDocRef = await firestore.collection('users').doc(user.id);

    writeHandler.create(userDocRef, user);

    return user.id;
}

