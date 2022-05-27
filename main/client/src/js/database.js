import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {


  const textDb = await openDB('jate', 1);

  const tx = textDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');

  const request = store.put({ content, id: 1});

  const result = await request;
  console.log('data saved to database', result);
};


export const getDb = async () => {
console.log('getDb not implemented');


// Create a connection to the database database and version we want to use.
const textDb = await openDB('jate', 1);

// Create a new transaction and specify the database and data privileges.
const tx = textDb.transaction('jate', 'readonly');

// Open up the desired object store.
const store = tx.objectStore('jate');

// Use the .getAll() method to get all data in the database.
const request = store.getAll();

// Get confirmation of the request.
const result = await request;
console.log('result.value', result);
return result;
};

initdb();
