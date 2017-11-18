import React from 'react';
import { show } from '../utils/lock';
import Navbar from '../components/navbar';

const CONTAINER_ID = 'put-login-container-here';

class SignIn extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowSignUp: false, languageDictionary: { title: 'Sign In' } });
  }
  render () {
    return (<div>
      <Navbar />
      <div id={CONTAINER_ID} />
    </div>);
  }
}

export default SignIn;
