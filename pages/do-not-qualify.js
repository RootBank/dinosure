
import page from '../components/page';
import React from 'react';

const toReasonPhrase = (reason) => {
  switch (reason) {
    case 'age': return 'Our policy is only available to those who are between the ages of 18 and 63 inclusively. This is because people between the ages of 18 and 63 cannot run away from dinosaurs fast enough.';
    case 'parents': return 'Hero only insures parents.';
  }
  return reason;
};

export default page(({reason}) =>
  <section className='section'>
    <div className='container'>
      <h1 className='title is-3'>We're sorry</h1>
      <p>Unfortunately you do not qualify for Hero. {toReasonPhrase(reason)}</p>
    </div>
  </section>, {
    getInitialProps ({ query }) {
      console.log(query.reason);
      return { reason: query.reason };
    }
  });
