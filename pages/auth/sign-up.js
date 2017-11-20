import React from 'react';
import { show } from '../../utils/lock';
import Navbar from '../../components/navbar';
import page from '../../components/page';
const CONTAINER_ID = 'put-signup-container-here';

class SignUp extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowLogin: false, languageDictionary: { title: 'Sign Up' } });
  }
  render () {
    return (
      <div>
        <Navbar isAuthenticated={this.props.isAuthenticated} user={this.props.user} />
        <div id={CONTAINER_ID} />
      </div>
    );
  }
}

export default page(SignUp);
