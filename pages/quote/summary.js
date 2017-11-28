import Link from 'next/link';
import page from '../../components/page';
import React from 'react';
import quoteStore from '../../datastores/quote';
import axios from 'axios';

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loading: false };
  }

/*  ##
  componentWillMount () {
    const sumAssured = this.props.quote.sumAssured;
    console.log('componentWillMount');
    console.dir(this.props.quote);
  }
*/

  //  if a quote needs to be generated and is only valid for a certain time
  /*
  async componentDidMount () {
    if (!quoteStore.isValid) {
      this.setState({ loading: true });
      let result = (await axios.post('/api/quote', this.props.quote)).data;
      quoteStore.update(state => ({ ...state, result }));
    }
    this.setState({ loading: false });
  }
  */

  async componentDidMount () {
    this.setState({ loading: true });
    let result = (await axios.post('/api/quote', this.props.quote)).data;
    quoteStore.update(state => ({ ...state, result }));
    this.setState({ loading: false });
    console.log('componentDidMount');
    console.dir(this.props.quote.result);
  }

  get formattedPremium () {
    if (this.props.quote.result) {
      const amount = this.props.quote.result.premium;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    } else {
      return '';
    }
  }

  get formattedSumAssured () {
    const amount = this.props.quote.sumAssured;
    return Number(amount).toLocaleString().replace(/,/g, ' ');
  }

  get nextUnderwritingDate () {
    const date = new Date();
    const year = date.getFullYear();
    return year + 5;
  }

  render () {
    return (
      <section className='section'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>Getting everything ready...</span></div>
        <div className='columns'>
          <div className='column is-two-thirds is-offset-2'>
            <div className='content has-text-centered'>
              <h1 className='title is-3'>On your way to be a Hero!</h1>
            </div>
            <div className='pricing-table'>
              <div style={{marginTop: 0}} className='pricing-plan is-primary'>
                <div className='plan-header'>R {this.formattedSumAssured} cover</div>
                <div className='plan-price'><span className='plan-price-amount'><span className='plan-price-currency'>R</span>{this.formattedPremium}</span>/month</div>
                <div className='plan-items'>
                  <div className='plan-item'>30 day money back garuantee</div>
                  <div className='plan-item'>Next medical evaluation is {this.nextUnderwritingDate}</div>
                  <div className='plan-item'>What else?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
},{
    footer: ({ quote }) =>
      <div>
        <section className='section'>
          <div className='level form-nav'>
            <div className='level-item'>
              <Link prefetch href='/'><button className='button is-primary is-inverted'><a>Home</a></button></Link>
              <Link prefetch href='/checkout/profile/name'><button className='button is-primary'>Start</button></Link>
            </div>
          </div>
        </section>
      </div>,
      datastores: { quote: quoteStore }
  }
);
