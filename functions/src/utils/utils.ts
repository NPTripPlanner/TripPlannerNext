import { DocumentReference, Transaction } from "@google-cloud/firestore";
import * as admin from "firebase-admin";

let adminApp: admin.app.App;
export let firestore: FirebaseFirestore.Firestore;

/**
 * Initialize utils
 * @param app firebase admin app
 */
export const initUtils = (app:admin.app.App) : void=>{
    adminApp = app,
    firestore = adminApp.firestore();
}

/**
 * Delete an array of document references
 * @param docRefs array of DocumentReference
 */
export const deleteDocuments = async (docRefs:DocumentReference[]) : Promise<void> =>{
    if(!docRefs) return;
    
    const results = await firestore.runTransaction(async (trans:Transaction)=>{
        const deletedDocs = [];
        for(let ref of docRefs){
            deletedDocs.push(ref.path);
            trans.delete(ref);
        }
        return deletedDocs;
    });

    if(process.env.NODE_ENV !== 'production'){
        console.log(`${results.length} documents was deleted`, results);
    }
    
}

/**
 * Return all docuemnts with path under certain document 
 * @param documentRef Document Reference
 * @param includeSelf true to include document path, the documenet which began with
 * 
 * @return 
 */
export const getAllDocumentsPathUnder = async (
    documentRef:DocumentReference,
    includeSelf:boolean=true) : Promise<DocumentReference[]> =>{

    const docSnap = await documentRef.get();
    if(!docSnap.exists) throw new Error(`Document ${documentRef.id} do not exists`);

    let refs : DocumentReference[] = [];
    const listCols = await documentRef.listCollections();

    for (let col of listCols){
        const listDocRefs = await col.listDocuments();
        for(let docRef of listDocRefs){
            const returnRefs = await getAllDocumentsPathUnder(docRef);
            // refs.push(returnRefs);
            refs = refs.concat(returnRefs);
        }
    }

    if(includeSelf) refs.push(documentRef);
    // return new Promise(res=>{
    //     res(refs.flat());
    // })
    return refs;
}

// export default {
//     init:(app:admin.app.App)=>{
//         adminApp = app,
//         firestore = adminApp.firestore();
//         return this;
//     },
//     adminApp: ()=>adminApp,
//     firestore: ()=>firestore,
//     deleteDocuments,
//     getAllDocumentsPathUnder,
// }