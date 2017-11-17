import Navbar from '../../components/navbar';

export default () => (
  <span><Navbar />

    <div className='columns'>
      <div className='column' />
      <div className='column'>
        <div style={{ padding: '12px' }} >
          <article className='message is-primary'>
            <div className='message-header'>
              <p>Required Documents</p>
              <button className='delete' aria-label='delete' />
            </div>
            <div className='message-body content'>
              It is hard losing a loved one, and administrative tasks are likely the last thing on one's mind.
              However before we can process the claim, we require the following documents:
              <ul>
                <li>A copy of the deceased's ID Number</li>
                <li>A copy of the deceased's ID Number</li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <div className='column'>

        <div style={{ padding: '12px' }} >
          <h1 className='title'>Begin</h1>
          <div>
            Please click the button below to start the claims process.
            You'll be able to
          </div>
        </div>
      </div>
      <div className='column' />
    </div>

  </span>
);
