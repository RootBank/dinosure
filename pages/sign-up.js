import React from 'react';
import { show } from '../utils/lock';

const CONTAINER_ID = 'put-signup-container-here';

class SignUp extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowLogin: false });
  }
  render () {
    return <div id={CONTAINER_ID} />;
  }
}

export default SignUp;
