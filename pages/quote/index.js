import page from '../../components/page';
import quoteStore from '../../datastores/quote';
import applicationStore from '../../datastores/application';
import Router from 'next/router';
import React from 'react';
import Choice from '../../components/choice';

const viewQuote = () => {
  applicationStore.clear();
  Router.push('/quote/summary');
};

const gotoApplication = () => {
  Router.replace('/checkout');
};

const ApplicationAlreadyStarted = () => (
  <section className='section'>
    <div className='container content'>
      <h3 className='title has-text-centered is-4'>You already have an application in progress</h3>
      <Choice
        leftOption='Continue'
        rightOption='Start Over'
        onRight={viewQuote}
        onLeft={gotoApplication}
        rightClassName='is-info'
        instructions='What would you like to do?'
    />
    </div>
  </section>
);

export default page(class extends React.Component {
  componentDidMount () {
    if (!applicationStore.state.started) {
      viewQuote();
    }
  }

  render () {
    return <ApplicationAlreadyStarted />;
  }
},
  {
    datastores: { quote: quoteStore },
    getInitialProps: () => quoteStore.state.started ? ({
      quote: quoteStore.state
    }) : false
  }
);
