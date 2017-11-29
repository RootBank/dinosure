import React from 'react';
import page from '../../components/page';
import axios from 'axios';

class Policy extends React.Component {
  formattedPremium () {
    const amount = this.props.monthlyPremium;
    return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
  }

  formattedSumAssured () {
    const amount = this.props.sumAssured;
    return Number(amount / 100).toLocaleString().replace(/,/g, ' ');
  }

  formatDate (date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (day < 10) {
      day = '0' + day;
    }

    if (month < 10) {
      month = '0' + month;
    }

    return day + '-' + month + '-' + year;
  }

  formattedStartDate () {
    return this.formatDate(new Date(this.props.startDate));
  }

  formattedEndDate () {
    return this.formatDate(new Date(this.props.startDate));
  }

  render () {
    return (
      <div className='policy-column'>
        <div className={'box ' + (this.props.policyId ? 'no-padding' : '')}>
          {this.props.policyId && <div className='policy-summary'>

            <div className='policy-summary-heading'>
              <div className='policy-summary-money'>
                <div className='policy-summary-cover'>R {this.formattedSumAssured()} cover</div>
                <div className='policy-summary-premium'>
                  <span className='plan-price-amount'><span className='plan-price-currency'>R</span>{this.formattedPremium()}</span>/month
              </div>
              </div>
              <div className='policy-summary-dates'>
                {this.formattedStartDate()} to {this.formattedEndDate()}
              </div>
            </div>
            <div className='policy-summary-beneficiaries'>
              <h5 style={{ 'margin-bottom': '0.5em' }}>Beneficiaries</h5>
              {this.props.beneficiaries.map(function (beneficiary, i) {
                return (
                  <Beneficiary {...beneficiary} key={i} />
                );
              })}
              {this.props.beneficiaries.length === 0 && <div>None</div>}
            </div>
            <div className='policy-summary-payment-method'>
              <h5 style={{ 'margin-bottom': '0.5em' }}>Payment Method</h5>
              {this.props.paymentMethodId}
            </div>
          </div>}
          {!this.props.policyId && <div className='policy-add-button'>
            <div className='spacer' />
            <div>+</div>
            <div className='spacer' />
          </div>}
        </div>
      </div>
    );
  }
}

const PaymentMethod = (props) => {
  return {
    render () {
      return (
        <div className={'payment-method-column'}>
          <div className={'box ' + (props.paymentMethodId ? 'payment-method-card' : '')}>
            {props.paymentMethodId && <div className='payment-method'>
              <div className='payment-method-type'>
                <div>{props.type}</div>
              </div>
              <div className='payment-method-card-number'>
                <div>.... .... .... ....</div>
              </div>
              <div className='payment-method-expiry'>
                <div>{props.card.expiryMonth}/{props.card.expiryYear.substring(2)}</div>
              </div>
              <div className='payment-method-holder'>
                <div>{props.card.holder}</div>
              </div>
            </div>}
            {!props.paymentMethodId && <div className='payment-method-add-button'>
              <div className='spacer' />
              <div>+</div>
              <div className='spacer' />
            </div>}
          </div>
        </div>
      );
    }
  };
};

class ContactDetails extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editing: false
    };

    this.editClicked = this.editClicked.bind(this);
    this.cancelClicked = this.cancelClicked.bind(this);
    this.saveClicked = this.saveClicked.bind(this);
  }

  editClicked () {
    this.setState({
      editing: true
    });

    this.emailAddress = this.props.emailAddress;
  }

  saveClicked () {
    // TODO: Make API Call
    this.cancelClicked();
  }

  cancelClicked () {
    this.setState({
      editing: false
    });

    this.emailAddress = undefined;
  }

  render () {
    return (
      <div className='content'>
        <h3>Contact Details</h3>
        <table className='dashboard-contact-details-table'>
          <tbody>
            <tr>
              <td>Email</td>
              <td>
                {!this.state.editing && <span>{this.props.emailAddress}</span>}
                {this.state.editing && <input name='' type='text' value={this.emailAddress} />}
              </td>
              <td className='has-text-right'>
                {!this.state.editing && <button className='button is-primary is-inverted' onClick={this.editClicked}>edit</button>}
                {this.state.editing && (
                  <div>
                    <button className='button is-primary is-inverted' onClick={this.saveClicked}>save</button>
                    <button className='button' onClick={this.cancelClicked}>cancel</button>
                  </div>
                )}
              </td>
            </tr>
            <tr><td>ID Number</td><td>{this.props.idNumber}</td><td className='has-text-right' /></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const Beneficiary = (props) => {
  return {
    render () {
      return (
        <div className='beneficiary'>
          <div>{props.first_name} {props.last_name}</div>
          <div>{props.percentage}%</div>
          {/* <table>
            <tbody>
              <tr>
                <td>First Name</td>
                <td>{props.first_name}</td>
              </tr>
              <tr>
                <td>Last Name</td>
                <td>{props.last_name}</td>
              </tr>
              <tr>
                <td>Percentage</td>
                <td>{props.percentage}%</td>
              </tr>
            </tbody>
          </table> */}
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

  groupArray (arr, size = 3, addButton = true) {
    if (!arr || arr.length === 0) {
      return [];
    }

    arr = [...arr];

    const groups = [];
    while (arr.length > 0) { groups.push(arr.splice(0, size)); }

    if (addButton) {
      let groupToAddTo = groups[groups.length - 1];
      if (groupToAddTo.length === size) {
        groups.push([{}]);
      } else {
        groupToAddTo.push({});
      }
    }

    return groups;
  }

  render () {
    const { firstName, lastName, id, email, policies, paymentMethods } = this.state;
    const policyGroups = this.groupArray(policies, 3);
    const paymentMethodGroups = this.groupArray(paymentMethods, 4);

    return (
      <section className='section dashboard'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>Loading Your Profile</span></div>
        <div className='container'>
          <h1 className='title'>Welcome {firstName} {lastName},</h1>
          <div className='content'>

            <ContactDetails emailAddress={email} idNumber={id} />
            <div className='content'>
              <h3>Payment Methods</h3>
              {paymentMethodGroups.map(function (paymentMethods, i) {
                return (
                  <div className='payment-method-columns' key={i}>
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
                  <div className='policy-columns' key={i}>
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
