import FormFooter from '../../components/form-footer';
import page from '../../components/page';
import quoteStore from '../../datastores/quote';
import Choice from '../../components/choice';
import Link from 'next/link';
import Router from 'next/router';

const setSmoking = (smoking) => () => quoteStore.update(store => ({ ...store, smoking }));

const next = () => Router.push('/quote/issue');

export default page(() =>
  <section className='section'>
    <Choice
      leftOption='Smoking' onLeft={setSmoking(true)}
      rightOption='Non-Smoking' onRight={setSmoking(false)}
      onEither={next}
      instructions={'Please answer “Smoking” if you\'ve smoked tobacco in the last year.'}
    />
  </section>,
  {
    footer: () => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/quote/income'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={6} of={6} />
    </div>
  }
);
