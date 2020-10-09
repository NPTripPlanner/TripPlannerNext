import {https} from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import admin from 'firebase-admin';

const adminApp = admin.initializeApp({
    projectId:'tripplanner-9563b'
})
const firestore = adminApp.firestore();

import {initUtils} from './utils/utils';
initUtils(adminApp);


import {createUser} from './utils/user.utils';
import {createItinerary, deleteItinerary, IUpdateItineraryData, updateItinerary} from './utils/itinerary.utils';

import {mockFirebaseAuth, TestAuth} from './__tests__/mock/mock.auth';

const env = process.env.NODE_ENV;

if(process.env.NODE_ENV === 'production'){
    console.log = ()=>{}
}

class ValidateError extends Error{
    code:string;

    constructor(code:string, message:string){
        super(message);
        this.code = code;
    }
}

type Auth = {
    uid: string;
    token: admin.auth.DecodedIdToken;
};

function validateAuthFromFunctionContext(context:CallableContext,  errorMsg:string=''):Auth|TestAuth{

    if (env==='test') {
      console.log("Authentication is mocked for integration testing");
      return mockFirebaseAuth;
    }

    if(context.auth){
        if(context.auth.uid){
            return {
                uid: context.auth.uid,
                token: context.auth.token,
            };
        }
        throw new ValidateError('cloud-function/uid', errorMsg);
    }

    throw new ValidateError('cloud-function/unauthorized', errorMsg);
}


interface InitUserHttpsData{
    displayName: string;
    email: string;
}
export const initUserHttps = https.onCall(async (data:InitUserHttpsData, context:CallableContext) => {

    try{
        const auth = validateAuthFromFunctionContext(context, 'Initialize user fail');
        const userId = auth?.uid;

        const userBatch = firestore.batch();
        //create a new user
        await createUser({
            id:userId,
            email:data.email,
            displayName:data.displayName,
        }, userBatch);
        
        await userBatch.commit();
        
        return true;
    }
    catch(err){
        console.log(err);
        throw new https.HttpsError(err.code, err.message);
    }
});

interface ICreateItineraryHttpsData{
    name:string;
    startDate:string;
    endDate:string;
}
export const createItineraryHttps = https.onCall(
    async (data:ICreateItineraryHttpsData, context:CallableContext)=>{
        try{
            const auth = validateAuthFromFunctionContext(context, 'create itinerary fail');
            const userId = auth.uid;

            const {name, startDate, endDate} = data;

            if(!userId) throw new Error(`Missing user id`);

            const batch = firestore.batch();

            const itId = await createItinerary(userId, name, startDate, endDate, batch);

            await batch.commit();

            return {
                id: itId,
            }
        }
        catch(err){
            console.log(err);
            throw new https.HttpsError(err.code, err.message);
        }
    }
);

interface IUpdateItineraryHttpsData{
    itineraryId:string;
    dataToUpdate: IUpdateItineraryData;
}
export const updateItineraryHttps = https.onCall(
    async (data:IUpdateItineraryHttpsData, context:CallableContext)=>{
        try{
            const auth = validateAuthFromFunctionContext(context, 'update itinerary fail');
            const userId = auth.uid;

            const {itineraryId, dataToUpdate} = data;

            const batch = firestore.batch();

            const result = await updateItinerary(userId, itineraryId, dataToUpdate, batch);

            await batch.commit();
            return result;

        }
        catch(err){
            console.log(err);
            throw new https.HttpsError(err.code, err.message);
        }
    }
);

interface IDeleteItineraryHttpsData{
    itineraryId:string;
}
export const deleteItineraryHttps = https.onCall(async (
    data:IDeleteItineraryHttpsData, context:CallableContext)=>{

    try{
        const auth = validateAuthFromFunctionContext(context, 'Delete itinerary fail');
        const userId = auth.uid;

        const result = await deleteItinerary(userId, data.itineraryId);

        return result;
    }
    catch(err){
        console.log(err.message);
        throw new https.HttpsError(err.code, err.message);
    }
});

// exports.triggerTripArchiveCreate = functions.firestore.document('tripArchive/{archive_id}')
// .onCreate(trigger.updateTagsOnCreated);
// exports.triggerTripArchiveChange = functions.firestore.document('tripArchive/{archive_id}')
// .onUpdate(trigger.updateTagsOnChanged);

// exports.triggerItineraryCreate = functions.firestore.document('tripArchive/{archive_id}/itineraries/{itinerary_id}')
// .onCreate(trigger.updateTagsOnCreated);
// exports.triggerItineraryChange = functions.firestore.document('tripArchive/{archive_id}/itineraries/{itinerary_id}')
// .onUpdate(trigger.updateTagsOnChanged);
