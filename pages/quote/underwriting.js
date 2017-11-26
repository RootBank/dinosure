import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import Link from 'next/link';
import quoteStore from '../../datastores/quote';
import React from 'react';

const setUnderwriting = (event) => {
  quoteStore.update(state => ({ ...state, underwriting: event.target.name }));
};

export default page(({ quote = { underwriting: false } }) =>
  <section className='section'>
    <div className='columns'>
      <div className='column is-10 is-offset-1 has-text-centered'>
        <h1>We ask these questions to protect the Hero community. The Hero community trusts us to keep their subscriptions as low as possible.</h1>
      </div>
    </div>
    <div className='columns'>
      <div className='column is-10 is-offset-1 has-text-centered'>
        <p className='content has-text-centered'>Please check all the boxes that apply to you.</p>
      </div>
    </div>
    <div className='columns'>
      <div className='column is-8 is-offset-2'>
        <article className='message is-info'>
          <div className='message-header'>
            Are you a parent?
          </div>
          <div className='message-body'>
            <div className='field'>
              <input onChange={setUnderwriting} className='is-checkradio' id='i_am_a_parent' type='checkbox' name='i_am_a_parent' checked={quote.underwriting === 'i_am_a_parent'} />
              <label htmlFor='i_am_a_parent'>I have children, I am pregnant or my partner is pregnant.</label>
            </div>
          </div>
        </article>
        <article className='message is-info'>
          <div className='message-header'>
            Are you healthy?
          </div>
          <div className='message-body is-info'>
            <div className='field'>
              <input onChange={setUnderwriting} className='is-checkradio' id='previous_insurance_declined' type='checkbox' name='previous_insurance_declined' checked={quote.underwriting === 'previous_insurance_declined'} />
              <label htmlFor='previous_insurance_declined'>I have never applied for life insurance or if I have, I have never been declined life insurance before, for any health or other reasons.</label>
            </div>
            <div className='field'>
              <input onChange={setUnderwriting} className='is-checkradio' id='illness_in_last_5_years' type='checkbox' name='illness_in_last_5_years' checked={quote.underwriting === 'illness_in_last_5_years'} />
              <label htmlFor='illness_in_last_5_years'>In the last 5 years, I haven't been hospitalised for more than 2 days, I haven't taken any medicine for a period longer than 2 weeks and I haven''t seen any medical specialist except for my pregnancy.</label>
            </div>
            <div className='field'>
              <input onChange={setUnderwriting} className='is-checkradio' id='illness_in_next 8_weeks' type='checkbox' name='illness_in_next 8_weeks' checked={quote.underwriting === 'illness_in_next 8_weeks'} />
              <label htmlFor='illness_in_next 8_weeks'>Other than childbirth or pregnancy, I am not planning on seeing any medical professional in the next 8 weeks.</label>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>,
  {
    footer: class extends React.Component {
      constructor (props) {
        super(props);
        this.state = { nextDisabled: true };
      }
      componentWillReceiveProps (nextProps) {
        this.setState({ nextDisabled: !nextProps.quote || !nextProps.quote.underwriting });
      }
      render () {
        return <div>
          <section className='section'>
            <div className='level form-nav'>
              <div className='level-item'>
                <Link prefetch href='/'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
                <Link prefetch href='/quote/issued'><button className='button is-primary' disabled={this.state.nextDisabled}>Next</button></Link>
              </div>
            </div>
          </section>
          <FormFooter step={1} of={6} />
        </div>;
      }
    },
    datastores: { quote: quoteStore }
  }
);
