// const test = require('firebase-functions-test')();
import functionTest from 'firebase-functions-test';
const test = functionTest();
import {initUserHttps} from '../index';


describe('Firestore functions test', ()=>{

    const userData = {
        id:'testId',
        displayName:'test name',
        email:'fake@gmail.com',
    }

    afterAll(()=>{
        test.cleanup();
    })

    describe('init user', ()=>{
        it('test init user function', async ()=>{
            const wrapped = test.wrap(initUserHttps);
            const result = await wrapped(userData);
            return expect(result).toBeTruthy();
        })
    })

    // describe('create itinerary', ()=>{
    //     it('test create itinerary function', async ()=>{
    //         let wrapped = test.wrap(firestoreFunctions.createTripArchive);
    //         const result = await wrapped({
    //             userId: userData.id,
    //             name:'This has 1 itineray',
    //         });
    //         expect(result).toMatchObject({
    //             ownerId: userData.id,
    //         });

    //         const startDate = new Date();
    //         const endDate = new Date();
    //         endDate.setDate(endDate.getDate()+5);
    //         console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
    //         wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
    //         const returnResut = await wrapped({
    //             tripArchiveId: result.id,
    //             name: 'first itinerary',
    //             startDate: startDate.toUTCString(),
    //             endDate: endDate.toUTCString(),
    //         });
    //         expect(returnResut).toBeTruthy();
    //         return expect(returnResut.tripArchiveId).toEqual(result.id);
    //     })
    // })

    // describe('update itinerary', ()=>{
    //     it('test update itinerary name and date function', async ()=>{
    //         let wrapped = test.wrap(firestoreFunctions.createTripArchive);
    //         const result = await wrapped({
    //             userId: userData.id,
    //             name:'itinerary name will be changed',
    //         });
    //         expect(result).toMatchObject({
    //             ownerId: userData.id,
    //         });

    //         const startDate = new Date();
    //         const endDate = new Date();
    //         endDate.setDate(endDate.getDate()+5);
    //         console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
    //         wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
    //         const returnResut = await wrapped({
    //             tripArchiveId: result.id,
    //             name: 'You can not see this itinerary name',
    //             startDate: startDate.toUTCString(),
    //             endDate: endDate.toUTCString(),
    //         });
    //         expect(returnResut).toBeTruthy();
    //         expect(returnResut.tripArchiveId).toEqual(result.id);

    //         wrapped = test.wrap(firestoreFunctions.updateItinerary);
    //         const changedStartDate = new Date();
    //         const changedEndDate = new Date();
    //         changedEndDate.setDate(changedEndDate.getDate()+10);
    //         const newResult = await wrapped({
    //             userId: userData.id,
    //             tripArchiveId: returnResut.tripArchiveId,
    //             itineraryId: returnResut.id,
    //             dataToUpdate: {
    //                 name: 'name and date has been changed, total days changed from 6 to 11',
    //                 startDate: changedStartDate.toUTCString(),
    //                 endDate: changedEndDate.toUTCString(),
    //             }
    //         })
    //         return expect(newResult).toBeTruthy();
    //     })
    // })

    // describe('delete itinerary', ()=>{
    //     it('test delete itinerary function', async ()=>{
    //         let wrapped = test.wrap(firestoreFunctions.createTripArchive);
    //         const result = await wrapped({
    //             userId: userData.id,
    //             name:'itinerary was deleted',
    //         });
    //         expect(result).toMatchObject({
    //             ownerId: userData.id,
    //         });

    //         const startDate = new Date();
    //         const endDate = new Date();
    //         endDate.setDate(endDate.getDate()+5);
    //         console.log(startDate.toLocaleDateString(), endDate.toLocaleDateString());
    //         wrapped = test.wrap(firestoreFunctions.createItineraryForTripArchive);
    //         const returnResut = await wrapped({
    //             tripArchiveId: result.id,
    //             name: 'You see itinerary there is something went wrong',
    //             startDate: startDate.toUTCString(),
    //             endDate: endDate.toUTCString(),
    //         });
    //         expect(returnResut).toBeTruthy();
    //         expect(returnResut.tripArchiveId).toEqual(result.id);

    //         wrapped = test.wrap(firestoreFunctions.deleteItinerary);
    //         const deleteResult = await wrapped({
    //             userId: userData.id,
    //             tripArchiveId: returnResut.tripArchiveId,
    //             itineraryId: returnResut.id,
    //         });
    //         return expect(deleteResult).toBeTruthy();
    //     })
    // })
})