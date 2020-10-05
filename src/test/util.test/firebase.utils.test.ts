import { 
  ClearTestFirestore,
  InitFirebase, 
  // ClearApp,
  initializeUser,
  CreateTripArchive,
  DeleteTripArchive,
  // FetchTripArchive,
  // FetchTripArchiveAfter,
  ListenToRepository,
  GetRepository,
  ListenToDocument,
  // GetTripArchive,
  UpdateTripArchiveName,
  // SearchTripArchive,
  GetCollectionRef,
  GetDataByQuery,
  ConvertSearchKeywordToArray,
  CreateItineraryForTripArchive,
  // UpdateItinerary,
  DeleteItinerary,
  ConvertRepo,
  CreateScheduleForItinerary,
  DeleteSchedule,
  GetScheduls,
  GetScheduleById,
  UpdateSchedule,
  UpdateItinerary
} from "../../utils/firebase/firebase.utils";

import { TripArchive, Itinerary } from "../../schema/firestore.schema";
import ImprovedRepository from "../../schema/ImprovedRepository";
import { CloneObject } from "../../utils/utils";
// import {SortArray} from './utils';

describe("Firebase utility test", () => {

  const fakeUser = {
    uid:'testId',
    displayName:'test name',
    email:'fake@gmail.com',
  }

  beforeAll(async () => {
    await ClearTestFirestore();
    InitFirebase();
    
  });

  afterAll(async (done) => {
    try{
        //will cause test throw error Firebase functions instance was deleted
        //and cloud functions are working fine
        // await ClearApp();
        done();
    }
    catch(err){
        throw err;
    }
  });
  
  describe('init user module', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('initializeUser function', async ()=>{
      const result = await initializeUser(fakeUser);

      return expect(result).toBeTruthy();
    })
  })

  describe('create trip archive module', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('CreateTripArchive() function', async ()=>{
      expect(CreateTripArchive(fakeUser.uid, 'trip archive 1'))
      .resolves
      .not
      .toThrowError();
      
      await CreateTripArchive(fakeUser.uid, 'trip archive 3');

      const result = await CreateTripArchive(fakeUser.uid, 'trip archive 2');
      expect(result).not.toBeNull();
      return expect(result).toMatchObject({ownerId:fakeUser.uid});
    })
  })

  describe('delete trip archive module', ()=>{
    let archive;

    beforeAll(async ()=>{
      archive = await CreateTripArchive(fakeUser.uid, 'If you see this, it is a problem');
    })

    afterAll(async (done) => {
      done();
    });

    it('DeleteTripArchive() function', async ()=>{

      const deleteResult = DeleteTripArchive(fakeUser.uid, archive.id);
      return expect(deleteResult).toBeTruthy();

    })
  })

  describe('update trip archive module', ()=>{
    const oldName = 'name will be changed';
    const newName = 'new name';
    let archive;

    beforeAll(async ()=>{
      archive = await CreateTripArchive(fakeUser.uid, oldName);
    })

    afterAll(async (done) => {
      done();
    });

    it('UpdateTripArchiveName() function', async ()=>{
      const updateResult = await UpdateTripArchiveName(fakeUser.uid, archive.id, newName);
      return expect(updateResult.name).toEqual(newName);

    })
  })

  describe('real-time listen to collection module', ()=>{
    afterAll(async (done) => {
      done();
    });
    beforeAll(()=>{
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;
    })

    it('ListenToRepository() function', async()=>{
      //will use jest to spy on it
      const cbObj ={ 
        fn:(_docs)=>{
          //uncomment to see log
          // console.log('receive documents changed under collection', docs);
        }
      };
      const spy = jest.spyOn(cbObj, 'fn');

      //start listening to collection change
      const unsubscribe = ListenToRepository<TripArchive, ImprovedRepository<TripArchive>>(
        await GetRepository(TripArchive), 
        cbObj.fn,
        (err)=>console.log(err)
      );

      //create 2 trip archives automatically
      const result = await new Promise((res)=>{
        let count = 0;
        const intval = setInterval(async ()=>{
          await CreateTripArchive(fakeUser.uid, `Auto created trip archive ${count}`);
          count++;
          if(count >= 2){
             clearInterval(intval);
            res(true);
          }
        }, 3000);
      });

      //stop listening
      unsubscribe();

      expect(spy).toHaveBeenCalled();
      return expect(result).toBeTruthy();
    })


  })
  
  describe('real-time listen to one document module', ()=>{
    const oldName = 'change this document\'s name';
    let repo;
    let archive;
    let docRef;

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000000;

      repo = await GetRepository(TripArchive);
      archive = await CreateTripArchive(fakeUser.uid, oldName);
      docRef = repo.getDocumentReference(archive.id);
    })

    it('ListenToDocument() function', async ()=>{
      
      //will use jest to spy on it
      const cbObj={
        fn:(_doc)=>{
          // console.log('receive document changed', doc);
        }
      }
  
      const spy = jest.spyOn(cbObj, 'fn');
  
      //check if document's name is old name
      let doc = await repo.findById(archive.id);
      expect(doc.name).toEqual(oldName);
  
      //start listening to document change
      const unsubscribe = ListenToDocument<TripArchive, ImprovedRepository<TripArchive>>(
      repo, docRef, cbObj.fn,(err)=>console.log(err));
      
      //update document's name to new name
      const newName = 'The name has been changed';
      doc = await repo.findById(archive.id);
      doc.name = newName;
      await repo.update(doc);
      
      //stop listening
      unsubscribe();
  
      expect(spy).toBeCalled();
      doc = await repo.findById(archive.id);
      return expect(doc.name).toEqual(newName);
    })
  });

  describe('get data by query module', ()=>{
    let repo = null;

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      repo = await GetRepository(TripArchive);
      await CreateTripArchive(fakeUser.uid, '@@ $$ %%');
      await CreateTripArchive(fakeUser.uid, 'Germany Travel');
      await CreateTripArchive(fakeUser.uid, 'Greece Travel');
      await CreateTripArchive(fakeUser.uid, 'Australia Travel');
      await CreateTripArchive(fakeUser.uid, 'USA Travel');
      await CreateTripArchive(fakeUser.uid, 'France Travel');
      await CreateTripArchive(fakeUser.uid, 'Hungary Travel');
    })

    it('GetDataByQuery() function with search keyword, 1 result', async ()=>{
      const keywords = ConvertSearchKeywordToArray('yy $$');

      const colRef = await GetCollectionRef(TripArchive);
      let query = colRef.where('ownerId', '==', fakeUser.uid);
      query = query.where('tags', 'array-contains-any', keywords);
      query = query.orderBy('createAt', 'desc');
      const result = await GetDataByQuery(repo, query, 1);
      
      expect(result.lastDocSnapshotCursor).not.toBeNull();
      return expect(result.results).toHaveLength(1);
    })

    it('GetDataByQuery() function with search keyword, no result', async ()=>{
      const keywords = ConvertSearchKeywordToArray('^^^^^^^^^');

      const colRef = await GetCollectionRef(TripArchive);
      let query = colRef.where('ownerId', '==', fakeUser.uid);
      query = query.where('tags', 'array-contains-any', keywords);
      query = query.orderBy('createAt', 'desc');
      const result = await GetDataByQuery(repo, query, 1);
      
      expect(result.lastDocSnapshotCursor).toBeNull();
      return expect(result.results).toHaveLength(0);
    })

    it('GetDataByQuery() function with search keyword, multiple result in pagination', async ()=>{
      const words = 'Germany Greece USA Australia Hungary France';
      const keywords = ConvertSearchKeywordToArray(words);

      const colRef = await GetCollectionRef(TripArchive);
      let query = colRef.where('ownerId', '==', fakeUser.uid);
      query = query.where('tags', 'array-contains-any', keywords);
      query = query.orderBy('createAt', 'desc');
      const result = await GetDataByQuery(repo, query, 2);
      
      expect(result.lastDocSnapshotCursor).not.toBeNull();
      expect(result.results).toHaveLength(2);

      const result2 = await GetDataByQuery(repo, query, 2, result.lastDocSnapshotCursor);
      expect(result2.lastDocSnapshotCursor).not.toBeNull();
      expect(result2.results).toHaveLength(2);

      const result3 = await GetDataByQuery(repo, query, 2, result2.lastDocSnapshotCursor);
      expect(result3.lastDocSnapshotCursor).not.toBeNull();
      expect(result3.results).toHaveLength(2);

      const result4 = await GetDataByQuery(repo, query, 2, result3.lastDocSnapshotCursor);
      expect(result4.lastDocSnapshotCursor).not.toBeNull();
      return expect(result4.results).toHaveLength(0);

    })
  })

  describe('create itinerary module', ()=>{
    let tripArchive: TripArchive = null;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'my new itinerary';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      tripArchive = await CreateTripArchive(fakeUser.uid, 'create itinerary');
    })

    it('CreateItineraryForTripArchive() function', async ()=>{
      await CreateItineraryForTripArchive(
        fakeUser.uid,
        tripArchive.id,
        'it name',
        startDate,
        endDate
      );

      const it = await CreateItineraryForTripArchive(
        fakeUser.uid,
        tripArchive.id,
        name,
        startDate,
        endDate
      );
      expect(it).not.toBeNull();
      expect(it.tripArchiveId).toEqual(tripArchive.id);
      return expect(it.name).toEqual(name);
    })
  })

  describe('update itinerary module', ()=>{
    let tripArchive: TripArchive = null;
    let itnerary: Itinerary;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'my new itinerary';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      tripArchive = await CreateTripArchive(fakeUser.uid, 'create itinerary');
      itnerary = await CreateItineraryForTripArchive(
        fakeUser.uid,
        tripArchive.id,
        name,
        startDate,
        endDate
      );
    });

    it('UpdateItinerary() function', async ()=>{
      const newName = 'my updated itinerary';
      const returnedIt = await UpdateItinerary(fakeUser.uid, tripArchive.id, itnerary.id, {
        name: newName,
        startDate: startDate,
        endDate: endDate,
      });

      return expect(returnedIt.name).toEqual(newName);
    })
  })

  describe('delete itinerary module', ()=>{
    let tripArchive: TripArchive = null;
    let itinerary;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'deleted not able to see this';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      tripArchive = await CreateTripArchive(fakeUser.uid, 'delete itinerary');

      itinerary = await CreateItineraryForTripArchive(
        fakeUser.uid,
        tripArchive.id,
        name,
        startDate,
        endDate
      );
    })

    it('DeleteItinerary() function', async ()=>{

      expect(itinerary).not.toBeNull();
      expect(itinerary.tripArchiveId).toEqual(tripArchive.id);
      
      const result = await DeleteItinerary(fakeUser.uid, tripArchive.id, itinerary.id);
      expect(result).toBeTruthy();

      const nonExists = await tripArchive.itineraries.findById(itinerary.id);
      return expect(nonExists).toBeNull();
    })
  })

  describe('query itinerary module', ()=>{
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const names = [];

    afterAll(async (done) => {
      done();
    });

    let tripArchive: TripArchive = null;
    beforeAll(async ()=>{
      tripArchive = await CreateTripArchive(fakeUser.uid, 'delete itinerary');

      //create 12 itineraries
      for(let i=0; i<12; i++){
        names.push(`itinerary name ${i}`);
      }

      for(let name of names){
        await CreateItineraryForTripArchive(
          fakeUser.uid,
          tripArchive.id,
          name,
          startDate,
          endDate
        );
      }
    })

    it('query all itineraries', async ()=>{

      const repo = await ConvertRepo<Itinerary>(tripArchive.itineraries);
      let query = repo.getCollectionReference().orderBy('createAt', 'desc');
      const results = await GetDataByQuery(repo, query, 0);
      return expect(results.results).toHaveLength(12);
    })
  })

  describe('Schedule CRUD module', ()=>{
    let tripArchive = null;
    let itinerary = null;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const itName = 'Schedule CRUD';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      tripArchive = await CreateTripArchive(fakeUser.uid, 'Schedule CRUD');

      itinerary = await CreateItineraryForTripArchive(
        fakeUser.uid,
        tripArchive.id,
        itName,
        startDate,
        endDate
      );
    });

    it('CreateScheduleForItinerary() function', async ()=>{

      const newSchedule = await CreateScheduleForItinerary(itinerary, new Date(), 'note for schedule');
      return expect(newSchedule).toBeTruthy();
    })

    it('get all schedules', async ()=>{
      const firstSchedule = await CreateScheduleForItinerary(itinerary, new Date(), 'first schedule');
      expect(firstSchedule).toBeTruthy();
      const secondSchedule = await CreateScheduleForItinerary(itinerary, new Date(), 'second schedule');
      expect(secondSchedule).toBeTruthy();

      const schedules = await GetScheduls(itinerary);
      return expect(schedules.length).toBeGreaterThan(2);
    })

    it('get schedule by id', async ()=>{
      const schedule = await CreateScheduleForItinerary(itinerary, new Date(), 'schedule note');
      expect(schedule).toBeTruthy();

      const foundSchedule = await GetScheduleById(itinerary, schedule.id);
      expect(foundSchedule).toBeTruthy();

      return expect(foundSchedule.id).toEqual(schedule.id);
    })

    it('delete a schedule', async ()=>{

      const newSchedule = await CreateScheduleForItinerary(itinerary, new Date(), 'note for schedule');
      expect(newSchedule).toBeTruthy();
      await DeleteSchedule(itinerary, newSchedule);
      const notfoundSchedule = await GetScheduleById(itinerary, newSchedule.id);

      return expect(notfoundSchedule).toBeNull();
    })

    it('update a schedule', async ()=>{

      const newSchedule = await CreateScheduleForItinerary(itinerary, new Date(), 'note for schedule');
      expect(newSchedule).toBeTruthy();
      
      const now = new Date();
      const future = new Date();
      future.setDate(now.getDate()+3);
      const newNote = 'This is new note';

      const clonedSchedule = CloneObject(newSchedule);
      clonedSchedule.note = newNote;
      clonedSchedule.date = future;

      const updateSchedule = await UpdateSchedule(itinerary, clonedSchedule);

      expect(updateSchedule).toBeTruthy();
      expect(updateSchedule.id).toEqual(clonedSchedule.id);
      return expect(updateSchedule.note).toEqual(newNote);
    })
  })
});