import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../datastores/quote';
import applicationStore from '../../datastores/application';

export default page(class extends React.Component {
  render () {
    return <div>Hello</div>;
  }
}, {
  footer: () =>
    <section className='section'>
      <div className='container'>
        <div className='steps'>
          <div className='step-item is-completed is-success'>
            <div className='step-marker'>
              <span className='icon'>
                <i className='fa fa-check' />
              </span>
            </div>
            <div className='step-details'>
              <p className='step-title'>Profile</p>
            </div>
          </div>
          <div className='step-item is-active'>
            <div className='step-marker' />
            <div className='step-details'>
              <p className='step-title'>Step 2</p>
            </div>
          </div>
          <div className='step-item'>
            <div className='step-marker'>
              <span className='icon'>
                <i className='fa fa-flag' />
              </span>
            </div>
            <div className='step-details'>
              <p className='step-title'>Payment Details</p>
            </div>
          </div>
        </div>
      </div>
    </section>,
  datastores: { quote: quoteStore, application: applicationStore }
});
