import page from '../components/page';
import React from 'react';
import applicationStore from '../datastores/application';
import quoteStore from '../datastores/quote';

export default page(class extends React.Component {
  componentDidMount () {
    applicationStore.clear();
    quoteStore.clear();
  }
  render () {
    return <section className='section'>
      <div className='container content has-text-centered'>
        <h1 className='title is-3'>Hooray!</h1>
        <h3 className='subtitle'>You are now part of the Hero cummunity!</h3>
        <div className='is-divider' data-content='Next Steps' />
        <p>You have a very important email waiting for you in your inbox. The email contains important attachments and a link to activate your account.
        </p>
        <p>If you should die, it can be very difficult for your family to access the money if you haven't chosen a beneficiary. Make it easy for them and click on the link in the email.</p>
      </div>
    </section>;
  }
});
