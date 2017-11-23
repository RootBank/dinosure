// import FormFooter from '../../components/form-progress';
import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

const isPotentiallyValidIdNumber = (id = '') => /^[0-9]{0,13}$/.test(id);

let isValidIdNumber = (potentialId = '') => {
  // accept only digits
  if (/[^0-9]+/.test(potentialId)) return false;
  // check length
  if (potentialId.length !== 13) return false;

  // check month
  const month = parseInt(potentialId.substr(2, 2), 10);
  if (month === 0 || month > 12) {
    return false;
  }

  const day = parseInt(potentialId.substr(4, 2), 10);
  if (day === 0 || day > 31) {
    return false;
  }

  // The Luhn Algorithm for the check digit
  const [sum] = [...potentialId].map(x => parseInt(x, 10)).reduce(([sum, isOdd], digit) => {
    if (isOdd) {
      const doubledDigit = digit * 2;
      return [sum + (doubledDigit > 9 ? doubledDigit - 9 : doubledDigit), !isOdd];
    } else {
      return [sum + digit, !isOdd];
    }
  }, [0, false]);

  return (sum % 10) === 0;
};

const setIdNumber = (event) => {
  const nextId = event.target.value;
  if (isPotentiallyValidIdNumber(nextId)) {
    applicationStore.update(state => ({ ...state, id: event.target.value }));
  }
};

export default page(class extends React.Component {
  render () {
    const application = this.props.application;
    const isPotentiallyValid = (application.id || '').length < 13 || isValidIdNumber(application.id);

    return <section className='section'>
      <div className='columns'>
        <div className='column' />
        <div className='column has-text-centered'>
          <div className='title is-3'>My <img alt='South Africa' style={{height: '0.8em', marginTop: '0.5em', display: 'inline-block'}} src='/static/za-flag.svg' /> Id Number is</div>
          <div className='columns is-mobile'>
            <div className='column' />
            <div style={{margin: '0.6em'}} className='column'>

              <div className='field'>
                <div className='control'>
                  <input onChange={setIdNumber}
                    // Space for 13 characters
                    style={{ width: '13rem', textAlign: 'center' }}
                    className={`input title column is-large ${isPotentiallyValid ? '' : 'is-danger'}`}
                    type='text'
                    placeholder='ID Number'
                    value={application.id || ''} />
                </div>
                <p className={`help ${isPotentiallyValid ? 'is-hidden' : 'is-danger'}`}>This id number is invalid</p>
              </div>
            </div>
            <div className='column' />
          </div>
        </div>
        <div className='column' />
      </div>
    </section>;
  }
}, {
  footer: ({application}) =>
    <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/checkout/profile/name'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
            <Link href='/checkout/profile/email'><button className='button is-primary' disabled={!isValidIdNumber(application.id)}>Next</button></Link>

          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
