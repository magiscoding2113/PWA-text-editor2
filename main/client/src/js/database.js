import { openDB } from 'idb';

const initdb = async () =>
  openDB('textEditor', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('textEditor')) {
        console.log('textEditor database already exists');
        return;
      }
      db.createObjectStore('textEditor', { keyPath: 'id', autoIncrement: true });
      console.log('textEditor database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('putDb not implemented');

  const textDb = await openDB('textEditor', 1);

  const tx = textDb.transaction('textEditor', 'readwrite');

  const store = tx.objectStore('textEditor');

  const request = store.put({ id:1,  content});

  const result = await request;
  console.log('data saved to database', result);
};


export const getDb = async () => {
console.log('getDb not implemented');


// Create a connection to the database database and version we want to use.
const textDb = await openDB('textEditor', 1);

// Create a new transaction and specify the database and data privileges.
const tx = textDb.transaction('textEditor', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('textEditor');

// Use the .getAll() method to get all data in the database.
const request = store.getAll();

// Get confirmation of the request.
const result = await request;
console.log('result.value', result);
return result;
};

initdb();
