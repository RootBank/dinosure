import Link from 'next/link';
import page from '../../components/page';

export default page(() => (
  <section className='section '>
    <div className='container content'>
      <h1 className='title'>Claim</h1>
      <p>
          Please click the button below to start the claims process.
          Once started, you'll be able to resume the process at any time provided you use the same browser.
      </p>
      <article className='message is-primary'>
        <div className='message-header'>
          <p>Required Documents</p>
        </div>
        <div className='message-body'>
            Before we can process the claim, we require the following supporting documents:
            <ul>
              <li>A copy of the deceased's ID and/or birth certificate</li>
              <li>The deceased's death certificate</li>
            </ul>
            Note: Please do not hesitate to call one of our consultants on <a href='tel:083 555 1337'>083 555 1337</a> if
            you experience difficulties in obtaining these documents.
        </div>
      </article>
    </div>
    <div className='container level'>
      <div className='level-item'>
        <Link href='/claim/1'><button className='button is-primary'>Start</button></Link>
      </div>
    </div>
  </section>
));
