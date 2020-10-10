import functionTest from 'firebase-functions-test';
import { CallableContextOptions, WrappedFunction } from 'firebase-functions-test/lib/main';
const test = functionTest();
import {initUserHttps, createItineraryHttps} from '../index';
import {mockFirebaseAuth} from './mock/mock.auth';


describe('Firestore functions test', ()=>{

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
        let wrapped: WrappedFunction;

        beforeAll((done)=>{
            wrapped = test.wrap(initUserHttps);
            done();
        })

        it('create new user', (done)=>{
            expect(wrapped({
                email: userData.email,
                displayName: userData.displayName,
            }, callableContextOptions)).resolves.toEqual(callableContextOptions.auth.uid);

            done();
        })

        it('duplicate user', (done)=>{
            expect(wrapped({
                email: userData.email,
                displayName: userData.displayName,
            }, callableContextOptions)).rejects.toThrow();

            done();
        })

        it('initUserHttps call fail with missing email', (done)=>{
            const wrapped = test.wrap(initUserHttps);
            expect(wrapped({
                // email: userData.email,
                displayName: userData.displayName,
            })).rejects.toThrow();

            done();
        })
    })

    describe('createItineraryHttps', ()=>{
        let wrapped: WrappedFunction;

        beforeAll((done)=>{
            wrapped = test.wrap(createItineraryHttps);
            done();
        })

        it('create new itinerary', (done)=>{

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);

            expect(wrapped({
                name:'New itinerary',
                startDate:startDate.toLocaleDateString(),
                endDate:endDate.toLocaleDateString(),
            }, callableContextOptions)).resolves.toBeTruthy();

            done();
        })
    })

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