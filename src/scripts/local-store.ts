// wrapper around localStorage
// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

const localStore = {
  upsert: (key: string, payload: any): void => {
    localStorage.setItem(key, JSON.stringify(payload));
  },

  getKey: (key: string): any => {
    return JSON.parse(localStorage.getItem(key));
  },

  getAll: (): any => {
    const aggregate = {};
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) { aggregate[keys[i]] = localStorage.getItem(keys[i]); }
    return aggregate;
  },

  removeAll: (): void => {
    // this is probably a bad idea, but all the best ideas are
    const keys = Object.keys(localStorage);
    let i = keys.length;

    while ( i-- ) { localStorage.removeItem(keys[i]); }
  }

  // TODO: removeKey,
};

export default localStore
