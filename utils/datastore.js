export default class Datastore {
  constructor (initialState, name, saveInLocalStorage = true) {
    this.subscribers = [];
    this.saveInLocalStorage = saveInLocalStorage;
    this.name = name;
    if (process.browser) {
      let item = window.localStorage.getItem(name);
      this._state = item ? JSON.parse(item) : initialState;
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
      window.localStorage.setItem(this.name, JSON.stringify(this._state));
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
