import Link from 'next/link';
import page from '../../components/page';

export default page(() =>
  <section className='section '>
    <div className='container content'>
      <h1 className='title'>Begin Quote</h1>
      <p>
          You are going to be asked a few questions in order to receive a quote for
          Dinosure Life Insurance. Dinosure provides whole life policies and unless explicitly
          stated otherwise, only covers dinosaur related deaths. Quotes remain valid for 24 hours
          after they have been received.
      </p>
      <p>
        Click the button below to begin. Once started, you'll be able to resume the process at any time provided you use the same browser.
      </p>
    </div>
  </section>,
  {
    footer: () => <section className='section'>
      <div className='level form-nav'>
        <div className='level-item'>
          <Link href='/quote/cover'><button className='button is-primary'>Start</button></Link>
        </div>
      </div>
    </section>
  }
);
