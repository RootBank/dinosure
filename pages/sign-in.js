import React from 'react';
import { show } from '../utils/lock';

const CONTAINER_ID = 'put-login-container-here';

class SignIn extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowSignUp: false });
  }
  render () {
    return <div id={CONTAINER_ID} />;
  }
}

export default SignIn;
