import * as firebaseTest from "@firebase/testing";
import * as firebasePro from "firebase";
import 'firebase/functions';
import 'firebase/firestore';
import getErrorMsg from "./firebase.errors.utils";
import * as fireorm from 'fireorm';
import {Itinerary, Schedule, UserItinerary } from '../../schema/firestore.schema';
import { QueryDocumentSnapshot, DocumentReference, CollectionReference, DocumentSnapshot, QuerySnapshot, Query } from "@google-cloud/firestore";
import ImprovedRepository from "../../schema/ImprovedRepository";
import { BaseRepository } from "fireorm/lib/src/BaseRepository";
import { IEntity } from "fireorm";

export type FirebaseUser = firebasePro.User;

type App = firebase.app.App;
type Auth = firebase.auth.Auth;
type FirestoreDB = firebase.firestore.Firestore | any;
type CloudFunctions = firebase.functions.Functions;

export let firebaseApp : App;
export let firebaseAuth : Auth;
export let firebaseDatabase : FirestoreDB;
export let cloudFunctions : CloudFunctions;

export interface PresentUser{
  uid:string;
  displayName:string;
  email:string;
}

export const testUser: PresentUser = {
  uid: 'test',
  displayName: 'test',
  email: 'test@gmail.com'
}

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API_KEY,
  authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
  projectId: process.env.REACT_APP_FB_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FB_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FB_APP_ID,
  measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID,
};

//#region App

export const InitFirebase = () => {
  const setup = (app:App) => {
    //test do not use auth but dev and production
    if (process.env.NODE_ENV !== "test"){ 
      firebaseAuth = app.auth();
    }
    firebaseDatabase = app.firestore();
    cloudFunctions = app.functions();

    //test and developmentuse firestore and cloud function in emulator 
    if(process.env.NODE_ENV!=='production'){
      cloudFunctions.useFunctionsEmulator('http://localhost:5001');
    }
    //connect to emulator firestore in dev
    if(process.env.NODE_ENV === 'development'){
      firebasePro.firestore().settings({
        host: "localhost:8080",
        ssl: false
      });
    }
  };

  switch (process.env.NODE_ENV) {
    case "production":
    case "development":
      firebaseApp = firebasePro.initializeApp(firebaseConfig);
      setup(firebaseApp);
      break;
    default:
      firebaseApp = firebaseTest.initializeTestApp({
        projectId:'tripplanner-9563b',
        auth:testUser
      });
      setup(firebaseApp);
  }

  fireorm.initialize(firebaseDatabase);
};

export const ClearApp = async () => {
  return await firebaseApp.delete();
};

//#endregion App

//#region User

/**
 * Tranform firebase user to PresentUser
 * 
 * @param user Firebase User
 * 
 * @return null if no user data or instance of PresentUser 
 */
const transformFirebaseUser = (user:FirebaseUser)=>{
  if(user){
    const presentUser:PresentUser = {
      uid:user.uid,
      displayName:user.displayName,
      email:user.email,
    }
    return presentUser
  }

  return null;
}

/**
 * Get current signed in user
 * 
 * @return null if no user signed in or instance of PresentUser
 */
export const GetCurrentUser = () => {
  if(process.env.NODE_ENV === 'test') return testUser;
  return transformFirebaseUser(firebaseAuth.currentUser);
};

/**
 * Listen to user state changed
 * 
 * @param callback called when user state changed
 * 
 * @return firebase.Unsubscribe function, call return function
 * if you don't want to listen anymore
 */
export const ListenToUserStateChanged = (callback:(user:PresentUser|null)=>void)=>{
  return firebaseAuth.onAuthStateChanged((user)=>{
    callback(transformFirebaseUser(user));
  })
}

/**
 * Sign up user with email and password
 * @param email user email
 * @param password  user password
 * @param displayName  user display name
 */
export const SignUpWithEmailAndPassword = async (
  email:string,
  password:string,
  displayName:string
) => {
  try {
    const userCredential  = await firebaseAuth.createUserWithEmailAndPassword(email, password);

    if(!userCredential.user){
      throw Error('Unable to update user profile after creating user'); 
    }
    await userCredential.user.updateProfile({ displayName: displayName });
    //only use when dev mode
    if(process.env.NODE_ENV === 'development'){
      const result = await InitializeUser(userCredential.user.displayName, userCredential.user.email);
      if(!result) throw Error('Initilize user fail');
    }
    return Promise.resolve(userCredential);
  } catch (err) {
    console.log(err);
    return Promise.reject(err.message);
  }
};

/**
 * Call cloud function to initialize user
 * 
 * @param displayName user display name
 * @param email user email
 * 
 * @return user id as string
 */
export const InitializeUser = async (displayName:string, email:string):Promise<string>=>{
  try{
    const result = await cloudFunctions.httpsCallable('initUserHttps')({
      displayName:displayName,
      email:email,
    });
    return Promise.resolve<string>(result.data.id);
  }
  catch(err){
    console.log(err);
    return Promise.reject(err.message);
  }
}

/**
 * Login user with email and password
 * @param email user email
 * @param password user passowrd
 * 
 * @return null if user not signed in or instance of PresentUser
 */
export const LoginWithEmailAndPassword = async (email:string, password:string) => {
  try {
    await firebaseAuth.signInWithEmailAndPassword(email, password);
    const currentUser = GetCurrentUser();
    if(currentUser){
      return Promise.resolve(currentUser);
    }
    return Promise.resolve<null>(null);

  } catch (err) {
    console.log(err);
    return Promise.reject(err.message);
  }
};

/**
 * Send an email to user inbox to reset password
 * 
 * @param email user email
 * 
 * @return true if email sent successful
 */
export const SendForgotPasswordMail = async (email:string) => {
  try {
    await firebaseAuth.sendPasswordResetEmail(email);
    return Promise.resolve(true);
  } catch (err) {
    console.log(err);
    return Promise.reject(err.message);
  }
};

/**
 * Log out current user 
 * 
 * @return true if use logout successful
 */
export const Logout = async () => {
  try{
    await firebaseAuth.signOut();
    return Promise.resolve(true);
  }
  catch(err){
    console.log(err);
    return Promise.reject(err.message);
  }
};

//#endregion User

//#region Test only

/**
 * Clear all firestore data in emulator
 */
export const ClearTestFirestore = async ()=>{
  return await firebaseTest.clearFirestoreData({
    projectId:'tripplanner-9563b',
  })
}

//#endregion Test only

//#region Fireorm
/**
 * An easy way to get fireorm's repository from root collection
 * with type conversion if provided
 * @param entity 
 */
export const GetRepository = async <
T extends fireorm.IEntity,
ConvertToType = ImprovedRepository<T>
>
(entity:fireorm.Constructor<T>)=>{
  try{
    const result = (await fireorm.getRepository(entity)) as unknown as ConvertToType;
    return Promise.resolve(result);
  }
  catch(err){
    console.log(err);
    return Promise.reject(err.message);
  }
}

/**
 * A special function that convert fireorm repo, which extends from BaseRepository
 * into a custom ImprovedRepository
 * 
 * This is intend to be use with subcollections.
 * 
 * Given type is recommend
 * @param repo which is class extends from fireorm BaseRepository
 */
export const ConvertRepo = async <T extends IEntity,>(repo:BaseRepository)=>{
  try{
    const result =  repo as unknown as ImprovedRepository<T>;
    return Promise.resolve(result);
  }
  catch(err){
    console.log(err);
    return Promise.reject(err.message);
  }
}

/**
 *  Get firestore collection reference
 * @param entity which is class extends from fireorm BaseRepository
 */
export const GetCollectionRef = async <T extends fireorm.IEntity>(entity:fireorm.Constructor<T>)=>{
  try{

    const result = (await GetRepository(entity)).getCollectionReference();
    return Promise.resolve(result);
  }
  catch(err){
    console.log(err);
    return Promise.reject(err.message);
  }
}
//#endregion Fireorm

//#region utils

/**
 * Convert a keyword string into an array splited by space in string
 * 
 * @param keyword a string to be splited into an array
 * 
 * @returns an array of string otherwise null if keyword is empty string or
 * only whitespaces
 */
export const ConvertSearchKeywordToArray = (keyword:string):string[]=>{
  let words: string[]|null = null;
  if(keyword){
    if (!keyword.replace(/\s/g, '').length) return words;

    words = keyword.split(' ');
    if(!words) {
      words = [keyword];
    }
  }

  return words;
}

//#endregion utils

//#region Firestore query
interface QueryDataReturn<T> {
  lastDocSnapshotCursor: QueryDocumentSnapshot | null,
  results: T[]
}

/**
 * Get data by firestore query
 * 
 * @param entity a class type that was defined as schema with fireorm
 * @param query firebase query
 * @param amount number of data to return. given less or equal to 0 to return all data.
 * Default is 5
 * 
 * Note: If given firebase query had .limit() then will be replaced by this amount
 * 
 * @param startAfter a QueryDocumentSnapshot or null.
 * 
 * If given then return data are after given document snapshot.
 * 
 * If null then return data are alway from start
 * 
 * @returns {QueryDataReturn} an object that contain 2 properties:
 * 
 * @property {lastDocSnapshotCursor} a QueryDocumentSnapshot return from last document data
 * 
 * you can give this to startAfter at next GetDataByQuery to achive pagination.
 * 
 * @property {results} an array of data
 */
export const GetDataByQuery = async  <T extends fireorm.IEntity>(
  repository:ImprovedRepository<T>,
  query:Query,
  amount:number = 5,
  startAfter:QueryDocumentSnapshot|null = null, 
  )=> {

    try{
      const repo = repository;

      let newQuery = query;
      if(startAfter) newQuery = newQuery.startAfter(startAfter);
      if(amount > 0) newQuery = newQuery.limit(amount);

      const q = await newQuery.get();
      
      if(q.empty) return {
        lastDocSnapshotCursor: startAfter,
        results: Array<T>(),
      };

      const results: T[] = [];
      for(let snap of q.docs){
        const data = await repo.findById(snap.id);
        results.push(data);
      }
      return Promise.resolve<QueryDataReturn<T>>({
        lastDocSnapshotCursor: q.docs[q.docs.length - 1],
        results
      });
    }
    catch(err){
      console.log(err);
      return Promise.reject(err.message);
    }
}
//#endregion Firestore query

//#region Firestore Read

/**
 * Get all schedules under an itinerary
 * @param itinerary itinerary that schedules live under 
 */
export const GetScheduls = async (itinerary:Itinerary)=>{
  try{
    return await itinerary.schedules.find();
  }
  catch(err){
    console.log(err);
    throw Error(getErrorMsg(err.code));
  }
}

/**
 * Get a specific schedule by id
 * @param itinerary itinerary this schedules live under 
 * @param scheduleId id of schedule
 */
export const GetScheduleById = async (itinerary:Itinerary, scheduleId:string)=>{
  try{
    return await itinerary.schedules.findById(scheduleId);
  }
  catch(err){
    console.log(err);
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore Read

//#region Firestore Create

/**
 * Create an itinerary under for user
 * 
 * Call cloud function
 * 
 * @param itineraryName name for itinerary
 * @param startDate itinerary start date in UTC string
 * @param endDate itinerary end date in UTC string
 * 
 * @return instance of Itinery
 */
export const CreateItinerary = async (
  itineraryName:string,
  startDate:Date,
  endDate:Date
  )=>{

    try{
      const start = startDate.toUTCString();
      const end = endDate.toUTCString();
      const result = await cloudFunctions.httpsCallable('createItineraryHttps')({
        name: itineraryName,
        startDate: start,
        endDate: end,
      });

      const itineraryId = result.data.id;
      const userItineraryRepo = await GetRepository(UserItinerary);
      const user = await GetCurrentUser();
      const userIt = await userItineraryRepo.findById(user.uid);
      const itineraries = await ConvertRepo<Itinerary>(userIt.itineraries);
      const it = await itineraries.findById(itineraryId);
      
      return Promise.resolve(it);
    }
    catch(err){
      console.log(err)
      return Promise.reject(err.message);
    }
    
}

/**
 * Create a new schedule under itinerary
 * 
 * @param itinerary the itinerary this schedule to be created under
 * @param date date for schedule
 * @param note note for schedule
 */
export const CreateScheduleForItinerary = async (itinerary:Itinerary, date:Date, note:string='')=>{

  try{
    const repo = await ConvertRepo<Schedule>(itinerary.schedules);
    const newSchedule = new Schedule();
    newSchedule.date = date;
    newSchedule.note = note;
    const createdSchedule = await repo.create(newSchedule);
  
    return createdSchedule;
  }
  catch(err){
    console.log(err)
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore Create

//#region Firestore update

/**
 * Update itinerary
 * 
 * @param itineraryId  itinerary id
 * @param name itinerary name optional
 * @param startDate itinerary start date, if given endDate must be given
 * @param endDate itinerary end date, if given startDate must be given
 * 
 * @return itinerary id if successful
 */
export const UpdateItinerary = async(
  itineraryId:string,
  name:string = null,
  startDate:Date = null,
  endDate:Date = null,
  )=>{

    try{
      const result = await cloudFunctions.httpsCallable('updateItineraryHttps')({
        itineraryId: itineraryId,
        dataToUpdate: {
          name,
          startDate: startDate?startDate.toUTCString():null,
          endDate: endDate?endDate.toUTCString():null,
        }
      });
  
      const itId = result.data.id;
      const userItineraryRepo = await GetRepository(UserItinerary);
      const user = await GetCurrentUser();
      const userIt = await userItineraryRepo.findById(user.uid);
      const it = await userIt.itineraries.findById(itId);
      
      return Promise.resolve(it);
    }
    catch(err){
      console.log(err);
      return Promise.reject(err.message);
    }
}

/**
 * Update a schedule
 * @param itinerary itinerary that schedule live under
 * @param newSchedule new schedule 
 */
export const UpdateSchedule = async (itinerary:Itinerary, newSchedule:Schedule)=>{
  return await itinerary.schedules.update(newSchedule);
}
//#endregion Firestore update

//#region Firestore delete

/**
 * Delete an itinerary
 * 
 * @param itineraryId itinerary id
 * 
 * @return true if successful
 */
export const DeleteItinerary = async (
  itineraryId:string
  )=>{
    try{
      const result = await cloudFunctions.httpsCallable('deleteItineraryHttps')({
        itineraryId: itineraryId,
      });
      
      return Promise.resolve(result.data.successful);
    }
    catch(err){
      console.log(err)
      return Promise.reject(err.message);
    }
}

export const DeleteSchedule = async (itinerary:Itinerary, schedule:Schedule)=>{
  try{
    await itinerary.schedules.delete(schedule.id);
    return true;
  }
  catch(err){
    console.log(err)
    throw Error(getErrorMsg(err.code));
  }
}
//#endregion Firestore delete

//#region  Firestore listener
type SnapshotCollection = CollectionReference;
type SnapshotDocument = DocumentReference;
type ObserverCollection = (snapshot: QuerySnapshot<FirebaseFirestore.DocumentData>) => void; 
type ObserverDocument = (snapshot: DocumentSnapshot<FirebaseFirestore.DocumentData>) => void;
type onListenError = (error: Error) => void;

const validateParams =  (
  watched:(SnapshotCollection|SnapshotDocument),
  observer:(ObserverCollection|ObserverDocument),
  onError:onListenError
)=>{
  const errorMsg = 'Can not watch, null paramter';
  if(!watched){ throw new Error(errorMsg)};
  if(!observer){ throw new Error(errorMsg)};
  if(!onError){ throw new Error(errorMsg)};
}
const onListenCollection = (watched:SnapshotCollection, observer:ObserverCollection, onError:onListenError)=>{
  validateParams(watched, observer, onError);
  return watched.onSnapshot(observer, onError);
}

const onListenDocument = (watched:SnapshotDocument, observer:ObserverDocument, onError:onListenError)=>{
  validateParams(watched, observer, onError);
  return watched.onSnapshot(observer, onError);
}

/**
 * Create a realtime listener to listen on
 * specific repository(collection) change
 * 
 * function return an unsubcribe function
 * use unsubscribe function to cancel listening
 * e.g unsubscribe()
 * @param repo 
 * @param cb 
 * @param onError 
 */
export const ListenToRepository = <
K extends fireorm.IEntity,
T extends ImprovedRepository<K>
>(repo:T, cb:(docs:K[])=>void, onError:onListenError)=>{

  const obeserver = (qerySnapshot:QuerySnapshot)=>{
    const docs = repo.extractFromColSnap(qerySnapshot);
    cb(docs);
  }
  return onListenCollection(
    repo.getCollectionReference(),
    obeserver,
    onError
  )
}
/**
 * Create a realtime listener to listen on specific document change
 * 
 * function return an unsubcribe function
 * use unsubscribe function to cancel listening
 * e.g unsubscribe()
 */
export const ListenToDocument = <
K extends fireorm.IEntity,
T extends ImprovedRepository<K>
>(repo:T, documentRef:DocumentReference, cb:(doc:K)=>void, onError:onListenError)=>{

  const obeserver = (docSnapshot:DocumentSnapshot)=>{
    const doc = repo.extractFromDocSnap(docSnapshot);
    cb(doc);
  }
  return onListenDocument(
    documentRef,
    obeserver,
    onError
  )
}

//#endregion Firestore listener
