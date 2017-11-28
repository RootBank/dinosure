import React from 'react';
import page from '../../components/page';
import axios from 'axios';

const Policy = (props) => {
  return {
    formattedPremium () {
      const amount = this.props.monthlyPremium;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    },

    formattedSumAssured () {
      const amount = this.props.sumAssured;
      return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
    },

    render () {
      return (
        <div className='policy-column'>
          <div className='box'>
            {props.policyId && <div className='policy-summary'>
              <div className='policy-summary-money'>
                <div className='policy-summary-cover'>R {this.formattedSumAssured()} cover</div>
                <div className='policy-summary-premium'><span className='plan-price-amount'><span className='plan-price-currency'>R</span>{this.formattedPremium()}</span>/month</div>
              </div>
              <div>{new Date(this.props.startDate).toLocaleDateString()}</div>
              <div>{new Date(this.props.endDate).toLocaleDateString()}</div>
            </div>}
            {!props.policyId && <div className='policy-add-button'>+</div>}
          </div>
        </div>
      );
    }
  };
};

const PaymentMethod = (props) => {
  return {
    render () {
      return (
        <div className={'payment-method-column'}>
          <div className='box'>
            {props.paymentMethodId && <div className='payment-method'>
              <div className='payment-method-type'>
                <div>{props.type}</div>
              </div>
              <div className='payment-method-holder'>
                <div>{props.card.holder}</div>
              </div>
              <div className='payment-method-expiry'>
                <div>{props.card.expiryMonth}/{props.card.expiryYear.substring(2)}</div>
              </div>
            </div>}
            {!props.paymentMethodId && <div className='payment-method-add-button'>+</div>}
          </div>
        </div>
      );
    }
  };
};

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loading: true };
  }

  async componentDidMount () {
    this.setState({ loading: true });

    // For testing purposes to skip the API call.
    // if (localStorage.getItem('policyholder')) {
    //   const state = JSON.parse(localStorage.getItem('policyholder'));
    //   this.setState(state);
    //   return;
    // }

    try {
      const response = (await axios.get('/api/user/policyholder', {
        headers: { 'Authorization': 'Bearer ' + this.props.authToken }
      })).data;

      // For testing purposes to skip the API call.
      // localStorage.setItem('policyholder', JSON.stringify(Object.assign({ loading: false }, response)));

      this.setState(Object.assign({ loading: false }, response));
    } catch (e) {
      console.log(e);
    }
  }

  groupArray (arr, size = 3) {
    if (!arr || arr.length === 0) {
      return [];
    }

    const groups = [];
    while (arr.length > 0) { groups.push(arr.splice(0, size)); }

    let groupToAddTo = groups[groups.length - 1];
    if (groupToAddTo.length === size) {
      groups.push([{}]);
    } else {
      groupToAddTo.push({});
    }

    return groups;
  }

  render () {
    const { firstName, lastName, id, email, policies, paymentMethods } = this.state;
    const policyGroups = this.groupArray(policies);
    const paymentMethodGroups = this.groupArray(paymentMethods);

    return (
      <section className='section'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>Loading Your Profile</span></div>
        <div className='container'>
          <h1 className='title'>Welcome {firstName} {lastName},</h1>
          <div className='content'>
            <div className='content'>
              <h3>Contact Details</h3>
              <table className='table'>
                <tbody>
                  <tr><th>Email</th><th>{email}</th><th className='has-text-right'><button className='button is-primary is-inverted'>edit</button></th></tr>
                  <tr><th>ID Number</th><th>{id}</th><th className='has-text-right' /></tr>
                </tbody>
              </table>
            </div>
            <div className='content'>
              <h3>Payment Methods</h3>
              {paymentMethodGroups.map(function (paymentMethods, i) {
                return (
                  <div class='payment-method-columns'>
                    {paymentMethods.map((paymentMethod, j) => {
                      return (<PaymentMethod {...paymentMethod} key={i + ',' + j} />);
                    })}
                  </div>
                );
              })}
            </div>
            <div className='content'>
              <h3>Policies</h3>
              {policyGroups.map(function (policies, i) {
                return (
                  <div class='policy-columns'>
                    {policies.map((policy, j) => {
                      return (<Policy {...policy} key={i + ',' + j} />);
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }
});
