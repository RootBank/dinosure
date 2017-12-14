import React from 'react';
import page from '../../components/page';
import axios from 'axios';

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

class Policy extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      confirmCancel: false
    };
  }

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

  cancel () {
    this.setState({ ...this.state, confirmCancel: true });
  }

  ignoreCancel () {
    this.setState({ ...this.state, confirmCancel: false });
  }

  performCancel () {
    this.props.onCancel(this.props);
  }

  editBeneficiaries () {
    this.props.edit(this.props, 'beneficiaries');
  }

  saveBeneficiaries (beneficiaries) {
    this.props.saveBeneficiaries(beneficiaries);
  }

  cancelEdit () {
    this.props.cancelEdit();
  }

  save () {
    this.setState({ ...this.state, editing: false });
  }

  render () {
    if (this.props.editing) {
      return this.renderEditing();
    }

    return (
      <div className='policy-column'>
        <div className='box'>
          <div className='policy-summary'>
            {this.renderHeading()}
            {this.renderBeneficiaries()}
            <hr />
            {this.renderPaymentMethod()}
            <hr />
            {this.renderActions()}
          </div>
        </div>
      </div>
    );
  }

  renderPaymentMethod () {
    const paymentMethodIndex = (this.props.paymentMethods || []).findIndex(x => x.paymentMethodId === this.props.paymentMethodId);
    const paymentMethod = 'Card ' + String.fromCharCode(65 + paymentMethodIndex);

    return <div className='policy-summary-payment-method'>
      <h6 style={{ 'marginBottom': '0.5em', 'display': 'inline-block' }}>Payment Method:</h6>
      <span style={{ 'float': 'right', 'display': 'inline-block', 'marginRight': '9px' }}>{paymentMethod}</span>

    </div>;
  }

  renderActions () {
    let actions = null;
    if (!this.props.editing) {
      actions = <div className='beneficary-actions-container default'>
        <a className='button is-secondary is-outlined' onClick={this.cancel.bind(this)}>Cancel Policy</a>
      </div>;
    }

    if (this.state.confirmCancel) {
      actions = <div className='beneficary-actions-container cancel'>
        <div className='cancel-message'>Are you sure you want to cancel this policy?</div>
        <div className='cancel-buttons'>
          <a className='button is-secondary is-outlined' onClick={this.ignoreCancel.bind(this)}>No</a>
          <a className='button is-danger is-outlined' onClick={this.performCancel.bind(this)}>Yes</a>
        </div>
      </div>;
    }

    return actions;
  }

  renderBeneficiaries () {
    let beneficiaries = this.props.beneficiaries.map(function (beneficiary, i) {
      return <Beneficiary {...beneficiary} key={i} />;
    });

    let noBeneficiaries = null;
    if (beneficiaries.length === 0) {
      noBeneficiaries = <div className='no-beneficiaries'>This policy has no beneficiaries.<br />Please click edit to add one.</div>;
    }

    return <div className='policy-summary-beneficiaries'>
      <h6 style={{ 'marginBottom': '0.8em', 'display': 'inline-block' }}>Beneficiaries:</h6>
      <span className='inline-edit'><a className='button is-primary is-inverted' onClick={this.editBeneficiaries.bind(this)}>Edit</a></span>
      {beneficiaries}
      {noBeneficiaries}
    </div>;
  }

  renderHeading () {
    return <div className='policy-summary-heading'>
      <div className='policy-summary-money'>
        <div className='policy-summary-cover'>R {this.formattedSumAssured()} cover</div>
        <div className='policy-summary-premium'>
          <span className='plan-price-amount'><span className='plan-price-currency'>R</span>{this.formattedPremium()}/month</span>
        </div>
      </div>
      <div className='policy-summary-dates'>
        {this.formattedStartDate()} to {this.formattedEndDate()}
      </div>
    </div>;
  }

  renderEditing () {
    return (
      <div className='policy-column editing'>
        <div className='box'>
          <div className='policy-summary'>
            {this.renderHeading()}
            <div className='policy-summary-beneficiaries'>
              <h6 style={{ 'marginBottom': '0.5em', 'display': 'inline-block' }}>Beneficiaries:</h6>
              <BeneficiaryForm beneficiaries={this.props.beneficiaries} cancelEdit={this.cancelEdit.bind(this)} saveBeneficiaries={this.props.saveBeneficiaries.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const PaymentMethod = (props) => {
  return {
    render () {
      let type = 'Card ' + String.fromCharCode(65 + props.index);

      return (
        <div className={'payment-method-column'}>
          <div className={'box ' + (props.paymentMethodId ? 'payment-method-card' : '')}>
            {props.paymentMethodId && <div className='payment-method'>
              <div className='payment-method-type'>
                <div>{type}</div>
              </div>
              <div className='payment-method-card-number'>
                <div>.... .... .... ....</div>
              </div>
              <div className='payment-method-expiry'>
                <div>{props.card.expiryMonth}/{(props.card.expiryYear).substring(2)}</div>
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
    const body = {
      email: this.emailAddress
    };
    const oldEmail = this.props.emailAddress;

    this.props.emailUpdated(body.email);
    this.cancelClicked();

    try {
      axios.post('/api/user/update', body, {
        headers: { 'Authorization': 'Bearer ' + this.props.authToken }
      }).catch(() => {
        this.props.emailUpdated(oldEmail);
      });
    } catch (e) {
      console.log(e);
    }
  }

  cancelClicked () {
    this.setState({
      editing: false
    });

    this.emailAddress = undefined;
  }

  emailChanged (event) {
    this.emailAddress = event.target.value;
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
                {this.state.editing && <input name='' type='text' defaultValue={this.emailAddress} onChange={this.emailChanged.bind(this)} />}
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

class BeneficiaryFormElement extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      firstName: this.props.first_name,
      lastName: this.props.last_name,
      idNumber: this.props.id_number,
      percentage: this.props.percentage,
      firstNameTouched: false,
      lastNameTouched: false,
      idNumberTouched: false,
      percentageTouched: false,
      firstNameValid: false,
      lastNameValid: false,
      idNumberValid: false,
      percentageValid: false
    };
  }

  componentDidMount () {
    this.validate();
  }

  isValid () {
    return this.state.firstNameValid && this.state.lastNameValid && this.state.idNumberValid && this.state.percentageValid;
  }

  validate () {
    let newState = {
      firstNameValid: true,
      lastNameValid: true,
      idNumberValid: true,
      percentageValid: true
    };
    let valid = true;

    if (!this.state.firstName || this.state.firstName.length < 2 || this.state.firstName.length > 32) {
      newState.firstNameValid = false;
      valid = false;
    }
    if (!this.state.lastName || this.state.lastName.length < 2 || this.state.lastName.length > 32) {
      newState.lastNameValid = false;
      valid = false;
    }
    if (!this.state.idNumber || this.state.idNumber.length !== 13) {
      newState.idNumberValid = false;
      valid = false;
    }

    let validId = isValidIdNumber(this.state.idNumber);
    newState.idNumberValid = validId;
    valid = valid && validId;

    if (!this.state.percentage) {
      newState.percentageValid = false;
      valid = false;
    }

    let percent = parseFloat(this.state.percentage);
    if (percent <= 0 || percent > 100) {
      newState.percentageValid = false;
      valid = false;
    } else if (percent > 0 && percent <= 100) {
      let percentageValid = this.props.percentageValid(percent, this.props.index);
      newState.percentageValid = percentageValid;
      valid = valid && percentageValid;
    } else {
      newState.percentageValid = false;
      valid = false;
    }

    if (newState.firstNameValid !== this.state.firstNameValid ||
      newState.lastNameValid !== this.state.lastNameValid ||
      newState.idNumberValid !== this.state.idNumberValid ||
      newState.percentageValid !== this.state.percentageValid) {
      this.setState({ ...this.state, ...newState });
    }

    return valid;
  }

  add () {
    this.props.add({
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      id_number: this.state.idNumber,
      percentage: this.state.percentage
    }, this.props.index);
  }

  remove () {
    this.props.remove(this.props.index);
  }

  firstNameChanged (event) {
    this.setState({ ...this.state, firstName: event.target.value });
  }

  lastNameChanged (event) {
    this.setState({ ...this.state, lastName: event.target.value });
  }

  idNumberChanged (event) {
    this.setState({ ...this.state, idNumber: event.target.value });
  }

  percentageChanged (event) {
    this.setState({ ...this.state, percentage: event.target.value });
  }

  firstNameTouched () {
    this.setState({ ...this.state, firstNameTouched: true });
    this.validate();
  }

  lastNameTouched () {
    this.setState({ ...this.state, lastNameTouched: true });
    this.validate();
  }

  idNumberTouched () {
    this.setState({ ...this.state, idNumberTouched: true });
    this.validate();
  }

  percentageTouched () {
    this.setState({ ...this.state, percentageTouched: true });
    this.validate();
  }

  render () {
    return (
      <tr>
        <td>
          <input className={'input ' + ((!this.state.firstNameValid && this.state.firstNameTouched) ? 'has-danger' : '')} type='text' defaultValue={this.props.first_name} onChange={this.firstNameChanged.bind(this)} onBlur={this.firstNameTouched.bind(this)} required maxLength='32' />
        </td>
        <td>
          <input className={'input ' + ((!this.state.lastNameValid && this.state.lastNameTouched) ? 'has-danger' : '')} type='text' defaultValue={this.props.last_name} onChange={this.lastNameChanged.bind(this)} onBlur={this.lastNameTouched.bind(this)} required maxLength='32' />
        </td>
        <td>
          <input className={'input ' + ((!this.state.idNumberValid && this.state.idNumberTouched) ? 'has-danger' : '')} type='text' defaultValue={this.props.id_number} onChange={this.idNumberChanged.bind(this)} onBlur={this.idNumberTouched.bind(this)} required maxLength='13' minLength='13' />
        </td>
        <td>
          <input className={'input ' + ((!this.state.percentageValid && this.state.percentageTouched) ? 'has-danger' : '')} type='number' defaultValue={this.props.percentage} onChange={this.percentageChanged.bind(this)} onBlur={this.percentageTouched.bind(this)} required min='0' max='100' />
        </td>
        <td className='beneficiaries-form-element-actions'>
          {!this.props.isNew && <a className='button is-danger is-outlined' onClick={this.remove.bind(this)}>-</a>}
          {this.props.isNew && <a className='button is-success is-outlined' onClick={this.add.bind(this)} disabled={!this.isValid()}>+</a>}
        </td>
      </tr>
    );
  }
}

class BeneficiaryForm extends React.Component {
  isValid () {
    return true;
  }

  add (ben, index) {
    let empty = {
      first_name: null,
      last_name: null,
      id_number: null,
      percentage: null,
      isNew: true
    };
    this.state.beneficiaries[index] = ben;
    this.state.beneficiaries[index].isNew = false;
    this.setState({ ...this.state, beneficiaries: [...this.state.beneficiaries, { ...empty }] });
  }

  remove (index) {
    this.state.beneficiaries.splice(index, 1);
    this.setState({ ...this.state, beneficiaries: this.state.beneficiaries });
  }

  componentWillMount () {
    let empty = {
      first_name: null,
      last_name: null,
      id_number: null,
      percentage: null,
      isNew: true
    };

    this.setState({ ...this.state, beneficiaries: [...this.props.beneficiaries, { ...empty }] });
  }

  percentageValid (percentage, index) {
    let total = 0;
    this.state.beneficiaries.forEach((x, i) => {
      if (i === index) {
        total += percentage;
      } else {
        total += parseFloat(x.percentage);
      }
    });

    return total <= 100;
  }

  save () {
    this.state.beneficiaries.splice(-1, 1);
    this.props.saveBeneficiaries(this.state.beneficiaries);
  }

  render () {
    let add = this.add.bind(this);
    let remove = this.remove.bind(this);
    let percentageValid = this.percentageValid.bind(this);

    let rows = this.state.beneficiaries.map((ben, i) => {
      return (
        <BeneficiaryFormElement index={i} key={i} {...ben} add={add} remove={remove} percentageValid={percentageValid} />
      );
    });

    return (
      <div className='beneficiary-form'>
        <table className='table'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID Number</th>
              <th>Percentage</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        <div className='beneficiaries-form-action-buttons'>
          <a className='button is-secondary is-outlined' onClick={this.props.cancelEdit.bind(this)}>Cancel</a>
          <a className='button is-primary is-outlined' onClick={this.save.bind(this)} disabled={!this.isValid()}>Save</a>
        </div>
      </div>
    );
  }
}

class Beneficiary extends React.Component {
  render () {
    return (
      <div className='beneficiary'>
        <span>{this.props.first_name} {this.props.last_name}</span>
        <span>{this.props.percentage}%</span>
      </div>
    );
  }
}

export default page(class extends React.Component {
  constructor (props) {
    super(props);
    this.state = { loading: true, cancelling: false, editingPolicy: false, savingBeneficiaries: false };
  }

  async componentDidMount () {
    this.loadData();
  }

  async loadData () {
    this.setState({ ...this.state, loading: true });

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

      this.setState({ ...this.state, ...response, loading: false });
    } catch (e) {
      this.setState({ ...this.state, loading: false, errorLoading: true });
      console.log(e);
    }
  }

  groupArray (arr, size = 3) {
    if (!arr || arr.length === 0) {
      return [];
    }

    arr = [...arr];

    const groups = [];
    while (arr.length > 0) { groups.push(arr.splice(0, size)); }

    // let groupToAddTo = groups[groups.length - 1];
    // if (groupToAddTo.length === size) {
    //   groups.push([{}]);
    // } else {
    //   groupToAddTo.push({});
    // }

    return groups;
  }

  cancelPolicy (policy) {
    this.setState({ ...this.state, cancelling: true });
    try {
      axios.post('/api/user/cancel-policy', { policyId: policy.policyId }, {
        headers: { 'Authorization': 'Bearer ' + this.props.authToken }
      }).then(() => {
        this.setState({ ...this.state, cancelling: false });
        this.loadData();
      }).catch(() => {
        this.setState({ ...this.state, cancelling: false });
      });
    } catch (e) {
      console.log(e);
    }
  }

  editPolicy (policy, type) {
    this.setState({ ...this.state, editingPolicy: policy.policyId, editingPolicyType: type });
  }

  cancelEditPolicy () {
    this.setState({ ...this.state, editingPolicy: false });
  }

  saveBeneficiaries (beneficiaries) {
    beneficiaries.forEach(beneficiary => {
      beneficiary.percentage = parseInt(beneficiary.percentage, 10);
    });

    let policy = this.state.policies.find(x => x.policyId === this.state.editingPolicy);
    policy.beneficiaries = beneficiaries;

    this.cancelEditPolicy();
    this.setState({ ...this.state, savingBeneficiaries: true, editingPolicy: false, policies: [...this.state.policies], errorMessage: null });

    try {
      let policyId = this.state.editingPolicy;
      axios.post('/api/user/update-beneficiaries', { policyId, beneficiaries }, {
        headers: { 'Authorization': 'Bearer ' + this.props.authToken }
      }).then(() => {
        this.setState({ ...this.state, savingBeneficiaries: false });
      })
        .catch(() => {
          this.setState({ ...this.state, savingBeneficiaries: false });
        });
    } catch (e) {
      console.log(e);
    }
  }

  emailUpdated (email) {
    this.setState({ ...this.state, email });
  }

  renderError () {
    return <section className='section dashboard'>
      <div className='container'>
        <h1 className='title'>Oh no,</h1>
        <div className='content'>
          An error occurred and we couldn't fetch your policies. Please try refreshing the page.
            <br /><br />
          If the error persists, please don't hesitate to contact us.
          </div>
      </div>
    </section>;
  }

  render () {
    if (this.state.errorLoading) {
      return this.renderError();
    }

    const { firstName, lastName, id, email, policies, paymentMethods } = this.state;
    const policyGroups = this.groupArray(policies, 3);
    const paymentMethodGroups = this.groupArray(paymentMethods, 4);

    let cancelPolicy = this.cancelPolicy.bind(this);
    let editPolicy = this.editPolicy.bind(this);
    let cancelEditPolicy = this.cancelEditPolicy.bind(this);
    let emailUpdated = this.emailUpdated.bind(this);
    let policyEdited = null;
    let editingPolicyType = null;
    if (this.state.editingPolicy) {
      policyEdited = this.state.policies.find(x => x.policyId === this.state.editingPolicy);
      editingPolicyType = this.state.editingPolicyType;
    }

    return (
      <section className='section dashboard'>
        <div className={`pageloader ${this.state.loading ? 'is-active' : ''}`}><span className='title'>Loading Your Profile</span></div>
        <div className={`pageloader ${this.state.cancelling ? 'is-active' : ''}`}><span className='title'>Cancelling Policy</span></div>
        <div className={`pageloader ${this.state.savingBeneficiaries ? 'is-active' : ''}`}><span className='title'>Saving Beneficiaries</span></div>
        <div className='container'>
          <h1 className='title'>Welcome {firstName} {lastName},</h1>
          <div className='content'>

            <ContactDetails emailAddress={email} idNumber={id} authToken={this.props.authToken} emailUpdated={emailUpdated} />

            <div className='content'>
              <h3>Payment Methods</h3>
              {paymentMethodGroups.map(function (paymentMethods, i) {
                return (
                  <div className='payment-method-columns' key={i}>
                    {paymentMethods.map((paymentMethod, j) => {
                      return (<PaymentMethod {...paymentMethod} key={i + ',' + j} index={i * 3 + j} />);
                    })}
                  </div>
                );
              })}
            </div>

            <div className='content'>
              <h3>Policies</h3>
              {!policyEdited && policyGroups.map(function (policies, i) {
                return (
                  <div className='policy-columns' key={i}>
                    {policies.map((policy, j) => {
                      return (<Policy {...policy} key={i + ',' + j} onCancel={cancelPolicy} edit={editPolicy} paymentMethods={paymentMethods} />);
                    })}
                  </div>
                );
              })}
              {policyEdited && <Policy {...policyEdited} editing='true' cancelEdit={cancelEditPolicy.bind(this)} editType={editingPolicyType} saveBeneficiaries={this.saveBeneficiaries.bind(this)} />}
            </div>

          </div>
        </div>
      </section>
    );
  }
});
