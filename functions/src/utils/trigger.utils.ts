import { DocumentSnapshot, QueryDocumentSnapshot } from '@google-cloud/firestore';
import { Change } from 'firebase-functions';
// const commonUtils = require('./commom.utils');
import { getTagsfromName } from './commom.utils';

/**
 * On document created
 * update search tags base on name
 * @param {*} docSnapshot 
 */
export const updateTagsOnCreated = async (
    docSnapshot:DocumentSnapshot) : Promise<FirebaseFirestore.WriteResult|null> =>{
    try{
        const name = docSnapshot?docSnapshot.get('name'):null;
        if(!name) return null;
        const tags = getTagsfromName(name, ' ');
        return docSnapshot.ref.update({tags});
    }
    catch(error){
        console.log(error);
        return null;
    }
}

/**
 * On document changed 
 * update search tags base on name
 * @param {*} change 
 */
export const updateTagsOnChanged = async (
    change:Change<QueryDocumentSnapshot>) : Promise<FirebaseFirestore.WriteResult|null> => {
    try{
        const nameBefore = change.before?change.before.get('name'):null;
        const nameAfter = change.after?change.after.get('name'):null;

        if(!nameBefore || !nameAfter){
            console.log('before and after should not be empty', nameBefore, nameAfter);
            return null;
        }

        //to break infinite loop risk
        if(nameBefore === nameAfter) {
            console.log('same name no changed', nameBefore, nameAfter);
            return null;
        }

        const tags = getTagsfromName(nameAfter, ' ');
        return change.after.ref.update({tags});
    }
    catch(error){
        console.log(error);
        return null;
    }
}