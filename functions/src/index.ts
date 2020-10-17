import {https} from 'firebase-functions';
import { CallableContext } from 'firebase-functions/lib/providers/https';
import admin from 'firebase-admin';

const adminApp = admin.initializeApp({
    projectId:"tripplanner-9563b"
});
const firestore = adminApp.firestore();

import {createUser} from './utils/user.utils';
import {createItinerary, deleteItinerary, IUpdateItineraryData, updateItinerary} from './utils/itinerary.utils';

const env = process.env.NODE_ENV;

if(process.env.NODE_ENV === 'production'){
    console.log = ()=>{}
}

if (env==='test') {
    console.log("Authentication is mocked for integration testing");
}

type Auth = {
    uid: string;
    token: admin.auth.DecodedIdToken;
};

function validateAuthFromFunctionContext(context:CallableContext):Auth{

    

    if(context.auth){
        if(context.auth.uid){
            return {
                uid: context.auth.uid,
                token: context.auth.token,
            };
        }
        throw new https.HttpsError('unauthenticated', 'missing uid');
    }

    throw new https.HttpsError('unauthenticated', 'not authorized');
}


interface InitUserHttpsData{
    displayName: string;
    email: string;
}
export const initUserHttps = https.onCall(async (data:InitUserHttpsData, context:CallableContext) => {

    try{
        const auth = validateAuthFromFunctionContext(context);
        const userId = auth?.uid;

        //create a new user
        const id = await createUser(firestore, {
            id:userId,
            email:data.email,
            displayName:data.displayName,
        });
        
        return {id};
    }
    catch(err){
        console.log('init user '+err);
        throw err;
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
            const auth = validateAuthFromFunctionContext(context);
            const userId = auth.uid;

            const {name, startDate, endDate} = data;

            if(!userId) throw new https.HttpsError('data-loss',`Missing user id`);

            const id = await createItinerary(firestore, userId, name, startDate, endDate)

            return {id}
        }
        catch(err){
            console.log('create itinerary '+err);
            throw err;
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
            const auth = validateAuthFromFunctionContext(context);
            const userId = auth.uid;

            const {itineraryId, dataToUpdate} = data;

            const id = await updateItinerary(firestore, userId, itineraryId, dataToUpdate);

            return {id};

        }
        catch(err){
            console.log('update itinerary '+ err);
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
        const auth = validateAuthFromFunctionContext(context);
        const userId = auth.uid;

        const successful = await deleteItinerary(firestore, userId, data.itineraryId);

        return {successful};
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
