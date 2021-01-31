// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API

const localDB = {
  upsert: (payload) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex

    var connection = indexedDB.open('DB', 1);

    const write = (db) => {
      var transaction = db.transaction('savings', 'readwrite');
      var objectStore = transaction.objectStore('savings');

      payload.forEach(function(record) {
        objectStore.put(record);
        // .put will update existing records
        // if the frontend needs more safety around this, another method could be implemented using .add
      });
    }

    connection.onerror = (event) => {
      // @ts-ignore
      console.error('Database error: ' + event.target.errorCode);
    };

    connection.onupgradeneeded = (event) => {
      // how do I know what version I'm coming from and going to?
      // @ts-ignore
      const db = event.target.result;
      const objectStore = db.createObjectStore('savings', { keyPath: 'date' });
      objectStore.createIndex('dateIndex', 'date');
      var myIDBIndex = objectStore.createIndex('accountIndex', 'account');
      objectStore.transaction.oncomplete = () => write(db);
    }

    connection.onsuccess = (event) => {
      // @ts-ignore
      const db = event.target.result;
      write(db);
    };
  },

  getKey: (key: string): any => {
    return new Promise((resolve, reject) => {
      // Step 1: async request to open a DB connection with a DB name and schema version
      var connection = indexedDB.open('DB', 1);

      connection.onerror = (event) => {
        // @ts-ignore
        console.error("Database error: " + event.target.errorCode);
      };

      connection.onsuccess = (event) => {
        // @ts-ignore
        const db = event.target.result;
        var transaction = db.transaction('savings');
        var objectStore = transaction.objectStore('savings');
        const getRequest = objectStore.get(key);

        getRequest.onerror = function(event) {
          // @ts-ignore
          console.error("Database error: " + event.target.errorCode);
          reject(event.target.errorCode)
        };

        getRequest.onsuccess = () => {
          console.log(getRequest.result)
          resolve(getRequest.result)
        }
      }; // end of onsuccess
    }) // end of promise
  },

  getAll: () => {
    return new Promise((resolve, reject) => {
      // Step 1: async request to open a DB connection with a DB name and schema version
      var connection = indexedDB.open('DB', 1);

      connection.onerror = (event) => {
        // @ts-ignore
        console.error("Database error: " + event.target.errorCode);
      };

      connection.onsuccess = (event) => {
        // @ts-ignore
        const db = event.target.result;
        var transaction = db.transaction('savings');
        var objectStore = transaction.objectStore('savings');
        const getAllRequest = objectStore.getAll();

        getAllRequest.onerror = function(event) {
          // @ts-ignore
          console.error("Database error: " + event.target.errorCode);
          reject(event.target.errorCode)
        };

        getAllRequest.onsuccess = () => {
          console.log(getAllRequest.result)
          resolve(getAllRequest.result)
        }
      }; // end of onsuccess
    }) // end of promise
  },

  deleteKey: (key: string) => {
    // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete
    var connection = indexedDB.open('DB', 1);

    const evict = (db, key) => {
      var transaction = db.transaction('savings', 'readwrite');
      var objectStore = transaction.objectStore('savings');
      objectStore.delete(key);
    }

    connection.onerror = (event) => {
      // @ts-ignore
      console.error('Database error: ' + event.target.errorCode);
    };

    connection.onsuccess = (event) => {
      // @ts-ignore
      const db = event.target.result;
      evict(db, key);
    };
  },

  // TODO: clear
  // clear: () => {}
  // https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/clear
}

export default localDB
