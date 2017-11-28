// import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import React from 'react';
import claimStore from '../../datastores/claim';

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
            We know there are no words that could help. All we can do is complete this claim as quickly and easily as possible.
          </p>
          <p>
            Please fill in the form below and we will start the process.
          </p>
        </div>
      </div>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <input style={{ width: '14rem', textAlign: 'center' }} onChange={setFirstName} className='input title is-medium' type='text' placeholder='Jack' value={claim.firstName || ''} />
            </div>
            <div className='column' />
          </div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <input style={{ width: '14rem', textAlign: 'center' }} onChange={setLastName} className='input title is-medium' type='text' placeholder='Ripper' value={claim.lastName || ''} />
            </div>
            <div className='column' />
          </div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div className='column'>
              <input style={{ width: '14rem', textAlign: 'center' }} onChange={setEmail} className='input title is-medium' type='text' placeholder='jack@gmail.com' value={claim.email || ''} />
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
            <Link href='/claim/1'><button className='button is-primary' disabled={!claim.firstName || claim.firstName.length === 0 || !claim.lastName || claim.lastName.length === 0}>Submit</button></Link>
          </div>
        </div>
      </section>
    </div>,
  datastores: { claim: claimStore }
});
