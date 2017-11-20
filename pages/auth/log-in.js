import React from 'react';
import { show } from '../../utils/lock';
import page from '../../components/page';

const CONTAINER_ID = 'put-login-container-here';

class SignIn extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowSignUp: false, languageDictionary: { title: 'Log In' } });
  }
  render () {
    return (<div id={CONTAINER_ID} />);
  }
}

export default page(SignIn);
