import { openDB } from 'idb';
const IndexedDB = {
    dbname: 'RNSubsonic',
    dbversion: 1
};

export const Constants = {
    STORE_COVERART: "coverArt"
}

function getIndexDB() {
    return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
}

function testIndexDB(indexDb) {
    if(!indexDb) { return "Your browser does not support IndexedDB. This Application is not supported." }
}

function requestDatabase() {
    let testDB = testIndexDB(getIndexDB());
    if(testDB) { return { error: testDB } }
    let dbName = IndexedDB.dbname;
    let dbVersion = IndexedDB.dbversion;
    return openDB(dbName, dbVersion, {
        upgrade(db, oldVersion, newVersion) {
            if (!db.objectStoreNames.contains(Constants.STORE_COVERART)) {
                var objectStore_coverArt = db.createObjectStore(Constants.STORE_COVERART, { keyPath: "key" });
            }
        }
    });
}

export function addToStore(storeName, item) {
    return requestDatabase().then(db => { 
        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);
        store.add(item);
        return tx.done;
    }).then(() => {
        return item;
    }).catch((ex) => {
        console.log(`IndexedDB could not add ${item.ref} to ${storeName}`);
        return item;
    });
}

export function updateInStore(storeName, item) {
    return requestDatabase().then(db => { 
        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);
        store.put(item);
        return tx.done;
    }).then(() => {
        return item;
    }).catch((ex) => {
        console.log(`IndexedDB could not update ${item.ref} to ${storeName}`);
        return item;
    });
}

export function getAllItemsFromStore(storeName) {
    return requestDatabase().then(db => {
        var tx = db.transaction(storeName, 'readonly');
        let store = tx.objectStore(storeName);
        return store.getAll();
    })
}

export function getItemFromStore(storeName, primaryKey) {
    return requestDatabase().then(db => {
        var tx = db.transaction(storeName, 'readonly');
        let store = tx.objectStore(storeName);
        return store.get(primaryKey);
    }).then((val) => {
        return val;
    }).catch(ex => {
        console.log(`IndexedDB could not fetch ${primaryKey} from ${storeName}`, ex);
    })
}

export function deleteFromStore(storeName, primaryKey) {
    return requestDatabase().then(db => {
        let tx = db.transaction(storeName, 'readwrite');
        let store = tx.objectStore(storeName);
        store.delete(primaryKey);
        return tx.done;
    }).then(() => {
        return true;
    }).catch((ex) => {
        return false;
    })
}