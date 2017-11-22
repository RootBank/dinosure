import FormFooter from '../../components/form-progress';
import page from '../../components/page';
import quoteStore from '../../datastores/quote';
import Choice from '../../components/choice';
import Link from 'next/link';
import Router from 'next/router';

const setGender = (gender) => () => quoteStore.update(store => ({ ...store, gender }));

const next = () => Router.push('/quote/age');

export default page(({ quote }) =>
  <section className='section'>
    <Choice
      onLeft={setGender('female')} leftOption='Female'
      onRight={setGender('male')} rightOption='Male'
      onEither={next}
      instructions='What was the gender you were assigned at birth?'
    />
  </section>,
  {
    footer: () => <div>
      <section className='section'>
        <div className='level form-nav'>
          <div className='level-item'>
            <Link href='/quote/cover'><button className='button is-primary is-inverted'><a>Prev</a></button></Link>
          </div>
        </div>
      </section>
      <FormFooter step={2} of={6} />
    </div>,
    datastores: { quote: quoteStore }
  }
);
