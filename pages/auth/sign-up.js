import React from 'react';
import { show } from '../../utils/lock';
import page from '../../components/page';
const CONTAINER_ID = 'put-signup-container-here';

class SignUp extends React.Component {
  componentDidMount () {
    show(CONTAINER_ID, { allowLogin: false, languageDictionary: { title: 'Sign Up' } });
  }
  render () {
    return (<div id={CONTAINER_ID} />);
  }
}

export default page(SignUp, {
  getInitialProps: (ctx) => {
    if (process.browser) {
    } else {
      console.log(ctx.req.query);
    }
  }
});
