import Navbar from '../../components/navbar';

export default () => (
  <span><Navbar />

    <div className='columns'>
      <div className='column' />
      <div className='column'>
        <div style={{ padding: '12px' }} >
          <article class='message is-primary'>
            <div class='message-header'>
              <p>Primary</p>
              <button class='delete' aria-label='delete' />
            </div>
            <div class='message-body'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
            </div>
          </article>
        </div>
      </div>

      <div className='column'>
        <div style={{ padding: '12px' }} >
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input className='input' type='text' placeholder='Text input' />
            </div>
          </div>

          <div className='field'>
            <label className='label'>Username</label>
            <div className='control has-icons-left has-icons-right'>
              <input className='input is-success' type='text' placeholder='Text input' value='bulma' />
              <span className='icon is-small is-left'>
                <i className='fa fa-user' />
              </span>
              <span className='icon is-small is-right'>
                <i className='fa fa-check' />
              </span>
            </div>
            <p className='help is-success'>This username is available</p>
          </div>

          <div className='field'>
            <label className='label'>Email</label>
            <div className='control has-icons-left has-icons-right'>
              <input className='input is-danger' type='email' placeholder='Email input' value='hello@' />
              <span className='icon is-small is-left'>
                <i className='fa fa-envelope' />
              </span>
              <span className='icon is-small is-right'>
                <i className='fa fa-warning' />
              </span>
            </div>
            <p className='help is-danger'>This email is invalid</p>
          </div>

          <div className='field'>
            <label className='label'>Subject</label>
            <div className='control'>
              <div className='select'>
                <select>
                  <option>Select dropdown</option>
                  <option>With options</option>
                </select>
              </div>
            </div>
          </div>

          <div className='field'>
            <label className='label'>Message</label>
            <div className='control'>
              <textarea className='textarea' placeholder='Textarea' />
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='checkbox'>
                <input type='checkbox' />
      I agree to the <a href='#'>terms and conditions</a>
              </label>
            </div>
          </div>

          <div className='field'>
            <div className='control'>
              <label className='radio'>
                <input type='radio' name='question' />
      Yes
    </label>
              <label className='radio'>
                <input type='radio' name='question' />
      No
    </label>
            </div>
          </div>

          <div className='field is-grouped'>
            <div className='control'>
              <button className='button is-link'>Submit</button>
            </div>
            <div className='control'>
              <button className='button is-text'>Cancel</button>
            </div>
          </div>

        </div>
      </div>
      <div className='column' />
    </div>

  </span>
);
