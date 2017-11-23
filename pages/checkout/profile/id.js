import page from '../../../components/page';
import Link from 'next/link';
import React from 'react';
import Router from 'next/router';
import quoteStore from '../../../datastores/quote';
import applicationStore from '../../../datastores/application';
import Steps from '../../../components/checkout-steps';

const isPotentiallyValidIdNumber = (id = '') => /^[0-9]{0,13}$/.test(id);

const idToAge = (id = '') => {
  const rawYear = parseInt(id.substring(0, 2), 10);
  const year = rawYear < (new Date().getFullYear() + '').substr(2) ? (2000 + rawYear) : (1900 + rawYear); // Where the 99s rolled over
  const month = id.substring(2, 4);
  const day = id.substring(4, 6);
  const dateOfBirth = new Date(Date.parse(`${year}-${month}-${day}`));
  var currentDate = new Date();
  const ageInMilliseconds = currentDate.getTime() - dateOfBirth.getTime();
  const approximateLengthOfYearInMilliseconds = (1000 * 60 * 60 * 24 * 365.25);
  return Math.floor(ageInMilliseconds / approximateLengthOfYearInMilliseconds);
};

const isValidIdNumber = (potentialId = '') => {
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

const next = (id) => () => {
  const age = idToAge(id);
  console.log(age);
  if (age >= 18 && age <= 63) {
    Router.push('/checkout/questions');
  } else {
    // Applicant too old
    Router.push({ pathname: '/do-not-qualify', query: { reason: 'age' } });
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
            <button onClick={next(application.id)} className='button is-primary' disabled={!isValidIdNumber(application.id || '')}>Next</button>
          </div>
        </div>
      </section>
      <section className='section'>
        <Steps currentStep={0} />
      </section>
    </div>,
  datastores: { quote: quoteStore, application: applicationStore }
});
