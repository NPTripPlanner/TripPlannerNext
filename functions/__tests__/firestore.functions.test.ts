const test = require('firebase-functions-test')();
import { CallableContextOptions, WrappedFunction } from 'firebase-functions-test/lib/main';
import {initUserHttps, createItineraryHttps, updateItineraryHttps, deleteItineraryHttps} from '../src/index';
import {mockFirebaseAuth} from './mock/mock.auth';


describe('Firestore functions test', ()=>{
    let wrapped: WrappedFunction;

    async function createFakeItinerary(name:string, startDate:Date, endDate:Date){

        const itId = await test.wrap(createItineraryHttps)({
                        name:name,
                        startDate:startDate.toUTCString(),
                        endDate:endDate.toUTCString(),
                    }, callableContextOptions)
        
        return itId;
    }

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

        it('create new itinerary without start date successful', async ()=>{

            // const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);

            await expect(wrapped({
                name:'New itinerary',
                // startDate:startDate.toUTCString(),
                endDate:endDate.toUTCString(),
            }, callableContextOptions))
            .resolves
            .toBeTruthy();

        })

        it('create new itinerary missing name fail', async ()=>{

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);

            await expect(wrapped({
                // name:'New itinerary',
                startDate:startDate.toUTCString(),
                endDate:endDate.toUTCString(),
            }, callableContextOptions))
            .rejects
            .toThrow();

        })

        it('create new itinerary missing end date fail', async ()=>{

            const startDate = new Date();
            const endDate = new Date();
            endDate.setDate(endDate.getDate()+5);

            await expect(wrapped({
                name:'My itinerary',
                startDate:startDate.toUTCString(),
                // endDate:endDate.toUTCString(),
            }, callableContextOptions))
            .rejects
            .toThrow();

        })
    })

    describe('updateItineraryHttps', ()=>{
        let itineraryId:string;
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate()+5);

        

        beforeAll(async (done)=>{
            wrapped = test.wrap(updateItineraryHttps);
            itineraryId = await createFakeItinerary('change name here', startDate, endDate);
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

        it('update itinerary only name successful', async ()=>{
            const dataToUpdate = {
                name:'My awesome itinerary',
            }
            await expect(wrapped({
             itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).resolves.toBeTruthy();
        })

        it('update itinerary only date successful', async ()=>{
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

        it('update itinerary missing id fail', async ()=>{
            const dataToUpdate = {
                name:'New Itinerary name',
                startDate:startDate,
                endDate:endDate,
            }
            await expect(wrapped({
            //  itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).rejects.toThrow();
        })

        it('update itinerary only date fail', async ()=>{
            //date from now and plus 10 days
            endDate.setDate(endDate.getDate()+10);

            const dataToUpdate = {
                // startDate:startDate,
                endDate:endDate,
            }
            await expect(wrapped({
             itineraryId:itineraryId,
             dataToUpdate:dataToUpdate,
            }, callableContextOptions)).rejects.toThrow();
        })
    })

    describe('deleteItineraryHttps', ()=>{
        let itineraryId:string;
        let startDate = new Date();
        let endDate = new Date();
        endDate.setDate(endDate.getDate()+3);

        beforeAll(async (done)=>{
            wrapped = test.wrap(deleteItineraryHttps);
            itineraryId = await createFakeItinerary('should be deleted', startDate, endDate);
            done();
        })

        it('delete itinerary successful', async ()=>{
            await expect(wrapped({
                itineraryId:itineraryId,
            }, callableContextOptions)).resolves.toBeTruthy();
        })

        it('delete itinerary missing id fail', async ()=>{
            await expect(wrapped({
                // itineraryId:itineraryId,
            }, callableContextOptions)).rejects.toThrow();
        })
    })
})