export default class Datastore {
  constructor (initialState, name, saveInLocalStorage = true) {
    this.subscribers = [];
    this.saveInLocalStorage = saveInLocalStorage;
    this.name = name;
    this.initialState = initialState;
    if (process.browser && saveInLocalStorage) {
      let item = window.localStorage.getItem(name);
      if (item) {
        this._state = JSON.parse(item);
      } else {
        this._state = initialState;
        window.localStorage.setItem(name, JSON.stringify(this._state));
      }
    } else {
      this._state = initialState;
    }
  }

  get state () {
    return this._state;
  }

  set state (state) {
    this._state = state;
    this.subscribers.forEach(subscriber => setImmediate(() => subscriber(this._state)));
    if (this.saveInLocalStorage) {
      window.localStorage.setItem(this.name, JSON.stringify(state));
    }
  }

  update (f) {
    let nextState = f(this._state);
    this.state = nextState;
  }

  subscribe (subscriber) {
    this.subscribers.push(subscriber);
    subscriber(this._state);
    return subscriber;
  }

  unsubscribe (subscriber) {
    this.subscribers = this.subscribers.filter(x => x !== subscriber);
  }
}
