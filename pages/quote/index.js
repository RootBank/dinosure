import page from '../../components/page';
import quoteStore from '../../datastores/quote';
import Router from 'next/router';
import React from 'react';
import Choice from '../../components/choice';

const setQuoteStarted = () => {
  quoteStore.update(({sumAssured}) => ({ sumAssured, started: true }));
  Router.replace('/quote/cover');
};

const viewQuote = () => {
  Router.push('/quote/issued');
};

const QuoteAlreadyReceived = () => (
  <section className='section'>
    <div className='container content'>
      <h3 className='title has-text-centered is-4'>You already have an existing quote</h3>
      <Choice
        leftOption='View Quote'
        rightOption='Start Over'
        onRight={setQuoteStarted}
        onLeft={viewQuote}
        rightClassName='is-info'
        instructions='What would you like to do?'
    />
    </div>
  </section>
);

export default page(class extends React.Component {
  componentDidMount () {
    if (!quoteStore.isValid) {
      setQuoteStarted();
    }
  }

  render () {
    if (quoteStore.isValid) {
      return (<QuoteAlreadyReceived />);
    } else {
      return null;
    }
  }
},
  {
    datastores: { quote: quoteStore },
    getInitialProps: () => quoteStore.state.started ? ({
      quote: quoteStore.state
    }) : false
  }
);
