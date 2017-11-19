import Link from 'next/link';

const LoginElements = ({isAuthenticated, currentPage}) => {
  if (isAuthenticated) {
    return [
      <Link key={'account'} prefetch href='/my-account'><a className={`navbar-item ${currentPage === '/my-account' ? 'is-active' : ''}`}>My Account</a></Link>,
      <Link key={'logout'} prefetch href='/auth/log-out'>
        <span className='navbar-item'>
          <a className='button is-primary is-inverted'>
            <span className='icon'>
              <i className='fa fa-sign-in' />
            </span>
            <span>Log out</span>
          </a>
        </span>
      </Link>
    ];
  } else {
    return (
      <Link prefetch href='/auth/log-in'>
        <span className='navbar-item'>
          <a className='button is-primary is-inverted'>
            <span className='icon'>
              <i className='fa fa-sign-in' />
            </span>
            <span>Log In</span>
          </a>
        </span>
      </Link>
    );
  }
};

export default ({ currentPage, user, isAuthenticated }) => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <div className='navbar-brand'>
          <Link prefetch href='/'>
            <a className='navbar-item'>
              <img style={{ height: '50px', maxHeight: 'unset' }} src='/static/logo.svg' alt='Logo' />
            </a>
          </Link>
          <label className='navbar-burger navbar-toggle burger' data-target='navbarMenuHero' htmlFor='nav-toggle-state'>
            <span />
            <span />
            <span />
          </label>
        </div>
        <div id='navbarMenuHero' className='navbar-menu nav-right nav-menu'>
          <div className='navbar-end'>
            {/* The following section the current page's navbar item to selected.
              It uses a ternery operator to perform the check on each item
           */}
            <Link prefetch href='/'><a className={`navbar-item ${currentPage === '/' ? 'is-active' : ''}`}>Home</a></Link>
            <Link prefetch href='/about'><a className={`navbar-item ${currentPage === '/about' ? 'is-active' : ''}`}>About</a></Link>
            <Link prefetch href='/contact'><a className={`navbar-item ${currentPage === '/contact' ? 'is-active' : ''}`}>Contact</a></Link>
            <Link prefetch href='/claim'><a className={`navbar-item ${currentPage === '/claim' && 'is-active'}`}>Claim</a></Link>
            <LoginElements isAuthenticated={isAuthenticated} currentPage={currentPage} />
          </div>
        </div>
      </div>
    </nav>
  );
};
