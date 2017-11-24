import Link from 'next/link';
import page from '../../components/page';

export default page(() => (
  <section className='section '>
    <div className='container content'>
      <h1 className='title has-text-centered'>Submit a Claim</h1>
      <p>
        We know there are no words that could help. All we can do is complete this claim as quickly and easily as possible.
      </p>
      <p>
        Please click the button below to start the claims process.
        Once started, youll be able to resume the process at any time provided you use the same browser.
      </p>
      <div className='container level'>
        <div className='level-item'>
          <Link href='/claim/1'><button className='button is-primary'>Start</button></Link>
        </div>
      </div>
      <article className='message is-primary'>
        <div className='message-header'>
          <p>Note</p>
        </div>
        <div className='message-body'>
          If you have any questions or queries you can find the little green bubble on the right hand corner of your screen. Just click on it and a fellow Hero will be there to help you.
        </div>
      </article>
    </div>
  </section>
));
