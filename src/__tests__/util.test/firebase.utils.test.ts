import { Itinerary, User, UserItinerary } from "../../schema/firestore.schema";
import ImprovedRepository from "../../schema/ImprovedRepository";
import { 
  ClearTestFirestore,
  InitFirebase, 
  // ClearApp,
  InitializeUser,
  // ListenToRepository,
  GetRepository,
  // ListenToDocument,
  GetCollectionRef,
  GetDataByQuery,
  // ConvertSearchKeywordToArray,
  DeleteItinerary,
  // ConvertRepo,
  // CreateScheduleForItinerary,
  // DeleteSchedule,
  // GetScheduls,
  // GetScheduleById,
  // UpdateSchedule,
  UpdateItinerary,
  testUser,
  CreateItinerary,
  ConvertRepo
} from "../../utils/firebase/firebase.utils";

// import {Itinerary } from "../../schema/firestore.schema";
// import ImprovedRepository from "../../schema/ImprovedRepository";
// import { CloneObject } from "../../utils/utils";
// import {SortArray} from './utils';


describe("Firebase utility test", () => {

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
  
  describe('init user suit', ()=>{
    afterAll(async (done) => {
      done();
    });

    it('InitializeUser successful', async (done)=>{
      const userId = await InitializeUser(testUser.displayName, testUser.email);

      expect(userId).toEqual(testUser.uid);
      done();
    })
  })

  

  describe('get data by query suite', ()=>{
    let userRepo = null;

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      userRepo = await GetRepository(User);
    })

    it('GetDataByQuery() search user by id', async (done)=>{

      const colRef = await GetCollectionRef(User);
      let query = colRef.where('id', '==', testUser.uid);
      const result = await GetDataByQuery<User>(userRepo, query, 1);
      
      expect(result.lastDocSnapshotCursor).not.toBeNull();
      expect(result.results).toHaveLength(1);
      expect(result.results[0].id).toEqual(testUser.uid);
      done();
    })
  })

  
  describe('create itinerary suite', ()=>{
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'my new itinerary';

    afterAll(async (done) => {
      done();
    });

    it('CreateItinerary() successful', async (done)=>{
      const it = await CreateItinerary(
        name,
        startDate,
        endDate
      );
      expect(it).not.toBeNull();
      expect(it.name).toEqual(name);
      expect(it.startDateUTC.toLocaleDateString()).toEqual(startDate.toLocaleDateString());
      expect(it.endDateUTC.toLocaleDateString()).toEqual(endDate.toLocaleDateString());
      expect(it.totalDays).toEqual(4);
      done();
    })
  })
  
  describe('update itinerary suite', ()=>{
    let itnerary: Itinerary;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'my new itinerary';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{
      itnerary = await CreateItinerary(
        name,
        startDate,
        endDate
      );
    });

    it('UpdateItinerary() with new name successful', async (done)=>{
      const newName = 'This is cool';
      const it = await UpdateItinerary(itnerary.id, newName, startDate, endDate);

      expect(it.name).toEqual(newName);
      done();
    })

    it('UpdateItinerary() with start date and end date successful', async (done)=>{
      const newStartDate = new Date();
      newStartDate.setDate(newStartDate.getDate()+4);
      const newEndDate = new Date();
      newEndDate.setDate(newStartDate.getDate()+5);

      const it = await UpdateItinerary(itnerary.id, null, newStartDate, newEndDate);

      expect(it.startDateUTC.toLocaleDateString()).toEqual(newStartDate.toLocaleDateString());
      expect(it.endDateUTC.toLocaleDateString()).toEqual(newEndDate.toLocaleDateString());
      done();
    })

    it('UpdateItinerary() without data successful', async (done)=>{

      const it = await UpdateItinerary(itnerary.id);

      expect(it).not.toBeNull();
      done();
    })

    it('UpdateItinerary() with start date only fail', async (done)=>{

      const newStartDate = new Date();
      newStartDate.setDate(newStartDate.getDate()+4);

      try{
        await UpdateItinerary(itnerary.id, null, newStartDate, null);
        done();
      }
      catch(err){
        expect(err).toBeDefined();
        done();
      }
    })

    it('UpdateItinerary() with end date only fail', async (done)=>{

      const newEndDate = new Date();
      newEndDate.setDate(newEndDate.getDate()+4);

      try{
        await UpdateItinerary(itnerary.id, null, null, newEndDate);
        done();
      }
      catch(err){
        expect(err).toBeDefined();
        done();
      }
    })
  })

  describe('delete itinerary suite', ()=>{
    let itinerary;
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const name = 'Must be deleted';

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{

      itinerary = await CreateItinerary(
        name,
        startDate,
        endDate
      );
    })

    it('DeleteItinerary() successful', async (done)=>{
      
      const result = await DeleteItinerary(itinerary.id);
      expect(result).toEqual(true);
      done();

    })

    it('DeleteItinerary() with wrong id fail', async (done)=>{
      
      const id = 'do not exist'
      try{
        await DeleteItinerary(id);
        done();
      }
      catch(err){
        expect(err).toBeDefined();
        done();
      }

    })
  })
  
  describe('query itinerary suit', ()=>{
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate()+3);
    const names = [];
    const itName = '@my itinerary@';
    const numberOfItinerary = 12;
    let itineraryRepo:ImprovedRepository<Itinerary>;

    afterAll(async (done) => {
      done();
    });

    beforeAll(async ()=>{

      //create 12 itineraries
      for(let i=0; i<numberOfItinerary; i++){
        names.push(itName);
      }

      for(let name of names){
        await CreateItinerary(
          name,
          startDate,
          endDate
        );
      }

      //retrieve root collection of userItineraries
      const repo = await GetRepository(UserItinerary);
      //find userItinerary document
      const userItinerary = await repo.findById(testUser.uid);
      //retrieve collection under userItinerary document
      itineraryRepo = await ConvertRepo<Itinerary>(userItinerary.itineraries)
    })

    it('GetDataByQuery() query all itineraries that match certain name', async (done)=>{

      let query = itineraryRepo.getCollectionReference().where('name', '==', itName);
      const results = await GetDataByQuery(itineraryRepo, query, 0);
      expect(results.results).toHaveLength(numberOfItinerary);
      done()
    })

    it('GetDataByQuery() query itineraries with pagination', async (done)=>{

      const queryAmount = 4;
      let query = itineraryRepo.getCollectionReference().where('name', '==', itName);

      //first query return 4
      let result = await GetDataByQuery(itineraryRepo, query, queryAmount);
      expect(result.results).toHaveLength(queryAmount);

      //second query return 4
      result = await GetDataByQuery(itineraryRepo, query, queryAmount, result.lastDocSnapshotCursor);
      expect(result.results).toHaveLength(queryAmount);

      //third query return 4
      result = await GetDataByQuery(itineraryRepo, query, queryAmount, result.lastDocSnapshotCursor);
      expect(result.results).toHaveLength(queryAmount);

      //last query return 0 as total itineraries are 12
      result = await GetDataByQuery(itineraryRepo, query, queryAmount, result.lastDocSnapshotCursor);
      expect(result.results).toHaveLength(0);
      done()
    })
  })
  /*
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
  */


 /* 
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
  */
});