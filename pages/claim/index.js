import page from '../../components/page';
import React from 'react';
import claimStore from '../../datastores/claim';
import Router from 'next/router';
import axios from 'axios';
import Input from '../../components/input';

const createClaim = async () => {
  try {
    await axios.post('/api/claim', claimStore.state);
    Router.push('/claim/created');
    claimStore.clear();
  } catch (e) {
    Router.push('/claim/failed');
  }
};

const setFirstName = (event) => {
  claimStore.update(state => ({ ...state, firstName: event.target.value }));
};
const setLastName = (event) => {
  claimStore.update(state => ({ ...state, lastName: event.target.value }));
};
const setEmail = (event) => {
  claimStore.update(state => ({ ...state, email: event.target.value }));
};

export default page(class extends React.Component {
  render () {
    const claim = this.props.claim;
    return <section className='section'>
      <div className='columns'>
        <div className='column is-8 is-offset-2 has-text-centered'>
          <h1 className='title has-text-centered'>Submit a Claim</h1>
          <p>
            We're sorry that you lost your loved one to a dinosaur.
          </p><br />
          <p>
            Please fill in the form below to start the claim process.<br /> Note: these are <em>your</em> details, not those of the deceased.
          </p>
        </div>
      </div>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <Input style={{ width: '14rem', textAlign: 'center' }} onChange={setFirstName} className='input title is-medium' type='text' placeholder='First Name' value={claim.firstName || ''} />
            </div>
            <div className='column' />
          </div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <Input style={{ width: '14rem', textAlign: 'center' }} onChange={setLastName} className='input title is-medium' type='text' placeholder='Last Name' value={claim.lastName || ''} />
            </div>
            <div className='column' />
          </div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <Input style={{ width: '14rem', textAlign: 'center' }} onChange={setEmail} className='input title is-medium' type='text' placeholder='Email' value={claim.email || ''} />
            </div>
            <div className='column' />
          </div>
        </div>
        <div className='column' />
      </div>
    </section>;
  }
}, {
  footer: ({claim}) =>
    <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <button
              onClick={createClaim}
              className='button is-primary'
              disabled={
                !claim.firstName || claim.firstName.length === 0 ||
                !claim.lastName || claim.lastName.length === 0 ||
                !claim.email || claim.email.indexOf('@') === -1
              }>Submit</button>
          </div>
        </div>
      </section>
    </div>,
  datastores: { claim: claimStore }
});
