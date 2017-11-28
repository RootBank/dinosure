import Datastore from '../utils/datastore';
//  import addDays from 'date-fns/fp/addDays';
//  import isBefore from 'date-fns/fp/isBefore';

export default new (class extends Datastore {
  constructor () {
    super({ sumAssured: 2500000 }, 'quote', true);
  }

  /*
  get isValid () {
    if (this.state.result) {
      const quote = this.state.result;
      const addDay = addDays(1);
      const expiry = addDay(new Date(quote.createdAt));
      const now = new Date();
      const isBeforeExpiry = isBefore(expiry);
      return isBeforeExpiry(now);
    }
    return false;
  }
  */
})();
