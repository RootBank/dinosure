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
        <h3 className='subtitle'>You are now part of the Hero community!</h3>
        <div className='is-divider' data-content='Next Steps' />
        <p>You have a very important email waiting for you in your inbox. The email contains important attachments and a link to activate your account.
        </p>
        <p><em>If you need any help, please call us on </em></p>
        <h3 className='is-3 has-text-centered'>087 550 4246</h3>
      </div>
    </section>;
  }
});
