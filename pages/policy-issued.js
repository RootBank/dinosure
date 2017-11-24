import page from '../components/page';
import React from 'react';
import applicationStore from '../../../datastores/application';
import quoteStore from '../../../datastores/quote';

export default page(class extends React.Component {
  componentDidMount () {
    applicationStore.clear();
    quoteStore.clear();
  }
  render () {
    return <section className='section'>
      <div className='container content'>
        <h1 className='title is-3'>Hooray!</h1>
        <p> You've just been issued a new dinosure policy!
              Please check your email: it contains your policy documents, along with
              instructions on how to set your beneficiaries and create a profile which will allow you to
              manage your policy.
          </p>
      </div>
    </section>;
  }
});
