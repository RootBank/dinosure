import Navbar from '../../components/navbar';
import Link from 'next/link';

export default () => (<div>
  <Navbar currentPage='/claim' />
  <section className='section '>
    <div className='container content'>
      <h1 className='title'>Claim</h1>
      <p>
          Please click the button below to start the claims process.
          Once started, you'll receive an email which will allow you to resume the process at any time.
      </p>
      <article className='message is-primary'>
        <div className='message-header'>
          <p>Required Documents</p>
        </div>
        <div className='message-body'>
              It is hard losing a loved one, and administrative tasks are likely the last thing on one's mind.
              However before we can process the claim, we require the following supporting documents:
              <ul>
                <li>A copy of the deceased's ID and/or birth certificate</li>
                <li>The deceased's death certificate</li>
              </ul>
        </div>
      </article>
      <Link href='/claim/1'><button className='button is-primary'>Start</button></Link>
    </div>
  </section>
</div>);
