const test = require('firebase-functions-test')();
import { CallableContextOptions, WrappedFunction } from 'firebase-functions-test/lib/main';
import {initUserHttps, createItineraryHttps, updateItineraryHttps} from '../src/index';
import {mockFirebaseAuth} from './mock/mock.auth';


describe('Firestore functions test', ()=>{
    let wrapped: WrappedFunction;

    const userData = {
        id: mockFirebaseAuth.uid,
        email: mockFirebaseAuth.token.email,
        displayName: mockFirebaseAuth.token.name,
    }

    const callableContextOptions:CallableContextOptions = {
        auth:{
            uid:userData.id
        }
    }

    afterAll((done)=>{
        test.cleanup();
        done();
    })

    describe('initUserHttps', ()=>{

        beforeAll((done)=>{
            wrapped = test.wrap(initUserHttps);
            done();
        })

        it('create new user', async ()=>{

            await expect(wrapped({
                email: userData.email,
                displayName: userData.displayName,
            }, callableContextOptions))
            .resolves
            .toEqual(userData.id);
        })

        it('create duplicate user fail', async ()=>{

            await expect(wrapped({
                email: userData.email,
                displayName: userData.displayName,
            }, callableContextOptions))
            .rejects
            .toThrow();
        })

        it('initUserHttps call fail with missing email', async()=>{

            await expect(wrapped({
                // email: userData.email,
                displayName: userData.displayName,
            }, callableContextOptions))
            .rejects
            .toThrow();

        })
    })

    describe('createItineraryHttps', ()=>{

        beforeAll((done)=>{
            wrapped = test.wrap(createItineraryHttps);
            done();
        })

        it('create new itinerary successful', async ()=>{

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);

            await expect(wrapped({
                name:'New itinerary',
                startDate:startDate.toUTCString(),
                endDate:endDate.toUTCString(),
            }, callableContextOptions))
            .resolves
            .toBeTruthy();

        })
    })

    describe('updateItineraryHttps', ()=>{
        let itineraryId:string;
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate()+5);

        async function createFakeItinerary(){

            const itId = await test.wrap(createItineraryHttps)({
                            name:'Change name here',
                            startDate:startDate.toUTCString(),
                            endDate:endDate.toUTCString(),
                        }, callableContextOptions)
            
            return itId;
        }

        beforeAll(async (done)=>{
            wrapped = test.wrap(updateItineraryHttps);
            itineraryId = await createFakeItinerary();
            done();
        })

        it('update itinerary successful', async ()=>{
            const dataToUpdate = {
                name:'New Itinerary name',
                startDate:startDate,
                endDate:endDate,
            }
            await expect(wrapped({
             itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).resolves.toBeTruthy();
        })

        it('update itinerary only name', async ()=>{
            const dataToUpdate = {
                name:'My awesome itinerary',
            }
            await expect(wrapped({
             itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).resolves.toBeTruthy();
        })

        it('update itinerary date', async ()=>{
            //date from now and plus 10 days
            endDate.setDate(endDate.getDate()+10);

            const dataToUpdate = {
                startDate:startDate,
                endDate:endDate,
            }
            await expect(wrapped({
             itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).resolves.toBeTruthy();
        })
    })

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